import * as crypto from "node:crypto";
import { signaturesMatch } from ".";
jest.mock("node:crypto", () => {
  const actual = jest.requireActual("node:crypto");
  return { ...actual, timingSafeEqual: jest.fn(actual.timingSafeEqual) };
});
const timingSafeEqualMock = crypto.timingSafeEqual as unknown as jest.Mock;
const SIGNATURE = "cU2s5TgLZkTVpZTJgOWJhOWY0YmQ0ZmM2ZDgwZjFhZjA=";
beforeEach(() => {
  timingSafeEqualMock.mockClear();
});
describe("signaturesMatch", () => {
  test("accepts an identical signature", () => {
    expect(signaturesMatch(SIGNATURE, SIGNATURE)).toBe(true);
  });
  test("rejects a different signature of the same length", () => {
    const tampered = `X${SIGNATURE.slice(1)}`;
    expect(tampered).toHaveLength(SIGNATURE.length);
    expect(signaturesMatch(SIGNATURE, tampered)).toBe(false);
  });
  test.each([
    ["shorter", SIGNATURE.slice(0, 10)],
    ["longer", `${SIGNATURE}extra`],
    ["empty", ""],
  ])("rejects a %s value without throwing", (_label, received) => {
    expect(() => signaturesMatch(SIGNATURE, received)).not.toThrow();
    expect(signaturesMatch(SIGNATURE, received)).toBe(false);
  });
  test.each([
    undefined,
    null,
    42,
    [SIGNATURE],
  ])("fails closed on %p", (received) => {
    expect(signaturesMatch(SIGNATURE, received)).toBe(false);
  });
  test("uses a constant-time comparison rather than string equality", () => {
    expect(signaturesMatch(SIGNATURE, SIGNATURE)).toBe(true);
    expect(timingSafeEqualMock).toHaveBeenCalledTimes(1);
  });
  test("does not reach the comparison at all when the lengths differ", () => {
    expect(signaturesMatch(SIGNATURE, "short")).toBe(false);
    expect(timingSafeEqualMock).not.toHaveBeenCalled();
  });
});
