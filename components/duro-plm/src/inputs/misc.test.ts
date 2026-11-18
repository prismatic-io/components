import { rawRequestInputs } from "./misc";

describe("query clean", () => {
  const clean = rawRequestInputs.query.clean;

  test("returns the GraphQL document as a string", () => {
    expect(clean("query { currentUser { id } }")).toBe(
      "query { currentUser { id } }",
    );
  });

  test("returns an empty string for an empty value", () => {
    expect(clean("")).toBe("");
  });
});
