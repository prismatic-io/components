import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { apiKeyConnection } from "../../connections";
import { DEFAULT_DATADOG_SITE } from "../../constants";
import { listMetricsExample } from "../../examplePayloads";
import { listMetrics } from "./listMetrics";
const testConnection = createConnection(apiKeyConnection, {
  datadogSite: DEFAULT_DATADOG_SITE,
  apiKey: "test-api-key",
  applicationKey: "test-application-key",
});
describe("listMetrics", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());
  test("sends the from timestamp and omits unset filters", async () => {
    const scope = nock(DEFAULT_DATADOG_SITE)
      .get("/api/v1/metrics")
      .query({ from: "1636629071" })
      .reply(200, listMetricsExample.data);
    const { result } = await invoke(listMetrics, {
      connection: testConnection,
      metricsFrom: 1636629071,
      metricsHost: undefined,
      metricsTagFilter: undefined,
    });
    expect(result.data).toEqual(listMetricsExample.data);
    expect(scope.isDone()).toBe(true);
  });
  test("surfaces an API error", async () => {
    nock(DEFAULT_DATADOG_SITE)
      .get("/api/v1/metrics")
      .query(true)
      .reply(403, { errors: ["Forbidden"] });
    await expect(
      invoke(listMetrics, {
        connection: testConnection,
        metricsFrom: 1636629071,
        metricsHost: undefined,
        metricsTagFilter: undefined,
      }),
    ).rejects.toThrow();
  });
});
