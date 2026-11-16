import { createConnection, invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { oauth } from "../../connections/oauth";
import {
  createItemInSiteExamplePayload,
  getItemInSiteExamplePayload,
  getListExamplePayload,
  getListItemsInSiteExamplePayload,
  listSiteListsExamplePayload,
} from "../../examplePayloads";
import { createItemInSite } from "./createItemInSite";
import { getItemInSite } from "./getItemInSite";
import { getList } from "./getList";
import { getListItemsInSite } from "./getListItemsInSite";
import { listSiteLists } from "./listSiteLists";

const GRAPH = "https://graph.microsoft.com";
const connection = createConnection(
  oauth,
  {},
  { access_token: "eyJ0eXAiOiJKV1QiLCJub25jZSI6InNoYXJlcG9pbnQtdGVzdCJ9" },
);
const SITE_ID =
  "example.sharepoint.com,6c44888f-5883-4ef0-a542-d21a802cfea6,ed2d5d06-e192-4047-afa6-a5d7f25b3418";
const LIST_ID = "3a3c0f6a-86da-4567-94d4-3b939da63200";
const ITEM_ID = "3";
const notFound = {
  error: { code: "itemNotFound", message: "The resource could not be found." },
};
const badRequest = {
  error: { code: "invalidRequest", message: "Field 'Unknown' is not recognized." },
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

describe("listSiteLists", () => {
  test("returns the site's lists", async () => {
    nock(GRAPH).get(`/v1.0/sites/${SITE_ID}/lists`).reply(200, listSiteListsExamplePayload.data);

    const { result } = await invoke(listSiteLists, {
      connection,
      siteId: SITE_ID,
      fetchAll: false,
    });

    expect(result).toEqual(listSiteListsExamplePayload);
  });

  test("rejects when the site does not exist", async () => {
    nock(GRAPH).get(`/v1.0/sites/${SITE_ID}/lists`).reply(404, notFound);

    await expect(
      invoke(listSiteLists, { connection, siteId: SITE_ID, fetchAll: false }),
    ).rejects.toThrow("Request failed with status code 404");
  });
});

describe("getList", () => {
  test("returns the list", async () => {
    nock(GRAPH)
      .get(`/v1.0/sites/${SITE_ID}/lists/${LIST_ID}`)
      .reply(200, getListExamplePayload.data);

    const { result } = await invoke(getList, { connection, siteId: SITE_ID, listId: LIST_ID });

    expect(result).toEqual(getListExamplePayload);
  });

  test("rejects when the list does not exist", async () => {
    nock(GRAPH).get(`/v1.0/sites/${SITE_ID}/lists/${LIST_ID}`).reply(404, notFound);

    await expect(invoke(getList, { connection, siteId: SITE_ID, listId: LIST_ID })).rejects.toThrow(
      "Request failed with status code 404",
    );
  });
});

describe("getListItemsInSite", () => {
  const itemsUrl = `/v1.0/sites/${SITE_ID}/lists/${LIST_ID}/items`;

  test("sends the page size, page token and selected fields", async () => {
    nock(GRAPH)
      .get(itemsUrl)
      .query({ $top: "2", $skipToken: "UGFnZWQ9VFJVRSZwX0lEPTI", $select: "id,fields" })
      .reply(200, getListItemsInSiteExamplePayload.data);

    const { result } = await invoke(getListItemsInSite, {
      connection,
      siteId: SITE_ID,
      listId: LIST_ID,
      pagination: { pageLimit: 2, pageToken: "UGFnZWQ9VFJVRSZwX0lEPTI" },
      optInFields: "id,fields",
    });

    expect(result).toEqual(getListItemsInSiteExamplePayload);
  });

  test("sends the selected fields when no page size or token is set", async () => {
    const scope = nock(GRAPH)
      .get(itemsUrl)
      .query({ $select: "id,fields" })
      .reply(200, getListItemsInSiteExamplePayload.data);

    await invoke(getListItemsInSite, {
      connection,
      siteId: SITE_ID,
      listId: LIST_ID,
      pagination: { pageLimit: 0, pageToken: undefined },
      optInFields: "id,fields",
    });

    expect(scope.isDone()).toBe(true);
  });

  test("sends no query parameters when every optional input is blank", async () => {
    const scope = nock(GRAPH)
      .get(itemsUrl)
      .query((query) => Object.keys(query).length === 0)
      .reply(200, getListItemsInSiteExamplePayload.data);

    await invoke(getListItemsInSite, {
      connection,
      siteId: SITE_ID,
      listId: LIST_ID,
      pagination: { pageLimit: 0, pageToken: undefined },
      optInFields: undefined,
    });

    expect(scope.isDone()).toBe(true);
  });

  test("rejects when the list does not exist", async () => {
    nock(GRAPH).get(itemsUrl).query(true).reply(404, notFound);

    await expect(
      invoke(getListItemsInSite, {
        connection,
        siteId: SITE_ID,
        listId: LIST_ID,
        pagination: { pageLimit: 2, pageToken: undefined },
        optInFields: undefined,
      }),
    ).rejects.toThrow("Request failed with status code 404");
  });
});

describe("getItemInSite", () => {
  const itemUrl = `/v1.0/sites/${SITE_ID}/lists/${LIST_ID}/items/${ITEM_ID}`;

  test("returns the item with the selected fields", async () => {
    nock(GRAPH)
      .get(itemUrl)
      .query({ $select: "id,fields" })
      .reply(200, getItemInSiteExamplePayload.data);

    const { result } = await invoke(getItemInSite, {
      connection,
      siteId: SITE_ID,
      listId: LIST_ID,
      itemId: ITEM_ID,
      optInFields: "id,fields",
    });

    expect(result).toEqual(getItemInSiteExamplePayload);
  });

  test("rejects when the item does not exist", async () => {
    nock(GRAPH).get(itemUrl).reply(404, notFound);

    await expect(
      invoke(getItemInSite, {
        connection,
        siteId: SITE_ID,
        listId: LIST_ID,
        itemId: ITEM_ID,
        optInFields: undefined,
      }),
    ).rejects.toThrow("Request failed with status code 404");
  });
});

describe("createItemInSite", () => {
  const fields = { Title: "Prepare presentation", Status: "Not Started" };

  test("posts the fields and returns the new item", async () => {
    const scope = nock(GRAPH)
      .post(`/v1.0/sites/${SITE_ID}/lists/${LIST_ID}/items`, { fields })
      .reply(201, createItemInSiteExamplePayload.data);

    const { result } = await invoke(createItemInSite, {
      connection,
      siteId: SITE_ID,
      listId: LIST_ID,
      fields,
    });

    expect(scope.isDone()).toBe(true);
    expect(result).toEqual(createItemInSiteExamplePayload);
  });

  test("rejects a field the list does not define", async () => {
    nock(GRAPH).post(`/v1.0/sites/${SITE_ID}/lists/${LIST_ID}/items`).reply(400, badRequest);

    await expect(
      invoke(createItemInSite, { connection, siteId: SITE_ID, listId: LIST_ID, fields }),
    ).rejects.toThrow("Request failed with status code 400");
  });
});
