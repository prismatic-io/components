import type { Connection } from "@prismatic-io/spectral";
import { invokeDataSource } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { listCustomersExamplePayload } from "../examplePayloads";
import { selectRecord } from "./selectRecord";

const ORIGIN = "https://1234567.suitetalk.api.netsuite.com";
const BASE = "/services/rest/record/v1";

const connection: Connection = {
  key: "oauth",
  configVarKey: "NetSuite Connection",
  fields: { tokenUrl: `${ORIGIN}/services/rest/auth/oauth2/v1/token` },
  token: { access_token: "access-token" },
};

describe("selectRecord", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());

  test("maps each record to its ID, labelled by the chosen record field", async () => {
    nock(ORIGIN)
      .get(`${BASE}/customer`)
      .query({ q: "email START_WITH contact", limit: "10", offset: "0" })
      .reply(200, listCustomersExamplePayload.data.data);

    const { result } = await invokeDataSource(selectRecord, {
      connection,
      recordType: "customer",
      recordField: "email",
      query: "email START_WITH contact",
      pagination: { limit: 10, offset: 0 },
    });

    expect(result).toEqual([
      { key: "12345", label: "contact@acmecorp.example.com" },
      { key: "12346", label: "contact@globalindustries.example.com" },
    ]);
    expect(nock.isDone()).toBe(true);
  });

  test("labels each record with its ID when no record field is set", async () => {
    nock(ORIGIN)
      .get(`${BASE}/customer`)
      .query(true)
      .reply(200, listCustomersExamplePayload.data.data);

    const { result } = await invokeDataSource(selectRecord, {
      connection,
      recordType: "customer",
      recordField: "",
      query: "",
      pagination: { limit: 10, offset: 0 },
    });

    expect(result).toEqual([
      { key: "12345", label: "12345" },
      { key: "12346", label: "12346" },
    ]);
  });

  test("returns an empty list when no records match", async () => {
    nock(ORIGIN)
      .get(`${BASE}/customer`)
      .query(true)
      .reply(200, { count: 0, offset: 0, hasMore: false, items: [] });

    const { result } = await invokeDataSource(selectRecord, {
      connection,
      recordType: "customer",
      recordField: "",
      query: "",
      pagination: { limit: 10, offset: 0 },
    });

    expect(result).toEqual([]);
  });
});
