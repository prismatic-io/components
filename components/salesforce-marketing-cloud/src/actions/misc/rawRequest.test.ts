import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { sfmcOAuth2ClientCredentials } from "../../connections/sfmcOAuth2ClientCredentials";
import { JOURNEYS_PATH } from "../../constants";
import { rawRequestExamplePayload } from "../../examplePayloads";
import { rawRequest } from "./rawRequest";
const BASE_URL = "https://mc-test.rest.marketingcloudapis.com";
const ACCESS_TOKEN = "test-access-token";
const connection = createConnection(
  sfmcOAuth2ClientCredentials,
  {},
  { access_token: ACCESS_TOKEN, rest_instance_url: BASE_URL },
);
describe("rawRequest", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  test("forwards the method, path and bearer token, and returns the response untouched", async () => {
    let observedAuthorization: string | undefined;
    const scope = nock(BASE_URL, {
      reqheaders: {
        authorization: (value) => {
          observedAuthorization = value;
          return value === `Bearer ${ACCESS_TOKEN}`;
        },
      },
    })
      .get(JOURNEYS_PATH)
      .query({ $pageSize: "1" })
      .reply(200, rawRequestExamplePayload.data);
    const { result } = await invoke(rawRequest, {
      connection,
      method: "GET",
      url: JOURNEYS_PATH,
      headers: [],
      queryParams: [{ key: "$pageSize", value: "1" }],
      responseType: "json",
      data: undefined,
      formData: [],
      fileData: [],
      fileDataFileNames: undefined,
      timeout: 0,
      retryDelayMS: 0,
      retryAllErrors: false,
      maxRetries: 0,
      useExponentialBackoff: false,
    });
    expect(scope.isDone()).toBe(true);
    expect(observedAuthorization).toBe(`Bearer ${ACCESS_TOKEN}`);
    expect(result.data).toEqual(rawRequestExamplePayload.data);
  });
});
