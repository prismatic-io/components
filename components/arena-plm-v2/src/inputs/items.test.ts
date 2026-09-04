import { createItemFromJsonInputs } from "./items";
const clean = createItemFromJsonInputs.itemJson.clean;
describe("createItemFromJsonInputs.itemJson.clean", () => {
  it("parses a valid JSON string into the payload object", () => {
    expect(
      clean('{"name":"Circuit Board Assembly","description":"Main board"}'),
    ).toEqual({
      name: "Circuit Board Assembly",
      description: "Main board",
    });
  });
  it("trims surrounding whitespace before parsing", () => {
    expect(clean('\n  {"name":"Widget"}  \n')).toEqual({ name: "Widget" });
  });
  it("passes an already-parsed object through untouched", () => {
    const payload = { name: "Widget", additionalAttributes: [] };
    expect(clean(payload)).toBe(payload);
  });
  it("maps a blank or absent value to null", () => {
    expect(clean("")).toBeNull();
    expect(clean("   ")).toBeNull();
    expect(clean("\n\t")).toBeNull();
    expect(clean(undefined)).toBeNull();
    expect(clean(null)).toBeNull();
  });
  it("returns the trimmed string rather than throwing on invalid JSON", () => {
    expect(clean("  {not valid json  ")).toBe("{not valid json");
    expect(clean('{"name": }')).toBe('{"name": }');
  });
});
