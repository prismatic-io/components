import nock from "nock";
import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";
import { getItamDeviceExamplePayload as examplePayload } from "../../examplePayloads";
import { getItamDevice } from "./getItamDevice";
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
describe("getItamDevice", () => {
  test("reads the record path with NO trailing slash and returns the body untouched", async () => {
    const scope = nock(HOST)
      .get("/api/v2/itam/devices/46")
      .reply(200, examplePayload.data);
    const result = await getItamDevice.perform(context, params);
    expect(scope.isDone()).toBe(true);
    expect(result).toEqual(examplePayload);
  });
  test("surfaces a missing device", async () => {
    nock(HOST)
      .get("/api/v2/itam/devices/46")
      .reply(404, { description: "Not found" });
    await expect(getItamDevice.perform(context, params)).rejects.toThrow();
  });
});
