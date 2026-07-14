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
});
