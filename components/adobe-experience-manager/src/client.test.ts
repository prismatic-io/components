import { createConnection } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { createAemClient, createIoEventsClient, getAemHost, isIoEventsConnection } from "./client";
import { aemOAuthServerToServer, aemOAuthWebApp } from "./connections";
import { MAX_RETRIES } from "./constants";
import { getAssetMetadataExamplePayload } from "./examplePayloads";

const AEM_HOST = "author-p12345-e123456.adobeaemcloud.com";
const BASE = `https://${AEM_HOST}`;

const connectionWithHost = (aemHost: string) =>
  createConnection(
    aemOAuthServerToServer,
    {
      aemHost,
      clientId: "test-client-id",
      clientSecret: "test-client-secret",
      scopes: "openid, AdobeID",
      tokenUrl: "https://ims-na1.adobelogin.com/ims/token/v3",
    },
    { access_token: "test-access-token" },
  );

const connection = connectionWithHost(AEM_HOST);

beforeAll(() => nock.disableNetConnect());
afterEach(() => nock.cleanAll());
afterAll(() => nock.enableNetConnect());

describe("getAemHost", () => {
  test("strips the scheme, path, trailing slash and case", () => {
    expect(getAemHost(connectionWithHost(` HTTPS://${AEM_HOST.toUpperCase()}/ui#/aem `))).toBe(
      AEM_HOST,
    );
    expect(getAemHost(connectionWithHost(`${AEM_HOST}/`))).toBe(AEM_HOST);
    expect(getAemHost(connectionWithHost(`${AEM_HOST}.`))).toBe(AEM_HOST);
  });

  test("rejects a host that is not an AEM as a Cloud Service host", () => {
    expect(() => getAemHost(connectionWithHost("www.example.com"))).toThrow(
      'AEM Author Host must be an AEM as a Cloud Service host ending in .adobeaemcloud.com, such as author-p12345-e123456.adobeaemcloud.com. Received: "www.example.com"',
    );
    expect(() => getAemHost(connectionWithHost("adobeaemcloud.com.evil.example"))).toThrow(
      "AEM Author Host must be an AEM as a Cloud Service host",
    );
  });

  test.each([
    "evil.com?.adobeaemcloud.com",
    "evil.com#.adobeaemcloud.com",
    "evil.com/.adobeaemcloud.com",
    "evil.com\\.adobeaemcloud.com",
    `user:pass@${AEM_HOST}`,
    `${AEM_HOST}:8443`,
    "adobeaemcloud.com",
    "",
  ])("rejects the suffix-bypass form %j", (aemHost) => {
    expect(() => getAemHost(connectionWithHost(aemHost))).toThrow(
      "AEM Author Host must be an AEM as a Cloud Service host",
    );
  });
});

describe("createAemClient", () => {
  test("sends the Bearer token and the X-Api-Key header", async () => {
    nock(BASE, {
      reqheaders: {
        authorization: "Bearer test-access-token",
        "x-api-key": "test-client-id",
      },
    })
      .get("/adobe/assets/a1/metadata")
      .reply(200, getAssetMetadataExamplePayload.data);
    const { data } = await createAemClient(connection).get("/adobe/assets/a1/metadata");
    expect(data).toEqual(getAssetMetadataExamplePayload.data);
    expect(nock.isDone()).toBe(true);
  });

  test("rejects a connection of another type", () => {
    expect(() => createAemClient({ ...connection, key: "otherConnection" })).toThrow(
      "Unexpected connection type: otherConnection",
    );
  });

  test("tells a Web App connection that a missing-scopes 403 needs the Client Credentials connection", async () => {
    const webApp = createConnection(
      aemOAuthWebApp,
      {
        aemHost: AEM_HOST,
        authorizeUrl: "https://ims-na1.adobelogin.com/ims/authorize/v2",
        tokenUrl: "https://ims-na1.adobelogin.com/ims/token/v3",
        scopes: "openid,AdobeID,aem.assets.author,aem.folders",
        clientId: "web-app-client-id",
        clientSecret: "web-app-secret",
      },
      { access_token: "user-access-token" },
    );
    nock(BASE)
      .get("/adobe/sites/cf/fragments")
      .reply(403, { title: "Forbidden", detail: "The access token is missing required scopes." });
    const error = await createAemClient(webApp)
      .get("/adobe/sites/cf/fragments")
      .catch((e: Error) => e);
    expect((error as Error).message).toMatch(
      /^This request needs a scope the OAuth Web App credential is not granted, so use the OAuth 2\.0 Client Credentials connection for it: content fragment actions and the New and Updated Fragments trigger need it\. Adobe: The access token is missing required scopes\. Request failed with status code 403$/,
    );
  });

  test("replaces an HTML error page body with a short note and says what it usually means", async () => {
    nock(BASE)
      .get("/adobe/assets/jobs/missing/status")
      .reply(
        500,
        '<!DOCTYPE html>\n<html lang="en"><head><title>Error</title></head><body>Oops</body></html>',
        {
          "Content-Type": "text/html",
        },
      );
    const error = (await createAemClient(connection)
      .get("/adobe/assets/jobs/missing/status")
      .catch((e: unknown) => e)) as { message: string; response?: { data?: unknown } };
    expect(error.message).toMatch(
      /^Request failed with status code 500\. Adobe returned an HTML error page instead of a JSON problem, which it does for a job or asset ID it does not know\.$/,
    );
    expect(error.response?.data).toBe("(HTML error page omitted)");
  });

  test("says the environment is unavailable for an HTML 503, not that an ID is unknown", async () => {
    nock(BASE)
      .get("/adobe/sites/cf/fragments")
      .times(MAX_RETRIES + 1)
      .reply(503, '<!DOCTYPE html>\n<html lang="en"><head></head><body></body></html>', {
        "Content-Type": "text/html",
        "Retry-After": "0",
      });
    const error = (await createAemClient(connection)
      .get("/adobe/sites/cf/fragments")
      .catch((e: unknown) => e)) as { message: string; response?: { data?: unknown } };
    expect(error.message).toMatch(
      /^Request failed with status code 503\. The Adobe Experience Manager environment is unavailable\. A sandbox environment answers this way for several minutes while it de-hibernates or restarts: check its status in Cloud Manager and retry\.$/,
    );
    expect(error.response?.data).toBe("(HTML error page omitted)");
    expect(nock.isDone()).toBe(true);
  }, 15_000);

  test("rejects a successful HTML page instead of returning it as data", async () => {
    nock(BASE)
      .post("/adobe/assets/search")
      .reply(
        200,
        '<!DOCTYPE html>\n<html lang="en"><head><title>AEM Cloud Service</title></head></html>',
        { "Content-Type": "text/html" },
      );
    await expect(createAemClient(connection).post("/adobe/assets/search", {})).rejects.toThrow(
      /^Adobe Experience Manager returned an HTML page instead of a JSON response/,
    );
  });

  test("prefixes a gateway 403 with the API subscription hint", async () => {
    nock(BASE)
      .get("/adobe/sites/cf/fragments")
      .reply(403, { error_code: "403003", message: "Api Key is invalid" });
    await expect(createAemClient(connection).get("/adobe/sites/cf/fragments")).rejects.toThrow(
      /^Adobe's API gateway rejected the connection's Client ID for this endpoint/,
    );
  });

  test("keeps Adobe's detail after the api.yaml setup hint", async () => {
    nock(BASE)
      .get("/adobe/sites/cf/fragments")
      .reply(403, { title: "Forbidden", detail: "IMS Client ID not allowlisted." });
    await expect(createAemClient(connection).get("/adobe/sites/cf/fragments")).rejects.toThrow(
      /config\/api\.yaml.* Adobe: IMS Client ID not allowlisted\. Request failed with status code 403$/,
    );
  });

  test("prefixes a 403 error with the api.yaml setup hint", async () => {
    nock(BASE).get("/adobe/sites/cf/fragments").reply(403, { title: "Forbidden" });
    await expect(createAemClient(connection).get("/adobe/sites/cf/fragments")).rejects.toThrow(
      /^AEM returned 403 Forbidden\. Confirm the connection's Client ID is listed under allowedClientIDs\.author in the environment's config\/api\.yaml.* Request failed with status code 403$/,
    );
  });

  test("names the signed-in user's permissions, not a product profile, for a Web App connection", async () => {
    const webApp = createConnection(
      aemOAuthWebApp,
      {
        aemHost: "author-p12345-e123456.adobeaemcloud.com",
        authorizeUrl: "https://ims-na1.adobelogin.com/ims/authorize/v2",
        tokenUrl: "https://ims-na1.adobelogin.com/ims/token/v3",
        scopes: "openid,AdobeID",
        clientId: "web-app-client-id",
        clientSecret: "web-app-secret",
      },
      { access_token: "user-access-token" },
    );
    nock(BASE).get("/adobe/sites/cf/fragments").reply(403, { title: "Forbidden" });
    const error = await createAemClient(webApp)
      .get("/adobe/sites/cf/fragments")
      .catch((e: Error) => e);
    expect((error as Error).message).toContain("allowedClientIDs.author");
    expect((error as Error).message).toContain("signed-in Adobe user");
    expect((error as Error).message).not.toContain("product profile");
  });

  test("does not add the setup hint to other errors", async () => {
    nock(BASE).get("/adobe/sites/cf/fragments").reply(404, { title: "Not Found" });
    await expect(createAemClient(connection).get("/adobe/sites/cf/fragments")).rejects.toThrow(
      /^Request failed with status code 404$/,
    );
  });

  test("retries a 429 and returns the later success", async () => {
    nock(BASE)
      .get("/adobe/assets/a1/metadata")
      .reply(429, { title: "Too Many Requests" }, { "Retry-After": "0" })
      .get("/adobe/assets/a1/metadata")
      .reply(200, getAssetMetadataExamplePayload.data);
    const { data, status } = await createAemClient(connection).get("/adobe/assets/a1/metadata");
    expect(status).toBe(200);
    expect(data).toEqual(getAssetMetadataExamplePayload.data);
    expect(nock.isDone()).toBe(true);
  });
});

describe("createIoEventsClient", () => {
  test("targets the Adobe I/O Events API with the same auth headers", async () => {
    nock("https://api.adobe.io", {
      reqheaders: {
        authorization: "Bearer test-access-token",
        "x-api-key": "test-client-id",
      },
    })
      .get("/events/org/project/workspace/registrations")
      .reply(200, { _embedded: { registrations: [] } });
    const { data } = await createIoEventsClient(connection).get(
      "/org/project/workspace/registrations",
    );
    expect(data).toEqual({ _embedded: { registrations: [] } });
  });

  test("refuses a Web App connection, which Adobe does not document for event registrations", () => {
    const webApp = createConnection(
      aemOAuthWebApp,
      {
        aemHost: "author-p12345-e123456.adobeaemcloud.com",
        authorizeUrl: "https://ims-na1.adobelogin.com/ims/authorize/v2",
        tokenUrl: "https://ims-na1.adobelogin.com/ims/token/v3",
        scopes: "openid,AdobeID",
        clientId: "web-app-client-id",
        clientSecret: "web-app-secret",
      },
      { access_token: "user-access-token" },
    );
    expect(isIoEventsConnection(webApp)).toBe(false);
    expect(isIoEventsConnection(connection)).toBe(true);
    expect(() => createIoEventsClient(webApp)).toThrow(
      "Adobe I/O Events registrations require the OAuth 2.0 Client Credentials connection.",
    );
  });
});
