import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { aemOAuthServerToServer } from "../../connections";
import { listContentFragmentModelsExamplePayload } from "../../examplePayloads";
import { rawRequest } from "./rawRequest";

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

describe("rawRequest", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());

  test("forwards the method, path, query and auth headers and returns the body untouched", async () => {
    nock(BASE, {
      reqheaders: {
        authorization: "Bearer test-access-token",
        "x-api-key": "test-client-id",
        "x-custom": "1",
      },
    })
      .get("/adobe/sites/cf/models")
      .query({ projection: "full" })
      .reply(200, listContentFragmentModelsExamplePayload.data);
    const { result } = await invoke(rawRequest, {
      connection,
      url: "/adobe/sites/cf/models",
      method: "GET",
      data: undefined,
      formData: [],
      fileData: [],
      fileDataFileNames: {},
      queryParams: [{ key: "projection", value: "full" }],
      headers: [{ key: "X-Custom", value: "1" }],
      responseType: "json",
      timeout: undefined,
      maxRetries: 0,
      retryDelayMS: 0,
      retryAllErrors: false,
      useExponentialBackoff: false,
    } as unknown as Parameters<typeof rawRequest.perform>[1]);
    expect(result).toEqual(listContentFragmentModelsExamplePayload);
    expect(nock.isDone()).toBe(true);
  });
});
