import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { pdqConnection } from "../../connections";
import { listDevicesExamplePayload } from "../../examplePayloads/devices";
import { listDevices } from "./listDevices";
const BASE = "https://app.pdq.com";
const conn = createConnection(pdqConnection, { apiKey: "test-key" });
const responseBody = listDevicesExamplePayload.data;
describe("listDevices", () => {
  beforeAll(() => nock.disableNetConnect());
  afterAll(() => nock.enableNetConnect());
  afterEach(() => nock.cleanAll());
  test("happy path returns one page of devices", async () => {
    nock(BASE)
      .get("/v1/api/devices")
      .query({ page: "1", pageSize: "20", sort: "insertedAtDesc" })
      .matchHeader("authorization", "Bearer test-key")
      .reply(200, responseBody);
    const { result } = await invoke(listDevices, {
      connection: conn,
      fetchAll: false,
      pagination: { page: 1, pageSize: 20 },
      filters: { sort: "insertedAtDesc", filter: undefined },
      customQueryParams: undefined,
      includes: undefined,
      group: undefined,
    });
    expect(result).toEqual(listDevicesExamplePayload);
    expect(nock.pendingMocks()).toHaveLength(0);
  });
  test("error path surfaces the failed request", async () => {
    nock(BASE).get("/v1/api/devices").reply(422, { error: "invalid filter" });
    await expect(
      invoke(listDevices, {
        connection: conn,
        fetchAll: false,
        pagination: { page: undefined, pageSize: undefined },
        filters: { sort: undefined, filter: undefined },
        customQueryParams: undefined,
        includes: undefined,
        group: undefined,
      }),
    ).rejects.toThrow("Request failed with status code 422");
  });
});
