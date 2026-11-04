import { createConnection, invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { aemOAuthServerToServer } from "../../connections";
import { listFolderContentsExamplePayload } from "../../examplePayloads";
import { listFolderContents } from "./listFolderContents";

const AEM_HOST = "author-p12345-e123456.adobeaemcloud.com";
const BASE = `https://${AEM_HOST}`;
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
const params = {
  connection,
  path: "/content/dam/wknd-shared/en",
  fetchAll: false,
  pagination: { cursor: undefined, limit: 20 },
  types: "FOLDER,ASSET",
  orderBy: "name",
};

describe("listFolderContents", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());

  test("lists folders and assets with types=FOLDER,ASSET", async () => {
    nock(BASE)
      .get("/adobe/folders/")
      .query({
        path: "/content/dam/wknd-shared/en",
        types: "FOLDER,ASSET",
        orderBy: "name",
        limit: "20",
      })
      .reply(200, listFolderContentsExamplePayload.data);
    const { result } = await invoke(listFolderContents, params);
    expect(result).toEqual(listFolderContentsExamplePayload);
    expect(nock.isDone()).toBe(true);
  });

  test("with Fetch All, merges every page under the first page's self", async () => {
    const { self, children, cursor } = listFolderContentsExamplePayload.data;
    nock(BASE)
      .get("/adobe/folders/")
      .query({
        path: params.path,
        types: "FOLDER,ASSET",
        orderBy: "name",
        limit: "50",
      })
      .reply(200, listFolderContentsExamplePayload.data)
      .get("/adobe/folders/")
      .query({
        path: params.path,
        types: "FOLDER,ASSET",
        orderBy: "name",
        limit: "50",
        cursor,
      })
      .reply(200, { self, children: [children[1]] });
    const { result } = await invoke(listFolderContents, {
      ...params,
      fetchAll: true,
    });
    expect(result).toEqual({
      data: { self, children: [...children, children[1]] },
    });
    expect(nock.isDone()).toBe(true);
  });

  test("surfaces a 404 for an unknown folder", async () => {
    nock(BASE)
      .get("/adobe/folders/")
      .query(true)
      .reply(404, { title: "Not Found" });
    await expect(invoke(listFolderContents, params)).rejects.toThrow(
      "Request failed with status code 404",
    );
  });
});
