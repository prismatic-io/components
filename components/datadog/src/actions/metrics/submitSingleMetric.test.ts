import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { apiKeyConnection } from "../../connections";
import { DEFAULT_DATADOG_SITE } from "../../constants";
import { submitMetricsExample } from "../../examplePayloads";
import { submitSingleMetric } from "./submitSingleMetric";
const testConnection = createConnection(apiKeyConnection, {
  datadogSite: DEFAULT_DATADOG_SITE,
  apiKey: "test-api-key",
  applicationKey: "test-application-key",
});
const emptyMetricFields = {
  metricType: undefined,
  metricUnit: undefined,
  metricInterval: undefined,
  resourceName: undefined,
  resourceType: undefined,
};
describe("submitSingleMetric", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());
  test("assembles a single series from the flat inputs and metric fields", async () => {
    const scope = nock(DEFAULT_DATADOG_SITE)
      .post("/api/v2/series", {
        series: [
          {
            metric: "system.load.1",
            points: [{ timestamp: 1636629071, value: 0.7 }],
            type: 3,
            tags: ["environment:production"],
            unit: "byte",
            interval: 60,
            resources: [{ name: "my-host", type: "host" }],
          },
        ],
      })
      .reply(202, submitMetricsExample.data);
    const { result } = await invoke(submitSingleMetric, {
      connection: testConnection,
      metricName: "system.load.1",
      metricValue: 0.7,
      metricTimestamp: 1636629071,
      metricTags: ["environment:production"],
      metricFields: {
        metricType: 3,
        metricUnit: "byte",
        metricInterval: 60,
        resourceName: "my-host",
        resourceType: "host",
      },
    });
    expect(result.data).toEqual(submitMetricsExample.data);
    expect(scope.isDone()).toBe(true);
  });
  test("still sends an empty resource entry when no optional fields are set", async () => {
    const scope = nock(DEFAULT_DATADOG_SITE)
      .post("/api/v2/series", {
        series: [
          {
            metric: "system.load.1",
            points: [{ value: 0.7 }],
            tags: [],
            resources: [{}],
          },
        ],
      })
      .reply(202, submitMetricsExample.data);
    const { result } = await invoke(submitSingleMetric, {
      connection: testConnection,
      metricName: "system.load.1",
      metricValue: 0.7,
      metricTimestamp: undefined,
      metricTags: [],
      metricFields: emptyMetricFields,
    });
    expect(result.data).toEqual(submitMetricsExample.data);
    expect(scope.isDone()).toBe(true);
  });
  test("surfaces an API error", async () => {
    nock(DEFAULT_DATADOG_SITE)
      .post("/api/v2/series")
      .reply(400, { errors: ["Invalid metric payload"] });
    await expect(
      invoke(submitSingleMetric, {
        connection: testConnection,
        metricName: "system.load.1",
        metricValue: 0.7,
        metricTimestamp: undefined,
        metricTags: [],
        metricFields: emptyMetricFields,
      }),
    ).rejects.toThrow();
  });
});
