import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../../connections";
import { API_VERSIONS } from "../../constants";
import { rawRequest } from "./rawRequest";
const HOST = "https://graph.microsoft.com";
const ACCESS_TOKEN = "test-access-token";
const connection = createConnection(
  msIntuneOAuth2,
  {
    authorizeUrl:
      "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
    tokenUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
    clientId: "test-client-id",
    clientSecret: "test-client-secret",
  },
  { access_token: ACCESS_TOKEN },
);
const responseBody = { value: [{ id: "detected-app-1" }] };
describe("rawRequest", () => {
  afterEach(() => nock.cleanAll());
  test("forwards the method, path, and Authorization header and returns the response untouched", async () => {
    const scope = nock(HOST, {
      reqheaders: { authorization: `Bearer ${ACCESS_TOKEN}` },
    })
      .get("/v1.0/deviceManagement/detectedApps")
      .reply(200, responseBody);
    const { result } = await invoke(rawRequest, {
      connection,
      apiVersion: API_VERSIONS.v1,
      method: "GET",
      url: "/deviceManagement/detectedApps",
      responseType: "json",
      data: undefined,
      formData: [],
      fileData: [],
      fileDataFileNames: {},
      queryParams: [],
      headers: [],
      timeout: 0,
      maxRetries: 0,
      retryDelayMS: 0,
      useExponentialBackoff: false,
      retryAllErrors: false,
      debugRequest: false,
    });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(responseBody);
  });
});
