import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { aemOAuthServerToServer } from "../connections";
import { listFolderContentsExamplePayload } from "../examplePayloads";
import { selectFolder } from "./selectFolder";

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
const { self, children } = listFolderContentsExamplePayload.data;

describe("selectFolder", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());

  test("walks the DAM folder tree and returns each folder as a key/label element", async () => {
    nock(BASE)
      .get("/adobe/folders/")
      .query({ path: "/content/dam", types: "FOLDER", limit: "50" })
      .reply(200, { children: [self] })
      .get("/adobe/folders/")
      .query({ path: String(self?.path), types: "FOLDER", limit: "50" })
      .reply(200, { children: [children[0]] })
      .get("/adobe/folders/")
      .query({ path: String(children[0].path), types: "FOLDER", limit: "50" })
      .reply(200, { children: [] });
    const result = await invokeDataSource(selectFolder, { connection });
    expect(result).toEqual({
      result: [
        { key: self?.folderId, label: self?.path },
        { key: children[0].folderId, label: children[0].path },
      ],
    });
    expect(nock.isDone()).toBe(true);
  });

  test("returns an empty list when the DAM root has no folders", async () => {
    nock(BASE)
      .get("/adobe/folders/")
      .query({ path: "/content/dam", types: "FOLDER", limit: "50" })
      .reply(200, { children: [] });
    const result = await invokeDataSource(selectFolder, { connection });
    expect(result).toEqual({ result: [] });
  });
});
