import { normalizeLineBreaks } from "./misc";
describe("normalizeLineBreaks", () => {
  test("converts literal backslash-n sequences into real newlines", () => {
    expect(
      normalizeLineBreaks("-----BEGIN CERTIFICATE-----\\nMIIB\\n-----END-----"),
    ).toBe("-----BEGIN CERTIFICATE-----\nMIIB\n-----END-----");
  });
  test("leaves a string with no literal escape sequences unchanged", () => {
    expect(normalizeLineBreaks("already\nreal")).toBe("already\nreal");
  });
  test("coerces a non-string through util.types.toString first", () => {
    expect(normalizeLineBreaks(null)).toBe("");
    expect(normalizeLineBreaks(undefined)).toBe("");
  });
});
