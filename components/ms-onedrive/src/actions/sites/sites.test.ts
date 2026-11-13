import { createConnection, invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { oauth } from "../../connections";
import { BASE_URL } from "../../constants";
import {
  getSiteExamplePayload,
  listSitesExamplePayload,
} from "../../examplePayloads";
import { getSite } from "./getSite";
import { listSites } from "./listSites";

const connection = createConnection(
  oauth,
  {},
  { access_token: "eyJ0eXAiOiJKV1QiLCJub25jZSI6Im9uZWRyaXZlLXRlc3QifQ" },
);
const SITE_ID =
  "contoso.sharepoint.com,6c44888f-4774-4ef0-b542-d21a795cfea6,80f1bb04-d076-4cb1-9fb7-3f7264e77163";
const pagination = { pageLimit: 2, pageToken: "X%2744537079ghv" };
const pageQuery = { $top: "2", $skiptoken: "X%2744537079ghv" };

beforeAll(() => {
  nock.disableNetConnect();
});

afterEach(() => {
  nock.cleanAll();
});

afterAll(() => {
  nock.enableNetConnect();
});

describe("getSite", () => {
  test("returns the site", async () => {
    nock(BASE_URL)
      .get(`/sites/${SITE_ID}`)
      .reply(200, getSiteExamplePayload.data);

    const { result } = await invoke(getSite, { connection, siteId: SITE_ID });

    expect(result).toEqual(getSiteExamplePayload);
  });

  test("rejects when the site does not exist", async () => {
    nock(BASE_URL)
      .get(`/sites/${SITE_ID}`)
      .reply(404, {
        error: { code: "itemNotFound", message: "Requested site not found" },
      });

    await expect(
      invoke(getSite, { connection, siteId: SITE_ID }),
    ).rejects.toThrow("Status: 404 code: itemNotFound");
  });
});

describe("listSites", () => {
  test("returns one page of sites", async () => {
    nock(BASE_URL)
      .get("/sites")
      .query(pageQuery)
      .reply(200, listSitesExamplePayload.data);

    const { result } = await invoke(listSites, {
      connection,
      fetchAll: false,
      pagination,
    });

    expect(result).toEqual(listSitesExamplePayload);
  });

  test("rejects on an API error", async () => {
    nock(BASE_URL).get("/sites").query(pageQuery).reply(403, {});

    await expect(
      invoke(listSites, { connection, fetchAll: false, pagination }),
    ).rejects.toThrow();
  });
});
