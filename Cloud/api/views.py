# Stores the views displayed in discord
import discord
from mqtt import publish

# View for controlling the light at sunset
class SunsetView(discord.ui.View):
    @discord.ui.button(label="Yes", style=discord.ButtonStyle.green)
    async def yes_button(self, interaction: discord.Interaction, button: discord.ui.Button):
        publish("103603101/control/light/enabled", "1")
        await interaction.response.send_message("Turning light on!", ephemeral=True)

    @discord.ui.button(label="No", style=discord.ButtonStyle.red)
    async def no_button(self, interaction: discord.Interaction, button: discord.ui.Button):
        await interaction.response.send_message("No action needed", ephemeral=True)

