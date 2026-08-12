import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { apiKeyConnection } from "../../connections";
import { DEFAULT_DATADOG_SITE } from "../../constants";
import { submitMetricsExample } from "../../examplePayloads";
import { submitMetrics } from "./submitMetrics";
const testConnection = createConnection(apiKeyConnection, {
  datadogSite: DEFAULT_DATADOG_SITE,
  apiKey: "test-api-key",
  applicationKey: "test-application-key",
});
const series = [
  {
    metric: "system.load.1",
    type: 3,
    points: [{ timestamp: 1636629071, value: 0.7 }],
    resources: [{ name: "dummyhost", type: "host" }],
    tags: ["environment:production"],
  },
];
describe("submitMetrics", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());
  test("wraps the cleaned series array in a series body", async () => {
    const scope = nock(DEFAULT_DATADOG_SITE)
      .post("/api/v2/series", { series })
      .reply(202, submitMetricsExample.data);
    const { result } = await invoke(submitMetrics, {
      connection: testConnection,
      metricSeries: series,
    });
    expect(result.data).toEqual(submitMetricsExample.data);
    expect(scope.isDone()).toBe(true);
  });
  test("surfaces an API error", async () => {
    nock(DEFAULT_DATADOG_SITE)
      .post("/api/v2/series")
      .reply(400, { errors: ["Invalid metric payload"] });
    await expect(
      invoke(submitMetrics, {
        connection: testConnection,
        metricSeries: series,
      }),
    ).rejects.toThrow();
  });
});
