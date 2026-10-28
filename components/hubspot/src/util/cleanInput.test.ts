import { STANDARD_OBJECT_TYPES } from "../constants";
import { toObjectTypeKey } from "./cleanInput";
describe("toObjectTypeKey", () => {
  test.each([
    ["contacts", "0-1"],
    ["contact", "0-1"],
    ["Contacts", "0-1"],
    ["CONTACT", "0-1"],
    [" deal ", "0-3"],
    ["companies", "0-2"],
    ["company", "0-2"],
    ["Line_items", "0-8"],
    ["line_item", "0-8"],
    ["Line Items", "0-8"],
    ["line-item", "0-8"],
    ["Feedback_submissions", "0-19"],
    ["feedback_submission", "0-19"],
  ])("normalizes %p to %p", (value, expected) => {
    expect(toObjectTypeKey(value)).toBe(expected);
  });
  test("maps the plural name, the singular name and the ID of every standard object to its ID", () => {
    for (const { key, name } of STANDARD_OBJECT_TYPES) {
      const singular = name.endsWith("ies")
        ? `${name.slice(0, -3)}y`
        : name.slice(0, -1);
      expect(toObjectTypeKey(name)).toBe(key);
      expect(toObjectTypeKey(singular)).toBe(key);
      expect(toObjectTypeKey(key)).toBe(key);
    }
  });
  test.each([
    "2-116144016",
    "p_equipment",
    "Equipment",
  ])("passes %p through unchanged", (value) => {
    expect(toObjectTypeKey(value)).toBe(value);
  });
});
