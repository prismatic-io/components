import { defaultTriggerPayload } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { BASE_URL_V2 } from "../constants";
import { listWorkersExamplePayload } from "../examplePayloads";
import type { RipplingRecord } from "../types";
import { lookBackDateClean, resolvePollingRecordChanges } from "../utils";
import { pollChangesTrigger } from "./pollChangesTrigger";
type PerformContext = Parameters<typeof pollChangesTrigger.perform>[0];
type PerformParams = Parameters<typeof pollChangesTrigger.perform>[2];
const NOW = "2026-06-01T12:00:00.000Z";
const CURSOR = "2026-06-01T00:00:00.000Z";
const record = (
  id: string,
  createdAt: string,
  updatedAt: string,
): RipplingRecord => ({ id, created_at: createdAt, updated_at: updatedAt });
const newRecord = record(
  "wrk_new",
  "2026-06-01T06:00:00.000Z",
  "2026-06-01T06:00:00.000Z",
);
const editedRecord = record(
  "wrk_edited",
  "2025-12-01T00:00:00.000Z",
  "2026-06-01T07:00:00.000Z",
);
const staleRecord = record(
  "wrk_stale",
  "2025-11-01T00:00:00.000Z",
  "2026-05-31T23:59:59.000Z",
);
const atCursorRecord = record("wrk_at_cursor", CURSOR, CURSOR);
const createdAtCursorEdited = record(
  "wrk_created_at_cursor",
  CURSOR,
  "2026-06-01T08:00:00.000Z",
);
const newAndEdited = [newRecord, editedRecord];
const makeContext = (initialState: Record<string, unknown> = {}) => {
  let state = initialState;
  const context = {
    debug: { enabled: false },
    logger: { debug: vi.fn() },
    polling: {
      getState: () => state,
      setState: (next: Record<string, unknown>) => {
        state = next;
      },
    },
  } as unknown as PerformContext;
  return { context, getState: () => state };
};
const makeParams = (overrides: Record<string, unknown> = {}) =>
  ({
    connection: { key: "bearerApiKey", fields: { apiKey: "test-key" } },
    pollResourceType: "workers",
    lookBackDate: "",
    showNewRecords: true,
    showUpdatedRecords: true,
    ...overrides,
  }) as unknown as PerformParams;
const runPerform = (
  context: PerformContext,
  overrides: Record<string, unknown> = {},
) =>
  pollChangesTrigger.perform(
    context,
    defaultTriggerPayload(),
    makeParams(overrides),
  );
const bodyData = (result: Awaited<ReturnType<typeof runPerform>>) =>
  result?.payload.body.data as {
    created: RipplingRecord[];
    updated: RipplingRecord[];
  };
const ids = (records: RipplingRecord[]) => records.map((r) => r.id);
const filterFor = (iso: string) => ({ filter: `updated_at gt '${iso}'` });
beforeEach(() => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date(NOW));
});
afterEach(() => {
  vi.useRealTimers();
  nock.cleanAll();
});
describe("pollChangesTrigger batching declaration", () => {
  test("New and Updated Records is opt-in batchable with a default batch size", () => {
    expect(pollChangesTrigger.triggerResolverSupport).toBe("valid");
    expect(pollChangesTrigger.batchConfig).toEqual({ batchSize: 50 });
    expect(pollChangesTrigger.triggerResolver?.resolveItems).toBeInstanceOf(
      Function,
    );
  });
  test("offers the Look-back Date directly below the required inputs", () => {
    expect(Object.keys(pollChangesTrigger.inputs ?? {})).toEqual([
      "connection",
      "pollResourceType",
      "lookBackDate",
      "showNewRecords",
      "showUpdatedRecords",
    ]);
  });
});
describe("resolvePollingRecordChanges", () => {
  test("tags every record with how it changed", () => {
    expect(
      resolvePollingRecordChanges({
        created: [newRecord],
        updated: [editedRecord],
      }),
    ).toEqual([
      { changeType: "created", record: newRecord },
      { changeType: "updated", record: editedRecord },
    ]);
  });
  test("tolerates an absent envelope, an empty one, and a single absent array", () => {
    expect(resolvePollingRecordChanges(undefined)).toEqual([]);
    expect(resolvePollingRecordChanges({ created: [], updated: [] })).toEqual(
      [],
    );
    expect(
      resolvePollingRecordChanges({ created: [newRecord] } as never),
    ).toEqual([{ changeType: "created", record: newRecord }]);
    expect(
      resolvePollingRecordChanges({ updated: [editedRecord] } as never),
    ).toEqual([{ changeType: "updated", record: editedRecord }]);
  });
});
describe("pollChangesTrigger triggerResolver", () => {
  const chunk = <T>(items: T[]): T[][] => {
    const size = pollChangesTrigger.batchConfig?.batchSize ?? 1;
    const chunks: T[][] = [];
    for (let i = 0; i < items.length; i += size) {
      chunks.push(items.slice(i, i + size));
    }
    return chunks;
  };
  test("resolveItems flattens a payload built from the example records", () => {
    const [exampleRecord] = listWorkersExamplePayload.data
      .results as unknown as RipplingRecord[];
    const payload = {
      ...defaultTriggerPayload(),
      body: { data: { created: [exampleRecord], updated: [editedRecord] } },
    };
    const items = pollChangesTrigger.triggerResolver?.resolveItems?.(
      {} as never,
      { payload },
    );
    expect(items).toEqual([
      { changeType: "created", record: exampleRecord },
      { changeType: "updated", record: editedRecord },
    ]);
  });
  test("resolveItems flattens the payload perform returns, ready to be chunked", async () => {
    nock(BASE_URL_V2)
      .get("/workers")
      .query(filterFor(CURSOR))
      .reply(200, { results: newAndEdited });
    const { context } = makeContext({ lastPolledAt: CURSOR });
    const result = await runPerform(context);
    const items = pollChangesTrigger.triggerResolver?.resolveItems?.(
      {} as never,
      { payload: result.payload },
    ) as unknown[];
    expect(items).toHaveLength(2);
    expect(chunk(items)).toEqual([items]);
  });
});
describe("pollChangesTrigger perform: server-filtered resource", () => {
  test("partitions records after the cursor into created and updated and drops older ones", async () => {
    nock(BASE_URL_V2)
      .get("/workers")
      .query(filterFor(CURSOR))
      .reply(200, {
        results: [
          newRecord,
          editedRecord,
          staleRecord,
          atCursorRecord,
          createdAtCursorEdited,
        ],
      });
    const { context } = makeContext({ lastPolledAt: CURSOR });
    const result = await runPerform(context);
    expect(ids(bodyData(result).created)).toEqual(["wrk_new"]);
    expect(ids(bodyData(result).updated)).toEqual([
      "wrk_edited",
      "wrk_created_at_cursor",
    ]);
    expect(result.polledNoChanges).toBe(false);
  });
  test("reports polledNoChanges when nothing is newer than the cursor", async () => {
    nock(BASE_URL_V2)
      .get("/workers")
      .query(filterFor(CURSOR))
      .reply(200, { results: [staleRecord, atCursorRecord] });
    const { context } = makeContext({ lastPolledAt: CURSOR });
    const result = await runPerform(context);
    expect(bodyData(result)).toEqual({ created: [], updated: [] });
    expect(result.polledNoChanges).toBe(true);
  });
  test("follows next_link cursors across pages", async () => {
    nock(BASE_URL_V2)
      .get("/workers")
      .query(filterFor(CURSOR))
      .reply(200, {
        results: [newRecord],
        next_link: `${BASE_URL_V2}/workers?cursor=page2`,
      });
    nock(BASE_URL_V2)
      .get("/workers")
      .query({ ...filterFor(CURSOR), cursor: "page2" })
      .reply(200, { results: [editedRecord] });
    const { context } = makeContext({ lastPolledAt: CURSOR });
    const result = await runPerform(context);
    expect(ids(bodyData(result).created)).toEqual(["wrk_new"]);
    expect(ids(bodyData(result).updated)).toEqual(["wrk_edited"]);
  });
  test("drops an old example record even when the server returns it", async () => {
    nock(BASE_URL_V2)
      .get("/workers")
      .query(filterFor(CURSOR))
      .reply(200, { results: listWorkersExamplePayload.data.results });
    const { context } = makeContext({ lastPolledAt: CURSOR });
    const result = await runPerform(context);
    expect(bodyData(result)).toEqual({ created: [], updated: [] });
  });
});
describe("pollChangesTrigger perform: ID-based resource (no date filter)", () => {
  test("fetches without a filter and filters client-side by timestamps", async () => {
    const noTimestamps = { id: "dep_bare" } as unknown as RipplingRecord;
    const noCreated = {
      id: "dep_no_created",
      updated_at: "2026-06-01T09:00:00.000Z",
    } as unknown as RipplingRecord;
    nock(BASE_URL_V2)
      .get("/departments")
      .reply(200, {
        results: [
          newRecord,
          editedRecord,
          staleRecord,
          noTimestamps,
          noCreated,
        ],
      });
    const { context } = makeContext({ lastPolledAt: CURSOR });
    const result = await runPerform(context, {
      pollResourceType: "departments",
    });
    expect(ids(bodyData(result).created)).toEqual(["wrk_new"]);
    expect(ids(bodyData(result).updated)).toEqual([
      "wrk_edited",
      "dep_no_created",
    ]);
  });
  test("teams are also fetched unfiltered", async () => {
    nock(BASE_URL_V2)
      .get("/teams")
      .reply(200, { results: [newRecord] });
    const { context } = makeContext({ lastPolledAt: CURSOR });
    const result = await runPerform(context, { pollResourceType: "teams" });
    expect(ids(bodyData(result).created)).toEqual(["wrk_new"]);
  });
});
describe("pollChangesTrigger perform: show switches", () => {
  const poll = async (overrides: Record<string, unknown>) => {
    nock(BASE_URL_V2)
      .get("/workers")
      .query(filterFor(CURSOR))
      .reply(200, { results: newAndEdited });
    const { context } = makeContext({ lastPolledAt: CURSOR });
    return runPerform(context, overrides);
  };
  test("Show New Records off hides created records", async () => {
    const result = await poll({ showNewRecords: false });
    expect(bodyData(result).created).toEqual([]);
    expect(ids(bodyData(result).updated)).toEqual(["wrk_edited"]);
  });
  test("Show Updated Records off hides updated records", async () => {
    const result = await poll({ showUpdatedRecords: false });
    expect(ids(bodyData(result).created)).toEqual(["wrk_new"]);
    expect(bodyData(result).updated).toEqual([]);
  });
  test("both off reports polledNoChanges", async () => {
    const result = await poll({
      showNewRecords: false,
      showUpdatedRecords: false,
    });
    expect(bodyData(result)).toEqual({ created: [], updated: [] });
    expect(result.polledNoChanges).toBe(true);
  });
});
describe("pollChangesTrigger perform: dedup across polls", () => {
  test("a second poll on the same store does not re-emit records already returned", async () => {
    const { context, getState } = makeContext({ lastPolledAt: CURSOR });
    nock(BASE_URL_V2).get("/departments").reply(200, { results: newAndEdited });
    const first = await runPerform(context, {
      pollResourceType: "departments",
    });
    expect(ids(bodyData(first).created)).toEqual(["wrk_new"]);
    expect(getState().lastPolledAt).toBe(NOW);
    vi.setSystemTime(new Date("2026-06-01T13:00:00.000Z"));
    nock(BASE_URL_V2).get("/departments").reply(200, { results: newAndEdited });
    const second = await runPerform(context, {
      pollResourceType: "departments",
    });
    expect(bodyData(second)).toEqual({ created: [], updated: [] });
    expect(second.polledNoChanges).toBe(true);
    expect(getState().lastPolledAt).toBe("2026-06-01T13:00:00.000Z");
  });
  test("the second server-filtered poll asks from the stored watermark", async () => {
    const { context } = makeContext({ lastPolledAt: CURSOR });
    nock(BASE_URL_V2)
      .get("/workers")
      .query(filterFor(CURSOR))
      .reply(200, { results: newAndEdited });
    await runPerform(context);
    vi.setSystemTime(new Date("2026-06-01T13:00:00.000Z"));
    nock(BASE_URL_V2)
      .get("/workers")
      .query(filterFor(NOW))
      .reply(200, { results: newAndEdited });
    const second = await runPerform(context);
    expect(bodyData(second)).toEqual({ created: [], updated: [] });
  });
});
describe("pollChangesTrigger initial sync", () => {
  test("seeds the first recurrence from the Look-back Date and stores the watermark", async () => {
    nock(BASE_URL_V2)
      .get("/workers")
      .query(filterFor("2026-01-01T00:00:00.000Z"))
      .reply(200, { results: newAndEdited });
    const { context, getState } = makeContext({});
    const result = await runPerform(context, {
      lookBackDate: "2026-01-01T00:00:00.000Z",
    });
    expect(ids(bodyData(result).created)).toEqual(["wrk_new"]);
    expect(ids(bodyData(result).updated)).toEqual(["wrk_edited"]);
    expect(getState().lastPolledAt).toBe(NOW);
  });
  test("persisted polling state wins over the Look-back Date and is rewritten", async () => {
    nock(BASE_URL_V2)
      .get("/workers")
      .query(filterFor("2026-01-02T12:00:00.000Z"))
      .reply(200, { results: [] });
    const { context, getState } = makeContext({
      lastPolledAt: "2026-01-02T12:00:00.000Z",
    });
    await runPerform(context, { lookBackDate: "2026-01-01T00:00:00.000Z" });
    expect(getState().lastPolledAt).toBe(NOW);
  });
  test("with no state and no Look-back Date the first recurrence starts at now", async () => {
    nock(BASE_URL_V2)
      .get("/workers")
      .query(filterFor(NOW))
      .reply(200, { results: [newRecord] });
    const { context } = makeContext({});
    const result = await runPerform(context);
    expect(bodyData(result)).toEqual({ created: [], updated: [] });
    expect(result.polledNoChanges).toBe(true);
  });
});
describe("lookBackDateClean", () => {
  test("returns an empty string for empty values", () => {
    expect(lookBackDateClean(undefined)).toBe("");
    expect(lookBackDateClean(null)).toBe("");
    expect(lookBackDateClean("  ")).toBe("");
  });
  test("converts a valid past date to an ISO timestamp", () => {
    expect(lookBackDateClean("2026-01-01")).toBe("2026-01-01T00:00:00.000Z");
  });
  test("rejects a wrong format, a non-calendar date, and a future date", () => {
    expect(() => lookBackDateClean("01/01/2026")).toThrow(/Look-back Date/);
    expect(() => lookBackDateClean("2026-02-31")).toThrow(/Look-back Date/);
    expect(() => lookBackDateClean("2999-01-01")).toThrow(
      /Look-back Date cannot be a future date/,
    );
  });
});
