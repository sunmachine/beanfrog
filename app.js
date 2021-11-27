'use strict'

// Check node version.
const version = process.version;
if (Number(version.slice(1).split(".")[0]) < 16)
    throw new Error(`Node 16.x or higher is required. Currently using version ${version}.`);

// Imports
const fs = require('fs');
const {token} = require('./config.json');
const {Client, Intents, Collection} = require("discord.js");

// Client Configuration
const client = new Client({
    intents: [Intents.FLAGS.GUILDS]
});

// Command registration.
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

// Event registration.
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

// Handle commands.
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

// Execute
client.login(token)
