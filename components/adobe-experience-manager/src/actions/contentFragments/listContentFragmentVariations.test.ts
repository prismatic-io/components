import { createConnection, invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { aemOAuthServerToServer } from "../../connections";
import { listContentFragmentVariationsExamplePayload } from "../../examplePayloads";
import { listContentFragmentVariations } from "./listContentFragmentVariations";

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
  fragmentId: "frag-1",
  fetchAll: false,
  pagination: { cursor: undefined, limit: undefined },
};

describe("listContentFragmentVariations", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());

  test("returns the fragment's variations", async () => {
    nock(BASE)
      .get("/adobe/sites/cf/fragments/frag-1/variations")
      .reply(200, listContentFragmentVariationsExamplePayload.data);
    const { result } = await invoke(listContentFragmentVariations, params);
    expect(result).toEqual(listContentFragmentVariationsExamplePayload);
    expect(nock.isDone()).toBe(true);
  });

  test("surfaces a 404 for an unknown fragment", async () => {
    nock(BASE)
      .get("/adobe/sites/cf/fragments/frag-1/variations")
      .reply(404, { title: "Not Found" });
    await expect(invoke(listContentFragmentVariations, params)).rejects.toThrow(
      "Request failed with status code 404",
    );
  });
});
