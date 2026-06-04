import { createAuthorizedClient } from "./client";
import { createConnection } from "@prismatic-io/spectral/dist/testing";
import { apiKey, oauth2 } from "./connections";

describe("createAuthorizedClient", () => {
  test("returns client with api key credentials", () => {
    const connection = createConnection(apiKey, { apiKey: "" });
    expect(
      createAuthorizedClient({ boxConnection: connection }),
    ).not.toBeUndefined();
  });

  test("returns client with oauth2 credentials", () => {
    const connection = createConnection(oauth2, {});
    expect(
      createAuthorizedClient({ boxConnection: connection }),
    ).not.toBeUndefined();
  });

  test("throws error for unsupported authorization methods", () => {
    expect(() =>
      createAuthorizedClient({
        boxConnection: createConnection(
          {
            key: "Fake",
            inputs: {},
            display: {
              label: "Fake",
              description: "Fake",
            },
          },
          {},
        ),
      }),
    ).toThrow(/Unsupported connection/);
  });
});
