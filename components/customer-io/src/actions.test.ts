import { createCustomerClient } from "./client";
import { createConnection } from "@prismatic-io/spectral/dist/testing";
import { apiKeyConnection } from "./connections";

describe("createCustomerIOClient", () => {
  test("throws error if invalid credentials provided", () => {
    const cred = createConnection(apiKeyConnection, {
      apiKey: "",
      apiSecret: "",
    });
    const client = createCustomerClient(cred, "US");

    expect(client.siteid == "siteID");
  });
});
