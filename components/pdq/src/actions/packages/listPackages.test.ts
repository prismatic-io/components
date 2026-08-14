import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { pdqConnection } from "../../connections";
import { listPackagesExamplePayload } from "../../examplePayloads/packages";
import { listPackages } from "./listPackages";
const BASE = "https://app.pdq.com";
const conn = createConnection(pdqConnection, { apiKey: "test-key" });
const responseBody = listPackagesExamplePayload.data;
describe("listPackages", () => {
  beforeAll(() => nock.disableNetConnect());
  afterAll(() => nock.enableNetConnect());
  afterEach(() => nock.cleanAll());
  test("happy path returns one page of packages", async () => {
    nock(BASE)
      .get("/v1/api/packages")
      .query({ page: "1", pageSize: "20", publisher: "Mozilla" })
      .matchHeader("authorization", "Bearer test-key")
      .reply(200, responseBody);
    const { result } = await invoke(listPackages, {
      connection: conn,
      fetchAll: false,
      pagination: { page: 1, pageSize: 20 },
      customQueryParams: { publisher: "Mozilla" },
      filters: { sort: undefined, filter: undefined },
    });
    expect(result).toEqual(listPackagesExamplePayload);
    expect(nock.pendingMocks()).toHaveLength(0);
  });
  test("error path surfaces the failed request", async () => {
    nock(BASE).get("/v1/api/packages").reply(401, { error: "unauthorized" });
    await expect(
      invoke(listPackages, {
        connection: conn,
        fetchAll: false,
        pagination: { page: undefined, pageSize: undefined },
        filters: { sort: undefined, filter: undefined },
        customQueryParams: undefined,
      }),
    ).rejects.toThrow("Request failed with status code 401");
  });
});
