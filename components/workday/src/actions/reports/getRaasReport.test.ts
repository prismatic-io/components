import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { getRaasReportExamplePayload } from "../../examplePayloads";
import {
  mockTokenExchange,
  oauthTestConnection,
  refreshTokenTestConnection,
  TEST_HOST,
} from "../../testHelpers";
import { clearTokenCache } from "../../util";
import { getRaasReport } from "./getRaasReport";
const REPORT_PATH = "/ccx/service/customreport2/acme/ISU_Orgvue/People_Report";
beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
beforeEach(() => clearTokenCache());
afterEach(() => {
  expect(nock.isDone()).toBe(true);
  nock.cleanAll();
});
describe("getRaasReport", () => {
  it("sends prompts and the format, replacing a format already in the URL", async () => {
    mockTokenExchange();
    nock(TEST_HOST, { reqheaders: { authorization: "Bearer at-1" } })
      .get(REPORT_PATH)
      .query({ Effective_as_of_Date: "2026-10-01", format: "json" })
      .reply(200, getRaasReportExamplePayload.data);
    const { result } = await invoke(getRaasReport, {
      connection: refreshTokenTestConnection(),
      reportUrl: `${TEST_HOST}${REPORT_PATH}?format=csv`,
      format: "json",
      prompts: { Effective_as_of_Date: "2026-10-01" },
    });
    expect(result).toEqual(getRaasReportExamplePayload);
  });
  it("returns an empty report as Workday sends it", async () => {
    nock(TEST_HOST)
      .get(REPORT_PATH)
      .query({ format: "json" })
      .reply(200, { Report_Entry: [] });
    const { result } = await invoke(getRaasReport, {
      connection: oauthTestConnection(),
      reportUrl: `${TEST_HOST}${REPORT_PATH}`,
      format: "json",
      prompts: {},
    });
    expect(result).toEqual({ data: { Report_Entry: [] } });
  });
  it("returns CSV output as text", async () => {
    nock(TEST_HOST)
      .get(REPORT_PATH)
      .query({ format: "csv" })
      .reply(200, "Employee_ID,Worker\n21001,Logan McNeil\n", {
        "Content-Type": "text/csv",
      });
    const { result } = await invoke(getRaasReport, {
      connection: oauthTestConnection(),
      reportUrl: `${TEST_HOST}${REPORT_PATH}`,
      format: "csv",
      prompts: {},
    });
    expect(result).toEqual({
      data: "Employee_ID,Worker\n21001,Logan McNeil\n",
    });
  });
  it("rejects a report URL on another host before sending the token", async () => {
    await expect(
      invoke(getRaasReport, {
        connection: oauthTestConnection(),
        reportUrl: `https://attacker.example.net${REPORT_PATH}`,
        format: "json",
        prompts: {},
      }),
    ).rejects.toThrow(/must be on the connection's Workday host/);
  });
  it("surfaces denied access from Workday", async () => {
    nock(TEST_HOST).get(REPORT_PATH).query(true).reply(403, {});
    await expect(
      invoke(getRaasReport, {
        connection: oauthTestConnection(),
        reportUrl: `${TEST_HOST}${REPORT_PATH}`,
        format: "json",
        prompts: {},
      }),
    ).rejects.toThrow(/403/);
  });
});
