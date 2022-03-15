import { Client, Intents } from "discord.js";
import { CommandService } from "./src/CommandService";
import { token } from "./config.json";

// Check node version.
const version = process.version;
if (Number(version.slice(1).split(".")[0]) < 17)
  throw new Error(
    `Node 17.x or higher is required. Currently using version ${version}.`
  );

const command = new CommandService();
command.registerCommands();

// Client Configuration
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});

client.on("ready", () => {
  if (client && client.user) {
    console.log(`Logged in as ${client.user.tag}!`);
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("🐸");
  }
});

// Execute
client.login(token);
