import { createConnection } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { createAemClient } from "../client";
import { aemOAuthServerToServer } from "../connections";
import { MAX_FETCH_ALL_PAGES } from "../constants";
import { fetchCursorPages } from "./pagination";

const AEM_HOST = "author-p12345-e123456.adobeaemcloud.com";
const BASE = `https://${AEM_HOST}`;
const URL = "/adobe/sites/cf/fragments";
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
const client = createAemClient(connection, false);

describe("fetchCursorPages", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());

  test("with Fetch All, drains the cursor and returns no cursor", async () => {
    nock(BASE)
      .get(URL)
      .query({ limit: 50 })
      .reply(200, { items: [{ id: "a" }], cursor: "page-2" })
      .get(URL)
      .query({ limit: 50, cursor: "page-2" })
      .reply(200, { items: [{ id: "b" }] });
    const page = await fetchCursorPages(client, URL, {}, { fetchAll: true });
    expect(page).toEqual({
      items: [{ id: "a" }, { id: "b" }],
      cursor: undefined,
    });
    expect(nock.isDone()).toBe(true);
  });

  test("with Fetch All, stops at the page cap and returns the cursor to continue from", async () => {
    nock(BASE)
      .get(URL)
      .query(true)
      .times(MAX_FETCH_ALL_PAGES)
      .reply(200, { items: [{ id: "a" }], cursor: "next-page" });
    const page = await fetchCursorPages(client, URL, {}, { fetchAll: true });
    expect(page.items).toHaveLength(MAX_FETCH_ALL_PAGES);
    expect(page.cursor).toBe("next-page");
    expect(nock.isDone()).toBe(true);
  });
});
