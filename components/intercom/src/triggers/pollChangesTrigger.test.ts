import { defaultTriggerPayload } from "@prismatic-io/spectral/dist/testing";
import { createClient } from "../client";
import type { IntercomRecord, PollingState } from "../types";
import { pollChangesTrigger } from "./pollChangesTrigger";
vi.mock("../client", () => ({ createClient: vi.fn() }));
const LOOK_BACK = "2026-01-01T00:00:00.000Z";
const LOOK_BACK_UNIX = Date.parse(LOOK_BACK) / 1000;
const DAY = 86400;
const makeRecord = (
  id: string,
  createdAt: number,
  updatedAt: number,
): IntercomRecord => ({ id, created_at: createdAt, updated_at: updatedAt });
const onLookBackDate = makeRecord(
  "on-date",
  LOOK_BACK_UNIX + 3600,
  LOOK_BACK_UNIX + 3600,
);
const atMidnight = makeRecord("midnight", LOOK_BACK_UNIX, LOOK_BACK_UNIX);
const updated = makeRecord(
  "updated",
  LOOK_BACK_UNIX - DAY * 30,
  LOOK_BACK_UNIX + DAY,
);
const old = makeRecord("old", LOOK_BACK_UNIX - DAY * 30, LOOK_BACK_UNIX - 1);
const post = vi.fn();
const get = vi.fn();
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
      resourceType: "contacts",
      showNewRecords: true,
      showUpdatedRecords: true,
      ...params,
    } as never,
  );
  return { result, getState: () => state };
};
beforeEach(() => {
  post.mockReset();
  get.mockReset();
  const page = {
    data: { data: [onLookBackDate, atMidnight, updated, old], pages: {} },
  };
  post.mockResolvedValue(page);
  get.mockResolvedValue(page);
  vi.mocked(createClient).mockReturnValue({ post, get } as never);
});
test("New and Updated Records is opt-in batchable with a default batch size", () => {
  expect(pollChangesTrigger.triggerResolverSupport).toBe("valid");
  expect(pollChangesTrigger.batchConfig).toEqual({ batchSize: 50 });
  expect(pollChangesTrigger.triggerResolver?.resolveItems).toBeInstanceOf(
    Function,
  );
});
test("resolveItems flattens the payload shape perform actually returns", async () => {
  const { result } = await runPerform({ lastPolledAt: LOOK_BACK }, {});
  const items = pollChangesTrigger.triggerResolver?.resolveItems?.(
    {} as never,
    { payload: result.payload } as never,
  );
  expect(items).toEqual([
    { changeType: "created", record: onLookBackDate },
    { changeType: "updated", record: updated },
  ]);
});
describe("resolveItems", () => {
  const resolve = (body: unknown) =>
    pollChangesTrigger.triggerResolver?.resolveItems?.(
      {} as never,
      { payload: { ...defaultTriggerPayload(), body } } as never,
    );
  it("tolerates an absent or empty envelope", () => {
    expect(resolve({ data: undefined })).toEqual([]);
    expect(resolve({ data: { created: [], updated: [] } })).toEqual([]);
  });
  it("yields items the platform can chunk by the declared batch size", () => {
    const created = Array.from({ length: 120 }, (_, i) =>
      makeRecord(String(i), LOOK_BACK_UNIX, LOOK_BACK_UNIX),
    );
    const items = resolve({ data: { created, updated: [] } }) ?? [];
    const size = pollChangesTrigger.batchConfig?.batchSize ?? 1;
    const chunks: unknown[][] = [];
    for (let i = 0; i < items.length; i += size) {
      chunks.push(items.slice(i, i + size));
    }
    expect(chunks.map((c) => c.length)).toEqual([50, 50, 20]);
  });
});
describe("initial sync", () => {
  it("starts from now with no history when no Look-back Date is set", async () => {
    const { result, getState } = await runPerform(undefined, {});
    expect(result.polledNoChanges).toBe(true);
    expect(getState()?.lastPolledAt).toBeDefined();
  });
  it("seeds records on or after the Look-back Date and ignores the visibility filters", async () => {
    const { result, getState } = await runPerform(undefined, {
      lookBackDate: LOOK_BACK,
      showNewRecords: false,
      showUpdatedRecords: false,
    });
    expect(result.payload.body).toEqual({
      data: { created: [onLookBackDate, atMidnight], updated: [updated] },
    });
    expect(getState()?.lastPolledAt).toBeDefined();
  });
  it("sends the contacts search a bound one day before the Look-back Date", async () => {
    await runPerform(undefined, { lookBackDate: LOOK_BACK });
    expect(post.mock.calls[0][1].query.value[0].value).toBe(
      LOOK_BACK_UNIX - DAY,
    );
  });
  it("seeds companies from the Look-back Date", async () => {
    const { result } = await runPerform(undefined, {
      resourceType: "companies",
      lookBackDate: LOOK_BACK,
    });
    expect(result.payload.body).toEqual({
      data: { created: [onLookBackDate, atMidnight], updated: [updated] },
    });
  });
  it("ignores the Look-back Date once a position is stored", async () => {
    const { result } = await runPerform(
      { lastPolledAt: "2026-01-06T00:00:00.000Z" },
      { lookBackDate: "2025-01-01T00:00:00.000Z", showNewRecords: false },
    );
    expect(result.payload.body).toEqual({ data: { created: [], updated: [] } });
    expect(post.mock.calls[0][1].query.value[0].value).toBe(
      Date.parse("2026-01-06T00:00:00.000Z") / 1000,
    );
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
        resourceType: "contacts",
        lookBackDate: LOOK_BACK,
        showNewRecords: true,
        showUpdatedRecords: true,
      } as never);
    vi.setSystemTime(new Date("2026-02-01T00:00:00.000Z"));
    const first = await poll();
    expect(first.polledNoChanges).toBe(false);
    const firstPolledAt = state?.lastPolledAt as string;
    vi.setSystemTime(new Date("2026-02-02T00:00:00.000Z"));
    const second = await poll();
    expect(second.payload.body).toEqual({ data: { created: [], updated: [] } });
    expect(second.polledNoChanges).toBe(true);
    expect(Date.parse(state?.lastPolledAt as string)).toBeGreaterThan(
      Date.parse(firstPolledAt),
    );
  });
});
test("Look-back Date leads the optional tier, below the required inputs", () => {
  expect(Object.keys(pollChangesTrigger.inputs ?? {})).toEqual([
    "connection",
    "resourceType",
    "showNewRecords",
    "showUpdatedRecords",
    "lookBackDate",
  ]);
});
