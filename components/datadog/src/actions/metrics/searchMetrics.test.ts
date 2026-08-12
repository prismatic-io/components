import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { apiKeyConnection } from "../../connections";
import { DEFAULT_DATADOG_SITE } from "../../constants";
import { searchMetricsExample } from "../../examplePayloads";
import { searchMetrics } from "./searchMetrics";
const testConnection = createConnection(apiKeyConnection, {
  datadogSite: DEFAULT_DATADOG_SITE,
  apiKey: "test-api-key",
  applicationKey: "test-application-key",
});
describe("searchMetrics", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());
  test("applies the metrics: prefix to the query", async () => {
    const scope = nock(DEFAULT_DATADOG_SITE)
      .get("/api/v1/search")
      .query({ q: "metrics:system.cpu" })
      .reply(200, searchMetricsExample.data);
    const { result } = await invoke(searchMetrics, {
      connection: testConnection,
      metricsQuery: "system.cpu",
    });
    expect(result.data).toEqual(searchMetricsExample.data);
    expect(scope.isDone()).toBe(true);
  });
  test("surfaces an API error", async () => {
    nock(DEFAULT_DATADOG_SITE)
      .get("/api/v1/search")
      .query(true)
      .reply(403, { errors: ["Forbidden"] });
    await expect(
      invoke(searchMetrics, {
        connection: testConnection,
        metricsQuery: "system.cpu",
      }),
    ).rejects.toThrow();
  });
});
