import type { Connection } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "./auth";
import { oauthConnection } from "./connections";


const parsedConnection = JSON.parse(process.env.PRISMATIC_CONNECTION_VALUE);

describe("createAuthorizedClient", () => {
  test("returns client with oauth2 credentials", () => {
    const myConnection: Connection = {
      configVarKey: "test",
      key: oauthConnection.key,
      fields: {},
      token: {
        access_token: parsedConnection.token.access_token,
      },
    };
    expect(createAuthorizedClient(myConnection)).not.toBeUndefined();
  });
});
