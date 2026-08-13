import type { ActionContext, Connection } from "@prismatic-io/spectral";
import {
  createConnection,
  invokeTrigger,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { odooApiKey } from "../connections/odooApiKey";
import { pollChangesExamplePayload } from "../examplePayloads";
import type { OdooRecord } from "../types";
import { pollChangesTrigger } from "./pollChangesTrigger";
nock.disableNetConnect();
const ODOO_ORIGIN = "https://odoo.example.com";
const API_KEY = "test-api-key";
const DB = "odoo_db";
const MODEL = "res.partner";
const SEARCH_READ_PATH = `/json/2/${MODEL}/search_read`;
const POLL_ONE_AT = "2026-06-01T12:00:00.000Z";
const POLL_TWO_AT = "2026-06-01T13:00:00.000Z";
const SEEDED_CURSOR = "2026-05-01T00:00:00.000Z";
const testConnection = createConnection(odooApiKey, {
  baseUrl: ODOO_ORIGIN,
  db: DB,
  apiKey: API_KEY,
}) as unknown as Connection;
const odooNock = (): nock.Scope =>
  nock(ODOO_ORIGIN, {
    reqheaders: {
      authorization: `Bearer ${API_KEY}`,
      "x-odoo-database": DB,
    },
  });
const firstPageBody = (odooDateCursor: string) => ({
  domain: [["write_date", ">=", odooDateCursor]],
  fields: [],
  limit: 200,
  offset: 0,
  order: "write_date asc",
});
interface PollingStore {
  currentState: () => Record<string, unknown>;
  writes: Record<string, unknown>[];
  context: Partial<ActionContext>;
}
const createPollingStore = (
  seedState: Record<string, unknown> = {},
): PollingStore => {
  let state: Record<string, unknown> = seedState;
  const writes: Record<string, unknown>[] = [];
  return {
    currentState: () => state,
    writes,
    context: {
      polling: {
        getState: () => state,
        setState: (newState: Record<string, unknown>) => {
          state = newState;
          writes.push(newState);
        },
        invokeAction: () => {
          throw new Error("polling.invokeAction is not stubbed in tests");
        },
      },
    } as unknown as Partial<ActionContext>,
  };
};
const freezeClockAt = (isoInstant: string): void => {
  jest.useFakeTimers({
    doNotFake: [
      "cancelAnimationFrame",
      "cancelIdleCallback",
      "clearImmediate",
      "clearInterval",
      "clearTimeout",
      "hrtime",
      "nextTick",
      "performance",
      "queueMicrotask",
      "requestAnimationFrame",
      "requestIdleCallback",
      "setImmediate",
      "setInterval",
      "setTimeout",
    ],
  });
  jest.setSystemTime(new Date(isoInstant));
};
const triggerUnderTest = {
  perform: pollChangesTrigger.perform,
} as unknown as Parameters<typeof invokeTrigger>[0];
interface PollChanges {
  created: OdooRecord[];
  updated: OdooRecord[];
}
interface PollResult {
  payload: {
    body: {
      data: PollChanges;
    };
  };
  polledNoChanges: boolean;
}
const pollParams = {
  connection: testConnection,
  model: MODEL,
  showNewRecords: true,
  showUpdatedRecords: true,
};
const poll = async (store: PollingStore): Promise<PollResult> => {
  const { result } = await invokeTrigger(
    triggerUnderTest,
    store.context,
    undefined,
    pollParams as unknown as Parameters<typeof invokeTrigger>[3],
  );
  return result as unknown as PollResult;
};
const idsOf = (records: OdooRecord[]): unknown[] =>
  records.map((record) => record.id);
const fixtureBuckets = pollChangesExamplePayload.payload.body
  .data as unknown as PollChanges;
const fixtureCreated = fixtureBuckets.created;
const fixtureUpdated = fixtureBuckets.updated;
describe("pollChangesTrigger", () => {
  afterEach(() => {
    nock.cleanAll();
    jest.useRealTimers();
  });
  test("queries from `now` on a cold first poll and only seeds the cursor", async () => {
    const store = createPollingStore();
    freezeClockAt(POLL_ONE_AT);
    odooNock()
      .post(SEARCH_READ_PATH, firstPageBody("2026-06-01 12:00:00"))
      .reply(200, []);
    const result = await poll(store);
    expect(result.payload.body.data.created).toEqual([]);
    expect(result.payload.body.data.updated).toEqual([]);
    expect(result.polledNoChanges).toBe(true);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_ONE_AT });
    expect(store.writes).toEqual([{ lastPolledAt: POLL_ONE_AT }]);
  });
  test("splits records by create_date and advances the cursor to `now` when not truncated", async () => {
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
    freezeClockAt(POLL_ONE_AT);
    odooNock()
      .post(SEARCH_READ_PATH, firstPageBody("2026-05-01 00:00:00"))
      .reply(200, [...fixtureCreated, ...fixtureUpdated]);
    const result = await poll(store);
    expect(result.payload.body.data.created).toEqual(fixtureCreated);
    expect(result.payload.body.data.updated).toEqual(fixtureUpdated);
    expect(result.polledNoChanges).toBe(false);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_ONE_AT });
  });
  test("re-emits a record whose write_date sits on the boundary second, reclassified as updated", async () => {
    const boundaryRecord: OdooRecord = {
      id: 31,
      name: "Boundary Partner",
      create_date: "2026-06-01 12:00:00",
      write_date: "2026-06-01 12:00:00",
    };
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
    freezeClockAt(POLL_ONE_AT);
    odooNock()
      .post(SEARCH_READ_PATH, firstPageBody("2026-05-01 00:00:00"))
      .reply(200, [boundaryRecord]);
    const pollOne = await poll(store);
    expect(idsOf(pollOne.payload.body.data.created)).toEqual([31]);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_ONE_AT });
    freezeClockAt(POLL_TWO_AT);
    odooNock()
      .post(SEARCH_READ_PATH, firstPageBody("2026-06-01 12:00:00"))
      .reply(200, [boundaryRecord]);
    const pollTwo = await poll(store);
    expect(pollTwo.payload.body.data.created).toEqual([]);
    expect(idsOf(pollTwo.payload.body.data.updated)).toEqual([31]);
    expect(pollTwo.polledNoChanges).toBe(false);
    expect(store.writes).toEqual([
      { lastPolledAt: POLL_ONE_AT },
      { lastPolledAt: POLL_TWO_AT },
    ]);
  });
});
