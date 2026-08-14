import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { pdqConnection } from "../../connections";
import { listGroupsExamplePayload } from "../../examplePayloads/groups";
import { rawRequest } from "./rawRequest";
const BASE = "https://app.pdq.com";
const conn = createConnection(pdqConnection, { apiKey: "test-key" });
const passThroughBody = listGroupsExamplePayload.data;
describe("rawRequest", () => {
  beforeAll(() => nock.disableNetConnect());
  afterAll(() => nock.enableNetConnect());
  afterEach(() => nock.cleanAll());
  test("forwards the request and returns the response body untouched", async () => {
    nock(BASE)
      .get("/v1/api/groups")
      .query({ pageSize: "20" })
      .matchHeader("authorization", "Bearer test-key")
      .reply(200, passThroughBody);
    const { result } = await invoke(rawRequest, {
      connection: conn,
      method: "GET",
      url: "/groups",
      headers: [],
      queryParams: [{ key: "pageSize", value: "20" }],
      responseType: "json",
      data: undefined,
      formData: [],
      fileData: [],
      fileDataFileNames: undefined,
      timeout: 0,
      retryDelayMS: 0,
      retryAllErrors: false,
      maxRetries: 0,
      useExponentialBackoff: false,
    });
    expect(result).toEqual({ data: passThroughBody });
    expect(nock.pendingMocks()).toHaveLength(0);
  });
});
