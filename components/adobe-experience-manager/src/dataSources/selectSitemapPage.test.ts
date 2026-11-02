import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { aemOAuthServerToServer } from "../connections";
import { MAX_DATA_SOURCE_ITEMS } from "../constants";
import {
  listSitemapUrlsExamplePayload,
  selectSitemapPageExamplePayload,
} from "../examplePayloads";
import { selectSitemapPage } from "./selectSitemapPage";

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
const SITE = "https://www.example.com";
const sitemapUrl = `${SITE}/sitemap.xml`;

const urlset = (...locs: string[]) =>
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${locs
    .map((loc) => `<url><loc>${loc}</loc></url>`)
    .join("")}</urlset>`;

describe("selectSitemapPage", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());

  test("returns each page URL in the sitemap, sorted", async () => {
    nock(SITE)
      .get("/sitemap.xml")
      .reply(
        200,
        urlset(...listSitemapUrlsExamplePayload.data.map((page) => page.loc)),
      );
    const result = await invokeDataSource(selectSitemapPage, {
      connection,
      sitemapUrl,
    });
    expect(result).toEqual(selectSitemapPageExamplePayload);
  });

  test("keeps only the first pages up to the item cap", async () => {
    const locs = Array.from(
      { length: MAX_DATA_SOURCE_ITEMS + 5 },
      (_, i) => `${SITE}/page-${String(i).padStart(4, "0")}.html`,
    );
    nock(SITE)
      .get("/sitemap.xml")
      .reply(200, urlset(...locs));
    const { result } = await invokeDataSource(selectSitemapPage, {
      connection,
      sitemapUrl,
    });
    expect(result).toHaveLength(MAX_DATA_SOURCE_ITEMS);
    expect(result).not.toContainEqual(
      expect.objectContaining({ key: locs[MAX_DATA_SOURCE_ITEMS] }),
    );
  });
});
