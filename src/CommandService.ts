import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { clientId, guildId, token } from "../config.json";

export class CommandService {
  commands = [
    {
      name: "ping",
      description: "Replies with Pong!",
    },
  ];

  rest = new REST({ version: "9" }).setToken(token);

  async registerCommands() {
    try {
      console.log("Started refreshing application (/) commands.");

      await this.rest.put(Routes.applicationGuildCommands(clientId, guildId), {
        body: this.commands,
      });

      console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
      console.error(error);
    }
  }
}
