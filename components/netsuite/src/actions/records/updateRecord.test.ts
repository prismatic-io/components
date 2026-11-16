import type { Connection } from "@prismatic-io/spectral";
import { invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { updateRecord } from "./updateRecord";

const ORIGIN = "https://1234567.suitetalk.api.netsuite.com";
const BASE = "/services/rest/record/v1";

const connection: Connection = {
  key: "oauth",
  configVarKey: "NetSuite Connection",
  fields: { tokenUrl: `${ORIGIN}/services/rest/auth/oauth2/v1/token` },
  token: { access_token: "access-token" },
};

const payload = { companyname: "Renamed" };

describe("updateRecord", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());

  test("patches the record with the replace options and returns its identity from the Location header", async () => {
    nock(ORIGIN)
      .patch(`${BASE}/customer/12345`, payload)
      .query({ replace: "addressbookList", replaceSelectedFields: "false" })
      .reply(204, undefined, {
        location: `${ORIGIN}${BASE}/customer/12345`,
      });

    const { result } = await invoke(updateRecord, {
      connection,
      recordType: "customer",
      id: "12345",
      payload,
      replace: "addressbookList",
      replaceSelectedFields: false,
    });

    expect(result).toMatchObject({
      data: { data: { recordType: "customer", id: "12345" } },
    });
    expect(nock.isDone()).toBe(true);
  });

  test("rejects when the record is not found", async () => {
    nock(ORIGIN)
      .patch(`${BASE}/customer/999`)
      .query(true)
      .reply(404, { title: "Not Found", status: 404 });

    await expect(
      invoke(updateRecord, {
        connection,
        recordType: "customer",
        id: "999",
        payload,
        replace: undefined,
        replaceSelectedFields: false,
      }),
    ).rejects.toThrow();
  });
});
