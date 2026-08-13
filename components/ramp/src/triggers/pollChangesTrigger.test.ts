import { invokeTrigger } from "@prismatic-io/spectral/dist/testing";
import {
  getDepartmentResponse,
  listDepartmentsResponse,
} from "../examplePayloads/departments";
import {
  apiPath,
  createPollingStore,
  emptyListBody,
  freezeClockAt,
  listBody,
  type PollingStore,
  rampNock,
  resetNock,
  terminatePaging,
  testConnection,
} from "../testHarness";
import type { RampRecord } from "../types";
import { pollChangesTrigger } from "./pollChangesTrigger";
const POLL_ONE_AT = "2026-06-01T12:00:00.000Z";
const POLL_TWO_AT = "2026-06-01T13:00:00.000Z";
const POLL_THREE_AT = "2026-06-01T14:00:00.000Z";
const SEEDED_CURSOR = "2026-05-01T00:00:00.000Z";
const REIMBURSEMENTS_PATH = apiPath("reimbursements");
const TRANSACTIONS_PATH = apiPath("transactions");
const DEPARTMENTS_PATH = apiPath("departments");
const BILLS_PATH = apiPath("bills");
interface PollChanges {
  created: RampRecord[];
  updated: RampRecord[];
}
interface PollResult {
  payload: {
    body: {
      data: PollChanges;
    };
  };
  polledNoChanges: boolean;
}
const changesOf = (result: PollResult): PollChanges => result.payload.body.data;
const idsOf = (records: RampRecord[]): string[] =>
  records.map((record) => record.id);
const triggerUnderTest = {
  perform: pollChangesTrigger.perform,
} as unknown as Parameters<typeof invokeTrigger>[0];
const poll = async (
  store: PollingStore,
  resourceType: string,
): Promise<{
  result: PollResult;
}> => {
  const { result } = await invokeTrigger(
    triggerUnderTest,
    store.context,
    undefined,
    {
      connection: testConnection,
      resourceType,
      showNewRecords: true,
      showUpdatedRecords: true,
    },
  );
  return { result: result as unknown as PollResult };
};
describe("pollChangesTrigger", () => {
  afterEach(() => {
    resetNock();
    jest.useRealTimers();
  });
  describe("timestamp path", () => {
    test("advances the cursor and suppresses records the previous poll already emitted", async () => {
      const first: RampRecord = {
        id: "rb_1",
        created_at: "2026-05-15T00:00:00.000Z",
        updated_at: "2026-05-15T00:00:00.000Z",
      };
      const second: RampRecord = {
        id: "rb_2",
        created_at: "2026-06-01T12:30:00.000Z",
        updated_at: "2026-06-01T12:30:00.000Z",
      };
      const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
      freezeClockAt(POLL_ONE_AT);
      rampNock()
        .get(REIMBURSEMENTS_PATH)
        .query(true)
        .reply(200, listBody([first]));
      const pollOne = await poll(store, "reimbursements");
      expect(idsOf(changesOf(pollOne.result).created)).toEqual(["rb_1"]);
      expect(pollOne.result.polledNoChanges).toBe(false);
      expect(store.currentState()).toEqual({ lastPolledAt: POLL_ONE_AT });
      freezeClockAt(POLL_TWO_AT);
      rampNock()
        .get(REIMBURSEMENTS_PATH)
        .query(true)
        .reply(200, listBody([first, second]));
      const pollTwo = await poll(store, "reimbursements");
      expect(idsOf(changesOf(pollTwo.result).created)).toEqual(["rb_2"]);
      expect(store.currentState()).toEqual({ lastPolledAt: POLL_TWO_AT });
      expect(store.writes).toEqual([
        { lastPolledAt: POLL_ONE_AT },
        { lastPolledAt: POLL_TWO_AT },
      ]);
    });
    test("splits results into created and updated, preferring created when both timestamps are new", async () => {
      const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
      freezeClockAt(POLL_ONE_AT);
      rampNock()
        .get(REIMBURSEMENTS_PATH)
        .query(true)
        .reply(
          200,
          listBody([
            {
              id: "rb_new",
              created_at: "2026-05-15T00:00:00.000Z",
              updated_at: "2026-05-15T00:00:00.000Z",
            },
            {
              id: "rb_touched",
              created_at: "2026-04-01T00:00:00.000Z",
              updated_at: "2026-05-20T00:00:00.000Z",
            },
            {
              id: "rb_both",
              created_at: "2026-05-16T00:00:00.000Z",
              updated_at: "2026-05-21T00:00:00.000Z",
            },
            {
              id: "rb_stale",
              created_at: "2026-04-01T00:00:00.000Z",
              updated_at: "2026-04-02T00:00:00.000Z",
            },
          ]),
        );
      const { result } = await poll(store, "reimbursements");
      const changes = changesOf(result);
      expect(idsOf(changes.created)).toEqual(["rb_new", "rb_both"]);
      expect(idsOf(changes.updated)).toEqual(["rb_touched"]);
      expect(result.polledNoChanges).toBe(false);
    });
    test("leaves updated empty for a resource with no updated-at field", async () => {
      const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
      freezeClockAt(POLL_ONE_AT);
      rampNock()
        .get(TRANSACTIONS_PATH)
        .query(true)
        .reply(
          200,
          listBody([
            {
              id: "tx_1",
              user_transaction_time: "2026-05-15T00:00:00.000Z",
              updated_at: "2026-05-30T00:00:00.000Z",
            },
          ]),
        );
      const { result } = await poll(store, "transactions");
      const changes = changesOf(result);
      expect(idsOf(changes.created)).toEqual(["tx_1"]);
      expect(changes.updated).toEqual([]);
    });
    test("emits nothing on a cold first poll and only seeds the cursor", async () => {
      const store = createPollingStore();
      freezeClockAt(POLL_ONE_AT);
      rampNock()
        .get(TRANSACTIONS_PATH)
        .query(true)
        .reply(
          200,
          listBody([
            { id: "tx_old", user_transaction_time: "2026-05-15T00:00:00.000Z" },
            {
              id: "tx_recent",
              user_transaction_time: "2026-06-01T11:59:59.000Z",
            },
          ]),
        );
      const { result } = await poll(store, "transactions");
      const changes = changesOf(result);
      expect(changes.created).toEqual([]);
      expect(changes.updated).toEqual([]);
      expect(result.polledNoChanges).toBe(true);
      expect(store.currentState()).toEqual({ lastPolledAt: POLL_ONE_AT });
    });
    test("re-emits a record whose created_at is after the cursor it stored", async () => {
      const inFlight: RampRecord = {
        id: "rb_in_flight",
        created_at: "2026-06-01T12:00:00.001Z",
        updated_at: "2026-06-01T12:00:00.001Z",
      };
      const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
      freezeClockAt(POLL_ONE_AT);
      rampNock()
        .get(REIMBURSEMENTS_PATH)
        .query(true)
        .reply(200, listBody([inFlight]));
      const pollOne = await poll(store, "reimbursements");
      expect(idsOf(changesOf(pollOne.result).created)).toEqual([
        "rb_in_flight",
      ]);
      freezeClockAt(POLL_TWO_AT);
      rampNock()
        .get(REIMBURSEMENTS_PATH)
        .query(true)
        .reply(200, listBody([inFlight]));
      const pollTwo = await poll(store, "reimbursements");
      expect(idsOf(changesOf(pollTwo.result).created)).toEqual([
        "rb_in_flight",
      ]);
    });
  });
  describe("known-id path", () => {
    test("filters against known ids and rewrites the id set on every poll", async () => {
      const seededId = getDepartmentResponse.id;
      const addedDepartment = { id: "dp_added", name: "Facilities" };
      const store = createPollingStore();
      freezeClockAt(POLL_ONE_AT);
      rampNock()
        .get(DEPARTMENTS_PATH)
        .query(true)
        .reply(200, terminatePaging(listDepartmentsResponse));
      const pollOne = await poll(store, "departments");
      expect(idsOf(changesOf(pollOne.result).created)).toEqual([seededId]);
      expect(changesOf(pollOne.result).updated).toEqual([]);
      expect(store.currentState()).toEqual({
        lastPolledAt: POLL_ONE_AT,
        knownIds: [seededId],
      });
      freezeClockAt(POLL_TWO_AT);
      rampNock()
        .get(DEPARTMENTS_PATH)
        .query(true)
        .reply(200, listBody([getDepartmentResponse, addedDepartment]));
      const pollTwo = await poll(store, "departments");
      expect(idsOf(changesOf(pollTwo.result).created)).toEqual(["dp_added"]);
      expect(store.currentState()).toEqual({
        lastPolledAt: POLL_TWO_AT,
        knownIds: [seededId, "dp_added"],
      });
      freezeClockAt(POLL_THREE_AT);
      rampNock()
        .get(DEPARTMENTS_PATH)
        .query(true)
        .reply(200, listBody([addedDepartment]));
      const pollThree = await poll(store, "departments");
      expect(changesOf(pollThree.result).created).toEqual([]);
      expect(pollThree.result.polledNoChanges).toBe(true);
      expect(store.currentState()).toEqual({
        lastPolledAt: POLL_THREE_AT,
        knownIds: ["dp_added"],
      });
    });
  });
  test("reports no changes when the resource returns no records", async () => {
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
    freezeClockAt(POLL_ONE_AT);
    rampNock().get(BILLS_PATH).query(true).reply(200, emptyListBody());
    const { result } = await poll(store, "bills");
    const changes = changesOf(result);
    expect(changes.created).toEqual([]);
    expect(changes.updated).toEqual([]);
    expect(result.polledNoChanges).toBe(true);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_ONE_AT });
  });
  test("throws for a resource type with no poll configuration", async () => {
    const store = createPollingStore();
    freezeClockAt(POLL_ONE_AT);
    await expect(poll(store, "invoices")).rejects.toThrow(
      "Unsupported resource type: invoices",
    );
    expect(store.writes).toEqual([]);
  });
});
