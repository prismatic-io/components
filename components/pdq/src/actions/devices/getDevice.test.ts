import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { pdqConnection } from "../../connections";
import { getDeviceExamplePayload } from "../../examplePayloads/devices";
import { getDevice } from "./getDevice";
const BASE = "https://app.pdq.com";
const conn = createConnection(pdqConnection, { apiKey: "test-key" });
const responseBody = getDeviceExamplePayload.data;
describe("getDevice", () => {
  beforeAll(() => nock.disableNetConnect());
  afterAll(() => nock.enableNetConnect());
  afterEach(() => nock.cleanAll());
  test("happy path returns the device envelope", async () => {
    nock(BASE)
      .get("/v1/api/devices/dvc_1bced782734040a581d")
      .matchHeader("authorization", "Bearer test-key")
      .reply(200, responseBody);
    const { result } = await invoke(getDevice, {
      connection: conn,
      deviceId: "dvc_1bced782734040a581d",
    });
    expect(result).toEqual(getDeviceExamplePayload);
    expect(nock.pendingMocks()).toHaveLength(0);
  });
  test("error path surfaces the failed request", async () => {
    nock(BASE)
      .get("/v1/api/devices/dvc_missing")
      .reply(404, { error: "not found" });
    await expect(
      invoke(getDevice, { connection: conn, deviceId: "dvc_missing" }),
    ).rejects.toThrow("Request failed with status code 404");
  });
});
