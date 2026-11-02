import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { createAemClient } from "../../client";
import { aemOAuthServerToServer } from "../../connections";
import { listFolderContentsExamplePayload } from "../../examplePayloads";
import { walkFolderTree } from "../../utils";
import { listAssetsInFolderTree } from "./listAssetsInFolderTree";

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
const ROOT = "/content/dam/wknd-shared/en";
const [childFolder, rootAsset] = listFolderContentsExamplePayload.data.children;
const nestedAsset = {
  ...rootAsset,
  assetId: "urn:aaid:aem:nested",
  name: "surf.jpeg",
};

describe("listAssetsInFolderTree", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());

  test("recurses into child folders and tags each asset with its folder", async () => {
    nock(BASE)
      .get("/adobe/folders/")
      .query({ path: ROOT, types: "FOLDER,ASSET", limit: "50" })
      .reply(200, { children: [childFolder, rootAsset] })
      .get("/adobe/folders/")
      .query({
        path: String(childFolder.path),
        types: "FOLDER,ASSET",
        limit: "50",
      })
      .reply(200, { children: [nestedAsset] });
    const { result } = await invoke(listAssetsInFolderTree, {
      connection,
      path: ROOT,
    });
    expect(result).toEqual({
      data: [
        { ...rootAsset, folderPath: ROOT },
        { ...nestedAsset, folderPath: childFolder.path },
      ],
    });
    expect(nock.isDone()).toBe(true);
  });

  test("reports a walk that stops at its folder cap as truncated", async () => {
    nock(BASE)
      .get("/adobe/folders/")
      .query((q) => q.path === ROOT)
      .reply(200, { children: [childFolder] });
    const tree = await walkFolderTree(
      createAemClient(connection, false),
      ROOT,
      {
        collectAssets: false,
        maxFolders: 1,
      },
    );
    expect(tree.folders).toEqual([childFolder]);
    expect(tree.truncated).toBe(true);
    expect(nock.isDone()).toBe(true);
  });

  test("surfaces an API error", async () => {
    nock(BASE)
      .get("/adobe/folders/")
      .query(true)
      .reply(404, { title: "Not Found" });
    await expect(
      invoke(listAssetsInFolderTree, { connection, path: ROOT }),
    ).rejects.toThrow("Request failed with status code 404");
  });
});
