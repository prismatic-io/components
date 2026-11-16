import type { Connection } from "@prismatic-io/spectral";
import { invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { listCustomersExamplePayload } from "../../examplePayloads";
import { listRecord } from "./listRecord";

const ORIGIN = "https://1234567.suitetalk.api.netsuite.com";
const BASE = "/services/rest/record/v1";

const connection: Connection = {
  key: "oauth",
  configVarKey: "NetSuite Connection",
  fields: { tokenUrl: `${ORIGIN}/services/rest/auth/oauth2/v1/token` },
  token: { access_token: "access-token" },
};

describe("listRecord", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());

  test("lists records with the query and pagination as query parameters", async () => {
    nock(ORIGIN)
      .get(`${BASE}/customer`)
      .query({ q: "email START_WITH barbara", limit: "10", offset: "20" })
      .reply(200, listCustomersExamplePayload.data.data);

    const { result } = await invoke(listRecord, {
      connection,
      recordType: "customer",
      query: "email START_WITH barbara",
      pagination: { limit: 10, offset: 20 },
    });

    expect(result).toMatchObject({
      data: { data: listCustomersExamplePayload.data.data },
    });
    expect(nock.isDone()).toBe(true);
  });

  test("rejects when NetSuite responds with an error", async () => {
    nock(ORIGIN)
      .get(`${BASE}/customer`)
      .query(true)
      .reply(400, { title: "Bad Request", status: 400 });

    await expect(
      invoke(listRecord, {
        connection,
        recordType: "customer",
        query: "",
        pagination: { limit: 10, offset: 0 },
      }),
    ).rejects.toThrow();
  });
});
