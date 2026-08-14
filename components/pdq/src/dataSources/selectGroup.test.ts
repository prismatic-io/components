import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { pdqConnection } from "../connections";
import { selectGroupExamplePayload } from "../examplePayloads/dataSources";
import { listGroupsExamplePayload } from "../examplePayloads/groups";
import { selectGroup } from "./selectGroup";
const BASE = "https://app.pdq.com";
const conn = createConnection(pdqConnection, { apiKey: "test-key" });
const listBody = listGroupsExamplePayload.data;
describe("selectGroup", () => {
  beforeAll(() => nock.disableNetConnect());
  afterAll(() => nock.enableNetConnect());
  afterEach(() => nock.cleanAll());
  test("returns a picklist of key/label elements", async () => {
    nock(BASE)
      .get("/v1/api/groups")
      .query({ pageSize: "100", page: "1" })
      .matchHeader("authorization", "Bearer test-key")
      .reply(200, listBody);
    nock(BASE)
      .get("/v1/api/groups")
      .query({ pageSize: "100", page: "2" })
      .reply(200, { data: [] });
    const result = await invokeDataSource(selectGroup, { connection: conn });
    expect(result).toEqual(selectGroupExamplePayload);
    for (const element of result.result) {
      expect(element).toHaveProperty("key");
      expect(element).toHaveProperty("label");
    }
    expect(nock.pendingMocks()).toHaveLength(0);
  });
  test("returns an empty picklist when the first page is empty", async () => {
    nock(BASE)
      .get("/v1/api/groups")
      .query({ pageSize: "100", page: "1" })
      .reply(200, { data: [] });
    const result = await invokeDataSource(selectGroup, { connection: conn });
    expect(result.result).toEqual([]);
    expect(nock.pendingMocks()).toHaveLength(0);
  });
});
