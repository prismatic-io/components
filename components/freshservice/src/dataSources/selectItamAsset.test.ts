import nock from "nock";
import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";
import { listItamAssetsExamplePayload } from "../examplePayloads";
import { selectItamAsset } from "./selectItamAsset";
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
const context = {} as never;
const params = { connection } as never;
const listQuery = { per_page: "100", page: "1" };
afterEach(() => {
  nock.cleanAll();
});
describe("selectItamAsset", () => {
  test("maps every asset to a picklist key and label", async () => {
    const scope = nock(HOST)
      .get("/api/v2/itam/assets")
      .query(listQuery)
      .reply(200, listItamAssetsExamplePayload.data);
    const { result } = await selectItamAsset.perform(context, params);
    expect(scope.isDone()).toBe(true);
    expect(result).toEqual([
      expect.objectContaining({
        key: "54",
        label: "main modem (SN-2281-KD)",
      }),
      expect.objectContaining({ key: "55", label: "front-door-sensor" }),
    ]);
  });
  test("returns no options when the tenant has no assets", async () => {
    nock(HOST)
      .get("/api/v2/itam/assets")
      .query(listQuery)
      .reply(200, {
        assets: [],
        meta: { page: 1, per_page: 100, total_count: 0 },
      });
    const { result } = await selectItamAsset.perform(context, params);
    expect(result).toEqual([]);
  });
});
