import type { Message } from "@microsoft/microsoft-graph-types";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import type { PollingState } from "../types";
import { lookBackDateClean, resolveMessageChanges } from "../util";
import { pollChangesTrigger } from "./pollChangesTrigger";

const { createClient } = vi.hoisted(() => ({ createClient: vi.fn() }));
vi.mock("../client", () => ({ createClient: () => createClient() }));

const message = (
  id: string,
  createdDateTime: string,
  lastModifiedDateTime: string,
): Message => ({ id, createdDateTime, lastModifiedDateTime }) as Message;

const createdMessage = message(
  "1",
  "2026-06-01T12:00:00Z",
  "2026-06-01T12:00:00Z",
);
const updatedMessage = message(
  "2",
  "2020-01-01T00:00:00Z",
  "2026-06-01T12:00:00Z",
);

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
      "pollFolderId",
      "showNewMessages",
      "showUpdatedMessages",
    ]);
  });
});

describe("resolveMessageChanges", () => {
  test("tags every message with how it changed", () => {
    expect(
      resolveMessageChanges({
        created: [createdMessage],
        updated: [updatedMessage],
      }),
    ).toEqual([
      { changeType: "created", record: createdMessage },
      { changeType: "updated", record: updatedMessage },
    ]);
  });

  test("tolerates an absent envelope, an empty one, and a single absent array", () => {
    expect(resolveMessageChanges(undefined)).toEqual([]);
    expect(resolveMessageChanges({ created: [], updated: [] })).toEqual([]);
    expect(
      resolveMessageChanges({ created: [createdMessage] } as never),
    ).toEqual([{ changeType: "created", record: createdMessage }]);
    expect(
      resolveMessageChanges({ updated: [updatedMessage] } as never),
    ).toEqual([{ changeType: "updated", record: updatedMessage }]);
  });
});

describe("triggerResolver.resolveItems", () => {
  test("flattens a realistic trigger payload into tagged items", () => {
    const items = pollChangesTrigger.triggerResolver?.resolveItems?.(
      {} as never,
      {
        payload: {
          body: {
            data: { created: [createdMessage], updated: [updatedMessage] },
          },
        },
      } as never,
    );

    expect(items).toEqual([
      { changeType: "created", record: createdMessage },
      { changeType: "updated", record: updatedMessage },
    ]);
  });
});

describe("lookBackDateClean", () => {
  test("returns an empty string for an empty value", () => {
    expect(lookBackDateClean(undefined)).toBe("");
    expect(lookBackDateClean("  ")).toBe("");
  });

  test("normalizes a valid past date to an ISO instant", () => {
    expect(lookBackDateClean("2026-01-01")).toBe("2026-01-01T00:00:00.000Z");
  });

  test("rejects a wrong format, a non-calendar date, and a future date", () => {
    expect(() => lookBackDateClean("01/01/2026")).toThrow(
      "Look-back Date must be",
    );
    expect(() => lookBackDateClean("2026-02-31")).toThrow(
      "Look-back Date must be",
    );
    expect(() => lookBackDateClean("2999-01-01")).toThrow(
      "cannot be a future date",
    );
  });
});

describe("keyset polling", () => {
  type PerformContext = Parameters<typeof pollChangesTrigger.perform>[0];
  type PerformPayload = Parameters<typeof pollChangesTrigger.perform>[1];

  const NOW = "2026-06-10T00:00:00.000Z";
  const HORIZON = "2026-06-09T23:59:00.000Z";
  const ENDPOINT = "/me/messages";

  const graphTs = (hour: number) =>
    `2026-06-01T${String(hour).padStart(2, "0")}:00:00Z`;
  const cursorTs = (hour: number) =>
    `2026-06-01T${String(hour).padStart(2, "0")}:00:00.000Z`;
  const modifiedAt = (
    id: string,
    hour: number,
    created = "2020-01-01T00:00:00Z",
  ): Message => message(id, created, graphTs(hour));

  let store: PollingState;
  let get: ReturnType<typeof vi.fn>;

  const page = (value: Message[], nextLink?: string) => ({
    data: { "@odata.context": "ctx", value, "@odata.nextLink": nextLink },
  });

  const context = (batching = false) =>
    ({
      polling: {
        getState: () => store,
        setState: (next: PollingState) => {
          store = next;
        },
      },
      batch: { enabled: batching },
      debug: { enabled: false },
      logger: { debug: vi.fn() },
    }) as unknown as PerformContext;

  const params = {
    connection: { key: "oauth2", fields: {} } as never,
    lookBackDate: "",
    pollFolderId: undefined as string | undefined,
    showNewMessages: true,
    showUpdatedMessages: true,
  };

  const run = (
    paginationState?: unknown,
    overrides: Partial<typeof params> = {},
    batching = false,
  ) =>
    pollChangesTrigger.perform(
      context(batching),
      (paginationState ? { paginationState } : {}) as unknown as PerformPayload,
      { ...params, ...overrides },
    );

  const delivered = (result: Awaited<ReturnType<typeof run>>) => {
    const data = result.payload.body.data as {
      created: Message[];
      updated: Message[];
    };
    return [...data.created, ...data.updated].map((m) => m.id);
  };

  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(NOW));
    store = {};
    get = vi.fn();
    createClient.mockReturnValue({ get });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("queries inclusively from the Look-back Date, bounded above by the safe horizon", async () => {
    get.mockResolvedValue(page([]));

    await run(undefined, { lookBackDate: "2026-05-01T00:00:00.000Z" });

    expect(get.mock.calls[0][0]).toBe(ENDPOINT);
    expect(get.mock.calls[0][1].params).toEqual({
      $filter: `lastModifiedDateTime ge 2026-05-01T00:00:00.000Z and lastModifiedDateTime le ${HORIZON}`,
      $orderby: "lastModifiedDateTime",
      $top: 100,
    });
  });

  test("advances to the last record's timestamp and remembers every id sharing it", async () => {
    get.mockResolvedValue(
      page(
        [modifiedAt("a", 1), modifiedAt("b", 2), modifiedAt("c", 2)],
        "https://graph/next",
      ),
    );

    const result = await run(
      undefined,
      { lookBackDate: "2026-06-01T00:00:00.000Z" },
      true,
    );

    const cursor = {
      watermark: cursorTs(2),
      boundaryIds: ["b", "c"],
      classifySince: "2026-06-01T00:00:00.000Z",
    };
    expect(result.payload.paginationState).toEqual(cursor);
    expect(store).toEqual({
      ...cursor,
      lastPolledAt: "2026-06-01T00:00:00.000Z",
      backfillActive: true,
    });
    expect(JSON.stringify(store)).not.toContain("graph/next");
  });

  test("re-reads ties at the watermark without re-delivering or losing any of them", async () => {
    store = { lastPolledAt: cursorTs(0), backfillActive: true };
    get.mockResolvedValue(
      page([
        modifiedAt("b", 2),
        modifiedAt("c", 2),
        modifiedAt("d", 2),
        modifiedAt("e", 3),
      ]),
    );

    const result = await run({
      watermark: cursorTs(2),
      boundaryIds: ["b", "c"],
      classifySince: cursorTs(0),
    });

    expect(get.mock.calls[0][1].params.$filter).toContain(`ge ${cursorTs(2)}`);
    expect(delivered(result)).toEqual(["d", "e"]);
    expect(result.payload.paginationState).toBeUndefined();
    expect(store).toEqual({
      watermark: cursorTs(3),
      boundaryIds: ["e"],
      lastPolledAt: cursorTs(3),
    });
  });

  test("a delivered message modified between rounds does not cost its neighbor", async () => {
    store = { lastPolledAt: cursorTs(0) };
    get.mockResolvedValueOnce(
      page([modifiedAt("m1", 1), modifiedAt("m2", 2)], "https://graph/skip=2"),
    );
    const first = await run(undefined, {}, true);
    expect(delivered(first)).toEqual(["m1", "m2"]);

    get.mockResolvedValueOnce(
      page([modifiedAt("m2", 2), modifiedAt("m3", 3), modifiedAt("m1", 5)]),
    );
    const second = await run(first.payload.paginationState, {}, true);

    expect(get.mock.calls[1][0]).toBe(ENDPOINT);
    expect(delivered(second)).toEqual(["m3", "m1"]);
    expect(store.lastPolledAt).toBe(cursorTs(5));
  });

  test("follows the page link inside the execution while a full page shares one timestamp", async () => {
    store = { lastPolledAt: cursorTs(0) };
    const tied = Array.from({ length: 100 }, (_, i) => modifiedAt(`t${i}`, 1));
    get
      .mockResolvedValueOnce(page(tied, "https://graph/tied-2"))
      .mockResolvedValueOnce(page([modifiedAt("t100", 1), modifiedAt("u", 2)]));

    const result = await run(undefined, {}, true);

    expect(get).toHaveBeenCalledTimes(2);
    expect(get.mock.calls[1][0]).toBe("https://graph/tied-2");
    expect(delivered(result)).toHaveLength(102);
    expect(store).toEqual({
      watermark: cursorTs(2),
      boundaryIds: ["u"],
      lastPolledAt: cursorTs(2),
    });
  });

  test("ignores a legacy stored page link and resumes from the last poll", async () => {
    store = {
      nextLink: "https://graph/legacy",
      streamStartedAt: "2026-06-05T00:00:00.000Z",
      lastPolledAt: cursorTs(1),
      backfillActive: true,
    };
    get.mockResolvedValue(page([modifiedAt("a", 1), modifiedAt("b", 4)]));

    const result = await run({
      nextLink: "https://graph/legacy",
      streamStartedAt: cursorTs(9),
    });

    expect(get.mock.calls[0][0]).toBe(ENDPOINT);
    expect(get.mock.calls[0][1].params.$filter).toContain(`ge ${cursorTs(1)}`);
    expect(delivered(result)).toEqual(["a", "b"]);
    expect(store).toEqual({
      watermark: cursorTs(4),
      boundaryIds: ["b"],
      lastPolledAt: cursorTs(4),
    });
  });

  test("reads up to ten keyset pages per recurrence with batching off", async () => {
    store = { lastPolledAt: cursorTs(0) };
    let hour = 0;
    get.mockImplementation(async () => {
      hour += 1;
      return page([modifiedAt(`h${hour}`, hour)], "https://graph/more");
    });

    const result = await run();

    expect(get).toHaveBeenCalledTimes(10);
    for (const [url] of get.mock.calls) expect(url).toBe(ENDPOINT);
    expect(get.mock.calls[9][1].params.$filter).toContain(`ge ${cursorTs(9)}`);
    const cursor = {
      watermark: cursorTs(10),
      boundaryIds: ["h10"],
      classifySince: cursorTs(0),
    };
    expect(store).toEqual({ ...cursor, lastPolledAt: cursorTs(0) });
    expect(result.payload.paginationState).toEqual(cursor);
  });

  test("the next recurrence resumes the stored position with batching off", async () => {
    store = {
      watermark: cursorTs(3),
      boundaryIds: ["x"],
      classifySince: cursorTs(0),
      lastPolledAt: cursorTs(0),
    };
    get.mockResolvedValue(page([modifiedAt("x", 3), modifiedAt("y", 4)]));

    const result = await run();

    expect(get.mock.calls[0][1].params.$filter).toContain(`ge ${cursorTs(3)}`);
    expect(delivered(result)).toEqual(["y"]);
    expect(store.lastPolledAt).toBe(cursorTs(4));
  });

  test("resumes from the round's own cursor, not a stale stored one", async () => {
    store = {
      watermark: cursorTs(1),
      boundaryIds: [],
      classifySince: cursorTs(0),
      lastPolledAt: cursorTs(0),
    };
    get.mockResolvedValue(page([]));

    await run({
      watermark: cursorTs(6),
      boundaryIds: [],
      classifySince: cursorTs(0),
    });

    expect(get.mock.calls[0][1].params.$filter).toContain(`ge ${cursorTs(6)}`);
  });

  test("classifies every round of a stream against the stream's starting boundary", async () => {
    store = { lastPolledAt: cursorTs(0) };
    const fresh = message("n", graphTs(3), graphTs(5));
    get.mockResolvedValue(page([fresh]));

    const result = await run({
      watermark: cursorTs(4),
      boundaryIds: [],
      classifySince: cursorTs(0),
    });

    expect(result.payload.body.data).toEqual({ created: [fresh], updated: [] });
  });

  test("restarts from the last poll when the Mail Folder ID changed mid-drain", async () => {
    store = {
      watermark: cursorTs(5),
      boundaryIds: ["x"],
      folderId: "old",
      classifySince: cursorTs(1),
      lastPolledAt: cursorTs(1),
    };
    get.mockResolvedValue(page([]));

    await run(undefined, { pollFolderId: "new" });

    expect(get.mock.calls[0][0]).toBe("/me/mailFolders/new/messages");
    expect(get.mock.calls[0][1].params.$filter).toContain(`ge ${cursorTs(1)}`);
  });

  test("an empty drained poll keeps the boundary where the data left it", async () => {
    store = {
      watermark: cursorTs(2),
      boundaryIds: ["b"],
      lastPolledAt: cursorTs(2),
    };
    get.mockResolvedValue(page([]));

    await run();

    expect(store).toEqual({
      watermark: cursorTs(2),
      boundaryIds: ["b"],
      lastPolledAt: cursorTs(2),
    });
  });

  test("reads one page per round once flow batching is enabled", async () => {
    get.mockResolvedValue(page([modifiedAt("a", 1)], "https://graph/next-1"));

    await run(undefined, { lookBackDate: cursorTs(0) }, true);

    expect(get).toHaveBeenCalledTimes(1);
    expect(get.mock.calls[0][1].params.$top).toBe(100);
    expect(get.mock.calls[0][1].params.$orderby).toBe("lastModifiedDateTime");
  });

  test("a backfill ignores the visibility toggles", async () => {
    get.mockResolvedValue(page([createdMessage, updatedMessage]));

    const result = await run(undefined, {
      lookBackDate: "2026-05-01T00:00:00.000Z",
      showNewMessages: false,
      showUpdatedMessages: false,
    });

    expect(result.payload.body.data).toEqual({
      created: [createdMessage],
      updated: [updatedMessage],
    });
  });

  describe("a non-backfill poll against a stored boundary", () => {
    const boundary = "2026-06-01T00:00:00.000Z";
    const afterBoundary = message(
      "10",
      "2026-06-02T00:00:00Z",
      "2026-06-02T00:00:00Z",
    );
    const beforeBoundary = message(
      "11",
      "2026-05-01T00:00:00Z",
      "2026-06-02T00:00:00Z",
    );

    beforeEach(() => {
      store = { lastPolledAt: boundary };
      get.mockResolvedValue(page([afterBoundary, beforeBoundary]));
    });

    test("partitions around the boundary: created after it is new, created before it is updated", async () => {
      const result = await run();

      expect(result.payload.body.data).toEqual({
        created: [afterBoundary],
        updated: [beforeBoundary],
      });
    });

    test("hides new messages when only Show New Messages is off", async () => {
      const result = await run(undefined, { showNewMessages: false });

      expect(result.payload.body.data).toEqual({
        created: [],
        updated: [beforeBoundary],
      });
    });

    test("hides updated messages when only Show Updated Messages is off", async () => {
      const result = await run(undefined, { showUpdatedMessages: false });

      expect(result.payload.body.data).toEqual({
        created: [afterBoundary],
        updated: [],
      });
    });

    test("never calls Graph when both toggles are off", async () => {
      const result = await run(undefined, {
        showNewMessages: false,
        showUpdatedMessages: false,
      });

      expect(get).not.toHaveBeenCalled();
      expect(result.payload.body.data).toEqual({ created: [], updated: [] });
      expect(result.polledNoChanges).toBe(true);
    });
  });

  test("never reports no changes on a round the platform drove", async () => {
    store = { lastPolledAt: cursorTs(0) };
    get.mockResolvedValue(page([]));

    const driven = await run({
      watermark: cursorTs(1),
      boundaryIds: [],
      classifySince: cursorTs(0),
    });
    expect(driven.polledNoChanges).toBe(false);

    const scheduled = await run();
    expect(scheduled.polledNoChanges).toBe(true);
  });
});
