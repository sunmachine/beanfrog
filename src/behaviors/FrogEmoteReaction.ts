import { MessageCreateBehavior } from "../events/MessageCreateEvent";
import { Message } from "discord.js";

export class FrogEmoteReaction implements MessageCreateBehavior {
  private reaction = "🐸";
  private triggers = ["🐸", "amphib", "frog", "toad"];
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
    // Early-out.
    if (!message?.content) {
      return false;
    }

    // Early-out if there is an exact match.
    const text = this.normalize(message.content);
    if (this.triggers.find((e) => text.includes(e))) {
      return true;
    }

    let exp = "";
    for (let i = 0; i < text.length; ++i) {
      const letter = text[i];
      exp += `\\s*${letter}\\s*`;
    }

    return new RegExp(exp, "g").test(text);
  }

  private normalize(text: string) {
    text = text.toLowerCase();
    for (const pairing of this.replacements) {
      text = text.replaceAll(pairing.char, pairing.replacement);
    }

    return text;
  }
}
