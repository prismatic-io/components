import { requireAnyUpdate } from "./validation";

describe("requireAnyUpdate", () => {
  test("returns the body when a field is set", () => {
    const body = { title: undefined, state_event: "close" };
    expect(requireAnyUpdate(body, "issue")).toBe(body);
  });

  test("throws a clear error when every field is empty", () => {
    expect(() =>
      requireAnyUpdate({ title: undefined, labels: undefined }, "issue"),
    ).toThrow(/at least one field to update on the issue/);
  });

  test("treats false as a value", () => {
    expect(requireAnyUpdate({ confidential: false }, "issue")).toEqual({
      confidential: false,
    });
  });
});
