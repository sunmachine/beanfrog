import { Client, Intents } from "discord.js";
import { clientId, guildId, token } from "./config/config.json";
import { CommandHandler } from "./commands/CommandHandler";
import { MessageCreateEvent } from "./events/MessageCreateEvent";
import { ReadyEvent } from "./events/ReadyEvent";

// Check node version.
const version = process.version;
if (Number(version.slice(1).split(".")[0]) < 17)
  throw new Error(
    `Node 17.x or higher is required. Currently using version ${version}.`
  );

const command = new CommandHandler(clientId, guildId, token);
command.registerCommands().then(setupClient);

function setupClient() {
  // Client Configuration
  const client = new Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
  });

  const ready = new ReadyEvent();
  const messageCreate = new MessageCreateEvent(clientId);

  client.on("ready", (client) => ready.onReady(client));
  client.on("messageCreate", (msg) => messageCreate.onMessageCreate(msg));
  client.on("interactionCreate", (i) => command.handleInteraction(i));

  // Execute
  client.login(token);
}
