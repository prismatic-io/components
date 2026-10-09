import {
  createConnection,
  defaultTriggerPayload,
  loggerMock,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { ukgProBasicAuth } from "../connections";
import { getEmployeeChangesByDateExamplePayload } from "../examplePayloads";
import type { EmployeeChange, EmployeeChangesPollingState } from "../types";
import { resolveEmployeeChangeRecords } from "../util";
import { pollEmployeeChanges } from "./pollEmployeeChanges";
const BASE = "https://service5.ultipro.com";
const PATH = "/personnel/v1/employee-changes";
const NOW = "2026-10-01T12:00:00.000Z";
const connection = createConnection(ukgProBasicAuth, {
  baseUrl: BASE,
  customerApiKey: "test-customer-key",
  username: "test-user",
  password: "test-password",
});
const records =
  getEmployeeChangesByDateExamplePayload.data as unknown as EmployeeChange[];
const chunk = <T>(items: T[], size: number): T[][] => {
  const batches: T[][] = [];
  for (let i = 0; i < items.length; i += size)
    batches.push(items.slice(i, i + size));
  return batches;
};
describe("pollEmployeeChanges batching declaration", () => {
  test("declares opt-in Tier 1 batching with a default batch size", () => {
    expect(pollEmployeeChanges.triggerResolverSupport).toBe("valid");
    expect(pollEmployeeChanges.batchConfig).toEqual({ batchSize: 50 });
    expect(pollEmployeeChanges.triggerResolver?.resolveItems).toBeInstanceOf(
      Function,
    );
  });
  test("offers the Look-back Date directly below the connection", () => {
    expect(Object.keys(pollEmployeeChanges.inputs ?? {})).toEqual([
      "connection",
      "lookBackDate",
      "companyId",
    ]);
  });
});
describe("resolveEmployeeChangeRecords", () => {
  test("tags every employee change record as changed", () => {
    expect(resolveEmployeeChangeRecords(records)).toEqual(
      records.map((record) => ({ changeType: "changed", record })),
    );
  });
  test("tolerates an absent envelope and an empty one", () => {
    expect(resolveEmployeeChangeRecords(undefined)).toEqual([]);
    expect(resolveEmployeeChangeRecords([])).toEqual([]);
  });
});
describe("triggerResolver.resolveItems", () => {
  test("flattens a realistic trigger payload into tagged items, batched by batchSize", () => {
    const items =
      pollEmployeeChanges.triggerResolver?.resolveItems?.(
        {} as never,
        { payload: { body: { data: records } } } as never,
      ) ?? [];
    expect(items).toEqual(
      records.map((record) => ({ changeType: "changed", record })),
    );
    const batches = chunk(
      items as unknown[],
      pollEmployeeChanges.batchConfig?.batchSize ?? 1,
    );
    expect(batches.flat()).toHaveLength(records.length);
  });
});
describe("pollEmployeeChanges polling state", () => {
  let store: EmployeeChangesPollingState;
  type PerformContext = Parameters<typeof pollEmployeeChanges.perform>[0];
  type PerformPayload = Parameters<typeof pollEmployeeChanges.perform>[1];
  type PerformParams = Parameters<typeof pollEmployeeChanges.perform>[2];
  const context = () =>
    ({
      polling: {
        getState: () => store,
        setState: (next: EmployeeChangesPollingState) => {
          store = next;
        },
      },
      debug: { enabled: false },
      logger: loggerMock(),
    }) as unknown as PerformContext;
  const poll = async (params: PerformParams) => ({
    result: await pollEmployeeChanges.perform(
      context(),
      defaultTriggerPayload() as PerformPayload,
      params,
    ),
  });
  const params = (lookBackDate = ""): PerformParams => ({
    connection,
    lookBackDate,
    companyId: "",
  });
  const mockChanges = (
    body: unknown = getEmployeeChangesByDateExamplePayload,
  ) => {
    const seen: Record<string, string>[] = [];
    nock(BASE)
      .get(PATH)
      .query((query) => {
        seen.push(query as Record<string, string>);
        return true;
      })
      .reply(200, body as nock.Body);
    return seen;
  };
  beforeEach(() => {
    store = {};
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(NOW));
  });
  afterEach(() => {
    vi.useRealTimers();
    nock.cleanAll();
  });
  test("with empty state and no Look-back Date, starts from today and stores now", async () => {
    const seen = mockChanges();
    const { result } = await poll(params());
    expect(seen[0]).toMatchObject({
      start_date: "2026-10-01",
      end_date: "2026-10-01",
      page: "1",
      per_page: "100",
    });
    expect(store).toEqual({ lastPollTime: NOW });
    expect(result?.payload.body.data).toEqual(
      getEmployeeChangesByDateExamplePayload.data,
    );
    expect(result?.polledNoChanges).toBe(false);
  });
  test("with empty state and a Look-back Date, the first fetch starts from that date", async () => {
    const seen = mockChanges();
    await poll(params("2026-01-01"));
    expect(seen[0]).toMatchObject({
      start_date: "2026-01-01",
      end_date: "2026-10-01",
    });
    expect(store).toEqual({ lastPollTime: NOW });
  });
  test("an established lastPollTime wins over the Look-back Date", async () => {
    store = { lastPollTime: "2026-09-15T08:30:00.000Z" };
    const seen = mockChanges();
    await poll(params("2026-01-01"));
    expect(seen[0]).toMatchObject({
      start_date: "2026-09-15",
      end_date: "2026-10-01",
    });
    expect(store).toEqual({ lastPollTime: NOW });
  });
  test("an empty reply reports no changes", async () => {
    mockChanges({ data: [] });
    const { result } = await poll(params());
    expect(result?.payload.body.data).toEqual([]);
    expect(result?.polledNoChanges).toBe(true);
    expect(store).toEqual({ lastPollTime: NOW });
  });
  test("a second same-day poll re-emits the records the first poll returned", async () => {
    mockChanges();
    const first = await poll(params());
    vi.setSystemTime(new Date("2026-10-01T12:05:00.000Z"));
    const seen = mockChanges();
    const second = await poll(params());
    expect(seen[0]).toMatchObject({
      start_date: "2026-10-01",
      end_date: "2026-10-01",
    });
    expect(second.result?.payload.body.data).toEqual(
      first.result?.payload.body.data,
    );
    expect(second.result?.polledNoChanges).toBe(false);
    expect(store).toEqual({ lastPollTime: "2026-10-01T12:05:00.000Z" });
  });
});
