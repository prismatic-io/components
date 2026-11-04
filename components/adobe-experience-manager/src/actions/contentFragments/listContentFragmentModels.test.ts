import { createConnection, invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { aemOAuthServerToServer } from "../../connections";
import { listContentFragmentModelsExamplePayload } from "../../examplePayloads";
import { listContentFragmentModels } from "./listContentFragmentModels";

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
  fetchAll: false,
  pagination: { cursor: "abc", limit: undefined },
  projection: "full",
};

describe("listContentFragmentModels", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());

  test("returns the models page", async () => {
    nock(BASE)
      .get("/adobe/sites/cf/models")
      .query({ projection: "full", cursor: "abc" })
      .reply(200, listContentFragmentModelsExamplePayload.data);
    const { result } = await invoke(listContentFragmentModels, params);
    expect(result).toEqual(listContentFragmentModelsExamplePayload);
    expect(nock.isDone()).toBe(true);
  });

  test("surfaces an API error", async () => {
    nock(BASE)
      .get("/adobe/sites/cf/models")
      .query(true)
      .reply(500, { title: "Server Error" });
    await expect(invoke(listContentFragmentModels, params)).rejects.toThrow(
      "Request failed with status code 500",
    );
  });
});
