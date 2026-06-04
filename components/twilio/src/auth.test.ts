import { createAuthorizedClient } from "./client";
import { createConnection } from "@prismatic-io/spectral/dist/testing";
import { twilioApiKeyConnection, twilioBasicConnection } from "./connections";

describe("createAuthorizedClient", () => {
  test("returns client with basic credentials", () => {
    createAuthorizedClient(
      createConnection(twilioBasicConnection, {
        username: process.env.twilioUsername,
        password: process.env.twilioPassword,
      }),
      true,
    );
  });
  test("returns client with api key secret credentials", () => {
    createAuthorizedClient(
      createConnection(twilioApiKeyConnection, {
        apiKey: process.env.twilioApiKey,
        apiSecret: process.env.twilioApiSecret,
        accountSid: process.env.twilioAccountSid,
      }),
      true,
    );
  });

  test("throws error for unsupported authorization methods", () => {
    expect(() =>
      createAuthorizedClient(
        createConnection(
          { key: "", inputs: {}, display: { label: "", description: "" } },
          {},
        ),
        true,
      ),
    ).toThrow(/Unsupported authorization method/);
  });
});
