import { createAssetInputs } from "./assets";
import { publishBulkActionInputs } from "./bulk";
import { createContentTypeInputs } from "./contentTypes";
import { patchEntryInputs } from "./entries";
import { createEnvironmentTemplateInputs } from "./environmentTemplates";
import { pollChangesInputs } from "./triggers";
const jsonCodeInputs = [
  ["assets: createAssetInputs.title", createAssetInputs.title.clean],
  ["bulk: publishBulkActionInputs.items", publishBulkActionInputs.items.clean],
  [
    "contentTypes: createContentTypeInputs.fields",
    createContentTypeInputs.fields.clean,
  ],
  [
    "entries: patchEntryInputs.patchOperations",
    patchEntryInputs.patchOperations.clean,
  ],
  [
    "environmentTemplates: createEnvironmentTemplateInputs.contentTypeTemplates",
    createEnvironmentTemplateInputs.contentTypeTemplates.clean,
  ],
] as const;
describe.each(jsonCodeInputs)("%s clean", (_name, clean) => {
  test("parses valid JSON", () => {
    expect(clean('{"en-US":"Hello"}')).toEqual({ "en-US": "Hello" });
  });
  test("returns invalid JSON unchanged (clean functions do not throw)", () => {
    expect(clean("{not json")).toBe("{not json");
  });
});
describe("triggers: pollChangesInputs.lookBackDate clean", () => {
  test("normalizes a valid date", () => {
    expect(pollChangesInputs.lookBackDate.clean("2024-01-01")).toBe(
      "2024-01-01T00:00:00.000Z",
    );
  });
  test("throws on an invalid date", () => {
    expect(() => pollChangesInputs.lookBackDate.clean("2026-02-31")).toThrow(
      /Look-back Date/,
    );
  });
});
