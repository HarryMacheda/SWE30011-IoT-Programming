import discord
from discord import app_commands
from discord.ext import commands
import paho.mqtt.client as mqtt

broker = "test.mosquitto.org"
port = 1883
client = mqtt.Client()
def publish(topic, message):
    client.connect(broker, port)
    client.publish(topic, message)
    client.disconnect()


intents = discord.Intents.default()
intents.message_content = True
bot = commands.Bot(command_prefix="!", intents=intents)

@bot.event
async def on_ready():
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

bot.run("")

