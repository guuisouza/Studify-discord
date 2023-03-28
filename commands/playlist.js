const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
          .setName("playlist")
          .setDescription("Ouça uma playlist enquanto estuda!"),
    async execute(interaction){
        await interaction.reply("https://open.spotify.com/playlist/3dMJJ69nRYKI1o1Lp0NRl6?si=4291ec64870b444b")
    }
}