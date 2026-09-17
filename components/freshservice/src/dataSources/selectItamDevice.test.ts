import nock from "nock";
import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";
import { listItamDevicesExamplePayload } from "../examplePayloads";
import { selectItamDevice } from "./selectItamDevice";
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
describe("selectItamDevice", () => {
  test("maps every device to a picklist key and label", async () => {
    const scope = nock(HOST)
      .get("/api/v2/itam/devices")
      .query(listQuery)
      .reply(200, listItamDevicesExamplePayload.data);
    const { result } = await selectItamDevice.perform(context, params);
    expect(scope.isDone()).toBe(true);
    expect(result).toEqual([
      expect.objectContaining({
        key: "46",
        label: "db-080-westport (SN-4451-XR)",
      }),
      expect.objectContaining({ key: "47", label: "s3-bucket-archive" }),
    ]);
  });
  test("returns no options when the tenant has no devices", async () => {
    nock(HOST)
      .get("/api/v2/itam/devices")
      .query(listQuery)
      .reply(200, {
        devices: [],
        meta: { page: 1, per_page: 100, total_count: 0 },
      });
    const { result } = await selectItamDevice.perform(context, params);
    expect(result).toEqual([]);
  });
});
