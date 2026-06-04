import { createAuthorizedClient } from "./client";
import { createConnection } from "@prismatic-io/spectral/dist/testing";
import { sendGridConnection } from "./connections";

describe("createAuthorizedClient", () => {
  test("returns client with valid connection", () => {
    const credential = createConnection(sendGridConnection, {
      apiKey: "SG.foobarbaz",
    });
    expect(createAuthorizedClient(credential)).toBeDefined();
  });

  test("throws error for unknown connection types", () => {
    expect(() =>
      createAuthorizedClient(
        createConnection(
          {
            key: "FakeConnection",
            inputs: {},
            display: {
              label: "Fake Connection",
              description: "A fake connection for testing",
            },
          },
          {},
        ),
      ),
    ).toThrow(/Unsupported connection FakeConnection/);
  });
});
