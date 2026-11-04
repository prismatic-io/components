import { createConnection, invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { aemOAuthServerToServer } from "../../connections";
import {
  getContentFragmentExamplePayload,
  listContentFragmentsExamplePayload,
} from "../../examplePayloads";
import { listContentFragments } from "./listContentFragments";

const exampleContentFragment = getContentFragmentExamplePayload.data;

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
  pagination: { cursor: undefined, limit: 10 },
  path: "/wknd/en",
  projection: "summary",
  includeMetadata: false,
  references: undefined,
};

describe("listContentFragments", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());

  test("returns one page and its cursor", async () => {
    nock(BASE)
      .get("/adobe/sites/cf/fragments")
      .query({ path: "/wknd/en", projection: "summary", limit: "10" })
      .reply(200, listContentFragmentsExamplePayload.data);
    const { result } = await invoke(listContentFragments, params);
    expect(result).toEqual(listContentFragmentsExamplePayload);
    expect(nock.isDone()).toBe(true);
  });

  test("with Fetch All, follows the cursor to the end at the maximum page size", async () => {
    const second = { ...exampleContentFragment, id: "second-fragment" };
    nock(BASE)
      .get("/adobe/sites/cf/fragments")
      .query({ path: "/wknd/en", projection: "summary", limit: "50" })
      .reply(200, listContentFragmentsExamplePayload.data)
      .get("/adobe/sites/cf/fragments")
      .query({
        path: "/wknd/en",
        projection: "summary",
        limit: "50",
        cursor: listContentFragmentsExamplePayload.data.cursor,
      })
      .reply(200, { items: [second] });
    const { result } = await invoke(listContentFragments, {
      ...params,
      fetchAll: true,
    });
    expect(result).toEqual({
      data: { items: [exampleContentFragment, second] },
    });
    expect(nock.isDone()).toBe(true);
  });

  test("surfaces an API error", async () => {
    nock(BASE)
      .get("/adobe/sites/cf/fragments")
      .query(true)
      .reply(400, { title: "Bad Request" });
    await expect(invoke(listContentFragments, params)).rejects.toThrow(
      "Request failed with status code 400",
    );
  });
});
