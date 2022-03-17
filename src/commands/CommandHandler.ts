import { CacheType, Interaction } from "discord.js";
import { Routes } from "discord-api-types/v9";
import { REST } from "@discordjs/rest";

export class CommandHandler {
  constructor(
    private _clientId: string,
    private _guildId: string,
    token: string
  ) {
    this.rest = new REST({ version: "9" }).setToken(token);
  }

  commands = [
    {
      name: "poke",
      description: "Poke BeanFrog!",
    },
  ];

  private rest: REST;

  async registerCommands() {
    try {
      console.log("Started refreshing application (/) commands.");

      await this.rest.put(
        Routes.applicationGuildCommands(this._clientId, this._guildId),
        {
          body: this.commands,
        }
      );

      console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
      console.error(error);
    }
  }

  async handleInteraction(interaction: Interaction<CacheType>) {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === "poke") {
      await interaction.reply("🐸");
    }
  }
}
