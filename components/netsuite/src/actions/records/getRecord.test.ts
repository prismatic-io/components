import type { Connection } from "@prismatic-io/spectral";
import { invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { getCustomerExamplePayload } from "../../examplePayloads";
import { getRecord } from "./getRecord";

const ORIGIN = "https://1234567.suitetalk.api.netsuite.com";
const BASE = "/services/rest/record/v1";

const connection: Connection = {
  key: "oauth",
  configVarKey: "NetSuite Connection",
  fields: { tokenUrl: `${ORIGIN}/services/rest/auth/oauth2/v1/token` },
  token: { access_token: "access-token" },
};

describe("getRecord", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());

  test("gets a record by ID and forwards the expand, enum and fields options", async () => {
    nock(ORIGIN)
      .get(`${BASE}/customer/12345`)
      .query({
        expandSubResources: "true",
        simpleEnumFormat: "false",
        fields: "email,companyname",
      })
      .reply(200, getCustomerExamplePayload.data.data);

    const { result } = await invoke(getRecord, {
      connection,
      recordType: "customer",
      id: "12345",
      expandSubResources: true,
      simpleEnumFormat: false,
      fields: "email,companyname",
    });

    expect(result).toMatchObject({
      data: { data: getCustomerExamplePayload.data.data },
    });
    expect(nock.isDone()).toBe(true);
  });

  test("rejects when the record is not found", async () => {
    nock(ORIGIN)
      .get(`${BASE}/customer/999`)
      .query(true)
      .reply(404, { title: "Not Found", status: 404 });

    await expect(
      invoke(getRecord, {
        connection,
        recordType: "customer",
        id: "999",
        expandSubResources: false,
        simpleEnumFormat: false,
        fields: undefined,
      }),
    ).rejects.toThrow();
  });
});

describe("getRecord with an external ID", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());

  test("keeps the eid: prefix and encodes the characters that would end the path", async () => {
    nock(ORIGIN)
      .get(`${BASE}/invoice/eid:INV%232024%2F07`)
      .query({ expandSubResources: "false", simpleEnumFormat: "false" })
      .reply(200, getCustomerExamplePayload.data.data);

    await invoke(getRecord, {
      connection,
      recordType: "invoice",
      id: "eid:INV#2024/07",
      expandSubResources: false,
      simpleEnumFormat: false,
      fields: undefined,
    });

    expect(nock.isDone()).toBe(true);
  });
});
