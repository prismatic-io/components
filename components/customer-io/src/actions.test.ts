import { ConnectionError } from "@prismatic-io/spectral";
import { createConnection } from "@prismatic-io/spectral/dist/testing";
import { createCustomerClient } from "./client";
import { apiKeyConnection } from "./connections";
describe("createCustomerClient", () => {
  const validConnection = createConnection(apiKeyConnection, {
    apiKey: "test-api-key",
    siteId: "test-site-id",
  });
  test("exposes siteid/apikey consumed by the Raw Request Basic auth header", () => {
    const client = createCustomerClient(validConnection, "US");
    expect(client.siteid).toBe("test-site-id");
    expect(client.apikey).toBe("test-api-key");
  });
  test("throws for an unsupported region", () => {
    expect(() => createCustomerClient(validConnection, "INVALID")).toThrow(
      /Unsupported region/,
    );
  });
  test("throws for an unsupported connection type", () => {
    const wrongConnection = { ...validConnection, key: "oauth2" };
    expect(() => createCustomerClient(wrongConnection, "US")).toThrow(
      ConnectionError,
    );
  });
});
