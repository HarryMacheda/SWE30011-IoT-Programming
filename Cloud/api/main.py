import discord
from discord import app_commands
from discord.ext import commands
import pytz
from datetime import datetime, timedelta
import requests
import threading
import time
from mqtt import publish
from views import SunsetView
import asyncio


# Sunrise sunset api
timeZone = pytz.timezone("Australia/Melbourne")
def CompareSunset(sunset):
    now = datetime.now(timeZone) #Get current time
    sunsetTime = datetime.strptime(sunset, "%I:%M:%S %p") #convert sunset string to datetime
    sunsetToday = now.replace(hour=sunsetTime.hour, minute=sunsetTime.minute, second=sunsetTime.second, microsecond=0)
    return timedelta(0) <= (sunsetToday - now) <= timedelta(minutes=5) #check if its within five minutes

async def CheckAPI():
    url = url = "https://api.sunrisesunset.io/json?lat=-37.82484&lng=145.0464"
    response = requests.get(url)
    data = response.json()
    sunset = data['results']['sunset']

    if CompareSunset(sunset):
        channel = bot.get_channel(1374920168643366935)
        if channel:
            view = SunsetView()
            await channel.send("Sunset will happen in the next 5 minutes, would you like to turn the lights on?", view=view)
    else:
        print("Sunset is not within the next 5 minutes!")

loop = None
def ThreadFunction():
    while True:
        future = asyncio.run_coroutine_threadsafe(CheckAPI(), loop)
        try:
            result = future.result(timeout=10) 
        except Exception as e:
            print(f"Error running async task: {e}")
        time.sleep(300)

# Discord bot
intents = discord.Intents.default()
intents.message_content = True
bot = commands.Bot(command_prefix="!", intents=intents)

@bot.event
async def on_ready():
    global loop
    loop = asyncio.get_running_loop()
    thread = threading.Thread(target=ThreadFunction, daemon=True)
    thread.start()
    await bot.tree.sync()

@bot.tree.command(name="status", description="Change the state of the device")
@app_commands.describe(component="Select the device")
@app_commands.describe(state="Select the state to use")
@app_commands.choices(
    component=[
        app_commands.Choice(name="Light", value="light"),
        app_commands.Choice(name="Fan", value="fan"),
    ],
    state=[
        app_commands.Choice(name="On", value="1"),
        app_commands.Choice(name="Off", value="0"),
    ]
)
async def color(interaction: discord.Interaction, component: app_commands.Choice[str],  state: app_commands.Choice[str]):
    publish(f"103603101/control/{component.value}/enabled", state.value)
    await interaction.response.send_message(f"Turned {component.name} {'on' if state.value == '1' else 'off'}")





#Start bot
bot.run("")

