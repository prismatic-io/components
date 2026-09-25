import { beforeEach, describe, expect, test, vi } from "vitest";
import type {
  IncrementalTicketsResponse,
  PollingState,
  Ticket,
} from "../types";
import { resolveTicketChanges } from "../util";
import { pollChangesTrigger } from "./pollChangesTrigger";
const { rawHttpClient } = vi.hoisted(() => ({ rawHttpClient: vi.fn() }));
vi.mock("../auth", () => ({ rawHttpClient: () => rawHttpClient() }));
const ticket = (id: number, createdAt: string, updatedAt: string): Ticket =>
  ({ id, created_at: createdAt, updated_at: updatedAt }) as unknown as Ticket;
const createdTicket = ticket(1, "2026-06-01T12:00:00Z", "2026-06-01T12:00:00Z");
const updatedTicket = ticket(2, "2020-01-01T00:00:00Z", "2026-06-01T12:00:00Z");
describe("pollChangesTrigger batching declaration", () => {
  test("declares opt-in batching with a default batch size and a pagination cursor", () => {
    expect(pollChangesTrigger.triggerResolverSupport).toBe("valid");
    expect(pollChangesTrigger.batchConfig).toEqual({ batchSize: 50 });
    expect(pollChangesTrigger.triggerResolver?.resolveItems).toBeInstanceOf(
      Function,
    );
    expect(
      pollChangesTrigger.triggerResolver?.getNextPaginationState,
    ).toBeInstanceOf(Function);
  });
  test("offers the Look-back Date directly below the connection", () => {
    expect(Object.keys(pollChangesTrigger.inputs ?? {})).toEqual([
      "connection",
      "lookBackDate",
      "showNewRecords",
      "showUpdatedRecords",
    ]);
  });
});
describe("resolveTicketChanges", () => {
  test("tags every ticket with how it changed", () => {
    expect(
      resolveTicketChanges({
        created: [createdTicket],
        updated: [updatedTicket],
      }),
    ).toEqual([
      { changeType: "created", record: createdTicket },
      { changeType: "updated", record: updatedTicket },
    ]);
  });
  test("tolerates an absent envelope, an empty one, and a single absent array", () => {
    expect(resolveTicketChanges(undefined)).toEqual([]);
    expect(resolveTicketChanges({})).toEqual([]);
    expect(resolveTicketChanges({ created: [createdTicket] })).toEqual([
      { changeType: "created", record: createdTicket },
    ]);
    expect(resolveTicketChanges({ updated: [updatedTicket] })).toEqual([
      { changeType: "updated", record: updatedTicket },
    ]);
  });
});
describe("triggerResolver.resolveItems", () => {
  test("flattens a realistic trigger payload into tagged items", () => {
    const items = pollChangesTrigger.triggerResolver?.resolveItems?.(
      {} as never,
      {
        payload: {
          body: {
            data: { created: [createdTicket], updated: [updatedTicket] },
          },
        },
      } as never,
    );
    expect(items).toEqual([
      { changeType: "created", record: createdTicket },
      { changeType: "updated", record: updatedTicket },
    ]);
  });
});
describe("polling state across a multi-round drain", () => {
  type PerformContext = Parameters<typeof pollChangesTrigger.perform>[0];
  type PerformPayload = Parameters<typeof pollChangesTrigger.perform>[1];
  let store: PollingState;
  let get: ReturnType<typeof vi.fn>;
  const page = (
    tickets: Ticket[],
    afterCursor: string,
    endOfStream: boolean,
  ): {
    data: IncrementalTicketsResponse;
  } =>
    ({
      data: { tickets, after_cursor: afterCursor, end_of_stream: endOfStream },
    }) as {
      data: IncrementalTicketsResponse;
    };
  const context = () =>
    ({
      polling: {
        getState: () => store,
        setState: (next: PollingState) => {
          store = next;
        },
      },
      debug: { enabled: false },
      logger: { debug: vi.fn() },
    }) as unknown as PerformContext;
  const params = {
    connection: {} as never,
    lookBackDate: "",
    showNewRecords: true,
    showUpdatedRecords: true,
  };
  beforeEach(() => {
    store = {};
    get = vi.fn();
    rawHttpClient.mockReturnValue({ get });
  });
  test("holds the classification boundary at the seed while pages remain", async () => {
    get.mockResolvedValue(page([updatedTicket], "cursor-1", false));
    const seeded = { ...params, lookBackDate: "2026-06-01T00:00:00.000Z" };
    const first = await pollChangesTrigger.perform(
      context(),
      {} as unknown as PerformPayload,
      seeded,
    );
    expect(get).toHaveBeenCalledTimes(10);
    expect(store.afterCursor).toBe("cursor-1");
    expect(store.lastPolledAt).toBe("2026-06-01T00:00:00.000Z");
    expect(store.backfillActive).toBe(true);
    expect(first.payload.paginationState).toEqual({ afterCursor: "cursor-1" });
  });
  test("resumes from the round's own cursor, not a stale stored one", async () => {
    store = { afterCursor: "stale-cursor" };
    get.mockResolvedValue(page([updatedTicket], "cursor-3", true));
    await pollChangesTrigger.perform(
      context(),
      {
        paginationState: { afterCursor: "fresh-cursor" },
      } as unknown as PerformPayload,
      params,
    );
    expect(get.mock.calls[0][1].params.cursor).toBe("fresh-cursor");
  });
  test("commits the boundary and drops the backfill flag at end_of_stream", async () => {
    store = {
      afterCursor: "cursor-1",
      lastPolledAt: "2026-06-01T00:00:00.000Z",
    };
    get.mockResolvedValue(page([updatedTicket], "cursor-2", true));
    const result = await pollChangesTrigger.perform(
      context(),
      {
        paginationState: { afterCursor: "cursor-1" },
      } as unknown as PerformPayload,
      params,
    );
    expect(store.afterCursor).toBe("cursor-2");
    expect(result.payload.paginationState).toBeUndefined();
    expect(store.backfillActive).toBeUndefined();
    expect(new Date(store.lastPolledAt as string).getTime()).toBeGreaterThan(
      new Date("2026-06-01T00:00:00.000Z").getTime(),
    );
  });
  test("commits the export horizon and never drops a returned ticket", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-06-02T00:00:00.000Z"));
    try {
      get.mockResolvedValue(page([], "cursor-2", true));
      await pollChangesTrigger.perform(
        context(),
        {} as unknown as PerformPayload,
        { ...params, lookBackDate: "2026-06-01T00:00:00.000Z" },
      );
      expect(store.lastPolledAt).toBe("2026-06-01T23:59:00.000Z");
      const lastMinute = ticket(
        3,
        "2026-06-01T23:59:30Z",
        "2026-06-01T23:59:30Z",
      );
      const staleUpdatedAt = ticket(
        4,
        "2020-01-01T00:00:00Z",
        "2026-06-01T23:58:00Z",
      );
      get.mockResolvedValue(
        page([lastMinute, staleUpdatedAt], "cursor-3", true),
      );
      const next = await pollChangesTrigger.perform(
        context(),
        {} as unknown as PerformPayload,
        params,
      );
      expect(next.payload.body.data).toEqual({
        created: [lastMinute],
        updated: [staleUpdatedAt],
      });
    } finally {
      vi.useRealTimers();
    }
  });
  test("reads one page per round once flow batching is enabled", async () => {
    get.mockResolvedValue(page([updatedTicket], "cursor-1", false));
    const batching = {
      ...(context() as unknown as Record<string, unknown>),
      batch: { enabled: true },
    } as unknown as PerformContext;
    await pollChangesTrigger.perform(
      batching,
      {} as unknown as PerformPayload,
      params,
    );
    expect(get).toHaveBeenCalledTimes(1);
    expect(get.mock.calls[0][1].params.per_page).toBe(100);
  });
  test("never reports no changes on a round the platform drove", async () => {
    get.mockResolvedValue(page([], "cursor-2", true));
    const driven = await pollChangesTrigger.perform(
      context(),
      {
        paginationState: { afterCursor: "cursor-1" },
      } as unknown as PerformPayload,
      params,
    );
    expect(driven.polledNoChanges).toBe(false);
    const scheduled = await pollChangesTrigger.perform(
      context(),
      {} as unknown as PerformPayload,
      params,
    );
    expect(scheduled.polledNoChanges).toBe(true);
  });
});
