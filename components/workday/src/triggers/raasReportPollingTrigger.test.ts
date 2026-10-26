import nock from "nock";
import type { PollingState } from "../types";
import {
  createPollingContext,
  oauthTestConnection,
  TEST_HOST,
} from "../testHelpers";
import { raasReportPollingTrigger } from "./raasReportPollingTrigger";
type PerformArgs = Parameters<typeof raasReportPollingTrigger.perform>;
type PollResult = {
  polledNoChanges?: boolean;
};
const REPORT_PATH =
  "/ccx/service/customreport2/acme/ISU_Orgvue/Changed_Workers";
const NOW = "2026-10-15T12:00:00.000Z";
const logan = { Employee_ID: "21001", Worker: "Logan McNeil", Title: "VP" };
const teresa = { Employee_ID: "21002", Worker: "Teresa Serrano", Title: "CFO" };
const store: {
  state?: PollingState;
} = {};
const context = (batching = false) =>
  createPollingContext<PerformArgs[0]>(store, { batching });
const noPayload = {} as PerformArgs[1];
const params = {
  connection: oauthTestConnection(),
  reportUrl: `${TEST_HOST}${REPORT_PATH}`,
  watermarkPrompt: "Updated_Since",
  watermarkFormat: "dateTime",
  recordKeyField: "Employee_ID",
  lookBackDate: "",
  prompts: { Company: "Global_Modern_Services" },
};
const mockReport = (since: string, rows: unknown[]) =>
  nock(TEST_HOST)
    .get(REPORT_PATH)
    .query({
      Company: "Global_Modern_Services",
      Updated_Since: since,
      format: "json",
    })
    .reply(200, { Report_Entry: rows });
beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
beforeEach(() => {
  store.state = undefined;
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date(NOW));
});
afterEach(() => {
  vi.useRealTimers();
  expect(nock.isDone()).toBe(true);
  nock.cleanAll();
});
describe("raasReportPollingTrigger batching declaration", () => {
  it("declares opt-in batching with a default batch size", () => {
    expect(raasReportPollingTrigger.triggerResolverSupport).toBe("valid");
    expect(raasReportPollingTrigger.batchConfig).toEqual({ batchSize: 50 });
    expect(
      raasReportPollingTrigger.triggerResolver?.resolveItems,
    ).toBeInstanceOf(Function);
  });
  it("offers the Look-back Date directly below the required inputs", () => {
    expect(Object.keys(raasReportPollingTrigger.inputs ?? {})).toEqual([
      "connection",
      "reportUrl",
      "watermarkPrompt",
      "watermarkFormat",
      "recordKeyField",
      "lookBackDate",
      "prompts",
    ]);
  });
  it("resolves a realistic payload into tagged items", () => {
    const items = raasReportPollingTrigger.triggerResolver?.resolveItems?.(
      {} as never,
      { payload: { body: { data: { changed: [logan, teresa] } } } } as never,
    );
    expect(items).toEqual([
      { changeType: "changed", record: logan },
      { changeType: "changed", record: teresa },
    ]);
  });
});
describe("raasReportPollingTrigger perform", () => {
  it("records a baseline on a first run without a Look-back Date", async () => {
    mockReport("2026-10-15T11:55:00Z", [logan]);
    const result = await raasReportPollingTrigger.perform(
      context(),
      noPayload,
      params,
    );
    expect(result.payload.body).toEqual({ data: { changed: [] } });
    expect((result as PollResult).polledNoChanges).toBe(true);
    expect(store.state?.lastPolledAt).toBe(NOW);
    expect(store.state?.seen).toHaveLength(1);
  });
  it("delivers every row from the Look-back Date on an initial sync", async () => {
    mockReport("2026-01-01T00:00:00Z", [logan, teresa]);
    const result = await raasReportPollingTrigger.perform(
      context(),
      noPayload,
      {
        ...params,
        lookBackDate: "2026-01-01T00:00:00.000Z",
      },
    );
    expect(result.payload.body).toEqual({ data: { changed: [logan, teresa] } });
    expect((result as PollResult).polledNoChanges).toBe(false);
  });
  it("sends a date watermark when the Watermark Format is Date", async () => {
    mockReport("2026-01-01", []);
    await raasReportPollingTrigger.perform(context(), noPayload, {
      ...params,
      watermarkFormat: "date",
      lookBackDate: "2026-01-01T00:00:00.000Z",
    });
  });
  it("starts the next window before the last poll and skips rows already delivered", async () => {
    mockReport("2026-10-15T11:55:00Z", [logan]);
    await raasReportPollingTrigger.perform(context(), noPayload, params);
    vi.setSystemTime(new Date("2026-10-15T12:15:00.000Z"));
    const loganChanged = { ...logan, Title: "Chief People Officer" };
    mockReport("2026-10-15T11:55:00Z", [logan, teresa, loganChanged]);
    const result = await raasReportPollingTrigger.perform(
      context(),
      noPayload,
      params,
    );
    expect(result.payload.body).toEqual({
      data: { changed: [teresa, loganChanged] },
    });
    expect(store.state?.lastPolledAt).toBe("2026-10-15T12:15:00.000Z");
    expect(store.state?.seen).toHaveLength(3);
  });
  it("reports no changes when only rows from the overlap come back", async () => {
    mockReport("2026-10-15T11:55:00Z", [logan]);
    await raasReportPollingTrigger.perform(context(), noPayload, params);
    mockReport("2026-10-15T11:55:00Z", [logan]);
    const result = await raasReportPollingTrigger.perform(
      context(),
      noPayload,
      params,
    );
    expect((result as PollResult).polledNoChanges).toBe(true);
  });
  it("names the Record Key Field when a row lacks it", async () => {
    mockReport("2026-01-01T00:00:00Z", [{ Worker: "Logan McNeil" }]);
    await expect(
      raasReportPollingTrigger.perform(context(), noPayload, {
        ...params,
        lookBackDate: "2026-01-01T00:00:00.000Z",
      }),
    ).rejects.toThrow(/Record Key Field "Employee_ID" is missing.*Worker/);
    expect(store.state).toBeUndefined();
  });
  it("surfaces a Workday error and keeps the stored state", async () => {
    store.state = { lastPolledAt: NOW, seen: ["abc"] };
    nock(TEST_HOST)
      .get(REPORT_PATH)
      .query(true)
      .reply(500, { error: "Internal error" });
    await expect(
      raasReportPollingTrigger.perform(context(), noPayload, params),
    ).rejects.toThrow();
    expect(store.state).toEqual({ lastPolledAt: NOW, seen: ["abc"] });
  });
  it("rejects a report URL on another host before sending the token", async () => {
    await expect(
      raasReportPollingTrigger.perform(context(), noPayload, {
        ...params,
        reportUrl: `https://attacker.example.net${REPORT_PATH}`,
      }),
    ).rejects.toThrow(/same|host/i);
  });
});
