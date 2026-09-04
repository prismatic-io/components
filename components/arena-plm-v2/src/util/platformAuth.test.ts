import { createHmac } from "node:crypto";
import {
  generatePlatformAuthHeader,
  PLATFORM_AUTH_HEADER,
} from "./platformAuth";
const KEY = "ab16aa730137f9489b3276965c0826d3150a7f00cebee6a2cd4e01e6ca286ea2";
describe("generatePlatformAuthHeader", () => {
  it("emits four pipe-delimited segments", () => {
    expect(generatePlatformAuthHeader().split("|")).toHaveLength(4);
  });
  it("signs the first three segments with HMAC-SHA256, base64 encoded", () => {
    const [platform, timestamp, nonce, signature] =
      generatePlatformAuthHeader().split("|");
    const expected = createHmac("sha256", KEY)
      .update(`${platform}|${timestamp}|${nonce}`)
      .digest("base64");
    expect(signature).toBe(expected);
  });
  it("timestamps the value in epoch milliseconds", () => {
    const timestamp = Number(generatePlatformAuthHeader().split("|")[1]);
    expect(Number.isInteger(timestamp)).toBe(true);
    expect(Math.abs(Date.now() - timestamp)).toBeLessThan(5000);
  });
  it("uses a 16-byte hex nonce", () => {
    expect(generatePlatformAuthHeader().split("|")[2]).toMatch(
      /^[0-9a-f]{32}$/,
    );
  });
  it("produces a distinct value per call", () => {
    expect(generatePlatformAuthHeader()).not.toBe(generatePlatformAuthHeader());
  });
  it("names the header Arena's connector source used", () => {
    expect(PLATFORM_AUTH_HEADER).toBe("X-PLATFORM-AUTH");
  });
});
