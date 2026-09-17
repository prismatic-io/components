import nock from "nock";
import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";
import { createOrUpdateItamDeviceExamplePayload as examplePayload } from "../../examplePayloads";
import { createOrUpdateItamDevice } from "./createOrUpdateItamDevice";
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
    name: "db-080-westport",
    itamDevicesAdditionalFields: {},
    ...overrides,
  }) as never;
afterEach(() => {
  nock.cleanAll();
});
describe("createOrUpdateItamDevice", () => {
  test("posts to the collection WITHOUT a trailing slash and names the flat tuple", async () => {
    let sent: unknown;
    const scope = nock(HOST)
      .post("/api/v2/itam/devices", (body) => {
        sent = body;
        return true;
      })
      .reply(200, rawWriteBody);
    const result = await createOrUpdateItamDevice.perform(context, params());
    expect(scope.isDone()).toBe(true);
    expect(sent).toEqual({ name: "db-080-westport" });
    expect(result).toEqual(examplePayload);
  });
  test("surfaces a rejected write", async () => {
    nock(HOST)
      .post("/api/v2/itam/devices")
      .reply(400, { description: "Validation failed", errors: [] });
    await expect(
      createOrUpdateItamDevice.perform(context, params()),
    ).rejects.toThrow();
  });
  test("refuses a call carrying neither a name nor any identifier", async () => {
    const scope = nock(HOST)
      .post("/api/v2/itam/devices")
      .reply(200, rawWriteBody);
    await expect(
      createOrUpdateItamDevice.perform(context, params({ name: undefined })),
    ).rejects.toThrow(/Supply Name to create a device/);
    expect(scope.isDone()).toBe(false);
  });
});
