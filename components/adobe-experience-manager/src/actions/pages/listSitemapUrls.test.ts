import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { aemOAuthServerToServer } from "../../connections";
import { listSitemapUrlsExamplePayload } from "../../examplePayloads";
import { listSitemapUrls } from "./listSitemapUrls";

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
const [surfCamp, aboutUs] = listSitemapUrlsExamplePayload.data;

const urlEntry = (loc: string, lastmod: string | null) =>
  `<url><loc>${loc}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}</url>`;
const urlset = (...entries: string[]) =>
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries.join("")}</urlset>`;
const sitemapIndex = (...locs: string[]) =>
  `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${locs
    .map((loc) => `<sitemap><loc>${loc}</loc></sitemap>`)
    .join("")}</sitemapindex>`;

const params = {
  connection,
  sitemapUrl: `${SITE}/sitemap.xml`,
  modifiedAfter: undefined as string | undefined,
  includePathPrefixes: [] as string[],
  excludePathPrefixes: [] as string[],
};

describe("listSitemapUrls", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());

  test("follows a sitemap index into same-host children and skips other hosts", async () => {
    nock(SITE)
      .get("/sitemap.xml")
      .reply(
        200,
        sitemapIndex(
          `${SITE}/en/sitemap.xml`,
          "https://cdn.other-host.example/sitemap.xml",
          "http://www.example.com/insecure-sitemap.xml",
        ),
      )
      .get("/en/sitemap.xml")
      .reply(
        200,
        urlset(
          urlEntry(surfCamp.loc, "2026-09-18T09:25:02Z"),
          urlEntry(aboutUs.loc, null),
        ),
      );
    const { result } = await invoke(listSitemapUrls, params);
    expect(result).toEqual(listSitemapUrlsExamplePayload);
    expect(nock.isDone()).toBe(true);
  });

  test("applies the lastmod and path prefix filters", async () => {
    const legal = `${SITE}/en/legal/terms.html`;
    const old = `${SITE}/en/adventures/old.html`;
    nock(SITE)
      .get("/sitemap.xml")
      .times(2)
      .reply(
        200,
        urlset(
          urlEntry(surfCamp.loc, "2026-09-18T09:25:02Z"),
          urlEntry(aboutUs.loc, null),
          urlEntry(legal, "2026-09-20T00:00:00Z"),
          urlEntry(old, "2025-01-01T00:00:00Z"),
        ),
      );
    const modified = await invoke(listSitemapUrls, {
      ...params,
      modifiedAfter: "2026-01-01T00:00:00.000Z",
      excludePathPrefixes: ["/en/legal"],
    });
    expect(modified.result.data).toEqual([surfCamp]);

    const included = await invoke(listSitemapUrls, {
      ...params,
      includePathPrefixes: ["/en/adventures"],
    });
    expect(included.result.data.map((page) => page.loc)).toEqual([
      surfCamp.loc,
      old,
    ]);
  });

  test("surfaces a missing sitemap", async () => {
    nock(SITE).get("/sitemap.xml").reply(404, "Not Found");
    await expect(invoke(listSitemapUrls, params)).rejects.toThrow(
      "Request failed with status code 404",
    );
  });
});
