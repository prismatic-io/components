import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { listUsers } from "../actions/users/listUsers";
import type { User } from "../interfaces/user";
import { connection, emptyPayload, makeContext } from "../testHelpers";
import { updatedUsersPollingTrigger as trigger } from "./updatedUsersPollingTrigger";

const NOW = new Date("2026-10-12T12:00:00.000Z");
const user = (id: string) =>
  ({ id, created: "2026-01-01T00:00:00.000Z" }) as User;
const mockUsers = (data: User[], advanceMs = 0) =>
  vi.spyOn(listUsers, "perform").mockImplementation(async () => {
    vi.setSystemTime(new Date(Date.now() + advanceMs));
    return { data } as never;
  });
type Out = { payload: { body: { data: User[] } }; polledNoChanges: boolean };
const run = async (state: Record<string, unknown>, lookBackDate = "") => {
  const { context, store } = makeContext(state);
  const out = (await trigger.perform(context, emptyPayload, {
    connection,
    lookBackDate,
  } as never)) as Out;
  return { out, store };
};

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(NOW);
});
afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe("batching declaration", () => {
  test("declares opt-in batching without a pagination cursor", () => {
    expect(trigger.triggerResolverSupport).toBe("valid");
    expect(trigger.batchConfig).toEqual({ batchSize: 50 });
    expect(trigger.triggerResolver?.resolveItems).toBeInstanceOf(Function);
    expect(trigger.triggerResolver?.getNextPaginationState).toBeUndefined();
  });

  test("offers the Look-back Date directly below the required connection", () => {
    expect(Object.keys(trigger.inputs ?? {})).toEqual([
      "connection",
      "lookBackDate",
    ]);
  });

  test("describes itself with the initial sync pattern", () => {
    expect(trigger.display.description).toBe(
      "Retrieves existing and ongoing users updated in Okta. Load history once, check for changes on a schedule, or both.",
    );
  });
});

describe("resolveItems", () => {
  test("flattens the bare array perform returns", () => {
    const u = user("1");
    expect(
      trigger.triggerResolver?.resolveItems?.(
        {} as never,
        { payload: { body: { data: [u] } } } as never,
      ),
    ).toEqual([{ changeType: "updated", record: u }]);
  });

  test("returns [] for an absent envelope", () => {
    expect(
      trigger.triggerResolver?.resolveItems?.(
        {} as never,
        { payload: { body: {} } } as never,
      ),
    ).toEqual([]);
  });
});

describe("perform", () => {
  test("first poll with a Look-back Date seeds the filter from it", async () => {
    const spy = mockUsers([user("1")]);
    const { out, store } = await run({}, "2026-01-01T00:00:00.000Z");
    expect(spy.mock.calls[0][1]).toMatchObject({
      filters: { filter: 'lastUpdated gt "2026-01-01T00:00:00.000Z"' },
      fetchAll: true,
    });
    expect(out.payload.body.data).toHaveLength(1);
    expect(out.polledNoChanges).toBe(false);
    expect(store.state).toEqual({ lastUpdated: NOW.toISOString() });
  });

  test("first poll without a Look-back Date starts at now and fetches nothing", async () => {
    const spy = mockUsers([user("1")]);
    const { out, store } = await run({});
    expect(spy).not.toHaveBeenCalled();
    expect(out.payload.body.data).toEqual([]);
    expect(out.polledNoChanges).toBe(true);
    expect(store.state).toEqual({ lastUpdated: NOW.toISOString() });
  });

  test("later polls filter on the stored cursor", async () => {
    const cursor = "2026-10-10T00:00:00.000Z";
    const spy = mockUsers([]);
    const { out } = await run(
      { lastUpdated: cursor },
      "2026-01-01T00:00:00.000Z",
    );
    expect(spy.mock.calls[0][1]).toMatchObject({
      filters: { filter: `lastUpdated gt "${cursor}"` },
    });
    expect(out.polledNoChanges).toBe(true);
  });

  test("commits the time captured before the fetch, not after it", async () => {
    mockUsers([], 60_000);
    const { store } = await run({ lastUpdated: "2026-10-10T00:00:00.000Z" });
    expect(Date.now()).toBe(NOW.getTime() + 60_000);
    expect(store.state).toEqual({ lastUpdated: NOW.toISOString() });
  });
});
