import nock from "nock";
import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";
import { deleteItamAsset } from "./deleteItamAsset";
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
const params = { connection, assetId: 54 } as never;
afterEach(() => {
  nock.cleanAll();
});
describe("deleteItamAsset", () => {
  test("deletes the record path WITH a trailing slash and reports success", async () => {
    const scope = nock(HOST).delete("/api/v2/itam/assets/54/").reply(204);
    const result = await deleteItamAsset.perform(context, params);
    expect(scope.isDone()).toBe(true);
    expect(result).toEqual({ data: { success: true } });
  });
  test("surfaces a missing asset", async () => {
    nock(HOST)
      .delete("/api/v2/itam/assets/54/")
      .reply(404, { description: "Not found" });
    await expect(deleteItamAsset.perform(context, params)).rejects.toThrow();
  });
});
