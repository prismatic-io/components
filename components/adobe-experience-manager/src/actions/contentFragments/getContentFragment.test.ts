import { createConnection, invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { aemOAuthServerToServer } from "../../connections";
import { getContentFragmentExamplePayload } from "../../examplePayloads";
import { getContentFragment } from "./getContentFragment";

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
const fragmentId = getContentFragmentExamplePayload.data.id;

describe("getContentFragment", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());

  test("returns the fragment", async () => {
    nock(BASE)
      .get(`/adobe/sites/cf/fragments/${fragmentId}`)
      .query({ includeMetadata: "true", references: "direct" })
      .reply(200, getContentFragmentExamplePayload.data);
    const { result } = await invoke(getContentFragment, {
      connection,
      fragmentId,
      includeMetadata: true,
      references: "direct",
    });
    expect(result).toEqual(getContentFragmentExamplePayload);
    expect(nock.isDone()).toBe(true);
  });

  test("surfaces a 404 for an unknown fragment", async () => {
    nock(BASE).get("/adobe/sites/cf/fragments/missing").reply(404, { title: "Not Found" });
    await expect(
      invoke(getContentFragment, {
        connection,
        fragmentId: "missing",
        includeMetadata: false,
        references: undefined,
      }),
    ).rejects.toThrow("Request failed with status code 404");
  });
});
