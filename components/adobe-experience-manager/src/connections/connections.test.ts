import { OAuth2Type } from "@prismatic-io/spectral";
import { createConnection } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { createAemClient } from "../client";
import connections, { aemOAuthServerToServer, aemOAuthWebApp } from ".";

const AEM_HOST = "author-p12345-e123456.adobeaemcloud.com";

describe("connections", () => {
  test("offers Server-to-Server and Web App connections", () => {
    expect(connections.map((c) => c.key)).toEqual(["aemOAuthServerToServer", "aemOAuthWebApp"]);
    expect(aemOAuthServerToServer.oauth2Type).toBe(OAuth2Type.ClientCredentials);
    expect(aemOAuthWebApp.oauth2Type).toBe(OAuth2Type.AuthorizationCode);
  });

  test("the Web App connection asks for the AEM host and the authorization-code inputs", () => {
    const inputs = aemOAuthWebApp.inputs;
    expect(Object.keys(inputs).sort()).toEqual(
      ["aemHost", "authorizeUrl", "clientId", "clientSecret", "scopes", "tokenUrl"].sort(),
    );
    expect(inputs.authorizeUrl.default).toBe("https://ims-na1.adobelogin.com/ims/authorize/v2");
    expect(inputs.tokenUrl.default).toBe("https://ims-na1.adobelogin.com/ims/token/v3");
    expect(String(inputs.scopes.default).split(",")).toEqual([
      "openid",
      "AdobeID",
      "aem.assets.author",
      "aem.folders",
    ]);
  });
});

describe("a Web App connection", () => {
  beforeAll(() => nock.disableNetConnect());
  afterAll(() => nock.enableNetConnect());

  test("sends the user's token and the client ID to the AEM host", async () => {
    const connection = createConnection(
      aemOAuthWebApp,
      {
        aemHost: AEM_HOST,
        authorizeUrl: "https://ims-na1.adobelogin.com/ims/authorize/v2",
        tokenUrl: "https://ims-na1.adobelogin.com/ims/token/v3",
        scopes: "openid,AdobeID",
        clientId: "web-app-client-id",
        clientSecret: "web-app-secret",
      },
      { access_token: "user-access-token" },
    );
    nock(`https://${AEM_HOST}`, {
      reqheaders: { authorization: "Bearer user-access-token", "x-api-key": "web-app-client-id" },
    })
      .get("/adobe/sites/cf/models")
      .reply(200, { items: [] });
    const { data } = await createAemClient(connection).get("/adobe/sites/cf/models");
    expect(data).toEqual({ items: [] });
  });
});
