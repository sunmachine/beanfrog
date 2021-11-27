const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('satisfactory-status')
        .setDescription('Tells you the status of the satisfactory server!'),

    async execute(interaction) {
        await interaction.reply('Not implemented!! 🐸');
    },
};
