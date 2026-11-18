import { ConnectionError } from "@prismatic-io/spectral";
import { createConnection } from "@prismatic-io/spectral/testing";
import { getAuthHeaders } from "./client";
import { msIntuneOAuth2 } from "./connections";

const connectionWith = (accessToken: string) =>
  createConnection(
    msIntuneOAuth2,
    {
      authorizeUrl:
        "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
      tokenUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
      clientId: "test-client-id",
      clientSecret: "test-client-secret",
    },
    { access_token: accessToken },
  );

describe("getAuthHeaders", () => {
  test("returns the bearer header for the connection's access token", () => {
    expect(getAuthHeaders(connectionWith("test-access-token"))).toEqual({
      Authorization: "Bearer test-access-token",
    });
  });

  test("throws a ConnectionError when the access token is empty", () => {
    expect(() => getAuthHeaders(connectionWith(""))).toThrow(ConnectionError);
  });
});
