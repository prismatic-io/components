import { describe, expect, it } from "vitest";
import { getAuthorizationHeader } from "./auth";
import type { Connection } from "@prismatic-io/spectral";
describe("getAuthorizationHeader", () => {
  it("returns Klaviyo-API-Key header for API key connection", () => {
    const connection = {
      key: "klaviyoApiKeyConnection",
      fields: { apiKey: "pk_abc123" },
    } as unknown as Connection;
    const result = getAuthorizationHeader(connection);
    expect(result).toEqual({
      Authorization: "Klaviyo-API-Key pk_abc123",
    });
  });
  it("returns Bearer header for OAuth2 connection", () => {
    const connection = {
      key: "klaviyoOAuth2Connection",
      token: { access_token: "tok_xyz789" },
    } as unknown as Connection;
    const result = getAuthorizationHeader(connection);
    expect(result).toEqual({
      Authorization: "Bearer tok_xyz789",
    });
  });
  it("returns empty Authorization for unknown connection key", () => {
    const connection = {
      key: "unknownConnection",
      fields: {},
    } as unknown as Connection;
    const result = getAuthorizationHeader(connection);
    expect(result).toEqual({ Authorization: "" });
  });
});
