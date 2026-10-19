import { defaultTriggerPayload } from "@prismatic-io/spectral/dist/testing";
import type { GorgiasRecord, PollingState } from "../types";
import { fetchAllWithPagination } from "../utils/fetchAllWithPagination";
import { pollChangesTrigger } from "./pollChangesTrigger";
vi.mock("../client", () => ({ createClient: vi.fn(() => ({})) }));
vi.mock("../utils/fetchAllWithPagination", () => ({
  fetchAllWithPagination: vi.fn(),
}));
const makeRecord = (
  id: number,
  createdDatetime: string,
  updatedDatetime: string,
): GorgiasRecord => ({
  id,
  created_datetime: createdDatetime,
  updated_datetime: updatedDatetime,
});
const created = makeRecord(1, "2026-01-05T00:00:00Z", "2026-01-05T00:00:00Z");
const updated = makeRecord(2, "2025-06-01T00:00:00Z", "2026-01-06T00:00:00Z");
const old = makeRecord(3, "2025-01-01T00:00:00Z", "2025-02-01T00:00:00Z");
const runPerform = async (
  initial: PollingState | undefined,
  params: Record<string, unknown>,
) => {
  let state = initial;
  const context = {
    debug: { enabled: false },
    logger: { debug: vi.fn() },
    polling: {
      getState: () => state,
      setState: (next: PollingState) => {
        state = next;
      },
    },
  };
  const result = await pollChangesTrigger.perform(
    context as never,
    defaultTriggerPayload(),
    {
      connection: {},
      pollResourceType: "tickets",
      showNewRecords: true,
      showUpdatedRecords: true,
      ...params,
    } as never,
  );
  return { result, getState: () => state };
};
beforeEach(() => {
  vi.mocked(fetchAllWithPagination).mockResolvedValue({
    data: { data: [created, updated, old] },
  } as never);
});
test("New and Updated Records is opt-in batchable with a default batch size", () => {
  expect(pollChangesTrigger.triggerResolverSupport).toBe("valid");
  expect(pollChangesTrigger.batchConfig).toEqual({ batchSize: 50 });
  expect(pollChangesTrigger.triggerResolver?.resolveItems).toBeInstanceOf(
    Function,
  );
});
test("resolveItems flattens the payload shape perform actually returns", async () => {
  const { result } = await runPerform(
    { lastPolledAt: "2026-01-01T00:00:00Z" },
    {},
  );
  const items = pollChangesTrigger.triggerResolver?.resolveItems?.(
    {} as never,
    { payload: result.payload } as never,
  );
  expect(items).toEqual([
    { changeType: "created", record: created },
    { changeType: "updated", record: updated },
  ]);
});
describe("initial sync", () => {
  it("starts from now with no history when no Look-back Date is set", async () => {
    const { result, getState } = await runPerform(undefined, {});
    expect(result.polledNoChanges).toBe(true);
    expect(getState()?.lastPolledAt).toBeDefined();
  });
  it("seeds records on or after the Look-back Date and ignores the visibility filters", async () => {
    const { result, getState } = await runPerform(undefined, {
      lookBackDate: "2026-01-01T00:00:00.000Z",
      showNewRecords: false,
      showUpdatedRecords: false,
    });
    expect(result.payload.body).toEqual({
      data: { created: [created], updated: [updated] },
    });
    expect(getState()?.lastPolledAt).toBeDefined();
  });
  it("includes a record modified exactly at the Look-back Date", async () => {
    const boundary = makeRecord(
      4,
      "2026-01-01T00:00:00.000Z",
      "2026-01-01T00:00:00.000Z",
    );
    vi.mocked(fetchAllWithPagination).mockResolvedValue({
      data: { data: [boundary, old] },
    } as never);
    const { result } = await runPerform(undefined, {
      lookBackDate: "2026-01-01T00:00:00.000Z",
    });
    expect(result.payload.body).toEqual({
      data: { created: [boundary], updated: [] },
    });
  });
  it("ignores the Look-back Date once a position is stored", async () => {
    const { result } = await runPerform(
      { lastPolledAt: "2026-01-06T00:00:00.000Z" },
      { lookBackDate: "2025-01-01T00:00:00.000Z", showNewRecords: false },
    );
    expect(result.payload.body).toEqual({
      data: { created: [], updated: [] },
    });
  });
});
describe("sequential polls", () => {
  afterEach(() => {
    vi.useRealTimers();
  });
  it("emits records once, then reports no changes on an unchanged second poll", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    let state: PollingState | undefined;
    const context = {
      debug: { enabled: false },
      logger: { debug: vi.fn() },
      polling: {
        getState: () => state,
        setState: (next: PollingState) => {
          state = next;
        },
      },
    };
    const poll = () =>
      pollChangesTrigger.perform(context as never, defaultTriggerPayload(), {
        connection: {},
        pollResourceType: "tickets",
        lookBackDate: "2026-01-01T00:00:00.000Z",
        showNewRecords: true,
        showUpdatedRecords: true,
      } as never);
    vi.setSystemTime(new Date("2026-02-01T00:00:00.000Z"));
    const first = await poll();
    expect(first.payload.body).toEqual({
      data: { created: [created], updated: [updated] },
    });
    expect(first.polledNoChanges).toBe(false);
    const firstPolledAt = state?.lastPolledAt as string;
    vi.setSystemTime(new Date("2026-02-02T00:00:00.000Z"));
    const second = await poll();
    expect(second.payload.body).toEqual({
      data: { created: [], updated: [] },
    });
    expect(second.polledNoChanges).toBe(true);
    expect(Date.parse(state?.lastPolledAt as string)).toBeGreaterThan(
      Date.parse(firstPolledAt),
    );
  });
});
test("Look-back Date sits directly below the required inputs", () => {
  expect(Object.keys(pollChangesTrigger.inputs ?? {}).slice(0, 3)).toEqual([
    "connection",
    "pollResourceType",
    "lookBackDate",
  ]);
});
