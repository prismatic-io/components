import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { salesforceOAuth } from "../../connections";
import { DEFAULT_SF_VERSION } from "../../constants";
import { getRecordExamplePayload } from "../../examplePayloads";
import { rawRequest } from "./rawRequest";

const INSTANCE_URL = "https://example-dev-ed.my.salesforce.com";
const ACCESS_TOKEN = "00Dxx0000000000!fake-access-token";

const connection = createConnection(
  salesforceOAuth,
  {},
  { instance_url: INSTANCE_URL, access_token: ACCESS_TOKEN },
);

describe("rawRequest", () => {
  beforeAll(() => nock.disableNetConnect());
  afterAll(() => nock.enableNetConnect());
  afterEach(() => nock.cleanAll());

  test("forwards method, path and bearer token and returns the response body untouched", async () => {
    const scope = nock(INSTANCE_URL, {
      reqheaders: { authorization: `Bearer ${ACCESS_TOKEN}` },
    })
      .get(
        `/services/data/v${DEFAULT_SF_VERSION}/sobjects/Account/003RM000006pL5gQAE`,
      )
      .reply(200, getRecordExamplePayload.data);

    const { result } = await invoke(rawRequest, {
      connection,
      version: DEFAULT_SF_VERSION,
      url: "/sobjects/Account/003RM000006pL5gQAE",
      method: "GET",
      data: undefined,
      fileData: undefined,
      fileDataFileNames: undefined,
      formData: undefined,
      headers: undefined,
      queryParams: undefined,
      responseType: "json",
      timeout: undefined,
      maxRetries: undefined,
      retryDelayMS: undefined,
      retryAllErrors: undefined,
      useExponentialBackoff: undefined,
      debugRequest: false,
    } as never);

    expect(scope.isDone()).toBe(true);
    expect(result.data).toStrictEqual(getRecordExamplePayload.data);
  });
});
