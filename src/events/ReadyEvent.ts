import { Awaitable, Client } from "discord.js";

export class ReadyEvent {
  onReady(client: Client<true>): Awaitable<void> {
    if (client && client.user) {
      console.log(`Logged in as ${client.user.tag}!`);
    }
  }
}
