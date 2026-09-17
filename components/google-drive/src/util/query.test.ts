import { escapeDriveQueryValue } from "./query";
const QUOTE = String.fromCharCode(39);
const BACKSLASH = String.fromCharCode(92);
describe("escapeDriveQueryValue", () => {
  test("leaves an ordinary value untouched", () => {
    expect(escapeDriveQueryValue("quarterly report")).toBe("quarterly report");
  });
  test("escapes a single quote so it cannot close the literal", () => {
    const value = `quinn${QUOTE}s paper`;
    expect(escapeDriveQueryValue(value)).toBe(
      `quinn${BACKSLASH}${QUOTE}s paper`,
    );
  });
  test("escapes a backslash before the quote it would otherwise consume", () => {
    const value = `a${BACKSLASH}b`;
    expect(escapeDriveQueryValue(value)).toBe(`a${BACKSLASH}${BACKSLASH}b`);
  });
  test("escapes backslash first, so a trailing backslash cannot swallow the closing quote", () => {
    const value = `report${BACKSLASH}`;
    const escaped = escapeDriveQueryValue(value);
    expect(escaped).toBe(`report${BACKSLASH}${BACKSLASH}`);
    expect(escaped.endsWith(`${BACKSLASH}${BACKSLASH}`)).toBe(true);
  });
  test("neutralizes an attempt to break out of the literal", () => {
    const hostile = `${QUOTE} or name contains ${QUOTE}`;
    const escaped = escapeDriveQueryValue(hostile);
    expect(escaped).toBe(
      `${BACKSLASH}${QUOTE} or name contains ${BACKSLASH}${QUOTE}`,
    );
    expect(escaped.includes(`${BACKSLASH}${QUOTE}`)).toBe(true);
    expect(escaped.split(QUOTE).length - 1).toBe(2);
  });
});
