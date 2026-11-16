import { createConnection, invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { oauth } from "../../connections/oauth";
import {
  getRootSiteExamplePayload,
  getSiteExamplePayload,
  listFollowedSitesExamplePayload,
  listSitesExamplePayload,
} from "../../examplePayloads";
import { getRootSite } from "./getRootSite";
import { getSite } from "./getSite";
import { listFollowedSites } from "./listFollowedSites";
import { listSites } from "./listSites";

const GRAPH = "https://graph.microsoft.com";
const connection = createConnection(
  oauth,
  {},
  { access_token: "eyJ0eXAiOiJKV1QiLCJub25jZSI6InNoYXJlcG9pbnQtdGVzdCJ9" },
);
const SITE_ID =
  "example.sharepoint.com,6c44888f-5883-4ef0-a542-d21a802cfea6,ed2d5d06-e192-4047-afa6-a5d7f25b3418";
const pagination = { pageLimit: 2, pageToken: "X%2744537079ghv" };
const pageQuery = { $top: "2", $skipToken: "X%2744537079ghv" };
const notFound = {
  error: { code: "itemNotFound", message: "The resource could not be found." },
};
const unauthorized = {
  error: { code: "InvalidAuthenticationToken", message: "Access token has expired." },
};

beforeAll(() => {
  nock.disableNetConnect();
});

afterEach(() => {
  nock.cleanAll();
});

afterAll(() => {
  nock.enableNetConnect();
});

describe("listSites", () => {
  test("returns one page of the search for every site", async () => {
    nock(GRAPH)
      .get("/v1.0/sites")
      .query({ search: "", ...pageQuery })
      .reply(200, listSitesExamplePayload.data);

    const { result } = await invoke(listSites, { connection, fetchAll: false, pagination });

    expect(result).toEqual(listSitesExamplePayload);
  });

  test("rejects an expired token", async () => {
    nock(GRAPH)
      .get("/v1.0/sites")
      .query({ search: "", ...pageQuery })
      .reply(401, unauthorized);

    await expect(invoke(listSites, { connection, fetchAll: false, pagination })).rejects.toThrow(
      "Request failed with status code 401",
    );
  });
});

describe("listFollowedSites", () => {
  test("returns one page of the user's followed sites", async () => {
    nock(GRAPH)
      .get("/v1.0/me/followedSites")
      .query(pageQuery)
      .reply(200, listFollowedSitesExamplePayload.data);

    const { result } = await invoke(listFollowedSites, {
      connection,
      fetchAll: false,
      pagination,
    });

    expect(result).toEqual(listFollowedSitesExamplePayload);
  });

  test("rejects an expired token", async () => {
    nock(GRAPH).get("/v1.0/me/followedSites").query(pageQuery).reply(401, unauthorized);

    await expect(
      invoke(listFollowedSites, { connection, fetchAll: false, pagination }),
    ).rejects.toThrow("Request failed with status code 401");
  });
});

describe("getRootSite", () => {
  test("returns the tenant's root site", async () => {
    nock(GRAPH).get("/v1.0/sites/root").reply(200, getRootSiteExamplePayload.data);

    const { result } = await invoke(getRootSite, { connection });

    expect(result).toEqual(getRootSiteExamplePayload);
  });

  test("rejects an expired token", async () => {
    nock(GRAPH).get("/v1.0/sites/root").reply(401, unauthorized);

    await expect(invoke(getRootSite, { connection })).rejects.toThrow(
      "Request failed with status code 401",
    );
  });
});

describe("getSite", () => {
  test("returns the site", async () => {
    nock(GRAPH).get(`/v1.0/sites/${SITE_ID}`).reply(200, getSiteExamplePayload.data);

    const { result } = await invoke(getSite, { connection, siteId: SITE_ID });

    expect(result).toEqual(getSiteExamplePayload);
  });

  test("rejects when the site does not exist", async () => {
    nock(GRAPH).get(`/v1.0/sites/${SITE_ID}`).reply(404, notFound);

    await expect(invoke(getSite, { connection, siteId: SITE_ID })).rejects.toThrow(
      "Request failed with status code 404",
    );
  });
});
