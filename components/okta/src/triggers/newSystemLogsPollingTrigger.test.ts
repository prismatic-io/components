import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import type { SystemLogEvent } from "../interfaces/polling";
import { connection, makeContext } from "../testHelpers";
import {
  POLL_PAGE_SIZE,
  POLL_UNBATCHED_MAX_PAGES,
  POLL_UNBATCHED_PAGE_SIZE,
} from "../util/constants";
import { newSystemLogsPollingTrigger as trigger } from "./newSystemLogsPollingTrigger";
const { get } = vi.hoisted(() => ({ get: vi.fn() }));
vi.mock("../client", () => ({ createClient: async () => ({ get }) }));
const NOW = new Date("2026-10-12T12:00:00.000Z");
const BASE = "https://example.okta.com/api/v1/logs";
const linkTo = (after: string) =>
  `${BASE}?after=${after}&limit=${POLL_PAGE_SIZE}&sortOrder=ASCENDING`;
const headers = (after: string) => ({
  link: [
    `<${BASE}?limit=1>; rel="self"`,
    `<${linkTo(after)}>; rel="next"`,
  ].join(", "),
});
const event = (id: string): SystemLogEvent => ({
  uuid: id,
  published: "2026-10-12T11:00:00.000Z",
  eventType: "user.session.start",
});
const page = (events: SystemLogEvent[], after: string) => ({
  data: events,
  headers: headers(after),
});
type Out = {
  payload: {
    paginationState?: Record<string, unknown>;
    body: {
      data: SystemLogEvent[];
    };
  };
  polledNoChanges: boolean;
};
type RunOptions = {
  batching?: boolean;
  incoming?: Record<string, unknown>;
  lookBackDate?: string;
  filter?: string;
};
const run = async (state: Record<string, unknown>, opts: RunOptions = {}) => {
  const { context, store } = makeContext(state, opts.batching);
  const payload = {
    body: { data: undefined },
    paginationState: opts.incoming,
  } as never;
  const out = (await trigger.perform(context, payload, {
    connection,
    lookBackDate: opts.lookBackDate ?? "",
    filter: opts.filter,
  } as never)) as Out;
  return { out, store };
};
beforeEach(() => {
  get.mockReset();
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(NOW);
});
afterEach(() => vi.useRealTimers());
describe("batching declaration", () => {
  test("declares opt-in batching with the echo cursor resolver", () => {
    expect(trigger.triggerResolverSupport).toBe("valid");
    expect(trigger.batchConfig).toEqual({ batchSize: 50 });
    expect(trigger.triggerResolver?.resolveItems).toBeInstanceOf(Function);
    expect(trigger.triggerResolver?.getNextPaginationState).toBeInstanceOf(
      Function,
    );
  });
  test("offers the Look-back Date directly below the required connection", () => {
    expect(Object.keys(trigger.inputs ?? {})).toEqual([
      "connection",
      "lookBackDate",
      "filter",
    ]);
  });
  test("describes itself with the initial sync pattern", () => {
    expect(trigger.display.description).toBe(
      "Retrieves existing and ongoing system log events from Okta. Load history once, check for changes on a schedule, or both.",
    );
  });
});
describe("resolvers", () => {
  test("resolveItems flattens the bare array perform returns", () => {
    const e = event("1");
    expect(
      trigger.triggerResolver?.resolveItems?.(
        {} as never,
        { payload: { body: { data: [e] } } } as never,
      ),
    ).toEqual([{ changeType: "created", record: e }]);
    expect(
      trigger.triggerResolver?.resolveItems?.(
        {} as never,
        { payload: { body: {} } } as never,
      ),
    ).toEqual([]);
  });
  test("getNextPaginationState echoes the cursor perform decided", () => {
    const cursor = { next: linkTo("a") };
    const resolve = trigger.triggerResolver?.getNextPaginationState;
    expect(
      resolve?.({} as never, { payload: { paginationState: cursor } } as never),
    ).toEqual(cursor);
    expect(resolve?.({} as never, { payload: {} } as never)).toBeNull();
  });
});
describe("perform", () => {
  test("first poll without a stored link starts at now and persists the next link", async () => {
    get.mockResolvedValueOnce(page([], "a"));
    const { out, store } = await run({});
    expect(get).toHaveBeenCalledWith("/logs", {
      params: {
        since: NOW.toISOString(),
        filter: undefined,
        limit: POLL_UNBATCHED_PAGE_SIZE,
        sortOrder: "ASCENDING",
      },
    });
    expect(store.state).toMatchObject({ next: linkTo("a") });
    expect(store.state).not.toHaveProperty("lastUpdated");
    expect(out.polledNoChanges).toBe(true);
    expect(out.payload.paginationState).toBeUndefined();
  });
  test("a batched first request asks for the small page", async () => {
    get.mockResolvedValueOnce(page([], "a"));
    await run({}, { batching: true });
    expect(get.mock.calls[0][1].params).toMatchObject({
      limit: POLL_PAGE_SIZE,
    });
  });
  test("first poll seeds since from the Look-back Date and passes the filter", async () => {
    get.mockResolvedValueOnce(page([], "a"));
    await run(
      {},
      { lookBackDate: "2026-09-01T00:00:00.000Z", filter: 'eventType eq "x"' },
    );
    expect(get.mock.calls[0][1].params).toMatchObject({
      since: "2026-09-01T00:00:00.000Z",
      filter: 'eventType eq "x"',
    });
  });
  test("resumes from the stored next link, requesting it as given", async () => {
    get.mockResolvedValueOnce(page([], "b"));
    await run({ next: linkTo("a") });
    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith(linkTo("a"));
  });
  test("reads until an empty page, then stops and persists the latest link", async () => {
    get
      .mockResolvedValueOnce(page([event("1"), event("2")], "b"))
      .mockResolvedValueOnce(page([event("3")], "c"))
      .mockResolvedValueOnce(page([], "d"));
    const { out, store } = await run({ next: linkTo("a") });
    expect(get).toHaveBeenCalledTimes(3);
    expect(get).toHaveBeenNthCalledWith(2, linkTo("b"));
    expect(out.payload.body.data.map((e) => e.uuid)).toEqual(["1", "2", "3"]);
    expect(store.state).toMatchObject({ next: linkTo("d") });
    expect(out.payload.paginationState).toBeUndefined();
    expect(out.polledNoChanges).toBe(false);
  });
  test("an unbatched recurrence stops at its page budget and keeps the link for the next one", async () => {
    get.mockImplementation(async () => page([event("x")], "more"));
    const { out, store } = await run({ next: linkTo("a") });
    expect(get).toHaveBeenCalledTimes(POLL_UNBATCHED_MAX_PAGES);
    expect(out.payload.body.data).toHaveLength(POLL_UNBATCHED_MAX_PAGES);
    expect(store.state).toMatchObject({ next: linkTo("more") });
  });
  test("drains across platform-driven rounds, one page each, preferring the round's own cursor", async () => {
    get.mockResolvedValueOnce(page([event("1")], "b"));
    const first = await run({ next: linkTo("a") }, { batching: true });
    expect(get).toHaveBeenCalledTimes(1);
    expect(first.out.payload.paginationState).toEqual({ next: linkTo("b") });
    expect(first.store.state).toMatchObject({ next: linkTo("b") });
    get.mockResolvedValueOnce(page([], "c"));
    const second = await run(
      { next: linkTo("a") },
      { batching: true, incoming: { next: linkTo("b") } },
    );
    expect(get).toHaveBeenLastCalledWith(linkTo("b"));
    expect(second.out.payload.paginationState).toBeUndefined();
    expect(second.store.state).toMatchObject({ next: linkTo("c") });
  });
  test("polledNoChanges is false on a platform-driven round, true on a scheduled one", async () => {
    get.mockResolvedValue(page([], "z"));
    const driven = await run(
      { next: linkTo("a") },
      { batching: true, incoming: { next: linkTo("a") } },
    );
    expect(driven.out.polledNoChanges).toBe(false);
    const scheduled = await run({ next: linkTo("a") }, { batching: true });
    expect(scheduled.out.polledNoChanges).toBe(true);
  });
  test("a legacy lastUpdated state resumes from it, then stores the next link without it", async () => {
    const legacy = "2026-10-10T08:00:00.000Z";
    get
      .mockResolvedValueOnce(page([event("1")], "a"))
      .mockResolvedValueOnce(page([], "b"));
    const { store } = await run({ lastUpdated: legacy });
    expect(get.mock.calls[0][0]).toBe("/logs");
    expect(get.mock.calls[0][1].params.since).toBe(legacy);
    expect(store.state).toMatchObject({ seeded: true, next: linkTo("b") });
    expect(store.state).not.toHaveProperty("lastUpdated");
  });
  test("a legacy lastUpdated state wins over the Look-back Date, which only seeds a never-polled instance", async () => {
    const legacy = "2026-10-10T08:00:00.000Z";
    get.mockResolvedValueOnce(page([], "a"));
    await run(
      { lastUpdated: legacy },
      { lookBackDate: "2026-09-01T00:00:00.000Z" },
    );
    expect(get.mock.calls[0][1].params.since).toBe(legacy);
  });
  test("a held next link wins over a leftover legacy lastUpdated", async () => {
    get.mockResolvedValueOnce(page([], "b"));
    await run({ next: linkTo("a"), lastUpdated: "2026-10-10T08:00:00.000Z" });
    expect(get).toHaveBeenCalledWith(linkTo("a"));
  });
  test("ignores a stored link issued for another host", async () => {
    get.mockResolvedValueOnce(page([], "a"));
    await run({ next: "https://evil.example.com/api/v1/logs?after=x" });
    expect(get.mock.calls[0][0]).toBe("/logs");
  });
  test("ignores a stored link issued for a different Filter", async () => {
    get.mockResolvedValueOnce(page([], "a"));
    await run({ next: linkTo("a"), filter: "old" }, { filter: "new" });
    expect(get.mock.calls[0][0]).toBe("/logs");
  });
  test("a Filter change on a running instance restarts now, never from the Look-back Date", async () => {
    get.mockResolvedValueOnce(page([], "a"));
    const { store } = await run(
      { seeded: true, next: linkTo("a"), filter: "old" },
      { filter: "new", lookBackDate: "2026-09-01T00:00:00.000Z" },
    );
    expect(get.mock.calls[0][1].params).toMatchObject({
      since: NOW.toISOString(),
      filter: "new",
    });
    expect(store.state).toMatchObject({ seeded: true });
  });
  test("keeps the held link when a response carries no next link", async () => {
    get.mockResolvedValueOnce({ data: [], headers: {} });
    const { store } = await run({ next: linkTo("a") });
    expect(store.state).toMatchObject({ next: linkTo("a") });
  });
});
