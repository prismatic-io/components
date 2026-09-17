import nock from "nock";
import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";
import { listItamAssetsExamplePayload as examplePayload } from "../../examplePayloads";
import { listItamAssets } from "./listItamAssets";
beforeAll(() => {
  nock.disableNetConnect();
});
afterAll(() => {
  nock.enableNetConnect();
});
const HOST = "https://example.freshservice.com";
const connection = {
  key: "freshservice-api-key-connection",
  configVarKey: "",
  fields: { freshserviceDomain: "example", apiKey: "test-api-key" },
} as never;
const context = { debug: { enabled: false } } as never;
const params = {
  connection,
  fetchAll: false,
  pagination: { perPage: 25, page: 2 },
  includeCols: "name,device_id,rack",
} as never;
afterEach(() => {
  nock.cleanAll();
});
describe("listItamAssets", () => {
  test("reads the collection with NO trailing slash and forwards the list parameters", async () => {
    const scope = nock(HOST)
      .get("/api/v2/itam/assets")
      .query({
        include_cols: "name,device_id,rack",
        per_page: "25",
        page: "2",
      })
      .reply(200, examplePayload.data);
    const result = await listItamAssets.perform(context, params);
    expect(scope.isDone()).toBe(true);
    expect(result).toEqual(examplePayload);
  });
  test("surfaces a server error", async () => {
    nock(HOST)
      .get("/api/v2/itam/assets")
      .query(true)
      .reply(500, { description: "Internal error" });
    await expect(listItamAssets.perform(context, params)).rejects.toThrow();
  });
});
