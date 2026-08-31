import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { oauth } from "../../connections";
import { GOOGLE_ADS_API_VERSION, GOOGLE_ADS_BASE_URL } from "../../constants";
import { rawRequestExamplePayload } from "../../examplePayloads";
import { rawRequest } from "./rawRequest";
const connection = createConnection(
  oauth,
  { developerToken: "test-developer-token" },
  { access_token: "test-access-token" },
);
const PATH = `/${GOOGLE_ADS_API_VERSION}/customers:listAccessibleCustomers`;
describe("rawRequest", () => {
  afterEach(() => nock.cleanAll());
  test("forwards the method, path and auth headers and returns the body untouched", async () => {
    const scope = nock(GOOGLE_ADS_BASE_URL, {
      reqheaders: {
        authorization: "Bearer test-access-token",
        "developer-token": "test-developer-token",
      },
    })
      .get(PATH)
      .reply(200, rawRequestExamplePayload.data);
    const { result } = await invoke(rawRequest, {
      connection,
      url: PATH,
      method: "GET",
      data: undefined,
      formData: [],
      fileData: [],
      fileDataFileNames: {},
      queryParams: [],
      headers: [],
      responseType: "json",
      timeout: 0,
      maxRetries: 0,
      retryDelayMS: 0,
      retryAllErrors: false,
      useExponentialBackoff: false,
    });
    expect(result.data).toEqual(rawRequestExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
});
