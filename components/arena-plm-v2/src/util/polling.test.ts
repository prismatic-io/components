import { createClient } from "@prismatic-io/spectral/dist/clients/http";
import nock from "nock";
import { ARENA_MAX_PAGE_SIZE } from "../constants";
import type { ArenaRecord, PollingCursor } from "../types";
import {
  arenaEventsPath,
  fetchArenaEventsPage,
  resolveCursor,
  resolveCursorSafely,
  resolvePollingRecordChanges,
  windowIsEmpty,
} from "./polling";
const ARENA_HOST = "https://arena.example.com";
const API = "/v1";
const INTEGRATION_GUID = "OI1AB2CD3EF4GH5IJ6KL7MN1";
const NOW = "2026-03-21T09:00:00.000Z";
const client = () =>
  createClient({ baseUrl: `${ARENA_HOST}${API}`, responseType: "json" });
const event = (guid: string): ArenaRecord => ({
  guid,
  eventType: "CHANGE_EFFECTIVE",
  status: "COMPLETED",
  creationDateTime: "2026-03-21T08:40:00Z",
});
const page = (size: number): ArenaRecord[] =>
  Array.from({ length: size }, (_, i) => event(`EV${i}`));
const cursor = (overrides: Partial<PollingCursor> = {}): PollingCursor => ({
  windowStart: "2026-03-01T00:00:00.000Z",
  windowEnd: NOW,
  offset: 0,
  ...overrides,
});
const warnLogger = () => ({ warn: jest.fn() });
describe("arenaEventsPath", () => {
  it("builds the path under the outbound integrations collection", () => {
    expect(arenaEventsPath(INTEGRATION_GUID)).toBe(
      `/outboundintegrations/${INTEGRATION_GUID}/events`,
    );
  });
});
describe("resolveCursor", () => {
  it("resumes an incoming cursor ahead of everything else", () => {
    const incoming = cursor({ offset: 800 });
    expect(
      resolveCursor({
        incoming,
        state: { lastPolledAt: "2026-02-01T00:00:00.000Z", cursor: cursor() },
        lookBackDate: "2026-01-01T00:00:00Z",
        now: NOW,
      }),
    ).toEqual(incoming);
  });
  it("resumes a persisted cursor when the platform sent none", () => {
    const persisted = cursor({ offset: 400 });
    expect(
      resolveCursor({
        state: { lastPolledAt: "2026-02-01T00:00:00.000Z", cursor: persisted },
        now: NOW,
      }),
    ).toEqual(persisted);
  });
  it("opens an incremental window from the last recorded position", () => {
    expect(
      resolveCursor({
        state: { lastPolledAt: "2026-02-01T00:00:00.000Z" },
        now: NOW,
      }),
    ).toEqual({
      windowStart: "2026-02-01T00:00:00.000Z",
      windowEnd: NOW,
      offset: 0,
    });
  });
  it("opens the look back window on a first recurrence", () => {
    expect(
      resolveCursor({
        state: {},
        lookBackDate: "2026-01-01T00:00:00Z",
        now: NOW,
      }),
    ).toEqual({
      windowStart: "2026-01-01T00:00:00Z",
      windowEnd: NOW,
      offset: 0,
    });
  });
  it("collapses to an empty window with no look back date and no position", () => {
    expect(resolveCursor({ state: {}, now: NOW })).toEqual({
      windowStart: NOW,
      windowEnd: NOW,
      offset: 0,
    });
  });
  it.each([
    ["windowStart", { windowStart: "not-a-date" }],
    ["windowEnd", { windowEnd: "not-a-date" }],
    ["offset", { offset: -1 }],
    ["a non-integer offset", { offset: 1.5 }],
    ["a string offset", { offset: "400" as unknown as number }],
  ])("rejects a resumed cursor with an invalid %s", (_label, overrides) => {
    expect(() =>
      resolveCursor({
        incoming: cursor(overrides),
        state: {},
        now: NOW,
      }),
    ).toThrow(/Invalid polling/);
  });
});
describe("resolveCursorSafely", () => {
  it("discards a corrupted persisted cursor and falls back to the last position", () => {
    const logger = warnLogger();
    const resolved = resolveCursorSafely({
      state: {
        lastPolledAt: "2026-02-01T00:00:00.000Z",
        cursor: cursor({ offset: -5 }),
      },
      now: NOW,
      logger,
    });
    expect(resolved).toEqual({
      windowStart: "2026-02-01T00:00:00.000Z",
      windowEnd: NOW,
      offset: 0,
    });
    expect(logger.warn).toHaveBeenCalledTimes(1);
  });
  it("discards a corrupted position too and restarts from the look back date", () => {
    const logger = warnLogger();
    const resolved = resolveCursorSafely({
      state: { lastPolledAt: "not-a-date", cursor: cursor({ offset: -5 }) },
      lookBackDate: "2026-01-01T00:00:00Z",
      now: NOW,
      logger,
    });
    expect(resolved.windowStart).toBe("2026-01-01T00:00:00Z");
    expect(logger.warn).toHaveBeenCalledTimes(2);
  });
  it("rethrows a corrupted incoming cursor instead of salvaging it", () => {
    const logger = warnLogger();
    expect(() =>
      resolveCursorSafely({
        incoming: cursor({ windowEnd: "not-a-date" }),
        state: { lastPolledAt: "2026-02-01T00:00:00.000Z" },
        now: NOW,
        logger,
      }),
    ).toThrow(/Invalid polling/);
    expect(logger.warn).not.toHaveBeenCalled();
  });
});
describe("windowIsEmpty", () => {
  it("is true once the bounds meet", () => {
    expect(windowIsEmpty(cursor({ windowStart: NOW, windowEnd: NOW }))).toBe(
      true,
    );
  });
  it("is false while the window still spans time", () => {
    expect(windowIsEmpty(cursor())).toBe(false);
  });
  it("compares instants, not string lengths", () => {
    expect(
      windowIsEmpty(
        cursor({
          windowStart: "2026-03-21T09:00:00Z",
          windowEnd: "2026-03-21T09:00:00.000Z",
        }),
      ),
    ).toBe(true);
  });
});
describe("fetchArenaEventsPage", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  afterAll(() => {
    nock.restore();
  });
  it("sends the frozen window and the page offset as given", async () => {
    const scope = nock(ARENA_HOST)
      .get(`${API}${arenaEventsPath(INTEGRATION_GUID)}`)
      .query((actual) => {
        expect(actual.creationDateTimeFrom).toBe("2026-03-01T00:00:00.000Z");
        expect(actual.creationDateTimeTo).toBe(NOW);
        expect(actual.offset).toBe("400");
        expect(actual.limit).toBe(String(ARENA_MAX_PAGE_SIZE));
        return true;
      })
      .reply(200, { results: [event("EV1")], count: 1 });
    await fetchArenaEventsPage(
      client(),
      INTEGRATION_GUID,
      cursor({ offset: 400 }),
    );
    expect(scope.isDone()).toBe(true);
  });
  it("ends the window on a short page", async () => {
    nock(ARENA_HOST)
      .get(`${API}${arenaEventsPath(INTEGRATION_GUID)}`)
      .query(true)
      .reply(200, { results: [event("EV1")], count: 1 });
    const { records, nextCursor } = await fetchArenaEventsPage(
      client(),
      INTEGRATION_GUID,
      cursor(),
    );
    expect(records).toEqual([event("EV1")]);
    expect(nextCursor).toBeNull();
  });
  it("advances the offset on a full page, keeping the window frozen", async () => {
    nock(ARENA_HOST)
      .get(`${API}${arenaEventsPath(INTEGRATION_GUID)}`)
      .query(true)
      .reply(200, {
        results: page(ARENA_MAX_PAGE_SIZE),
        count: ARENA_MAX_PAGE_SIZE,
      });
    const { nextCursor } = await fetchArenaEventsPage(
      client(),
      INTEGRATION_GUID,
      cursor({ offset: 400 }),
    );
    expect(nextCursor).toEqual({
      windowStart: "2026-03-01T00:00:00.000Z",
      windowEnd: NOW,
      offset: 800,
    });
  });
  it("omits the reconciliation filter when none is given", async () => {
    const scope = nock(ARENA_HOST)
      .get(`${API}${arenaEventsPath(INTEGRATION_GUID)}`)
      .query((actual) => !("itemsReconciled" in actual))
      .reply(200, { results: [], count: 0 });
    await fetchArenaEventsPage(client(), INTEGRATION_GUID, cursor());
    expect(scope.isDone()).toBe(true);
  });
  it("passes the reconciliation filter through verbatim", async () => {
    const scope = nock(ARENA_HOST)
      .get(`${API}${arenaEventsPath(INTEGRATION_GUID)}`)
      .query((actual) => actual.itemsReconciled === "false")
      .reply(200, { results: [], count: 0 });
    await fetchArenaEventsPage(client(), INTEGRATION_GUID, cursor(), "false");
    expect(scope.isDone()).toBe(true);
  });
  it("ends the window when Arena answers without a results array", async () => {
    nock(ARENA_HOST)
      .get(`${API}${arenaEventsPath(INTEGRATION_GUID)}`)
      .query(true)
      .reply(200, { count: 0 });
    const { records, nextCursor } = await fetchArenaEventsPage(
      client(),
      INTEGRATION_GUID,
      cursor(),
    );
    expect(records).toEqual([]);
    expect(nextCursor).toBeNull();
  });
});
describe("resolvePollingRecordChanges", () => {
  it("tags every created record", () => {
    const records = [event("EV1"), event("EV2")];
    expect(resolvePollingRecordChanges({ createdRecords: records })).toEqual([
      { changeType: "created", record: records[0] },
      { changeType: "created", record: records[1] },
    ]);
  });
  it("returns an empty array for an empty changes object", () => {
    expect(resolvePollingRecordChanges({})).toEqual([]);
  });
  it("returns an empty array when createdRecords is absent", () => {
    expect(resolvePollingRecordChanges({ createdRecords: undefined })).toEqual(
      [],
    );
  });
  it("returns an empty array for an undefined envelope", () => {
    expect(resolvePollingRecordChanges(undefined)).toEqual([]);
  });
});
