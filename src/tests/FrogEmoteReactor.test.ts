import {
  BufferResolvable,
  Collection,
  Message,
  MessageAttachment,
} from "discord.js";
import { FrogEmoteReactor } from "../behaviors/FrogEmoteReaction";

let instance: FrogEmoteReactor;

describe("Simple frog-emote reactions to specific messages.", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    instance = new FrogEmoteReactor();
  });

  test("Invalid messages evaluate falsy.", () => {
    const evaluate = jest.spyOn(instance, "evaluate");

    const m1 = undefined as unknown as Message<boolean>;
    const m2 = { content: undefined } as unknown as Message<boolean>;

    instance.evaluate(m1);
    instance.evaluate(m2);

    expect(evaluate).toBeCalledTimes(2);
    expect(evaluate).toHaveNthReturnedWith(1, false);
    expect(evaluate).toHaveNthReturnedWith(2, false);
  });

  test("All toad-like messages in lower-case evaluate to true.", () => {
    const evaluate = jest.spyOn(instance, "evaluate");
    const mockMsg1 = { content: "bear" } as unknown as Message<boolean>;
    const mockMsg2 = { content: "frog" } as unknown as Message<boolean>;

    instance.evaluate(mockMsg1);
    instance.evaluate(mockMsg2);

    expect(evaluate).toHaveNthReturnedWith(1, false);
    expect(evaluate).toHaveNthReturnedWith(2, true);
  });

  test("All toad-like messages with mixed case evaluate to true.", () => {
    const evaluate = jest.spyOn(instance, "evaluate");
    const mockMsg1 = { content: "beAr" } as unknown as Message<boolean>;
    const mockMsg2 = { content: "frOg" } as unknown as Message<boolean>;

    instance.evaluate(mockMsg1);
    instance.evaluate(mockMsg2);

    expect(evaluate).toHaveNthReturnedWith(1, false);
    expect(evaluate).toHaveNthReturnedWith(2, true);
  });

  test("All toad-like messages with awkward spacing evaluate to true.", () => {
    const evaluate = jest.spyOn(instance, "evaluate");
    const mockMsg1 = { content: "b e Ar" } as unknown as Message<boolean>;
    const mockMsg2 = { content: "f r   O g" } as unknown as Message<boolean>;

    instance.evaluate(mockMsg1);
    instance.evaluate(mockMsg2);

    expect(evaluate).toHaveNthReturnedWith(1, false);
    expect(evaluate).toHaveNthReturnedWith(2, true);
  });

  test("All toad-like messages with awkward spacing evaluate to true.", () => {
    const evaluate = jest.spyOn(instance, "evaluate");
    const mockMsg1 = { content: "b e Ar" } as unknown as Message<boolean>;
    const mockMsg2 = { content: "f r   O g" } as unknown as Message<boolean>;

    instance.evaluate(mockMsg1);
    instance.evaluate(mockMsg2);

    expect(evaluate).toHaveNthReturnedWith(1, false);
    expect(evaluate).toHaveNthReturnedWith(2, true);
  });

  const attachmentTest = function (
    paramName: string,
    expectedResult: boolean,
    attachments: MessageAttachment[]
  ) {
    test(`Messages with ${
      expectedResult ? "valid" : "invalid"
    } MessageAttachment.${paramName} evaluate to ${expectedResult}.`, () => {
      const evaluate = jest.spyOn(instance, "evaluate");

      const collection = new Collection<string, MessageAttachment>();
      for (let i = 0; i < attachments.length; ++i) {
        collection.set(`guid:${i}`, attachments[i]);
      }

      const mockMsg = {
        content: "",
        attachments: collection,
      } as unknown as Message<boolean>;

      instance.evaluate(mockMsg);
      expect(evaluate).toHaveReturnedWith(expectedResult);
    });
  };

  attachmentTest("name", true, [
    { name: "frrrr!" as string | null } as unknown as MessageAttachment,
    { name: "f R0G" as string | null } as unknown as MessageAttachment,
  ]);

  attachmentTest("attachment", true, [
    { attachment: "frrrr!" as string | null } as unknown as MessageAttachment,
    { attachment: "f R0G" as string | null } as unknown as MessageAttachment,
  ]);

  attachmentTest("url", true, [
    { url: "frrrr!" as string | null } as unknown as MessageAttachment,
    { url: "f R0G" as string | null } as unknown as MessageAttachment,
  ]);

  attachmentTest("proxyURL", true, [
    { proxyURL: "frrrr!" as string | null } as unknown as MessageAttachment,
    { proxyURL: "f R0G" as string | null } as unknown as MessageAttachment,
  ]);
});
