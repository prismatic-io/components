import {
  keyValueListToRecord,
  toKeyValueListArray,
  toOptionalObject,
} from "./cleanHelpers";
describe("toOptionalObject", () => {
  it("parses a JSON string into an object", () => {
    expect(toOptionalObject('{"guid":"ABC","value":"ASM"}')).toEqual({
      guid: "ABC",
      value: "ASM",
    });
  });
  it("passes an object through untouched", () => {
    const value = { guid: "ABC" };
    expect(toOptionalObject(value)).toEqual(value);
  });
  it("maps blank and nullish values to undefined so the field is omitted", () => {
    expect(toOptionalObject("")).toBeUndefined();
    expect(toOptionalObject(undefined)).toBeUndefined();
    expect(toOptionalObject(null)).toBeUndefined();
  });
  it("does not in fact guarantee an object", () => {
    expect(toOptionalObject("not json at all")).toBe("not json at all");
    expect(toOptionalObject("42")).toBe(42);
  });
});
describe("toKeyValueListArray", () => {
  it("keeps a keyvaluelist as the raw pair array its consumers iterate", () => {
    const pairs = [
      { key: "5FD66FD77FD88FD99FD00FD1", value: "ASM" },
      { key: "6FD77FD88FD99FD00FD11FD2", value: "001" },
    ];
    expect(toKeyValueListArray(pairs)).toBe(pairs);
  });
  it("keeps an empty list rather than collapsing it to undefined", () => {
    const empty: unknown[] = [];
    expect(toKeyValueListArray(empty)).toBe(empty);
  });
  it("maps anything that is not a list to undefined", () => {
    expect(toKeyValueListArray("ASM")).toBeUndefined();
    expect(toKeyValueListArray({ key: "a", value: "b" })).toBeUndefined();
    expect(toKeyValueListArray(undefined)).toBeUndefined();
    expect(toKeyValueListArray(null)).toBeUndefined();
  });
});
describe("keyValueListToRecord", () => {
  it("collapses the pairs into a record of strings", () => {
    expect(
      keyValueListToRecord([
        { key: "X-Correlation-Id", value: "corr-123" },
        { key: "Accept-Language", value: "en-US" },
      ]),
    ).toEqual({
      "X-Correlation-Id": "corr-123",
      "Accept-Language": "en-US",
    });
  });
  it("trims keys and drops rows whose key is blank", () => {
    expect(
      keyValueListToRecord([
        { key: "  limit  ", value: "50" },
        { key: "   ", value: "orphaned" },
        { key: "", value: "orphaned" },
      ]),
    ).toEqual({ limit: "50" });
  });
  it("keeps a row whose value is unset, as an empty string", () => {
    expect(
      keyValueListToRecord([{ key: "X-Trace", value: undefined }]),
    ).toEqual({
      "X-Trace": "",
    });
  });
  it("skips entries that are not objects", () => {
    expect(
      keyValueListToRecord([null, "limit=50", { key: "limit", value: "50" }]),
    ).toEqual({ limit: "50" });
  });
  it("answers an empty record for anything that is not a list", () => {
    expect(keyValueListToRecord(undefined)).toEqual({});
    expect(keyValueListToRecord("limit=50")).toEqual({});
    expect(keyValueListToRecord({ limit: "50" })).toEqual({});
  });
});
