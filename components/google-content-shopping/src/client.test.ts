import type { Connection } from "@prismatic-io/spectral";
import { createClientMerchant } from "./client";
import { getClientPropsMerchant } from "./util";
const validConnection: Connection = {
  key: "oauth2",
  configVarKey: "",
  fields: {
    clientId: "test-client-id",
    clientSecret: "test-client-secret",
  },
  token: { access_token: "test-access-token" },
};
describe("getClientProps", () => {
  test("throws when the connection key is not the Google OAuth2 connection", () => {
    const wrongKey: Connection = { ...validConnection, key: "some-other-key" };
    expect(() => getClientPropsMerchant(wrongKey)).toThrow(
      "Unknown Connection type provided.",
    );
  });
  test("throws when the connection has no access token", () => {
    const noToken: Connection = { ...validConnection, token: undefined };
    expect(() => getClientPropsMerchant(noToken)).toThrow(/access token/i);
  });
  test("returns a bearer token and the Merchant API base URL for a valid connection", () => {
    expect(getClientPropsMerchant(validConnection)).toStrictEqual({
      token: "Bearer test-access-token",
      baseUrl: "https://merchantapi.googleapis.com",
    });
  });
});
describe("createClient", () => {
  test("configures an HTTP client pointed at the Merchant API base URL", () => {
    const client = createClientMerchant(validConnection);
    expect(client.defaults.baseURL).toBe("https://merchantapi.googleapis.com");
  });
});
