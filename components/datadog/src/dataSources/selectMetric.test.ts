import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { apiKeyConnection } from "../connections";
import { DEFAULT_DATADOG_SITE } from "../constants";
import { searchMetricsExample } from "../examplePayloads";
import { selectMetric } from "./selectMetric";
const testConnection = createConnection(apiKeyConnection, {
  datadogSite: DEFAULT_DATADOG_SITE,
  apiKey: "test-api-key",
  applicationKey: "test-application-key",
});
const searchInterceptor = () =>
  nock(DEFAULT_DATADOG_SITE).get("/api/v1/search").query({ q: "metrics:" });
describe("selectMetric", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());
  test("returns alphabetically sorted label/key elements", async () => {
    const metrics = [...searchMetricsExample.data.results.metrics];
    searchInterceptor().reply(200, {
      results: { metrics: [...metrics].reverse() },
    });
    const { result } = await invokeDataSource(selectMetric, {
      connection: testConnection,
    });
    expect(result).toEqual(
      metrics.map((metric) => ({ label: metric, key: metric })),
    );
  });
  test("returns an empty list when the API reports no metrics", async () => {
    searchInterceptor().reply(200, { results: { metrics: [] } });
    const { result } = await invokeDataSource(selectMetric, {
      connection: testConnection,
    });
    expect(result).toEqual([]);
  });
  test("returns an empty list when the response omits results", async () => {
    searchInterceptor().reply(200, {});
    const { result } = await invokeDataSource(selectMetric, {
      connection: testConnection,
    });
    expect(result).toEqual([]);
  });
});
