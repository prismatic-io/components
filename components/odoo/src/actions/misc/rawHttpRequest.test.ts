import type { Connection } from "@prismatic-io/spectral";
import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { odooApiKey } from "../../connections/odooApiKey";
import { rawHttpRequest } from "./rawHttpRequest";
nock.disableNetConnect();
const ODOO_ORIGIN = "https://odoo.example.com";
const API_KEY = "test-api-key";
const DB = "odoo_db";
const testConnection = createConnection(odooApiKey, {
  baseUrl: ODOO_ORIGIN,
  db: DB,
  apiKey: API_KEY,
}) as unknown as Connection;
describe("rawHttpRequest", () => {
  afterEach(() => nock.cleanAll());
  test("forwards the method, path, query params, and headers, and returns the response untouched", async () => {
    const passthroughBody = { echoed: true, rows: [{ id: 7 }] };
    const scope = nock(ODOO_ORIGIN, {
      reqheaders: {
        authorization: `Bearer ${API_KEY}`,
        "x-odoo-database": DB,
        "x-request-id": "req-123",
      },
    })
      .get("/json/2/res.partner/search_read")
      .query({ limit: "1" })
      .reply(200, passthroughBody);
    const { result } = await invoke(rawHttpRequest, {
      connection: testConnection,
      method: "GET",
      url: "/json/2/res.partner/search_read",
      data: undefined,
      formData: [],
      fileData: [],
      fileDataFileNames: undefined,
      queryParams: [{ key: "limit", value: "1" }],
      headers: [{ key: "x-request-id", value: "req-123" }],
      responseType: "json",
      timeout: undefined,
      retryDelayMS: 0,
      retryAllErrors: false,
      maxRetries: 0,
      useExponentialBackoff: false,
    });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(passthroughBody);
  });
});
