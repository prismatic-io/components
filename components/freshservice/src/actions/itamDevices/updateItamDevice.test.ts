import nock from "nock";
import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";
import { updateItamDeviceExamplePayload as examplePayload } from "../../examplePayloads";
import { updateItamDevice } from "./updateItamDevice";
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
const rawWriteBody = { msg: examplePayload.data.raw, code: 0 };
const params = (overrides: Record<string, unknown> = {}) =>
  ({
    connection,
    deviceId: 46,
    name: "db-080-westport",
    itamDevicesAdditionalFields: {},
    ...overrides,
  }) as never;
afterEach(() => {
  nock.cleanAll();
});
describe("updateItamDevice", () => {
  test("puts to the record path WITH a trailing slash and sends no serial_no", async () => {
    let sent: Record<string, unknown> | undefined;
    const scope = nock(HOST)
      .put("/api/v2/itam/devices/46/", (body) => {
        sent = body as Record<string, unknown>;
        return true;
      })
      .reply(200, rawWriteBody);
    const result = await updateItamDevice.perform(context, params());
    expect(scope.isDone()).toBe(true);
    expect(sent).not.toHaveProperty("serial_no");
    expect(sent).toEqual({ name: "db-080-westport" });
    expect(result).toEqual(examplePayload);
  });
  test("surfaces a rejected write", async () => {
    nock(HOST)
      .put("/api/v2/itam/devices/46/")
      .reply(400, { description: "Validation failed", errors: [] });
    await expect(updateItamDevice.perform(context, params())).rejects.toThrow();
  });
});
