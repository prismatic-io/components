import { genericRequestInputs } from "./misc";
describe("genericRequest variables clean", () => {
  const clean = genericRequestInputs.variables.clean;
  it("converts a key-value list to an object", () => {
    expect(
      clean([
        { key: "retailerId", value: "34" },
        { key: "ref", value: "ORDER-1" },
      ]),
    ).toEqual({ retailerId: "34", ref: "ORDER-1" });
  });
  it("maps undefined to an empty object", () => {
    expect(clean(undefined)).toEqual({});
  });
});
describe("genericRequest variablesObject clean", () => {
  const clean = genericRequestInputs.variablesObject.clean;
  it("parses a JSON string to an object", () => {
    expect(clean('{"retailerId": 34, "first": 10}')).toEqual({
      retailerId: 34,
      first: 10,
    });
  });
  it("maps an empty value to undefined", () => {
    expect(clean("")).toBeUndefined();
    expect(clean(undefined)).toBeUndefined();
  });
});
