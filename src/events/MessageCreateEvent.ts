import { FrogEmoteReactor } from "../behaviors/FrogEmoteReaction";
import { Awaitable, GuildChannel, Message, Permissions } from "discord.js";

export interface MessageCreateBehavior {
  trigger(message: Message): Promise<void>;
  evaluate(message: Message): boolean;
}

export class MessageCreateEvent {
  constructor(private _clientId: string) {}

  private permissions = [
    Permissions.FLAGS.READ_MESSAGE_HISTORY,
    Permissions.FLAGS.ADD_REACTIONS,
  ];

  private behaviors: Array<MessageCreateBehavior> = [new FrogEmoteReactor()];

  private hasPermissions(message: Message<boolean>): boolean {
    if (message?.channel instanceof GuildChannel) {
      return !!message.channel
        ?.permissionsFor(this._clientId)
        ?.has(this.permissions);
    }

    return false;
  }

  onMessageCreate(message: Message<boolean>): Awaitable<void> {
    if (this.hasPermissions(message)) {
      for (const behavior of this.behaviors) {
        if (behavior.evaluate(message)) {
          behavior.trigger(message);
        }
      }
    }
  }
}
