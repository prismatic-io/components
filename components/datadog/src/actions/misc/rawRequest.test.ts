import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { apiKeyConnection } from "../../connections";
import { DEFAULT_DATADOG_SITE } from "../../constants";
import { listMetricsExample } from "../../examplePayloads";
import { rawRequest } from "./rawRequest";
const testConnection = createConnection(apiKeyConnection, {
  datadogSite: DEFAULT_DATADOG_SITE,
  apiKey: "test-api-key",
  applicationKey: "test-application-key",
});
describe("rawRequest", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());
  test("forwards the method, path and auth headers and returns the response untouched", async () => {
    const scope = nock(DEFAULT_DATADOG_SITE, {
      reqheaders: {
        "DD-API-KEY": "test-api-key",
        "DD-APPLICATION-KEY": "test-application-key",
      },
    })
      .get("/api/v1/metrics")
      .query({ from: "1636629071" })
      .reply(200, listMetricsExample.data);
    const { result } = await invoke(rawRequest, {
      connection: testConnection,
      method: "GET",
      url: "/api/v1/metrics",
      data: undefined,
      formData: [],
      fileData: [],
      fileDataFileNames: undefined,
      queryParams: [{ key: "from", value: "1636629071" }],
      headers: [],
      responseType: "json",
      timeout: 0,
      debugRequest: false,
      retryDelayMS: 0,
      retryAllErrors: false,
      maxRetries: 0,
      useExponentialBackoff: false,
    });
    expect(result.data).toEqual(listMetricsExample.data);
    expect(scope.isDone()).toBe(true);
  });
});
