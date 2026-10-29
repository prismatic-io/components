import type { Connection } from "@prismatic-io/spectral";
import { getAuthHeaders } from "./client";

const buildConnection = (overrides: Partial<Connection>): Connection =>
  ({
    configuration: {},
    fields: {},
    ...overrides,
  }) as unknown as Connection;

describe("getAuthHeaders", () => {
  it("returns a Bearer header for the OAuth client credentials connection", () => {
    const connection = buildConnection({
      key: "serviceNowClientCredentials",
      token: { access_token: "cc-access-token" },
    });

    expect(getAuthHeaders(connection)).toEqual({
      Authorization: "Bearer cc-access-token",
    });
  });

  it("returns a Bearer header for the OAuth authorization code connection", () => {
    const connection = buildConnection({
      key: "authorizationCode",
      token: { access_token: "auth-code-token" },
    });

    expect(getAuthHeaders(connection)).toEqual({
      Authorization: "Bearer auth-code-token",
    });
  });

  it("returns a Basic header for the basic connection", () => {
    const connection = buildConnection({
      key: "basic",
      fields: { username: "admin", password: "secret" },
    });

    const expected = Buffer.from("admin:secret").toString("base64");
    expect(getAuthHeaders(connection)).toEqual({
      Authorization: `Basic ${expected}`,
    });
  });

  it("returns an x-sn-apikey header for the API key connection", () => {
    const connection = buildConnection({
      key: "apiKey",
      fields: { apiKey: "test-api-key" },
    });

    expect(getAuthHeaders(connection)).toEqual({
      "x-sn-apikey": "test-api-key",
    });
  });

  it("throws a ConnectionError for an unknown connection type", () => {
    const connection = buildConnection({
      key: "unknown",
    });

    expect(() => getAuthHeaders(connection)).toThrow(
      "Unknown Connection type provided.",
    );
  });
});
