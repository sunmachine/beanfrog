import { MessageCreateBehavior } from "../events/MessageCreateEvent";
import { Message } from "discord.js";

export class FrogEmoteReactor implements MessageCreateBehavior {
  private reaction = "🐸";

  private triggers = ["🐸", "amphib", "frog", "toad", "ribbit", "kermit"];

  private replacements = [
    { char: "1", replacement: "l" },
    { char: "3", replacement: "e" },
    { char: "4", replacement: "a" },
    { char: "5", replacement: "s" },
    { char: "7", replacement: "t" },
    { char: "0", replacement: "o" },
    { char: "@", replacement: "o" },
  ];

  async trigger(message: Message): Promise<void> {
    await message
      .react(this.reaction)
      .then(() => console.log(`Reacted to user with emoji: ${this.reaction}`));
  }

  evaluate(message: Message): boolean {
    if (!message) return false;

    for (let text of this.getContentsLazily(message)) {
      if (!text) continue;

      text = this.normalize(text);
      if (this.isExactMatch(text) || this.isAestheticMatch(text)) {
        return true;
      }
    }

    return false;
  }

  private normalize(text: string) {
    text = text.toLowerCase();
    for (const pairing of this.replacements) {
      text = text.replaceAll(pairing.char, pairing.replacement);
    }

    return text;
  }

  private isExactMatch(text: string): boolean {
    return this.triggers.includes(text);
  }

  private isAestheticMatch(text: string) {
    // Loop through each trigger.
    for (const trigger of this.triggers) {
      // And break it down to each character...
      let exp = "";
      for (let i = 0; i < trigger.length; ++i) {
        const letter = trigger[i];
        // If we're not looking at a whitespace
        if (!/^\s$/i.test(letter)) {
          exp += `\\s*${letter}`;
        }
      }

      if (exp.length === 0) continue;

      exp += "\\s*";
      if (new RegExp(exp, "g").test(text)) {
        return true;
      }
    }

    return false;
  }

  private *getContentsLazily(message: Message) {
    yield message.content as string;

    if (!message.attachments || message.attachments.values.length > 0) {
      return;
    }

    const paramQueries = function* () {
      yield message.attachments.map((m) => m.attachment);
      yield message.attachments.map((m) => m.name);
      yield message.attachments.map((m) => m.url);
      yield message.attachments.map((m) => m.proxyURL);
    };

    for (const query of paramQueries())
      for (const text of query) {
        if (!text) {
          continue;
        } else {
          yield text as string;
        }
      }
  }
}
