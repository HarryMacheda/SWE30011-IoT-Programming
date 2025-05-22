import discord
from discord import app_commands
from discord.ext import commands

intents = discord.Intents.default()
intents.message_content = True
bot = commands.Bot(command_prefix="!", intents=intents)

@bot.event
async def on_ready():
    await bot.tree.sync()

@bot.tree.command(name="toggle", description="Change the state of the device")
@app_commands.describe(choice="Change the state of the selected device")
@app_commands.choices(
    choice=[
        app_commands.Choice(name="Light", value="light"),
        app_commands.Choice(name="Fan", value="fan"),
    ]
)
async def color(interaction: discord.Interaction, choice: app_commands.Choice[str]):
    await interaction.response.send_message(f"You chose: {choice.name} 🌈")
# Run the bot with your token
bot.run("MTM3NDkxOTU1MTU4OTgxNDM0Mg.GOtXXr.mw_ZVZiyfPV_1vlU83uMTxALMwVyzPtRk52YWk")

