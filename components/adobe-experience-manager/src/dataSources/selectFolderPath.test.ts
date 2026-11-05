import { createConnection, invokeDataSource } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { aemOAuthServerToServer } from "../connections";
import { listFolderContentsExamplePayload } from "../examplePayloads";
import { selectFolderPath } from "./selectFolderPath";

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
const [adventures] = listFolderContentsExamplePayload.data.children;

describe("selectFolderPath", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());

  test("returns the DAM root and every folder below it, keyed by path", async () => {
    nock(BASE)
      .get("/adobe/folders/")
      .query({ path: "/content/dam", types: "FOLDER", limit: "50" })
      .reply(200, { children: [adventures] })
      .get("/adobe/folders/")
      .query({ path: String(adventures.path), types: "FOLDER", limit: "50" })
      .reply(200, { children: [] });
    const result = await invokeDataSource(selectFolderPath, { connection });
    expect(result).toEqual({
      result: [
        { key: "/content/dam", label: "/content/dam" },
        { key: adventures.path, label: adventures.path },
      ],
    });
    expect(nock.isDone()).toBe(true);
  });

  test("returns only the DAM root when it has no folders", async () => {
    nock(BASE)
      .get("/adobe/folders/")
      .query({ path: "/content/dam", types: "FOLDER", limit: "50" })
      .reply(200, { children: [] });
    const result = await invokeDataSource(selectFolderPath, { connection });
    expect(result).toEqual({ result: [{ key: "/content/dam", label: "/content/dam" }] });
  });
});
