import { createConnection, invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { downloadAsset } from "../actions/assets/downloadAsset";
import { searchAssets } from "../actions/assets/searchAssets";
import { listContentFragmentModels } from "../actions/contentFragments/listContentFragmentModels";
import { listFolderContents } from "../actions/folders/listFolderContents";
import { rawRequest } from "../actions/misc/rawRequest";
import { createAemClient, createAemDownloadClient } from "../client";
import { contentFragmentChanges } from "../triggers/contentFragmentChanges";
import type { PollingState } from "../types";
import { aemOAuthServerToServer, aemOAuthWebApp } from ".";

const AEM_HOST = "author-p12345-e123456.adobeaemcloud.com";
const BASE = `https://${AEM_HOST}`;
const IMS = "https://ims-na1.adobelogin.com/ims";

const serverToServer = createConnection(
  aemOAuthServerToServer,
  {
    aemHost: AEM_HOST,
    clientId: "s2s-client-id",
    clientSecret: "s2s-secret",
    scopes: "openid, AdobeID",
    tokenUrl: `${IMS}/token/v3`,
  },
  { access_token: "s2s-access-token" },
);

const webApp = createConnection(
  aemOAuthWebApp,
  {
    aemHost: AEM_HOST,
    clientId: "web-app-client-id",
    clientSecret: "web-app-secret",
    scopes: "openid,AdobeID,aem.assets.author,aem.folders",
    authorizeUrl: `${IMS}/authorize/v2`,
    tokenUrl: `${IMS}/token/v3`,
  },
  { access_token: "user-access-token", refresh_token: "user-refresh-token" },
);

const asUser = () =>
  nock(BASE, {
    reqheaders: { authorization: "Bearer user-access-token", "x-api-key": "web-app-client-id" },
  });

beforeAll(() => nock.disableNetConnect());
afterEach(() => nock.cleanAll());
afterAll(() => nock.enableNetConnect());

describe.each([
  ["OAuth 2.0 Client Credentials", serverToServer, "s2s-access-token", "s2s-client-id"],
  ["OAuth 2.0 (Web App)", webApp, "user-access-token", "web-app-client-id"],
] as const)("request builders with the %s connection", (_label, connection, token, clientId) => {
  const headers = { authorization: `Bearer ${token}`, "x-api-key": clientId };

  test("the API client sends the connection's token and client ID to the AEM host", async () => {
    nock(BASE, { reqheaders: headers }).get("/adobe/sites/cf/models").reply(200, { items: [] });
    const { data } = await createAemClient(connection).get("/adobe/sites/cf/models");
    expect(data).toEqual({ items: [] });
  });

  test("the download client sends the same credentials and returns binary data", async () => {
    nock(BASE, { reqheaders: headers })
      .get("/adobe/assets/asset-1/original/as/file.bin")
      .reply(200, Buffer.from([1, 2, 3]), { "Content-Type": "application/octet-stream" });
    const { data } = await createAemDownloadClient(connection).get(
      "/adobe/assets/asset-1/original/as/file.bin",
    );
    expect(Buffer.from(data as ArrayBuffer)).toEqual(Buffer.from([1, 2, 3]));
  });
});

describe("actions run with the OAuth 2.0 (Web App) connection", () => {
  test("List Content Fragment Models", async () => {
    asUser().get("/adobe/sites/cf/models").query(true).reply(200, { items: [] });
    const { result } = await invoke(listContentFragmentModels, {
      connection: webApp,
      fetchAll: false,
      pagination: { cursor: undefined, limit: undefined },
      projection: "full",
    });
    expect(result).toEqual({ data: { items: [] } });
    expect(nock.isDone()).toBe(true);
  });

  test("Search Assets", async () => {
    asUser()
      .post("/adobe/assets/search")
      .reply(200, { hits: { results: [] } });
    await invoke(searchAssets, {
      connection: webApp,
      fetchAll: false,
      pagination: { cursor: undefined, limit: 10 },
      folderIds: [] as string[],
      mimeTypes: [] as string[],
      modifiedAfter: undefined,
      modifiedBefore: undefined,
      filters: { searchText: undefined, sortField: undefined, sortOrder: "ASC" },
    });
    expect(nock.isDone()).toBe(true);
  });

  test("List Folder Contents", async () => {
    asUser().get("/adobe/folders/").query(true).reply(200, { children: [] });
    await invoke(listFolderContents, {
      connection: webApp,
      path: "/content/dam",
      fetchAll: false,
      pagination: { cursor: undefined, limit: 20 },
      types: "FOLDER,ASSET",
      orderBy: "name",
    });
    expect(nock.isDone()).toBe(true);
  });

  test("Download Asset", async () => {
    asUser()
      .get(`/adobe/assets/${encodeURIComponent("urn:aaid:aem:1")}/original/as/city.jpeg`)
      .reply(200, Buffer.from([7]), { "Content-Type": "image/jpeg" });
    const { result } = await invoke(downloadAsset, {
      connection: webApp,
      assetId: "urn:aaid:aem:1",
      seoName: "city.jpeg",
    });
    expect(Buffer.isBuffer(result.data)).toBe(true);
  });

  test("Raw Request", async () => {
    asUser().get("/adobe/sites/cf/models").reply(200, { items: [] });
    const { result } = await invoke(rawRequest, {
      connection: webApp,
      url: "/adobe/sites/cf/models",
      method: "GET",
      data: undefined,
      formData: [],
      fileData: [],
      fileDataFileNames: {},
      queryParams: [],
      headers: [],
      responseType: "json",
      timeout: undefined,
      maxRetries: 0,
      retryDelayMS: 0,
      retryAllErrors: false,
      useExponentialBackoff: false,
    } as unknown as Parameters<typeof rawRequest.perform>[1]);
    expect(result).toEqual({ data: { items: [] } });
  });
});

describe("polling triggers run with the OAuth 2.0 (Web App) connection", () => {
  test("New and Updated Fragments searches as the signed-in user", async () => {
    let store: PollingState = { lastPolledAt: new Date(Date.now() - 3_600_000).toISOString() };
    const context = {
      polling: {
        getState: () => store,
        setState: (next: PollingState) => {
          store = next;
        },
      },
      batch: { enabled: false },
      debug: { enabled: false },
      logger: { debug: vi.fn(), info: vi.fn() },
    } as unknown as Parameters<typeof contentFragmentChanges.perform>[0];
    asUser().get("/adobe/sites/cf/fragments/search").query(true).reply(200, { items: [] });
    const result = await contentFragmentChanges.perform(
      context,
      { headers: {}, body: { data: {} } } as unknown as Parameters<
        typeof contentFragmentChanges.perform
      >[1],
      {
        connection: webApp,
        lookBackDate: "",
        path: undefined,
        statuses: [],
        modelIds: [],
        tags: [],
        locales: [],
        publishBaseUrl: undefined,
      } as unknown as Parameters<typeof contentFragmentChanges.perform>[2],
    );
    expect(nock.isDone()).toBe(true);
    expect(result.polledNoChanges).toBe(true);
  });
});
