import { createChangeOrderInputs } from "./orders";

describe("name clean", () => {
  const clean = createChangeOrderInputs.name.clean;

  test("returns the name as a string", () => {
    expect(clean("ECO-2024-001")).toBe("ECO-2024-001");
  });

  test("returns an empty string for an empty value", () => {
    expect(clean("")).toBe("");
  });
});

describe("type clean", () => {
  const clean = createChangeOrderInputs.type.clean;

  test("returns the type as a string", () => {
    expect(clean("MCO")).toBe("MCO");
  });

  test("returns an empty string for an empty value", () => {
    expect(clean("")).toBe("");
  });
});
