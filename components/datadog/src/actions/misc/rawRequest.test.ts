import type { ActionContext } from "@prismatic-io/spectral";
import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { apiKeyConnection } from "../../connections";
import { DEFAULT_DATADOG_SITE } from "../../constants";
import { listMetricsExamplePayload } from "../../examplePayloads";
import { rawRequest } from "./rawRequest";

const testConnection = createConnection(apiKeyConnection, {
  datadogSite: DEFAULT_DATADOG_SITE,
  apiKey: "test-api-key",
  applicationKey: "test-application-key",
});

const CONSOLE_METHODS = ["log", "info", "debug", "warn", "error"] as const;

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
      .reply(200, listMetricsExamplePayload.data);

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

    expect(result.data).toEqual(listMetricsExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });

  test("never logs the API or application key when Debug Mode is on", async () => {
    nock(DEFAULT_DATADOG_SITE)
      .get("/api/v1/metrics")
      .reply(200, listMetricsExamplePayload.data);
    const spies = CONSOLE_METHODS.map((method) =>
      vi.spyOn(console, method).mockImplementation(() => undefined),
    );

    try {
      await invoke(
        rawRequest,
        {
          connection: testConnection,
          method: "GET",
          url: "/api/v1/metrics",
          data: undefined,
          formData: [],
          fileData: [],
          fileDataFileNames: undefined,
          queryParams: [],
          headers: [],
          responseType: "json",
          timeout: 0,
          debugRequest: true,
          retryDelayMS: 0,
          retryAllErrors: false,
          maxRetries: 0,
          useExponentialBackoff: false,
        },
        { debug: { enabled: true } as ActionContext["debug"] },
      );
      const logged = spies
        .flatMap((spy) => spy.mock.calls.flat())
        .map((value) =>
          typeof value === "string" ? value : JSON.stringify(value),
        )
        .join("\n");
      expect(logged).not.toContain("test-api-key");
      expect(logged).not.toContain("test-application-key");
    } finally {
      for (const spy of spies) spy.mockRestore();
    }
  });
});
