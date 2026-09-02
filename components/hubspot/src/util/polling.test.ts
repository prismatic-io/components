import {
  BATCHED_WINDOW_LIMIT,
  MAX_SEARCH_LIMIT,
  MAX_SEARCH_RESULTS,
  RATE_LIMIT_MAX_ATTEMPTS,
} from "../constants";
import type {
  PollingTriggerObject,
  PollingCursor,
  SearchRecordsPollingState,
} from "../types";
import {
  advanceCursor,
  buildPollingFilterGroups,
  buildPollingSearchBody,
  cycleFloor,
  fetchPollingWindow,
  getPollingChanges,
  resolveCursor,
  resolveCursorSafely,
  resolveLastModifiedProperty,
  windowFloor,
} from "./polling";
const NOW = "2026-08-11T12:00:00.000Z";
describe("resolveCursor", () => {
  test("seeds from lookBackDate when state is empty", () => {
    expect(
      resolveCursor({
        incoming: undefined,
        state: {},
        lookBackDate: "2026-01-01T00:00:00.000Z",
        now: NOW,
      }),
    ).toEqual({
      watermark: "2026-01-01T00:00:00.000Z",
      windowStart: "2026-01-01T00:00:00.000Z",
      windowEnd: NOW,
      isBackfill: true,
    });
  });
  test("seeds from now when state is empty and lookBackDate is blank", () => {
    expect(
      resolveCursor({
        incoming: undefined,
        state: {},
        lookBackDate: "",
        now: NOW,
      }),
    ).toEqual({
      watermark: NOW,
      windowStart: NOW,
      windowEnd: NOW,
      isBackfill: false,
    });
  });
  test("resumes incrementally from lastPolledAt", () => {
    expect(
      resolveCursor({
        incoming: undefined,
        state: { lastPolledAt: "2026-08-10T00:00:00.000Z" },
        lookBackDate: "2026-01-01T00:00:00.000Z",
        now: NOW,
      }),
    ).toEqual({
      watermark: "2026-08-10T00:00:00.000Z",
      windowStart: "2026-08-10T00:00:00.000Z",
      windowEnd: NOW,
      isBackfill: false,
    });
  });
  test("resumes a persisted cursor verbatim, ignoring lastPolledAt and lookBackDate", () => {
    const cursor: PollingCursor = {
      watermark: "2026-05-05T00:00:00.000Z",
      windowStart: "2026-01-01T00:00:00.000Z",
      windowEnd: "2026-08-01T00:00:00.000Z",
      isBackfill: false,
    };
    expect(
      resolveCursor({
        incoming: undefined,
        state: { lastPolledAt: "2026-08-10T00:00:00.000Z", cursor },
        lookBackDate: "2026-01-01T00:00:00.000Z",
        now: NOW,
      }),
    ).toEqual(cursor);
  });
  test("resumes an id-walk cursor intact", () => {
    const cursor: PollingCursor = {
      watermark: "2026-08-01T00:00:00.000Z",
      windowStart: "2026-08-01T00:00:00.000Z",
      windowEnd: "2026-08-11T00:00:00.000Z",
      isBackfill: false,
      idWalk: {
        denseTimestamp: "2026-08-03T00:00:00.000Z",
        idWatermark: "999",
      },
    };
    expect(
      resolveCursor({
        incoming: cursor,
        state: {},
        lookBackDate: "",
        now: NOW,
      }),
    ).toEqual(cursor);
  });
  test("rejects a corrupted idWalk (non-date denseTimestamp)", () => {
    const cursor = {
      watermark: "2026-08-01T00:00:00.000Z",
      windowStart: "2026-08-01T00:00:00.000Z",
      windowEnd: "2026-08-11T00:00:00.000Z",
      isBackfill: false,
      idWalk: { denseTimestamp: "nope", idWatermark: "1" },
    } as unknown as PollingCursor;
    expect(() =>
      resolveCursor({
        incoming: cursor,
        state: {},
        lookBackDate: "",
        now: NOW,
      }),
    ).toThrow(/Invalid polling cursor\.idWalk\.denseTimestamp/);
  });
  test("prefers the platform-supplied cursor over the persisted one", () => {
    const incoming: PollingCursor = {
      watermark: "2026-06-06T00:00:00.000Z",
      windowStart: "2026-01-01T00:00:00.000Z",
      windowEnd: "2026-08-01T00:00:00.000Z",
      isBackfill: false,
    };
    const persisted: PollingCursor = {
      watermark: "2026-05-05T00:00:00.000Z",
      windowStart: "2026-01-01T00:00:00.000Z",
      windowEnd: "2026-08-01T00:00:00.000Z",
      isBackfill: false,
    };
    expect(
      resolveCursor({
        incoming,
        state: { cursor: persisted },
        lookBackDate: "",
        now: NOW,
      }),
    ).toEqual(incoming);
  });
  test.each([
    ["watermark", { watermark: null }],
    ["windowStart", { windowStart: 1750000000000 }],
    ["windowEnd", { windowEnd: "not-a-date" }],
  ])("rejects a corrupted cursor.%s", (_field, override) => {
    const cursor = {
      watermark: "2026-05-05T00:00:00.000Z",
      windowStart: "2026-01-01T00:00:00.000Z",
      windowEnd: "2026-08-01T00:00:00.000Z",
      isBackfill: false,
      ...override,
    } as unknown as PollingCursor;
    expect(() =>
      resolveCursor({
        incoming: cursor,
        state: {},
        lookBackDate: "",
        now: NOW,
      }),
    ).toThrow(/Invalid polling cursor\./);
  });
  test("rejects a corrupted lastPolledAt", () => {
    expect(() =>
      resolveCursor({
        incoming: undefined,
        state: { lastPolledAt: "nope" } as SearchRecordsPollingState,
        lookBackDate: "",
        now: NOW,
      }),
    ).toThrow(/Invalid polling state\.lastPolledAt/);
  });
});
describe("resolveCursorSafely", () => {
  const logger = { warn: jest.fn() };
  beforeEach(() => logger.warn.mockClear());
  test("propagates a throw attributable to the incoming cursor", () => {
    expect(() =>
      resolveCursorSafely({
        incoming: { watermark: null } as unknown as PollingCursor,
        state: {},
        lookBackDate: "",
        now: NOW,
        logger,
      }),
    ).toThrow(/Invalid polling cursor\.watermark/);
    expect(logger.warn).not.toHaveBeenCalled();
  });
  test("discards a corrupted persisted cursor and falls back to lastPolledAt", () => {
    const result = resolveCursorSafely({
      incoming: undefined,
      state: {
        lastPolledAt: "2026-08-10T00:00:00.000Z",
        cursor: { watermark: null } as unknown as PollingCursor,
      },
      lookBackDate: "",
      now: NOW,
      logger,
    });
    expect(result).toEqual({
      watermark: "2026-08-10T00:00:00.000Z",
      windowStart: "2026-08-10T00:00:00.000Z",
      windowEnd: NOW,
      isBackfill: false,
    });
    expect(logger.warn).toHaveBeenCalledTimes(1);
  });
  test("discards both corrupted cursor and corrupted lastPolledAt, starting fresh", () => {
    const result = resolveCursorSafely({
      incoming: undefined,
      state: {
        lastPolledAt: "nope",
        cursor: { watermark: null } as unknown as PollingCursor,
      },
      lookBackDate: "2026-01-01T00:00:00.000Z",
      now: NOW,
      logger,
    });
    expect(result).toEqual({
      watermark: "2026-01-01T00:00:00.000Z",
      windowStart: "2026-01-01T00:00:00.000Z",
      windowEnd: NOW,
      isBackfill: true,
    });
    expect(logger.warn).toHaveBeenCalledTimes(2);
  });
});
const record = (updatedAt: string, id = updatedAt): PollingTriggerObject => ({
  id,
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt,
});
const CURSOR: PollingCursor = {
  watermark: "2026-08-01T00:00:00.000Z",
  windowStart: "2026-01-01T00:00:00.000Z",
  windowEnd: "2026-08-11T12:00:00.000Z",
  isBackfill: false,
};
describe("advanceCursor", () => {
  test("emits an exhausted window whole and stops", () => {
    const records = [
      record("2026-08-02T00:00:00.000Z"),
      record("2026-08-03T00:00:00.000Z"),
    ];
    expect(advanceCursor({ records, hasMore: false }, CURSOR)).toEqual({
      emit: records,
      nextCursor: null,
    });
  });
  test("stops on an empty window", () => {
    expect(advanceCursor({ records: [], hasMore: false }, CURSOR)).toEqual({
      emit: [],
      nextCursor: null,
    });
  });
  test("stops even when hasMore is true but no records came back", () => {
    expect(advanceCursor({ records: [], hasMore: true }, CURSOR)).toEqual({
      emit: [],
      nextCursor: null,
    });
  });
  test("trims the trailing partial millisecond and advances to it", () => {
    const records = [
      record("2026-08-02T00:00:00.000Z", "a"),
      record("2026-08-03T00:00:00.000Z", "b"),
      record("2026-08-03T00:00:00.000Z", "c"),
    ];
    const result = advanceCursor({ records, hasMore: true }, CURSOR);
    expect(result.emit.map((r) => r.id)).toEqual(["a"]);
    expect(result.nextCursor).toEqual({
      watermark: "2026-08-03T00:00:00.000Z",
      windowStart: CURSOR.windowStart,
      windowEnd: CURSOR.windowEnd,
      isBackfill: CURSOR.isBackfill,
    });
  });
  test("carries windowStart, windowEnd, and isBackfill through unchanged", () => {
    const records = [
      record("2026-08-02T00:00:00.000Z"),
      record("2026-08-03T00:00:00.000Z"),
    ];
    const { nextCursor } = advanceCursor(
      { records, hasMore: false },
      { ...CURSOR, isBackfill: true },
    );
    expect(nextCursor).toBeNull();
  });
  test("trims and advances by createdAt during a backfill, ignoring updatedAt order", () => {
    const records: PollingTriggerObject[] = [
      {
        id: "a",
        createdAt: "2026-08-02T00:00:00.000Z",
        updatedAt: "2026-08-09T00:00:00.000Z",
      },
      {
        id: "b",
        createdAt: "2026-08-03T00:00:00.000Z",
        updatedAt: "2026-08-08T00:00:00.000Z",
      },
      {
        id: "c",
        createdAt: "2026-08-03T00:00:00.000Z",
        updatedAt: "2026-08-07T00:00:00.000Z",
      },
    ];
    const result = advanceCursor(
      { records, hasMore: true },
      { ...CURSOR, isBackfill: true },
    );
    expect(result.emit.map((r) => r.id)).toEqual(["a"]);
    expect(result.nextCursor).toEqual({
      watermark: "2026-08-03T00:00:00.000Z",
      windowStart: CURSOR.windowStart,
      windowEnd: CURSOR.windowEnd,
      isBackfill: true,
    });
  });
  test("enters an id-walk when an entire full window shares one millisecond", () => {
    const records = [
      record("2026-08-03T00:00:00.000Z", "a"),
      record("2026-08-03T00:00:00.000Z", "b"),
    ];
    const result = advanceCursor({ records, hasMore: true }, CURSOR);
    expect(result.emit).toEqual([]);
    expect(result.nextCursor?.idWalk).toEqual({
      denseTimestamp: "2026-08-03T00:00:00.000Z",
      idWatermark: "",
    });
  });
  describe("id-walk", () => {
    const idWalkCursor = {
      ...CURSOR,
      idWalk: { denseTimestamp: "2026-08-03T00:00:00.000Z", idWatermark: "" },
    };
    test("emits the page and advances idWatermark to the last id while more remain", () => {
      const records = [
        record("2026-08-03T00:00:00.000Z", "100"),
        record("2026-08-03T00:00:00.000Z", "200"),
      ];
      const result = advanceCursor({ records, hasMore: true }, idWalkCursor);
      expect(result.emit.map((r) => r.id)).toEqual(["100", "200"]);
      expect(result.nextCursor?.idWalk).toEqual({
        denseTimestamp: "2026-08-03T00:00:00.000Z",
        idWatermark: "200",
      });
    });
    test("exits to the normal walk one ms later when the dense ms is exhausted", () => {
      const records = [record("2026-08-03T00:00:00.000Z", "300")];
      const result = advanceCursor({ records, hasMore: false }, idWalkCursor);
      expect(result.emit.map((r) => r.id)).toEqual(["300"]);
      expect(result.nextCursor?.idWalk).toBeUndefined();
      expect(result.nextCursor?.watermark).toBe("2026-08-03T00:00:00.001Z");
    });
    test("exits when a round returns no records", () => {
      const result = advanceCursor(
        { records: [], hasMore: true },
        idWalkCursor,
      );
      expect(result.emit).toEqual([]);
      expect(result.nextCursor?.idWalk).toBeUndefined();
      expect(result.nextCursor?.watermark).toBe("2026-08-03T00:00:00.001Z");
    });
  });
  test("throws when the boundary does not advance past the watermark", () => {
    const records = [
      record("2026-07-01T00:00:00.000Z", "a"),
      record("2026-08-01T00:00:00.000Z", "b"),
    ];
    expect(() => advanceCursor({ records, hasMore: true }, CURSOR)).toThrow(
      /at or before the current position/,
    );
  });
  test("throws when the trailing boundary is not a parseable date", () => {
    const records = [
      record("2026-08-02T00:00:00.000Z", "a"),
      record("garbage", "b"),
    ];
    expect(() => advanceCursor({ records, hasMore: true }, CURSOR)).toThrow(
      /Invalid polling record\.updatedAt/,
    );
  });
});
describe("resolveLastModifiedProperty", () => {
  test.each([
    ["/crm/v3/objects/companies/search", "hs_lastmodifieddate"],
    ["/crm/v3/objects/contacts/search", "lastmodifieddate"],
    ["/crm/v3/objects/tasks/search", "hs_lastmodifieddate"],
  ])("resolves %s to %s", (endpoint, expected) => {
    expect(resolveLastModifiedProperty(endpoint, false)).toBe(expected);
  });
  test("uses hs_lastmodifieddate for custom objects regardless of endpoint", () => {
    expect(resolveLastModifiedProperty(undefined, true)).toBe(
      "hs_lastmodifieddate",
    );
  });
  test("throws a named error for an unknown endpoint", () => {
    expect(() =>
      resolveLastModifiedProperty("/crm/v3/objects/nope/search", false),
    ).toThrow(
      /No last-modified property is known for the search endpoint \/crm\/v3\/objects\/nope\/search/,
    );
  });
  test("throws when no endpoint is supplied and custom objects are not selected", () => {
    expect(() => resolveLastModifiedProperty(undefined, false)).toThrow(
      /\(none provided\)/,
    );
  });
});
describe("buildPollingFilterGroups", () => {
  const cursorBounds = [
    {
      propertyName: "hs_lastmodifieddate",
      operator: "GTE",
      value: CURSOR.watermark,
    },
    {
      propertyName: "hs_lastmodifieddate",
      operator: "LT",
      value: CURSOR.windowEnd,
    },
  ];
  test("produces a single bounds-only group when the user set no filters", () => {
    expect(
      buildPollingFilterGroups(undefined, "hs_lastmodifieddate", CURSOR),
    ).toEqual([{ filters: cursorBounds }]);
  });
  test("promotes a bare filters array into one group and ANDs the bounds in", () => {
    const userFilter = {
      propertyName: "dealstage",
      operator: "EQ",
      value: "closedwon",
    };
    expect(
      buildPollingFilterGroups(
        { filters: [userFilter] },
        "hs_lastmodifieddate",
        CURSOR,
      ),
    ).toEqual([{ filters: [userFilter, ...cursorBounds] }]);
  });
  test("distributes the bounds into every user group, preserving OR-of-ANDs", () => {
    const a = { propertyName: "dealstage", operator: "EQ", value: "closedwon" };
    const b = {
      propertyName: "dealstage",
      operator: "EQ",
      value: "closedlost",
    };
    expect(
      buildPollingFilterGroups(
        { filterGroups: [{ filters: [a] }, { filters: [b] }] },
        "hs_lastmodifieddate",
        CURSOR,
      ),
    ).toEqual([
      { filters: [a, ...cursorBounds] },
      { filters: [b, ...cursorBounds] },
    ]);
  });
  test("never emits a createdate filter", () => {
    const groups = buildPollingFilterGroups(
      undefined,
      "hs_lastmodifieddate",
      CURSOR,
    );
    const names = groups.flatMap((g) =>
      (g.filters ?? []).map((f) => f.propertyName),
    );
    expect(names).not.toContain("createdate");
    expect(names).not.toContain("hs_createdate");
  });
  test("treats an empty filterGroups array as no filters and produces a bounds-only group", () => {
    expect(
      buildPollingFilterGroups(
        { filterGroups: [] },
        "hs_lastmodifieddate",
        CURSOR,
      ),
    ).toEqual([{ filters: cursorBounds }]);
  });
  test("treats an empty filters array as no filters and produces a bounds-only group", () => {
    expect(
      buildPollingFilterGroups({ filters: [] }, "hs_lastmodifieddate", CURSOR),
    ).toEqual([{ filters: cursorBounds }]);
  });
  test("rejects more than five filter groups", () => {
    const filterGroups = Array.from({ length: 6 }, () => ({ filters: [] }));
    expect(() =>
      buildPollingFilterGroups({ filterGroups }, "hs_lastmodifieddate", CURSOR),
    ).toThrow(/defines 6 filter groups, but HubSpot allows at most 5/);
  });
  test("rejects a group that exceeds six filters once the bounds are added", () => {
    const filters = Array.from({ length: 5 }, (_, i) => ({
      propertyName: `p${i}`,
      operator: "EQ",
      value: i,
    }));
    expect(() =>
      buildPollingFilterGroups(
        { filterGroups: [{ filters }] },
        "hs_lastmodifieddate",
        CURSOR,
      ),
    ).toThrow(/would carry 7 filters .* at most 6 per group/);
  });
  test("rejects exceeding eighteen filters in total", () => {
    const filterGroups = Array.from({ length: 5 }, (_, g) => ({
      filters: [
        { propertyName: `a${g}`, operator: "EQ", value: g },
        { propertyName: `b${g}`, operator: "EQ", value: g },
      ],
    }));
    expect(() =>
      buildPollingFilterGroups({ filterGroups }, "hs_lastmodifieddate", CURSOR),
    ).toThrow(/would produce 20 filters .* at most 18 in total/);
  });
});
describe("buildPollingSearchBody", () => {
  test("pins an ascending sort on the last-modified property, discarding user sorts", () => {
    const body = buildPollingSearchBody(
      { sorts: [{ propertyName: "createdate", direction: "DESCENDING" }] },
      "hs_lastmodifieddate",
      CURSOR,
      200,
    );
    expect(body.sorts).toEqual([
      { propertyName: "hs_lastmodifieddate", direction: "ASCENDING" },
    ]);
  });
  test("preserves unrelated search properties such as the requested property list", () => {
    const body = buildPollingSearchBody(
      { properties: ["dealname", "amount"], filters: [] },
      "hs_lastmodifieddate",
      CURSOR,
      200,
    );
    expect(body.properties).toEqual(["dealname", "amount"]);
  });
  test("drops the raw filters key so it cannot reach HubSpot alongside filterGroups", () => {
    const body = buildPollingSearchBody(
      { filters: [{ propertyName: "dealstage", operator: "EQ", value: "x" }] },
      "hs_lastmodifieddate",
      CURSOR,
      200,
    );
    expect(body).not.toHaveProperty("filters");
    expect(body.filterGroups).toHaveLength(1);
  });
  test("includes after only when supplied", () => {
    expect(
      buildPollingSearchBody(undefined, "hs_lastmodifieddate", CURSOR, 200),
    ).not.toHaveProperty("after");
    expect(
      buildPollingSearchBody(
        undefined,
        "hs_lastmodifieddate",
        CURSOR,
        200,
        "400",
      ).after,
    ).toBe("400");
  });
  test("in an id-walk, pins the exact millisecond and sorts by hs_object_id", () => {
    const cursor = {
      ...CURSOR,
      idWalk: {
        denseTimestamp: "2026-08-03T00:00:00.000Z",
        idWatermark: "500",
      },
    };
    const body = buildPollingSearchBody(
      undefined,
      "hs_lastmodifieddate",
      cursor,
      200,
    );
    expect(body.sorts).toEqual([
      { propertyName: "hs_object_id", direction: "ASCENDING" },
    ]);
    expect(body.filterGroups[0].filters).toEqual([
      {
        propertyName: "hs_lastmodifieddate",
        operator: "GTE",
        value: "2026-08-03T00:00:00.000Z",
      },
      {
        propertyName: "hs_lastmodifieddate",
        operator: "LT",
        value: "2026-08-03T00:00:00.001Z",
      },
      { propertyName: "hs_object_id", operator: "GT", value: "500" },
    ]);
  });
  test("omits the hs_object_id filter on the first id-walk page (empty watermark)", () => {
    const cursor = {
      ...CURSOR,
      idWalk: { denseTimestamp: "2026-08-03T00:00:00.000Z", idWatermark: "" },
    };
    const body = buildPollingSearchBody(
      undefined,
      "hs_lastmodifieddate",
      cursor,
      200,
    );
    expect(body.filterGroups[0].filters).toEqual([
      {
        propertyName: "hs_lastmodifieddate",
        operator: "GTE",
        value: "2026-08-03T00:00:00.000Z",
      },
      {
        propertyName: "hs_lastmodifieddate",
        operator: "LT",
        value: "2026-08-03T00:00:00.001Z",
      },
    ]);
  });
});
describe("windowFloor / cycleFloor", () => {
  test("each subtracts one millisecond from its own anchor", () => {
    expect(windowFloor(CURSOR).toISOString()).toBe("2026-07-31T23:59:59.999Z");
    expect(cycleFloor(CURSOR).toISOString()).toBe("2025-12-31T23:59:59.999Z");
  });
  test("the two anchors are equal on a freshly seeded cursor", () => {
    const seeded: PollingCursor = {
      watermark: "2026-01-01T00:00:00.000Z",
      windowStart: "2026-01-01T00:00:00.000Z",
      windowEnd: "2026-08-11T12:00:00.000Z",
      isBackfill: false,
    };
    expect(windowFloor(seeded).getTime()).toBe(cycleFloor(seeded).getTime());
  });
});
describe("getPollingChanges", () => {
  const rec = (
    id: string,
    createdAt: string,
    updatedAt: string,
  ): PollingTriggerObject => ({
    id,
    createdAt,
    updatedAt,
  });
  test("emits a record sitting exactly on the watermark", () => {
    const records = [
      rec("a", "2026-08-01T00:00:00.000Z", "2026-08-01T00:00:00.000Z"),
    ];
    const { changes } = getPollingChanges(
      true,
      true,
      records,
      windowFloor(CURSOR),
      cycleFloor(CURSOR),
    );
    expect(changes).toBeGreaterThan(0);
  });
  test("classifies a record created inside the cycle as created", () => {
    const records = [
      rec("a", "2026-08-02T00:00:00.000Z", "2026-08-02T00:00:00.000Z"),
    ];
    const { changesObject } = getPollingChanges(
      true,
      true,
      records,
      windowFloor(CURSOR),
      cycleFloor(CURSOR),
    );
    expect(changesObject.createdRecords?.map((r) => r.id)).toEqual(["a"]);
    expect(changesObject.updatedRecords).toEqual([]);
  });
  test("classifies a record created before the cycle but modified inside it as updated", () => {
    const records = [
      rec("a", "2025-06-01T00:00:00.000Z", "2026-08-02T00:00:00.000Z"),
    ];
    const { changesObject } = getPollingChanges(
      true,
      true,
      records,
      windowFloor(CURSOR),
      cycleFloor(CURSOR),
    );
    expect(changesObject.createdRecords).toEqual([]);
    expect(changesObject.updatedRecords?.map((r) => r.id)).toEqual(["a"]);
  });
  test("still reports created on a later window, where the two anchors differ", () => {
    const laterWindow: PollingCursor = {
      watermark: "2026-08-05T00:00:00.000Z",
      windowStart: "2026-01-01T00:00:00.000Z",
      windowEnd: "2026-08-11T12:00:00.000Z",
      isBackfill: false,
    };
    const records = [
      rec("a", "2026-02-01T00:00:00.000Z", "2026-08-06T00:00:00.000Z"),
    ];
    const { changesObject } = getPollingChanges(
      true,
      false,
      records,
      windowFloor(laterWindow),
      cycleFloor(laterWindow),
    );
    expect(changesObject.createdRecords?.map((r) => r.id)).toEqual(["a"]);
    expect(changesObject.updatedRecords).toEqual([]);
  });
  test.each([
    [true, true],
    [true, false],
    [false, true],
    [false, false],
  ])("carries both keys whatever the toggles say (new=%s updated=%s)", (showNew, showUpdated) => {
    const { changesObject } = getPollingChanges(
      showNew,
      showUpdated,
      [],
      windowFloor(CURSOR),
      cycleFloor(CURSOR),
    );
    expect(Object.keys(changesObject).sort()).toEqual([
      "createdRecords",
      "updatedRecords",
    ]);
  });
  test("counts a created-and-since-modified record as two changes", () => {
    const records = [
      rec("a", "2026-08-02T00:00:00.000Z", "2026-08-03T00:00:00.000Z"),
    ];
    const { changes, changesObject } = getPollingChanges(
      true,
      true,
      records,
      windowFloor(CURSOR),
      cycleFloor(CURSOR),
    );
    expect(changes).toBe(2);
    expect(changesObject.createdRecords).toHaveLength(1);
    expect(changesObject.updatedRecords).toHaveLength(1);
  });
  test("snapshot reports a created-and-since-modified record once, as created", () => {
    const records = [
      rec("a", "2026-08-02T00:00:00.000Z", "2026-08-03T00:00:00.000Z"),
    ];
    const { changes, changesObject } = getPollingChanges(
      true,
      true,
      records,
      windowFloor(CURSOR),
      cycleFloor(CURSOR),
      { snapshot: true },
    );
    expect(changes).toBe(1);
    expect(changesObject.createdRecords?.map((r) => r.id)).toEqual(["a"]);
    expect(changesObject.updatedRecords).toEqual([]);
  });
  test("snapshot reports every record as created, ignoring the toggles", () => {
    const records = [
      rec("a", "2026-08-02T00:00:00.000Z", "2026-08-02T00:00:00.000Z"),
      rec("b", "2026-08-03T00:00:00.000Z", "2026-08-04T00:00:00.000Z"),
    ];
    const { changes, changesObject } = getPollingChanges(
      false,
      false,
      records,
      windowFloor(CURSOR),
      cycleFloor(CURSOR),
      { snapshot: true },
    );
    expect(changes).toBe(2);
    expect(changesObject.createdRecords?.map((r) => r.id)).toEqual(["a", "b"]);
    expect(changesObject.updatedRecords).toEqual([]);
  });
});
const page = (count: number, after?: string, startMs = 0, total = count) => ({
  data: {
    total,
    results: Array.from({ length: count }, (_, i) => ({
      id: `${startMs + i}`,
      createdAt: new Date(startMs + i).toISOString(),
      updatedAt: new Date(startMs + i).toISOString(),
    })),
    ...(after ? { paging: { next: { after } } } : {}),
  },
});
const fakeLogger = () => ({ warn: jest.fn() });
const windowParams = {
  endpoint: "/crm/v3/objects/deals/search",
  searchProperties: undefined,
  dateProp: "hs_lastmodifieddate",
  cursor: CURSOR,
  windowLimit: MAX_SEARCH_RESULTS,
};
describe("fetchPollingWindow", () => {
  test("stops with hasMore false when HubSpot returns no next page", async () => {
    const client = { post: jest.fn().mockResolvedValue(page(3)) };
    const result = await fetchPollingWindow(
      client as never,
      windowParams,
      fakeLogger(),
    );
    expect(result.hasMore).toBe(false);
    expect(result.records).toHaveLength(3);
    expect(client.post).toHaveBeenCalledTimes(1);
  });
  test("follows the after cursor across pages", async () => {
    const client = {
      post: jest
        .fn()
        .mockResolvedValueOnce(page(MAX_SEARCH_LIMIT, "200", 0))
        .mockResolvedValueOnce(page(5, undefined, 1000)),
    };
    const result = await fetchPollingWindow(
      client as never,
      windowParams,
      fakeLogger(),
    );
    expect(result.records).toHaveLength(MAX_SEARCH_LIMIT + 5);
    expect(result.hasMore).toBe(false);
    expect(client.post.mock.calls[1][1].after).toBe("200");
  });
  test("stops at the result cap with hasMore true", async () => {
    const client = {
      post: jest
        .fn()
        .mockImplementation(() =>
          Promise.resolve(page(MAX_SEARCH_LIMIT, "next")),
        ),
    };
    const result = await fetchPollingWindow(
      client as never,
      windowParams,
      fakeLogger(),
    );
    expect(result.records).toHaveLength(MAX_SEARCH_RESULTS);
    expect(result.hasMore).toBe(true);
    expect(client.post).toHaveBeenCalledTimes(
      MAX_SEARCH_RESULTS / MAX_SEARCH_LIMIT,
    );
  });
  test("honors a smaller windowLimit, leaving the rest for a later round", async () => {
    const client = {
      post: jest
        .fn()
        .mockImplementation(() =>
          Promise.resolve(page(MAX_SEARCH_LIMIT, "next")),
        ),
    };
    const result = await fetchPollingWindow(
      client as never,
      { ...windowParams, windowLimit: BATCHED_WINDOW_LIMIT },
      fakeLogger(),
    );
    expect(result.records).toHaveLength(BATCHED_WINDOW_LIMIT);
    expect(result.hasMore).toBe(true);
    expect(client.post).toHaveBeenCalledTimes(
      BATCHED_WINDOW_LIMIT / MAX_SEARCH_LIMIT,
    );
  });
  test("never requests more than the remaining budget", async () => {
    const client = {
      post: jest
        .fn()
        .mockImplementation(() =>
          Promise.resolve(page(MAX_SEARCH_LIMIT, "next")),
        ),
    };
    await fetchPollingWindow(client as never, windowParams, fakeLogger());
    for (const call of client.post.mock.calls) {
      expect(call[1].limit).toBeLessThanOrEqual(MAX_SEARCH_LIMIT);
    }
  });
  test("retries a 429 honoring Retry-After, then succeeds", async () => {
    const rateLimited = {
      response: { status: 429, headers: { "retry-after": "0" } },
    };
    const client = {
      post: jest
        .fn()
        .mockRejectedValueOnce(rateLimited)
        .mockResolvedValueOnce(page(1)),
    };
    const logger = fakeLogger();
    const result = await fetchPollingWindow(
      client as never,
      windowParams,
      logger,
    );
    expect(result.records).toHaveLength(1);
    expect(client.post).toHaveBeenCalledTimes(2);
    expect(logger.warn).toHaveBeenCalledTimes(1);
  });
  test("gives up after the retry budget and rethrows the 429", async () => {
    const rateLimited = {
      response: { status: 429, headers: { "retry-after": "0" } },
    };
    const client = { post: jest.fn().mockRejectedValue(rateLimited) };
    await expect(
      fetchPollingWindow(client as never, windowParams, fakeLogger()),
    ).rejects.toBe(rateLimited);
    expect(client.post).toHaveBeenCalledTimes(RATE_LIMIT_MAX_ATTEMPTS);
  });
  test("treats a page that adds no records as exhaustion, even with a next-page token", async () => {
    const client = {
      post: jest.fn().mockResolvedValue({
        data: { total: 0, results: [], paging: { next: { after: "200" } } },
      }),
    };
    const result = await fetchPollingWindow(
      client as never,
      windowParams,
      fakeLogger(),
    );
    expect(result.hasMore).toBe(false);
    expect(result.records).toEqual([]);
    expect(client.post).toHaveBeenCalledTimes(1);
  });
  test("reports hasMore true from total when the last page omits paging.next", async () => {
    const client = {
      post: jest.fn().mockResolvedValue(page(3, undefined, 0, 100)),
    };
    const result = await fetchPollingWindow(
      client as never,
      windowParams,
      fakeLogger(),
    );
    expect(result.hasMore).toBe(true);
    expect(result.records).toHaveLength(3);
    expect(client.post).toHaveBeenCalledTimes(1);
  });
  test("reports hasMore false when total equals the records returned and there is no next page", async () => {
    const client = {
      post: jest.fn().mockResolvedValue(page(3, undefined, 0, 3)),
    };
    const result = await fetchPollingWindow(
      client as never,
      windowParams,
      fakeLogger(),
    );
    expect(result.hasMore).toBe(false);
    expect(result.records).toHaveLength(3);
    expect(client.post).toHaveBeenCalledTimes(1);
  });
  test("zero progress still wins over a large total", async () => {
    const client = {
      post: jest.fn().mockResolvedValue(page(0, undefined, 0, 999)),
    };
    const result = await fetchPollingWindow(
      client as never,
      windowParams,
      fakeLogger(),
    );
    expect(result.hasMore).toBe(false);
    expect(result.records).toEqual([]);
    expect(client.post).toHaveBeenCalledTimes(1);
  });
  test("translates an unknown-property 400 into a self-diagnosing error", async () => {
    const client = {
      post: jest.fn().mockRejectedValue({
        response: {
          status: 400,
          data: { message: 'Property "hs_lastmodifieddate" does not exist' },
        },
      }),
    };
    await expect(
      fetchPollingWindow(client as never, windowParams, fakeLogger()),
    ).rejects.toThrow(
      /property "hs_lastmodifieddate" is not searchable on \/crm\/v3\/objects\/deals\/search/,
    );
  });
  test("rethrows an unrelated 400 unchanged", async () => {
    const other = { response: { status: 400, data: { message: "bad limit" } } };
    const client = { post: jest.fn().mockRejectedValue(other) };
    await expect(
      fetchPollingWindow(client as never, windowParams, fakeLogger()),
    ).rejects.toBe(other);
  });
});
