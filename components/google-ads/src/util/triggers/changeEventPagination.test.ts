import type { ChangeEventCursor } from "../../types";
import {
  advanceChangeEventCursor,
  resolveChangeEventCursor,
} from "./changeEventPagination";
const row = (id: number, changeDateTime: string) => ({
  changeEvent: {
    resourceName: `customers/1/changeEvents/${id}~0~0`,
    changeDateTime,
  },
});
describe("resolveChangeEventCursor", () => {
  const nowTime = "2026-03-15 12:00:00";
  const cursor: ChangeEventCursor = {
    sinceTime: "2026-03-15 11:30:00",
    toTime: "2026-03-15 11:45:00",
    boundaryResourceNames: ["customers/1/changeEvents/3~0~0"],
  };
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-03-15T12:00:00Z"));
  });
  afterEach(() => vi.useRealTimers());
  test("with no drain in flight, opens a fresh window from lastChangeTime to now", () => {
    expect(
      resolveChangeEventCursor({
        state: { lastChangeTime: "2026-03-15 11:00:00" },
        nowTime,
        timeZone: "UTC",
      }),
    ).toEqual({
      sinceTime: "2026-03-15 11:00:00",
      toTime: nowTime,
      boundaryResourceNames: [],
    });
  });
  test("the incoming cursor wins over the mirrored one", () => {
    expect(
      resolveChangeEventCursor({
        incoming: cursor,
        state: {
          lastChangeTime: "2026-03-15 11:00:00",
          inFlightCursor: { ...cursor, sinceTime: "2026-03-15 11:10:00" },
        },
        nowTime,
        timeZone: "UTC",
      }),
    ).toEqual(cursor);
  });
  test("the mirrored cursor wins over lastChangeTime", () => {
    expect(
      resolveChangeEventCursor({
        state: {
          lastChangeTime: "2026-03-15 11:00:00",
          inFlightCursor: cursor,
        },
        nowTime,
        timeZone: "UTC",
      }),
    ).toEqual(cursor);
  });
  test("a malformed mirrored cursor is ignored in favor of lastChangeTime", () => {
    expect(
      resolveChangeEventCursor({
        state: {
          lastChangeTime: "2026-03-15 11:00:00",
          inFlightCursor: { sinceTime: 5 } as unknown as ChangeEventCursor,
        },
        nowTime,
        timeZone: "UTC",
      }).sinceTime,
    ).toBe("2026-03-15 11:00:00");
  });
  test("the lower bound is clamped to the change_event window", () => {
    const resolved = resolveChangeEventCursor({
      state: { lastChangeTime: "2025-01-01 00:00:00" },
      nowTime,
      timeZone: "UTC",
    });
    expect(resolved.sinceTime > "2026-02-01 00:00:00").toBe(true);
  });
});
describe("advanceChangeEventCursor", () => {
  const cursor: ChangeEventCursor = {
    sinceTime: "2026-03-15 11:00:00",
    toTime: "2026-03-15 12:00:00",
    boundaryResourceNames: [],
  };
  test("a short page ends the drain and emits every row", () => {
    const rows = [row(1, "2026-03-15 11:10:00.1")];
    expect(advanceChangeEventCursor(rows, cursor, 2)).toEqual({
      emit: rows,
      nextCursor: null,
    });
  });
  test("a full page resumes at the newest second, excluding the rows already emitted there", () => {
    const rows = [
      row(1, "2026-03-15 11:10:00.1"),
      row(2, "2026-03-15 11:20:00.1"),
      row(3, "2026-03-15 11:20:00.9"),
    ];
    expect(advanceChangeEventCursor(rows, cursor, 3)).toEqual({
      emit: rows,
      nextCursor: {
        ...cursor,
        sinceTime: "2026-03-15 11:20:00",
        boundaryResourceNames: [
          "customers/1/changeEvents/2~0~0",
          "customers/1/changeEvents/3~0~0",
        ],
      },
    });
  });
  test("rows already emitted at the boundary second are not emitted again", () => {
    const resumed = {
      ...cursor,
      sinceTime: "2026-03-15 11:20:00",
      boundaryResourceNames: ["customers/1/changeEvents/2~0~0"],
    };
    const rows = [
      row(2, "2026-03-15 11:20:00.1"),
      row(4, "2026-03-15 11:30:00.1"),
    ];
    expect(advanceChangeEventCursor(rows, resumed, 3)).toEqual({
      emit: [rows[1]],
      nextCursor: null,
    });
  });
  test("a full page that stays inside the boundary second accumulates its names", () => {
    const resumed = {
      ...cursor,
      sinceTime: "2026-03-15 11:20:00",
      boundaryResourceNames: ["customers/1/changeEvents/2~0~0"],
    };
    const rows = [
      row(2, "2026-03-15 11:20:00.1"),
      row(5, "2026-03-15 11:20:00.5"),
    ];
    expect(advanceChangeEventCursor(rows, resumed, 2).nextCursor).toEqual({
      ...resumed,
      boundaryResourceNames: [
        "customers/1/changeEvents/2~0~0",
        "customers/1/changeEvents/5~0~0",
      ],
    });
  });
  test("a full page of rows already emitted cannot advance, so it skips past that second with a warning", () => {
    const resumed = {
      ...cursor,
      sinceTime: "2026-03-15 11:20:00",
      boundaryResourceNames: [
        "customers/1/changeEvents/2~0~0",
        "customers/1/changeEvents/5~0~0",
      ],
    };
    const rows = [
      row(2, "2026-03-15 11:20:00.1"),
      row(5, "2026-03-15 11:20:00.5"),
    ];
    const warn = vi.fn();
    expect(advanceChangeEventCursor(rows, resumed, 2, { warn })).toEqual({
      emit: [],
      nextCursor: {
        ...resumed,
        sinceTime: "2026-03-15 11:20:01",
        boundaryResourceNames: [],
      },
    });
    expect(warn).toHaveBeenCalledTimes(1);
  });
  test("skipping past the last second of the window ends the drain", () => {
    const resumed = {
      ...cursor,
      sinceTime: "2026-03-15 11:59:59",
      boundaryResourceNames: ["customers/1/changeEvents/2~0~0"],
    };
    const rows = [row(2, "2026-03-15 11:59:59.1")];
    expect(
      advanceChangeEventCursor(rows, resumed, 1, { warn: vi.fn() }).nextCursor,
    ).toBeNull();
  });
});
