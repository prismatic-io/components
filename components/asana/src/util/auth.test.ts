import type { Connection } from "@prismatic-io/spectral";
import { getBearerToken, validateConnection } from "./auth";
describe("getBearerToken", () => {
  it("returns bearer token from OAuth access_token", () => {
    const connection = {
      token: { access_token: "oauth-token-123" },
      fields: {},
    } as unknown as Connection;
    expect(getBearerToken(connection)).toBe("Bearer oauth-token-123");
  });
  it("falls back to apiKey field when no access_token", () => {
    const connection = {
      token: undefined,
      fields: { apiKey: "api-key-456" },
    } as unknown as Connection;
    expect(getBearerToken(connection)).toBe("Bearer api-key-456");
  });
  it("prefers access_token over apiKey", () => {
    const connection = {
      token: { access_token: "oauth-token" },
      fields: { apiKey: "api-key" },
    } as unknown as Connection;
    expect(getBearerToken(connection)).toBe("Bearer oauth-token");
  });
});
describe("validateConnection", () => {
  it("throws ConnectionError for unsupported connection key", () => {
    const connection = { key: "unsupported-key" } as unknown as Connection;
    expect(() => validateConnection(connection)).toThrow(
      "Unsupported connection unsupported-key.",
    );
  });
  it("does not throw for a valid connection key", () => {
    const connection = { key: "oauth2" } as unknown as Connection;
    expect(() => validateConnection(connection)).not.toThrow();
  });
});
