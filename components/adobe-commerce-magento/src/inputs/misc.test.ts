import { query, store } from "./misc";
describe("misc inputs: happy-path normalization", () => {
  test.each<
    [string, ((value: unknown) => unknown) | undefined, unknown, unknown]
  >([
    [
      "query",
      query.clean,
      'query { cart(cart_id: "abc") { id } }',
      'query { cart(cart_id: "abc") { id } }',
    ],
    ["store", store.clean, "www.example.com", "www.example.com"],
  ])("%s.clean normalizes a valid value", (_label, clean, raw, expected) => {
    expect(clean?.(raw)).toEqual(expected);
  });
});
