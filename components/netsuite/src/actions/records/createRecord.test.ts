import type { Connection } from "@prismatic-io/spectral";
import { invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { createRecord } from "./createRecord";

const ORIGIN = "https://1234567.suitetalk.api.netsuite.com";
const BASE = "/services/rest/record/v1";

const connection: Connection = {
  key: "oauth",
  configVarKey: "NetSuite Connection",
  fields: { tokenUrl: `${ORIGIN}/services/rest/auth/oauth2/v1/token` },
  token: { access_token: "access-token" },
};

const payload = { entityid: "New Customer", subsidiary: { id: "1" } };

describe("createRecord", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());

  test("posts the payload and returns the record identity from the Location header", async () => {
    nock(ORIGIN)
      .post(`${BASE}/customer`, payload)
      .reply(204, undefined, {
        location: `${ORIGIN}${BASE}/customer/12345`,
      });

    const { result } = await invoke(createRecord, {
      connection,
      recordType: "customer",
      payload,
    });

    expect(result).toMatchObject({
      data: {
        data: { recordType: "customer", id: "12345" },
        headers: { location: `${ORIGIN}${BASE}/customer/12345` },
      },
    });
    expect(nock.isDone()).toBe(true);
  });

  test("rejects when NetSuite responds with an error", async () => {
    nock(ORIGIN)
      .post(`${BASE}/customer`)
      .reply(400, { title: "Bad Request", status: 400 });

    await expect(
      invoke(createRecord, { connection, recordType: "customer", payload }),
    ).rejects.toThrow();
  });
});
