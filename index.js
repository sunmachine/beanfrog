'use strict'

// Check node version.
const version = process.version;
if ( Number(version.slice(1).split(".")[0]) < 16 )
    throw new Error(`Node 16.x or higher is required. Currently using version ${version}.`);

require("dotenv").config()
const { Client, /* Collection */ } = require("discord.js");

// Client Configuration
const client = new Client({
    intents: [
        "DIRECT_MESSAGES",
        "DIRECT_MESSAGE_REACTIONS",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS"
    ]
});

client.on(
    'ready',
    () => {
        console.log(`Logged in as ${client.user.tag}!`);
    }
);

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }
});

// Execute
client
    .login(process.env.CLIENT_TOKEN)
    .then(() => console.log(`Successfully connected.`));