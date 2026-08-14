import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { pdqConnection } from "../../connections";
import { listGroupsExamplePayload } from "../../examplePayloads/groups";
import { listGroups } from "./listGroups";
const BASE = "https://app.pdq.com";
const conn = createConnection(pdqConnection, { apiKey: "test-key" });
const responseBody = listGroupsExamplePayload.data;
describe("listGroups", () => {
  beforeAll(() => nock.disableNetConnect());
  afterAll(() => nock.enableNetConnect());
  afterEach(() => nock.cleanAll());
  test("happy path returns one page of groups", async () => {
    nock(BASE)
      .get("/v1/api/groups")
      .query({ page: "1", pageSize: "20" })
      .matchHeader("authorization", "Bearer test-key")
      .reply(200, responseBody);
    const { result } = await invoke(listGroups, {
      connection: conn,
      fetchAll: false,
      pagination: { page: 1, pageSize: 20 },
      filters: { sort: undefined, filter: undefined },
      customQueryParams: undefined,
    });
    expect(result).toEqual(listGroupsExamplePayload);
    expect(nock.pendingMocks()).toHaveLength(0);
  });
  test("error path surfaces the failed request", async () => {
    nock(BASE).get("/v1/api/groups").reply(403, { error: "forbidden" });
    await expect(
      invoke(listGroups, {
        connection: conn,
        fetchAll: false,
        pagination: { page: undefined, pageSize: undefined },
        filters: { sort: undefined, filter: undefined },
        customQueryParams: undefined,
      }),
    ).rejects.toThrow("Request failed with status code 403");
  });
});
