import { createConnection, invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { aemOAuthServerToServer } from "../../connections";
import { getPublishedPageHtmlExamplePayload } from "../../examplePayloads";
import { getPublishedPageHtml } from "./getPublishedPageHtml";

const AEM_HOST = "author-p12345-e123456.adobeaemcloud.com";
const connection = createConnection(
  aemOAuthServerToServer,
  {
    aemHost: AEM_HOST,
    clientId: "test-client-id",
    clientSecret: "test-client-secret",
    scopes: "openid, AdobeID",
    tokenUrl: "https://ims-na1.adobelogin.com/ims/token/v3",
  },
  { access_token: "test-access-token" },
);
const page = getPublishedPageHtmlExamplePayload.data;

describe("getPublishedPageHtml", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());

  test("returns the published HTML and response metadata", async () => {
    nock("https://www.example.com")
      .get("/en/adventures/surf-camp.html")
      .reply(200, page.html, {
        "Content-Type": page.contentType as string,
        "Last-Modified": page.lastModified as string,
        ETag: page.etag as string,
      });
    const { result } = await invoke(getPublishedPageHtml, {
      connection,
      sitemapUrl: "https://www.example.com/sitemap.xml",
      pageUrl: page.url,
    });
    expect(result).toEqual(getPublishedPageHtmlExamplePayload);
  });

  test("refuses a non-https page URL without fetching it", async () => {
    await expect(
      invoke(getPublishedPageHtml, {
        connection,
        sitemapUrl: undefined,
        pageUrl: "http://www.example.com/en/page.html",
      }),
    ).rejects.toThrow("Only https:// URLs may be fetched");
  });

  test("refuses a blocked IP literal without fetching it", async () => {
    await expect(
      invoke(getPublishedPageHtml, {
        connection,
        sitemapUrl: undefined,
        pageUrl: "https://169.254.169.254/latest/meta-data",
      }),
    ).rejects.toThrow(
      "Refusing to fetch a non-public address: 169.254.169.254",
    );
  });

  test("surfaces a missing page", async () => {
    nock("https://www.example.com")
      .get("/en/missing.html")
      .reply(404, "Not Found");
    await expect(
      invoke(getPublishedPageHtml, {
        connection,
        sitemapUrl: undefined,
        pageUrl: "https://www.example.com/en/missing.html",
      }),
    ).rejects.toThrow("Request failed with status code 404");
  });
});

describe("getPublishedPageHtml display", () => {
  test("is labelled by its family and names compatible sources", () => {
    expect(getPublishedPageHtml.display.label).toBe("Get Published Page HTML");
    expect(getPublishedPageHtml.display.description).toContain(
      "List Sitemap URLs",
    );
    expect(getPublishedPageHtml.display.description).toContain(
      "AEM Sites Event Subscription",
    );
  });
});
