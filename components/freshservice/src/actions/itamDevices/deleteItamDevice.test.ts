import nock from "nock";
import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";
import { deleteItamDevice } from "./deleteItamDevice";
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
const params = { connection, deviceId: 46 } as never;
afterEach(() => {
  nock.cleanAll();
});
describe("deleteItamDevice", () => {
  test("deletes the record path WITH a trailing slash and reports success", async () => {
    const scope = nock(HOST).delete("/api/v2/itam/devices/46/").reply(204);
    const result = await deleteItamDevice.perform(context, params);
    expect(scope.isDone()).toBe(true);
    expect(result).toEqual({ data: { success: true } });
  });
  test("surfaces a missing device", async () => {
    nock(HOST)
      .delete("/api/v2/itam/devices/46/")
      .reply(404, { description: "Not found" });
    await expect(deleteItamDevice.perform(context, params)).rejects.toThrow();
  });
});
