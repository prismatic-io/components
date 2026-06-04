import type { Connection } from "@prismatic-io/spectral";
import { getAdobeSignClient } from "./client";

const connection: Connection = {
  key: "oauth",
  configVarKey: "",
  fields: {},
  token: {
    access_token: "test-token",
    api_access_point: "https://httpbin.io/",
  },
};

describe("getAdobeSignClient retry behavior", () => {
  test("retries HTTP 429 three times before surfacing the error", async () => {
    const client = getAdobeSignClient(connection);

    let attempts = 0;
    client.interceptors.request.use((req) => {
      attempts += 1;
      return req;
    });

    await expect(
      client.get("https://httpbin.io/status/429"),
    ).rejects.toMatchObject({
      response: { status: 429 },
    });

    expect(attempts).toBe(4);
  }, 30000);
});
