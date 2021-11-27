'use strict'

// Check node version.
const version = process.version;
if ( Number(version.slice(1).split(".")[0]) < 16 )
    throw new Error(`Node 16.x or higher is required. Currently using version ${version}.`);

const { token } = require('./config.json');
const { Client, Intents } = require("discord.js");

// Client Configuration
const client = new Client({
    intents: [ Intents.FLAGS.GUILDS ]
});

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log(`Ready: ${client.user.tag}`);
});

// Execute
client.login(token)
