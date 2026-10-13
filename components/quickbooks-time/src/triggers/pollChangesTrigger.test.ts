import {
  createConnection,
  defaultTriggerPayload,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { oauth } from "../connections";
import type { PollingState, QBTimeRecord, QBTimeRecordChanges } from "../types";
import { resolveQBTimeRecordChanges } from "../util";
import { pollChangesTrigger } from "./pollChangesTrigger";
const created: QBTimeRecord = { id: 1, created: "2026-01-01T10:00:00+00:00" };
const updated: QBTimeRecord = { id: 2, created: "2026-01-01T10:00:00+00:00" };
test("New Records is opt-in batchable with a default batch size", () => {
  expect(pollChangesTrigger.triggerResolverSupport).toBe("valid");
  expect(pollChangesTrigger.batchConfig).toEqual({ batchSize: 50 });
  expect(pollChangesTrigger.triggerResolver?.resolveItems).toBeInstanceOf(
    Function,
  );
});
test("offers the Look-back Date directly below the required inputs", () => {
  const inputs = (pollChangesTrigger.inputs ?? {}) as Record<
    string,
    {
      required?: boolean;
    }
  >;
  const keys = Object.keys(inputs);
  expect(keys).toEqual([
    "connection",
    "resourceType",
    "showNewRecords",
    "lookBackDate",
  ]);
  const lookBackIndex = keys.indexOf("lookBackDate");
  for (const key of keys.slice(0, lookBackIndex)) {
    expect(inputs[key].required).toBe(true);
  }
  expect(inputs.lookBackDate.required).toBe(false);
});
test("resolveQBTimeRecordChanges tags every record with how it changed", () => {
  expect(
    resolveQBTimeRecordChanges({ created: [created], updated: [updated] }),
  ).toEqual([
    { changeType: "created", record: created },
    { changeType: "updated", record: updated },
  ]);
});
test("resolveQBTimeRecordChanges returns [] for empty or undefined changes", () => {
  expect(resolveQBTimeRecordChanges({ created: [], updated: [] })).toEqual([]);
  expect(resolveQBTimeRecordChanges(undefined)).toEqual([]);
});
test("resolveQBTimeRecordChanges tolerates an empty envelope and a single absent array", () => {
  const partial = (data: object) => data as unknown as QBTimeRecordChanges;
  expect(resolveQBTimeRecordChanges(partial({}))).toEqual([]);
  expect(resolveQBTimeRecordChanges(partial({ created: [created] }))).toEqual([
    { changeType: "created", record: created },
  ]);
  expect(resolveQBTimeRecordChanges(partial({ updated: [updated] }))).toEqual([
    { changeType: "updated", record: updated },
  ]);
});
test("resolveItems flattens the payload shape perform actually returns", () => {
  const payload = {
    ...defaultTriggerPayload(),
    body: { data: { created: [created], updated: [] } },
  };
  expect(
    pollChangesTrigger.triggerResolver?.resolveItems?.({} as never, {
      payload,
    }),
  ).toEqual([{ changeType: "created", record: created }]);
});
test("resolveItems output splits into batches of the declared batchSize", () => {
  const chunk = <T>(items: T[], size: number): T[][] =>
    Array.from({ length: Math.ceil(items.length / size) }, (_, i) =>
      items.slice(i * size, (i + 1) * size),
    );
  const batchSize = pollChangesTrigger.batchConfig?.batchSize ?? 0;
  const records: QBTimeRecord[] = Array.from(
    { length: batchSize + 1 },
    (_, i) => ({
      id: i + 1,
    }),
  );
  const payload = {
    ...defaultTriggerPayload(),
    body: { data: { created: records, updated: [] } },
  };
  const items =
    pollChangesTrigger.triggerResolver?.resolveItems?.({} as never, {
      payload,
    }) ?? [];
  const batches = chunk(items, batchSize);
  expect(items).toHaveLength(batchSize + 1);
  expect(batches.map((b) => b.length)).toEqual([batchSize, 1]);
});
describe("pollChangesTrigger perform", () => {
  type PerformContext = Parameters<typeof pollChangesTrigger.perform>[0];
  type PerformPayload = Parameters<typeof pollChangesTrigger.perform>[1];
  type PerformParams = Parameters<typeof pollChangesTrigger.perform>[2];
  const BASE = "https://rest.tsheets.com/api/v1";
  const NOW = "2026-10-06T12:00:00.000Z";
  const LOOK_BACK = "2026-01-01T00:00:00.000Z";
  let store: PollingState | undefined;
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
  const payload = defaultTriggerPayload() as unknown as PerformPayload;
  const params = (overrides: Partial<Record<string, unknown>>) =>
    ({
      connection: createConnection(oauth, {}, { access_token: "test-token" }),
      resourceType: "timesheets",
      showNewRecords: true,
      lookBackDate: "",
      ...overrides,
    }) as unknown as PerformParams;
  const envelope = (object: string, records: QBTimeRecord[]) => ({
    results: {
      [object]: Object.fromEntries(records.map((r) => [String(r.id), r])),
    },
    more: false,
    supplemental_data: {},
  });
  const mockList = (
    object: string,
    query: Record<string, string>,
    records: QBTimeRecord[],
  ) =>
    nock(BASE, { reqheaders: { authorization: "Bearer test-token" } })
      .get(`/${object}`)
      .query({ ...query, page: "1", limit: "200" })
      .reply(200, envelope(object, records));
  const run = (overrides: Partial<Record<string, unknown>>) =>
    pollChangesTrigger.perform(context(), payload, params(overrides));
  beforeAll(() => {
    nock.disableNetConnect();
  });
  afterAll(() => {
    nock.enableNetConnect();
  });
  beforeEach(() => {
    store = undefined;
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(NOW));
  });
  afterEach(() => {
    vi.useRealTimers();
    expect(nock.isDone()).toBe(true);
    nock.cleanAll();
  });
  describe("timesheets", () => {
    test("first poll without a Look-back Date starts from today and emits every record", async () => {
      const records = [{ id: 101 }, { id: 102 }];
      mockList("timesheets", { start_date: "2026-10-06" }, records);
      const result = await run({});
      expect(result.payload.body.data).toEqual({
        created: records,
        updated: [],
      });
      expect(result.polledNoChanges).toBe(false);
      expect(store).toEqual({ lastPolledAt: NOW, knownIds: ["101", "102"] });
    });
    test("first poll with a Look-back Date starts from that day and emits every record even with Show New Records off", async () => {
      const records = [{ id: 101 }, { id: 102 }];
      mockList("timesheets", { start_date: "2026-01-01" }, records);
      const result = await run({
        lookBackDate: LOOK_BACK,
        showNewRecords: false,
      });
      expect(result.payload.body.data).toEqual({
        created: records,
        updated: [],
      });
      expect(result.polledNoChanges).toBe(false);
      expect(store).toEqual({ lastPolledAt: NOW, knownIds: ["101", "102"] });
    });
    test("a subsequent poll starts from the cursor's date, ignores the Look-back Date, and skips known ids", async () => {
      store = { lastPolledAt: "2026-10-05T08:30:00.000Z", knownIds: ["101"] };
      mockList("timesheets", { start_date: "2026-10-05" }, [
        { id: 101 },
        { id: 103 },
      ]);
      const result = await run({ lookBackDate: LOOK_BACK });
      expect(result.payload.body.data).toEqual({
        created: [{ id: 103 }],
        updated: [],
      });
      expect(result.polledNoChanges).toBe(false);
      expect(store).toEqual({ lastPolledAt: NOW, knownIds: ["101", "103"] });
    });
  });
  describe.each(["users", "jobcodes"])("%s", (resourceType) => {
    test("first poll without a Look-back Date records the baseline and emits nothing", async () => {
      mockList(resourceType, {}, [{ id: 1 }, { id: 2 }]);
      const result = await run({ resourceType });
      expect(result.payload.body.data).toEqual({ created: [], updated: [] });
      expect(result.polledNoChanges).toBe(true);
      expect(store).toEqual({ lastPolledAt: NOW, knownIds: ["1", "2"] });
    });
    test("first poll with a Look-back Date emits records created on or after it, even with Show New Records off", async () => {
      const after = { id: 1, created: "2026-01-10T15:04:05-06:00" };
      const atThreshold = { id: 2, created: "2025-12-31T18:00:00-06:00" };
      const before = { id: 3, created: "2025-12-31T23:59:59+00:00" };
      const missing = { id: 4 };
      const unparseable = { id: 5, created: "not-a-date" };
      mockList(resourceType, {}, [
        after,
        atThreshold,
        before,
        missing,
        unparseable,
      ]);
      const result = await run({
        resourceType,
        lookBackDate: LOOK_BACK,
        showNewRecords: false,
      });
      expect(result.payload.body.data).toEqual({
        created: [after, atThreshold],
        updated: [],
      });
      expect(result.polledNoChanges).toBe(false);
      expect(store).toEqual({
        lastPolledAt: NOW,
        knownIds: ["1", "2", "3", "4", "5"],
      });
    });
    test("state left by the response-parsing defect records a baseline instead of emitting every record", async () => {
      store = { lastPolledAt: "2026-10-05T08:30:00.000Z", knownIds: [""] };
      mockList(resourceType, {}, [{ id: 1 }, { id: 2 }]);
      const result = await run({ resourceType });
      expect(result.payload.body.data).toEqual({ created: [], updated: [] });
      expect(result.polledNoChanges).toBe(true);
      expect(store).toEqual({ lastPolledAt: NOW, knownIds: ["1", "2"] });
    });
    test("state left by the response-parsing defect runs the initial sync when a Look-back Date is set", async () => {
      store = { lastPolledAt: "2026-10-05T08:30:00.000Z", knownIds: [""] };
      const after = { id: 1, created: "2026-01-10T15:04:05-06:00" };
      const before = { id: 2, created: "2025-06-01T00:00:00+00:00" };
      mockList(resourceType, {}, [after, before]);
      const result = await run({ resourceType, lookBackDate: LOOK_BACK });
      expect(result.payload.body.data).toEqual({
        created: [after],
        updated: [],
      });
      expect(store).toEqual({ lastPolledAt: NOW, knownIds: ["1", "2"] });
    });
    test("an empty baseline is real, so the first record created afterwards is emitted", async () => {
      store = { lastPolledAt: "2026-10-05T08:30:00.000Z", knownIds: [] };
      mockList(resourceType, {}, [{ id: 1 }]);
      const result = await run({ resourceType });
      expect(result.payload.body.data).toEqual({
        created: [{ id: 1 }],
        updated: [],
      });
      expect(result.polledNoChanges).toBe(false);
    });
    test("a subsequent poll emits only unknown ids, comparing numeric ids to stored strings", async () => {
      store = {
        lastPolledAt: "2026-10-05T08:30:00.000Z",
        knownIds: ["1", "2"],
      };
      const fresh = { id: 3, created: "2020-01-01T00:00:00+00:00" };
      mockList(resourceType, {}, [{ id: 1 }, { id: 2 }, fresh]);
      const result = await run({ resourceType, lookBackDate: LOOK_BACK });
      expect(result.payload.body.data).toEqual({
        created: [fresh],
        updated: [],
      });
      expect(result.polledNoChanges).toBe(false);
      expect(store).toEqual({ lastPolledAt: NOW, knownIds: ["1", "2", "3"] });
    });
    test("Show New Records off suppresses new ids but still advances state past them", async () => {
      store = { lastPolledAt: "2026-10-05T08:30:00.000Z", knownIds: ["1"] };
      mockList(resourceType, {}, [{ id: 1 }, { id: 2 }]);
      const suppressed = await run({ resourceType, showNewRecords: false });
      expect(suppressed.payload.body.data).toEqual({
        created: [],
        updated: [],
      });
      expect(suppressed.polledNoChanges).toBe(true);
      expect(store).toEqual({ lastPolledAt: NOW, knownIds: ["1", "2"] });
      mockList(resourceType, {}, [{ id: 1 }, { id: 2 }]);
      const later = await run({ resourceType, showNewRecords: true });
      expect(later.payload.body.data).toEqual({ created: [], updated: [] });
      expect(later.polledNoChanges).toBe(true);
    });
    test("a poll that finds only known ids reports no changes", async () => {
      store = {
        lastPolledAt: "2026-10-05T08:30:00.000Z",
        knownIds: ["1", "2"],
      };
      mockList(resourceType, {}, [{ id: 1 }, { id: 2 }]);
      const result = await run({ resourceType });
      expect(result.payload.body.data).toEqual({ created: [], updated: [] });
      expect(result.polledNoChanges).toBe(true);
      expect(store).toEqual({ lastPolledAt: NOW, knownIds: ["1", "2"] });
    });
  });
});
