import { invokeTrigger as invokeTriggerUntyped } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { STORE_HOST, storeConnection } from "../testHelpers";
import type { MagentoRecord } from "../types";
import { pollChangesTrigger } from "./pollChangesTrigger";
beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => {
  nock.cleanAll();
  vi.useRealTimers();
});
const ORDERS_PATH = "/rest/default/V1/orders";
type PollChangesResult = {
  payload: {
    body?: {
      data?: {
        created: MagentoRecord[];
        updated: MagentoRecord[];
      };
    };
  };
  polledNoChanges?: boolean;
};
const invokeTrigger = invokeTriggerUntyped as unknown as (
  triggerDef: unknown,
  context: {
    polling: {
      getState: () => Record<string, unknown>;
      setState: (patch: Record<string, unknown>) => void;
    };
  },
  payload: Record<string, unknown>,
  params: Record<string, unknown>,
) => Promise<{
  result: PollChangesResult;
  loggerMock: unknown;
}>;
const createPollingContext = (initialState: Record<string, unknown> = {}) => {
  let state: Record<string, unknown> = { ...initialState };
  return {
    polling: {
      getState: () => state,
      setState: (patch: Record<string, unknown>) => {
        state = { ...state, ...patch };
      },
    },
  };
};
const baseParams = {
  connection: storeConnection(),
  pollResourceType: "orders",
  lookBackDate: "",
  showNewRecords: true,
  showUpdatedRecords: true,
};
describe("pollChangesTrigger: first poll, no stored state", () => {
  test("seeds the cursor from the supplied look-back date", async () => {
    const scope = nock(STORE_HOST)
      .get(ORDERS_PATH)
      .query(
        (q) =>
          q["searchCriteria[filterGroups][0][filters][0][value]"] ===
          "2026-01-01 00:00:00",
      )
      .reply(200, { items: [] });
    const context = createPollingContext();
    const { result } = await invokeTrigger(
      pollChangesTrigger,
      context,
      {},
      {
        ...baseParams,
        lookBackDate: "2026-01-01T00:00:00.000Z",
      },
    );
    expect(scope.isDone()).toBe(true);
    expect(result.polledNoChanges).toBe(true);
  });
  test("seeds the cursor from now when no look-back date is supplied either", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-02-01T10:00:00.000Z"));
    const scope = nock(STORE_HOST)
      .get(ORDERS_PATH)
      .query(
        (q) =>
          q["searchCriteria[filterGroups][0][filters][0][value]"] ===
          "2026-02-01 10:00:00",
      )
      .reply(200, { items: [] });
    const context = createPollingContext();
    await invokeTrigger(pollChangesTrigger, context, {}, baseParams);
    expect(scope.isDone()).toBe(true);
  });
});
describe("pollChangesTrigger: not truncated", () => {
  test("advances the cursor to now", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-01T00:00:00.000Z"));
    nock(STORE_HOST).get(ORDERS_PATH).query(true).reply(200, { items: [] });
    const context = createPollingContext({
      lastPolledAt: "2026-02-01T00:00:00.000Z",
    });
    await invokeTrigger(pollChangesTrigger, context, {}, baseParams);
    expect(context.polling.getState().lastPolledAt).toBe(
      "2026-03-01T00:00:00.000Z",
    );
  });
});
describe("pollChangesTrigger: truncated", () => {
  test("advances the cursor to the newest fetched record, not to now, and the next poll resumes from there", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-04-01T00:00:00.000Z"));
    const page = {
      items: Array.from({ length: 100 }, (_, i) => ({
        entity_id: i + 1,
        created_at: "2026-01-01 00:00:00",
        updated_at: "2026-01-05 12:00:00",
      })),
    };
    const firstPollScope = nock(STORE_HOST)
      .get(ORDERS_PATH)
      .query(true)
      .times(50)
      .reply(200, page);
    const context = createPollingContext();
    const { result: firstResult } = await invokeTrigger(
      pollChangesTrigger,
      context,
      {},
      baseParams,
    );
    expect(firstPollScope.isDone()).toBe(true);
    expect(firstResult.polledNoChanges).toBe(false);
    expect(context.polling.getState().lastPolledAt).toBe(
      "2026-01-05T12:00:00.000Z",
    );
    expect(context.polling.getState().lastPolledAt).not.toBe(
      "2026-04-01T00:00:00.000Z",
    );
    const secondPollScope = nock(STORE_HOST)
      .get(ORDERS_PATH)
      .query(
        (q) =>
          q["searchCriteria[filterGroups][0][filters][0][value]"] ===
          "2026-01-05 12:00:00",
      )
      .reply(200, { items: [] });
    await invokeTrigger(pollChangesTrigger, context, {}, baseParams);
    expect(secondPollScope.isDone()).toBe(true);
  });
});
describe("pollChangesTrigger: created vs updated partition", () => {
  const lastPolledAt = "2026-05-01T00:00:00.000Z";
  const newRecord = {
    entity_id: 1,
    created_at: "2026-05-02 00:00:00",
    updated_at: "2026-05-02 00:00:00",
  };
  const changedRecord = {
    entity_id: 2,
    created_at: "2026-01-01 00:00:00",
    updated_at: "2026-05-03 00:00:00",
  };
  test("a record created after the cursor is classified as created; one created earlier but modified since is classified as updated", async () => {
    nock(STORE_HOST)
      .get(ORDERS_PATH)
      .query(true)
      .reply(200, { items: [newRecord, changedRecord] });
    const context = createPollingContext({ lastPolledAt });
    const { result } = await invokeTrigger(
      pollChangesTrigger,
      context,
      {},
      baseParams,
    );
    const data = result.payload.body?.data;
    expect(data?.created).toEqual([newRecord]);
    expect(data?.updated).toEqual([changedRecord]);
    expect(result.polledNoChanges).toBe(false);
  });
  test("Show New Records: false drops a new record entirely, rather than reclassifying it as updated", async () => {
    nock(STORE_HOST)
      .get(ORDERS_PATH)
      .query(true)
      .reply(200, { items: [newRecord] });
    const context = createPollingContext({ lastPolledAt });
    const { result } = await invokeTrigger(
      pollChangesTrigger,
      context,
      {},
      {
        ...baseParams,
        showNewRecords: false,
      },
    );
    const data = result.payload.body?.data;
    expect(data?.created).toEqual([]);
    expect(data?.updated).toEqual([]);
    expect(result.polledNoChanges).toBe(true);
  });
  test("Show Updated Records: false suppresses an updated record", async () => {
    nock(STORE_HOST)
      .get(ORDERS_PATH)
      .query(true)
      .reply(200, { items: [changedRecord] });
    const context = createPollingContext({ lastPolledAt });
    const { result } = await invokeTrigger(
      pollChangesTrigger,
      context,
      {},
      {
        ...baseParams,
        showUpdatedRecords: false,
      },
    );
    const data = result.payload.body?.data;
    expect(data?.updated).toEqual([]);
    expect(result.polledNoChanges).toBe(true);
  });
});
describe("pollChangesTrigger: unsupported resource type", () => {
  test("throws before making any request", async () => {
    const context = createPollingContext();
    await expect(
      invokeTrigger(
        pollChangesTrigger,
        context,
        {},
        {
          ...baseParams,
          pollResourceType: "invalidType",
        },
      ),
    ).rejects.toThrow("Unsupported resource type: invalidType");
  });
});
describe("pollChangesTrigger: the initial sync bypasses the visibility filters", () => {
  const newRecord = {
    entity_id: 3,
    created_at: "2026-05-02 00:00:00",
    updated_at: "2026-05-02 00:00:00",
  };
  const changedRecord = {
    entity_id: 4,
    created_at: "2025-06-01 00:00:00",
    updated_at: "2026-05-03 00:00:00",
  };
  const initialSyncParams = {
    ...baseParams,
    lookBackDate: "2026-01-01T00:00:00.000Z",
  };
  test("Show New Records: false does not suppress a created record while seeding history", async () => {
    nock(STORE_HOST)
      .get(ORDERS_PATH)
      .query(true)
      .reply(200, { items: [newRecord] });
    const context = createPollingContext();
    const { result } = await invokeTrigger(
      pollChangesTrigger,
      context,
      {},
      {
        ...initialSyncParams,
        showNewRecords: false,
      },
    );
    const data = result.payload.body?.data;
    expect(data?.created).toEqual([newRecord]);
    expect(result.polledNoChanges).toBe(false);
  });
  test("Show Updated Records: false does not suppress an updated record while seeding history", async () => {
    nock(STORE_HOST)
      .get(ORDERS_PATH)
      .query(true)
      .reply(200, { items: [changedRecord] });
    const context = createPollingContext();
    const { result } = await invokeTrigger(
      pollChangesTrigger,
      context,
      {},
      {
        ...initialSyncParams,
        showUpdatedRecords: false,
      },
    );
    const data = result.payload.body?.data;
    expect(data?.updated).toEqual([changedRecord]);
    expect(result.polledNoChanges).toBe(false);
  });
});
