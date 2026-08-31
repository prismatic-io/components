import { createConnection } from "@prismatic-io/spectral/dist/testing";
import { createAuthorizedClient } from "./client";
import { apiKey, oauth2 } from "./connections";
describe("createAuthorizedClient", () => {
  test("returns client with api key credentials", () => {
    const connection = createConnection(apiKey, {
      apiKey: "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456",
    });
    expect(
      createAuthorizedClient({ boxConnection: connection }),
    ).not.toBeUndefined();
  });
  test("returns client with oauth2 credentials", () => {
    const connection = createConnection(
      oauth2,
      {},
      { access_token: "test-access-token" },
    );
    expect(
      createAuthorizedClient({ boxConnection: connection }),
    ).not.toBeUndefined();
  });
  test("throws when the developer token is empty", () => {
    const connection = createConnection(apiKey, { apiKey: "" });
    expect(() => createAuthorizedClient({ boxConnection: connection })).toThrow(
      /Developer Token is empty/,
    );
  });
  test("throws when the oauth2 connection has no access token", () => {
    const connection = createConnection(oauth2, {});
    expect(() => createAuthorizedClient({ boxConnection: connection })).toThrow(
      /no access token/,
    );
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
