import nock from "nock";
import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";
import { getItamAssetExamplePayload as examplePayload } from "../../examplePayloads";
import { getItamAsset } from "./getItamAsset";
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
  assetId: 54,
  includeCols: "name,device_id,rack",
} as never;
afterEach(() => {
  nock.cleanAll();
});
describe("getItamAsset", () => {
  test("reads the record path with NO trailing slash and forwards Include Columns", async () => {
    const scope = nock(HOST)
      .get("/api/v2/itam/assets/54")
      .query({ include_cols: "name,device_id,rack" })
      .reply(200, examplePayload.data);
    const result = await getItamAsset.perform(context, params);
    expect(scope.isDone()).toBe(true);
    expect(result).toEqual(examplePayload);
  });
  test("surfaces a missing asset", async () => {
    nock(HOST)
      .get("/api/v2/itam/assets/54")
      .query(true)
      .reply(404, { description: "Not found" });
    await expect(getItamAsset.perform(context, params)).rejects.toThrow();
  });
});
