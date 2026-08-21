import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { zohoTemplatedConnection } from "../connections";
import { crmGetRecordsExamplePayload } from "../examplePayloads/crm";
import type { CrmGetRecordsPerformInput } from "../types";
import crmGetRecords from "./crmGetRecords";
const conn = {
  ...createConnection(
    zohoTemplatedConnection,
    {},
    { access_token: "test-token" },
  ),
  context: { "accounts-server": "https://accounts.zoho.com" },
};
const CRM_BASE = "https://www.zohoapis.com";
const CRM_REPLY = crmGetRecordsExamplePayload.data;
const baseInputs: CrmGetRecordsPerformInput = {
  connection: conn as unknown as CrmGetRecordsPerformInput["connection"],
  recordType: "Leads",
  fields: ["Full_Name", "Email"],
  fetchAll: false,
};
// biome-ignore lint/suspicious/noExplicitAny: test-only param bridge
const params = (input: CrmGetRecordsPerformInput): any => input;
describe("crmGetRecords", () => {
  afterEach(() => nock.cleanAll());
  test("happy path returns the CRM record collection", async () => {
    nock(CRM_BASE).get("/crm/v8/Leads").query(true).reply(200, CRM_REPLY);
    const { result } = await invoke(crmGetRecords, params(baseInputs));
    expect(result.data.data).toEqual(CRM_REPLY.data);
  });
  test("error path (4xx/5xx) propagates to handleErrors", async () => {
    nock(CRM_BASE)
      .get("/crm/v8/Leads")
      .query(true)
      .reply(500, { error: "server error" });
    await expect(invoke(crmGetRecords, params(baseInputs))).rejects.toThrow();
  });
  test("SC-38418: forwards the If-Modified-Since request header when ifModifiedSince is set", async () => {
    const ifModifiedSince = "2024-01-15T00:00:00+00:00";
    const scope = nock(CRM_BASE, {
      reqheaders: { "if-modified-since": ifModifiedSince },
    })
      .get("/crm/v8/Leads")
      .query(true)
      .reply(200, CRM_REPLY);
    const { result } = await invoke(
      crmGetRecords,
      params({ ...baseInputs, ifModifiedSince }),
    );
    expect(scope.isDone()).toBe(true);
    expect(result.data.data).toEqual(CRM_REPLY.data);
  });
  test("SC-38418: a conditional 304 is swallowed to an empty data set (does not throw)", async () => {
    const ifModifiedSince = "2024-01-15T00:00:00+00:00";
    nock(CRM_BASE).get("/crm/v8/Leads").query(true).reply(304);
    const { result } = await invoke(
      crmGetRecords,
      params({ ...baseInputs, ifModifiedSince }),
    );
    expect(result).toEqual({ data: { data: [] } });
  });
  test("SC-38418: a conditional 401/429/5xx still throws (swallow is scoped to genuine 304)", async () => {
    const ifModifiedSince = "2024-01-15T00:00:00+00:00";
    nock(CRM_BASE)
      .get("/crm/v8/Leads")
      .query(true)
      .reply(429, { error: "rate limited" });
    await expect(
      invoke(crmGetRecords, params({ ...baseInputs, ifModifiedSince })),
    ).rejects.toThrow();
  });
});
