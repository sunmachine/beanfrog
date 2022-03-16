import { Message } from "discord.js";
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

  test("All toad-like messages evaluate to true.", () => {
    const evaluate = jest.spyOn(instance, "evaluate");

    const m1 = { content: "fRog" } as unknown as Message<boolean>;
    const m2 = { content: "bear" } as unknown as Message<boolean>;
    const m3 = { content: "fr o  g" } as unknown as Message<boolean>;
    const m4 = { content: "4 M ph IbI   a n" } as unknown as Message<boolean>;
    const m5 = { content: "" } as unknown as Message<boolean>;

    instance.evaluate(m1);
    instance.evaluate(m2);
    instance.evaluate(m3);
    instance.evaluate(m4);
    instance.evaluate(m5);

    expect(evaluate).toHaveNthReturnedWith(1, true);
    expect(evaluate).toHaveNthReturnedWith(2, false);
    expect(evaluate).toHaveNthReturnedWith(3, true);
    expect(evaluate).toHaveNthReturnedWith(4, true);
    expect(evaluate).toHaveNthReturnedWith(5, false);
  });
});
