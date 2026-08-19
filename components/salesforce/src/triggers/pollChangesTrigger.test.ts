import type { BatchInfo } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../client";
import type {
  PollingCursor,
  PollingState,
  PollingTriggerObject,
  SalesforceChangesObject,
  SalesforceRecordChange,
} from "../types";
import { MAX_BATCHED_PAGE_SIZE } from "../constants";
import { pollChangesTrigger } from "./pollChangesTrigger";
jest.mock("../client");
const mockedCreateSalesforceClient =
  createSalesforceClient as jest.MockedFunction<typeof createSalesforceClient>;
interface FakeClient {
  query: jest.Mock;
  describe: jest.Mock;
  sobject: jest.Mock;
}
const createFakeClient = (): FakeClient => ({
  query: jest.fn(),
  describe: jest
    .fn()
    .mockResolvedValue({ fields: [{ name: "Name", type: "string" }] }),
  sobject: jest.fn(),
});
const createContext = (initialState: PollingState = {}, batch?: BatchInfo) => {
  let state: Record<string, unknown> = initialState;
  const context = {
    logger: {
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    },
    polling: {
      getState: () => state,
      setState: (s: Record<string, unknown>) => {
        state = s;
      },
    },
    ...(batch === undefined ? {} : { batch }),
  } as never;
  return { context, getState: (): PollingState => state as PollingState };
};
interface TestParams {
  connection: unknown;
  version: string;
  recordType: string;
  showNewRecords: boolean;
  showUpdatedRecords: boolean;
  showDeletedRecords: boolean;
  selectedFields: string[];
  returnIdsOnly: boolean;
  lookBackDate: string;
  dynamicValues: Record<string, unknown>;
  fieldValues: Record<string, unknown>;
  fieldValueTypes: unknown[];
  maxRecordsToFetch: number;
}
const baseParams = (overrides: Partial<TestParams> = {}): TestParams => ({
  connection: { key: "salesforceOAuth" },
  version: "63.0",
  recordType: "Account",
  showNewRecords: true,
  showUpdatedRecords: true,
  showDeletedRecords: false,
  selectedFields: [],
  returnIdsOnly: false,
  lookBackDate: "",
  dynamicValues: {},
  fieldValues: {},
  fieldValueTypes: [],
  maxRecordsToFetch: 2,
  ...overrides,
});
const record = (
  id: string,
  createdDate: string,
  lastModifiedDate: string,
): PollingTriggerObject => ({
  Id: id,
  CreatedDate: createdDate,
  LastModifiedDate: lastModifiedDate,
});
describe("pollChangesTrigger perform composition", () => {
  let fakeClient: FakeClient;
  beforeEach(() => {
    fakeClient = createFakeClient();
    mockedCreateSalesforceClient.mockResolvedValue(fakeClient as never);
  });
  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });
  test("a full page keeps draining: paginationState is set, lastPolledAt holds at its committed value, and the cursor is persisted", async () => {
    const records = [
      record(
        "a",
        "2026-08-10T10:05:00.000+0000",
        "2026-08-10T10:05:00.000+0000",
      ),
      record(
        "b",
        "2026-08-10T10:06:00.000+0000",
        "2026-08-10T10:06:00.000+0000",
      ),
    ];
    fakeClient.query.mockResolvedValue({ records, done: true });
    const { context, getState } = createContext({
      lastPolledAt: "2026-08-10T10:00:00.000Z",
    });
    const result = await pollChangesTrigger.perform(
      context,
      { paginationState: undefined } as never,
      baseParams() as never,
    );
    const nextCursor = result.payload.paginationState as PollingCursor;
    expect(nextCursor).toBeDefined();
    expect(nextCursor.watermark).toBe("2026-08-10T10:06:00Z");
    const state = getState();
    expect(state.lastPolledAt).toBe("2026-08-10T10:00:00.000Z");
    expect(state.cursor).toEqual(nextCursor);
  });
  test("a full page on the very first poll, with no committed lastPolledAt, holds at the cursor's opening watermark", async () => {
    jest.useFakeTimers().setSystemTime(new Date("2026-08-10T12:00:00.000Z"));
    const records = [
      record(
        "a",
        "2026-08-01T00:05:00.000+0000",
        "2026-08-01T00:05:00.000+0000",
      ),
      record(
        "b",
        "2026-08-01T00:06:00.000+0000",
        "2026-08-01T00:06:00.000+0000",
      ),
    ];
    fakeClient.query.mockResolvedValue({ records, done: true });
    const { context, getState } = createContext({});
    const result = await pollChangesTrigger.perform(
      context,
      { paginationState: undefined } as never,
      baseParams({ lookBackDate: "2026-08-01T00:00:00.000Z" }) as never,
    );
    expect(result.payload.paginationState).toBeDefined();
    const state = getState();
    expect(state.lastPolledAt).toBe("2026-08-01T00:00:00.000Z");
  });
  test("polledNoChanges is false when a drain is in progress, even if nothing classified as a change this round", async () => {
    const records = [
      record(
        "a",
        "2026-08-10T10:05:00.000+0000",
        "2026-08-10T10:05:00.000+0000",
      ),
      record(
        "b",
        "2026-08-10T10:06:00.000+0000",
        "2026-08-10T10:06:00.000+0000",
      ),
    ];
    fakeClient.query.mockResolvedValue({ records, done: true });
    const { context } = createContext({
      lastPolledAt: "2026-08-10T10:00:00.000Z",
    });
    const result = await pollChangesTrigger.perform(
      context,
      { paginationState: undefined } as never,
      baseParams({ showNewRecords: false }) as never,
    );
    const data = result.payload.body.data as SalesforceChangesObject;
    expect(data.createdRecords).toEqual([]);
    expect(data.updatedRecords).toEqual([]);
    expect(result.payload.paginationState).toBeDefined();
    expect(result.polledNoChanges).toBe(false);
  });
  test("the final round of a platform-driven drain never reports polledNoChanges", async () => {
    jest.useFakeTimers().setSystemTime(new Date("2026-08-10T12:00:00.000Z"));
    fakeClient.query.mockResolvedValue({ records: [], done: true });
    const { context } = createContext({
      lastPolledAt: "2026-08-10T10:00:00.000Z",
    });
    const result = await pollChangesTrigger.perform(
      context,
      {
        paginationState: {
          watermark: "2026-08-10T11:00:00Z",
          windowStart: "2026-08-10T10:00:00Z",
          windowEnd: "2026-08-10T12:00:00Z",
          isBackfill: false,
        },
      } as never,
      baseParams() as never,
    );
    expect(result.payload.paginationState).toBeUndefined();
    const data = result.payload.body.data as SalesforceChangesObject;
    expect(data.createdRecords).toEqual([]);
    expect(data.updatedRecords).toEqual([]);
    expect(result.polledNoChanges).toBe(false);
  });
  test("without batching, an identical empty round still reports polledNoChanges", async () => {
    jest.useFakeTimers().setSystemTime(new Date("2026-08-10T12:00:00.000Z"));
    fakeClient.query.mockResolvedValue({ records: [], done: true });
    const { context } = createContext({
      lastPolledAt: "2026-08-10T10:00:00.000Z",
    });
    const result = await pollChangesTrigger.perform(
      context,
      { paginationState: undefined } as never,
      baseParams() as never,
    );
    expect(result.polledNoChanges).toBe(true);
  });
  test("a short page ends the drain: paginationState is undefined, lastPolledAt is the frozen windowEnd, and no cursor is persisted", async () => {
    jest.useFakeTimers().setSystemTime(new Date("2026-08-10T12:00:00.000Z"));
    fakeClient.query.mockResolvedValue({ records: [], done: true });
    const { context, getState } = createContext({
      lastPolledAt: "2026-08-10T10:00:00.000Z",
    });
    const result = await pollChangesTrigger.perform(
      context,
      { paginationState: undefined } as never,
      baseParams() as never,
    );
    expect(result.payload.paginationState).toBeUndefined();
    const state = getState();
    expect(state.lastPolledAt).toBe("2026-08-10T12:00:00.000Z");
    expect(state.cursor).toBeUndefined();
  });
  describe("the drain cursor rides in state on every round", () => {
    const fullPage = [
      record(
        "a",
        "2026-08-10T10:05:00.000+0000",
        "2026-08-10T10:05:00.000+0000",
      ),
      record(
        "b",
        "2026-08-10T10:06:00.000+0000",
        "2026-08-10T10:06:00.000+0000",
      ),
    ];
    test("an inbound paginationState: the cursor is persisted and lastPolledAt holds", async () => {
      fakeClient.query.mockResolvedValue({ records: fullPage, done: true });
      const { context, getState } = createContext({
        lastPolledAt: "2026-08-10T09:00:00.000Z",
      });
      const inboundCursor: PollingCursor = {
        watermark: "2026-08-10T10:00:00Z",
        windowStart: "2026-08-10T10:00:00Z",
        windowEnd: "2026-08-10T11:00:00Z",
        isBackfill: false,
      };
      const result = await pollChangesTrigger.perform(
        context,
        { paginationState: inboundCursor } as never,
        baseParams() as never,
      );
      expect(result.payload.paginationState).toBeDefined();
      const state = getState();
      expect(state.lastPolledAt).toBe("2026-08-10T09:00:00.000Z");
      expect(state.cursor).toEqual(result.payload.paginationState);
    });
    test("no inbound paginationState: the cursor is persisted and lastPolledAt holds", async () => {
      jest.useFakeTimers().setSystemTime(new Date("2026-08-10T12:00:00.000Z"));
      fakeClient.query.mockResolvedValue({ records: fullPage, done: true });
      const { context, getState } = createContext({
        lastPolledAt: "2026-08-10T10:00:00.000Z",
      });
      const result = await pollChangesTrigger.perform(
        context,
        { paginationState: undefined } as never,
        baseParams() as never,
      );
      const state = getState();
      expect(state.lastPolledAt).toBe("2026-08-10T10:00:00.000Z");
      expect(state.cursor).toEqual(result.payload.paginationState);
    });
  });
  describe("deletions are fetched on a cycle's first round only", () => {
    test("no inbound paginationState and no state.cursor: deletions are fetched", async () => {
      fakeClient.query.mockResolvedValue({ records: [], done: true });
      fakeClient.sobject.mockReturnValue({
        deleted: jest
          .fn()
          .mockResolvedValue({
            deletedRecords: [],
            latestDateCovered: "2026-08-10T11:00:00.000Z",
          }),
      });
      const { context } = createContext({
        lastPolledAt: "2026-08-10T10:00:00.000Z",
        lastDeletedAt: "2026-08-10T09:00:00.000Z",
      });
      await pollChangesTrigger.perform(
        context,
        { paginationState: undefined } as never,
        baseParams({ showDeletedRecords: true }) as never,
      );
      expect(fakeClient.sobject).toHaveBeenCalledWith("Account");
      const sobjectResult = fakeClient.sobject.mock.results[0].value as {
        deleted: jest.Mock;
      };
      expect(sobjectResult.deleted).toHaveBeenCalled();
    });
    test("an inbound paginationState (mid-drain continuation): deletions are skipped", async () => {
      fakeClient.query.mockResolvedValue({ records: [], done: true });
      fakeClient.sobject.mockReturnValue({
        deleted: jest
          .fn()
          .mockResolvedValue({ deletedRecords: [], latestDateCovered: "x" }),
      });
      const { context } = createContext({
        lastDeletedAt: "2026-08-10T09:00:00.000Z",
      });
      const inboundCursor: PollingCursor = {
        watermark: "2026-08-10T10:00:00Z",
        windowStart: "2026-08-10T10:00:00Z",
        windowEnd: "2026-08-10T11:00:00Z",
        isBackfill: false,
      };
      await pollChangesTrigger.perform(
        context,
        { paginationState: inboundCursor } as never,
        baseParams({ showDeletedRecords: true }) as never,
      );
      expect(fakeClient.sobject).not.toHaveBeenCalled();
    });
    test("state.cursor present with no inbound paginationState (poll-to-poll continuation): deletions are skipped", async () => {
      fakeClient.query.mockResolvedValue({ records: [], done: true });
      fakeClient.sobject.mockReturnValue({
        deleted: jest
          .fn()
          .mockResolvedValue({ deletedRecords: [], latestDateCovered: "x" }),
      });
      const { context } = createContext({
        cursor: {
          watermark: "2026-08-10T10:00:00Z",
          windowStart: "2026-08-10T10:00:00Z",
          windowEnd: "2026-08-10T11:00:00Z",
          isBackfill: false,
        },
        lastDeletedAt: "2026-08-10T09:00:00.000Z",
      });
      await pollChangesTrigger.perform(
        context,
        { paginationState: undefined } as never,
        baseParams({ showDeletedRecords: true }) as never,
      );
      expect(fakeClient.sobject).not.toHaveBeenCalled();
    });
  });
  test("lastDeletedAt is kept current while Show Deleted Records is off", async () => {
    jest.useFakeTimers().setSystemTime(new Date("2026-08-10T12:00:00.000Z"));
    fakeClient.query.mockResolvedValue({ records: [], done: true });
    const { context, getState } = createContext({
      lastPolledAt: "2026-08-10T10:00:00.000Z",
      lastDeletedAt: "2026-05-01T00:00:00.000Z",
    });
    await pollChangesTrigger.perform(
      context,
      { paginationState: undefined } as never,
      baseParams({ showDeletedRecords: false }) as never,
    );
    expect(getState().lastDeletedAt).toBe("2026-08-10T12:00:00.000Z");
    expect(fakeClient.sobject).not.toHaveBeenCalled();
  });
  test("a record exactly at the floored cycle-boundary second survives via classifyFromCursor", async () => {
    const boundaryRecord = record(
      "c",
      "2020-01-01T00:00:00.000+0000",
      "2026-08-10T12:00:00.000+0000",
    );
    fakeClient.query.mockResolvedValue({
      records: [boundaryRecord],
      done: true,
    });
    const { context } = createContext({
      lastPolledAt: "2026-08-10T12:00:00.437Z",
    });
    const result = await pollChangesTrigger.perform(
      context,
      { paginationState: undefined } as never,
      baseParams({ maxRecordsToFetch: 5 }) as never,
    );
    const data = result.payload.body.data as SalesforceChangesObject;
    expect(data.updatedRecords).toEqual([boundaryRecord]);
  });
  const seedQuery = (client: FakeClient, all: PollingTriggerObject[]) => {
    client.query.mockImplementation(async (soql: string) => {
      const keyset = soql.match(
        /LastModifiedDate > (\S+) OR \(LastModifiedDate = \S+ AND Id > '([^']+)'\)/,
      );
      const lower = soql.match(/LastModifiedDate >= (\S+)/)?.[1];
      const upper = soql.match(/LastModifiedDate < (\S+)/)?.[1];
      const limit = Number(soql.match(/LIMIT (\d+)/)?.[1]);
      const matched = all
        .filter((r) => {
          const at = new Date(r.LastModifiedDate).getTime();
          if (at >= new Date(upper as string).getTime()) return false;
          if (keyset) {
            const after = new Date(keyset[1]).getTime();
            return at > after || (at === after && (r.Id as string) > keyset[2]);
          }
          return at >= new Date(lower as string).getTime();
        })
        .sort(
          (a, b) =>
            +new Date(a.LastModifiedDate) - +new Date(b.LastModifiedDate) ||
            (a.Id as string).localeCompare(b.Id as string),
        );
      return {
        records: matched.slice(0, limit),
        done: matched.length <= limit,
      };
    });
  };
  const createdEarlyModifiedLate = record(
    "c",
    "2026-08-10T10:15:00.000+0000",
    "2026-08-10T10:30:00.000+0000",
  );
  const cycleRecords: PollingTriggerObject[] = [
    record("a", "2026-08-10T10:05:00.000+0000", "2026-08-10T10:05:00.000+0000"),
    record("b", "2020-01-01T00:00:00.000+0000", "2026-08-10T10:10:00.000+0000"),
    createdEarlyModifiedLate,
    record("d", "2026-08-10T10:40:00.000+0000", "2026-08-10T10:40:00.000+0000"),
    record("e", "2020-01-01T00:00:00.000+0000", "2026-08-10T10:50:00.000+0000"),
  ];
  const drain = async (params: TestParams, initialState: PollingState) => {
    const { context } = createContext(initialState);
    const rounds: {
      created: string[];
      updated: string[];
      deleted: string[];
    }[] = [];
    let paginationState: unknown;
    for (let round = 0; round < 20; round++) {
      const result = await pollChangesTrigger.perform(
        context,
        { paginationState } as never,
        params as never,
      );
      const data = result.payload.body.data as SalesforceChangesObject;
      rounds.push({
        created: data.createdRecords.map((r) => r.Id as string),
        updated: data.updatedRecords.map((r) => r.Id as string),
        deleted: data.deletedRecords.map((r) => r.id),
      });
      paginationState = result.payload.paginationState;
      if (!paginationState) return rounds;
    }
    throw new Error("drain did not terminate within 20 rounds");
  };
  describe("a multi-round drain of one cycle", () => {
    test("delivers every record exactly once, with the correct created/updated classification", async () => {
      jest.useFakeTimers().setSystemTime(new Date("2026-08-10T11:00:00.000Z"));
      seedQuery(fakeClient, cycleRecords);
      const rounds = await drain(baseParams(), {
        lastPolledAt: "2026-08-10T10:00:00.000Z",
      });
      const roundsSeenIn = (id: string) =>
        rounds.filter((r) => r.created.includes(id) || r.updated.includes(id))
          .length;
      for (const id of ["a", "b", "c", "d", "e"]) {
        expect({ id, rounds: roundsSeenIn(id) }).toEqual({ id, rounds: 1 });
      }
      const created = rounds.flatMap((r) => r.created);
      const updated = rounds.flatMap((r) => r.updated);
      expect(created.sort()).toEqual(["a", "c", "d"]);
      expect(updated.sort()).toEqual(["b", "c", "e"]);
    });
    test("with Show Updated Records off, a record created inside the window still arrives on a later page", async () => {
      jest.useFakeTimers().setSystemTime(new Date("2026-08-10T11:00:00.000Z"));
      seedQuery(fakeClient, cycleRecords);
      const rounds = await drain(baseParams({ showUpdatedRecords: false }), {
        lastPolledAt: "2026-08-10T10:00:00.000Z",
      });
      expect(rounds.flatMap((r) => r.created).sort()).toEqual(["a", "c", "d"]);
      expect(rounds.flatMap((r) => r.updated)).toEqual([]);
    });
    test("with Show Deleted Records on, each deleted record is carried by exactly one round of the drain", async () => {
      jest.useFakeTimers().setSystemTime(new Date("2026-08-10T11:00:00.000Z"));
      seedQuery(fakeClient, cycleRecords);
      fakeClient.sobject.mockReturnValue({
        deleted: jest.fn().mockResolvedValue({
          deletedRecords: [
            { id: "001000000000001", deletedDate: "2026-08-10T10:20:00.000Z" },
            { id: "001000000000002", deletedDate: "2026-08-10T10:45:00.000Z" },
          ],
          latestDateCovered: "2026-08-10T10:59:00.000Z",
        }),
      });
      const rounds = await drain(baseParams({ showDeletedRecords: true }), {
        lastPolledAt: "2026-08-10T10:00:00.000Z",
        lastDeletedAt: "2026-08-10T09:00:00.000Z",
      });
      expect(rounds.length).toBeGreaterThan(1);
      for (const id of ["001000000000001", "001000000000002"]) {
        expect({
          id,
          rounds: rounds.filter((r) => r.deleted.includes(id)).length,
        }).toEqual({
          id,
          rounds: 1,
        });
      }
      expect(rounds[0].deleted).toEqual(["001000000000001", "001000000000002"]);
    });
  });
  describe("state written by a version that predates this trigger's cursor", () => {
    const legacyState: PollingState = {
      lastPolledAt: "2026-08-10T10:00:00.000Z",
    };
    test("resumes incrementally without crashing and keeps applying the user's filters", async () => {
      jest.useFakeTimers().setSystemTime(new Date("2026-08-10T11:00:00.000Z"));
      fakeClient.query.mockResolvedValue({ records: [], done: true });
      const { context } = createContext({ ...legacyState });
      const result = await pollChangesTrigger.perform(
        context,
        { paginationState: undefined } as never,
        baseParams({ dynamicValues: { Industry: "Banking" } }) as never,
      );
      expect(result.payload.paginationState).toBeUndefined();
      const soql = fakeClient.query.mock.calls[0][0] as string;
      expect(soql).toContain("Industry = 'Banking'");
      expect(soql).toContain("LastModifiedDate >= 2026-08-10T10:00:00Z");
    });
    test("with Show Deleted Records on, deletions are fetched from the legacy lastPolledAt rather than skipped", async () => {
      jest.useFakeTimers().setSystemTime(new Date("2026-08-10T11:00:00.000Z"));
      fakeClient.query.mockResolvedValue({ records: [], done: true });
      const deleted = jest.fn().mockResolvedValue({
        deletedRecords: [
          { id: "001", deletedDate: "2026-08-10T10:30:00.000Z" },
        ],
        latestDateCovered: "2026-08-10T10:59:00.000Z",
      });
      fakeClient.sobject.mockReturnValue({ deleted });
      const { context, getState } = createContext({ ...legacyState });
      const result = await pollChangesTrigger.perform(
        context,
        { paginationState: undefined } as never,
        baseParams({ showDeletedRecords: true }) as never,
      );
      expect(deleted).toHaveBeenCalledWith(
        "2026-08-10T10:00:00.000Z",
        "2026-08-10T11:00:00.000Z",
      );
      const data = result.payload.body.data as SalesforceChangesObject;
      expect(data.deletedRecords).toEqual([
        { id: "001", deletedDate: "2026-08-10T10:30:00.000Z", IsDeleted: true },
      ]);
      expect(getState().lastDeletedAt).toBe("2026-08-10T10:59:00.000Z");
    });
  });
  test("a brand-new instance with no Look-back Date never queries Salesforce and commits an empty poll", async () => {
    jest.useFakeTimers().setSystemTime(new Date("2026-08-10T12:00:00.000Z"));
    const { context, getState } = createContext({});
    const result = await pollChangesTrigger.perform(
      context,
      { paginationState: undefined } as never,
      baseParams({ lookBackDate: "" }) as never,
    );
    expect(fakeClient.query).not.toHaveBeenCalled();
    const state = getState();
    expect(state.lastPolledAt).toBe("2026-08-10T12:00:00.000Z");
    expect(state.cursor).toBeUndefined();
    expect(result.polledNoChanges).toBe(true);
    const data = result.payload.body.data as SalesforceChangesObject;
    expect(data.createdRecords).toEqual([]);
    expect(data.updatedRecords).toEqual([]);
    expect(data.deletedRecords).toEqual([]);
  });
  test("a brand-new instance with no Look-back Date and Show Deleted Records on skips the deletion lookup too", async () => {
    jest.useFakeTimers().setSystemTime(new Date("2026-08-10T12:00:00.000Z"));
    const { context, getState } = createContext({});
    const result = await pollChangesTrigger.perform(
      context,
      { paginationState: undefined } as never,
      baseParams({ lookBackDate: "", showDeletedRecords: true }) as never,
    );
    expect(fakeClient.query).not.toHaveBeenCalled();
    expect(fakeClient.sobject).not.toHaveBeenCalled();
    const state = getState();
    expect(state.lastDeletedAt).toBe("2026-08-10T12:00:00.000Z");
    expect(result.polledNoChanges).toBe(true);
  });
  test("a Look-back Date is honored: the first poll engages a backfill and the SOQL carries no user WHERE terms", async () => {
    jest.useFakeTimers().setSystemTime(new Date("2026-08-10T12:00:00.000Z"));
    const records = [
      record(
        "a",
        "2026-08-01T00:05:00.000+0000",
        "2026-08-01T00:05:00.000+0000",
      ),
      record(
        "b",
        "2026-08-01T00:06:00.000+0000",
        "2026-08-01T00:06:00.000+0000",
      ),
    ];
    fakeClient.query.mockResolvedValue({ records, done: true });
    const { context, getState } = createContext({});
    await pollChangesTrigger.perform(
      context,
      { paginationState: undefined } as never,
      baseParams({
        lookBackDate: "2026-08-01T00:00:00.000Z",
        dynamicValues: { Industry: "Banking" },
        fieldValues: { Rating: "Hot" },
      }) as never,
    );
    const soql = fakeClient.query.mock.calls[0][0] as string;
    expect(soql).not.toContain("Industry");
    expect(soql).not.toContain("Rating");
    const state = getState();
    expect(state.cursor?.isBackfill).toBe(true);
  });
  test("a backfill issues SOQL with no user filter terms at all", async () => {
    jest.useFakeTimers().setSystemTime(new Date("2026-08-10T11:00:00.000Z"));
    fakeClient.query.mockResolvedValue({ records: [], done: true });
    const { context } = createContext({});
    await pollChangesTrigger.perform(
      context,
      { paginationState: undefined } as never,
      baseParams({
        lookBackDate: "2026-08-01T00:00:00.000Z",
        dynamicValues: { Industry: "Banking" },
        fieldValues: { Rating: "Hot" },
      }) as never,
    );
    const soql = fakeClient.query.mock.calls[0][0] as string;
    expect(soql).not.toContain("Industry");
    expect(soql).not.toContain("Rating");
    expect(soql).toContain(
      "WHERE LastModifiedDate >= 2026-08-01T00:00:00Z AND LastModifiedDate < 2026-08-10T11:00:00Z AND CreatedDate >= 2026-08-01T00:00:00Z",
    );
  });
  test("a backfill excludes a record created before the Look-back Date at the query", async () => {
    jest.useFakeTimers().setSystemTime(new Date("2026-08-10T11:00:00.000Z"));
    fakeClient.query.mockResolvedValue({ records: [], done: true });
    const { context } = createContext({});
    await pollChangesTrigger.perform(
      context,
      { paginationState: undefined } as never,
      baseParams({ lookBackDate: "2026-08-01T00:00:00.000Z" }) as never,
    );
    const soql = fakeClient.query.mock.calls[0][0] as string;
    expect(soql).toContain("CreatedDate >= 2026-08-01T00:00:00Z");
  });
  describe("page size while the flow batches", () => {
    const fullPage = [
      record(
        "a",
        "2026-08-10T10:05:00.000+0000",
        "2026-08-10T10:05:00.000+0000",
      ),
      record(
        "b",
        "2026-08-10T10:06:00.000+0000",
        "2026-08-10T10:06:00.000+0000",
      ),
    ];
    test("caps the fetch at MAX_BATCHED_PAGE_SIZE", async () => {
      fakeClient.query.mockResolvedValue({ records: [], done: true });
      const { context } = createContext(
        { lastPolledAt: "2026-08-10T10:00:00.000Z" },
        { enabled: true, batchSize: 50 },
      );
      await pollChangesTrigger.perform(
        context,
        { paginationState: undefined } as never,
        baseParams({ maxRecordsToFetch: 20000 }) as never,
      );
      expect(fakeClient.query.mock.calls[0][0]).toContain(
        `LIMIT ${MAX_BATCHED_PAGE_SIZE}`,
      );
    });
    test("honors a Max Records To Fetch below the cap", async () => {
      fakeClient.query.mockResolvedValue({ records: [], done: true });
      const { context } = createContext(
        { lastPolledAt: "2026-08-10T10:00:00.000Z" },
        { enabled: true, batchSize: 50 },
      );
      await pollChangesTrigger.perform(
        context,
        { paginationState: undefined } as never,
        baseParams({ maxRecordsToFetch: 250 }) as never,
      );
      expect(fakeClient.query.mock.calls[0][0]).toContain("LIMIT 250");
    });
    test("uses Max Records To Fetch in full when the flow does not batch", async () => {
      fakeClient.query.mockResolvedValue({ records: [], done: true });
      const { context } = createContext(
        { lastPolledAt: "2026-08-10T10:00:00.000Z" },
        { enabled: false },
      );
      await pollChangesTrigger.perform(
        context,
        { paginationState: undefined } as never,
        baseParams({ maxRecordsToFetch: 20000 }) as never,
      );
      expect(fakeClient.query.mock.calls[0][0]).toContain("LIMIT 20000");
    });
    test("uses Max Records To Fetch in full when the runner reports no batch", async () => {
      fakeClient.query.mockResolvedValue({ records: [], done: true });
      const { context } = createContext({
        lastPolledAt: "2026-08-10T10:00:00.000Z",
      });
      await pollChangesTrigger.perform(
        context,
        { paginationState: undefined } as never,
        baseParams({ maxRecordsToFetch: 20000 }) as never,
      );
      expect(fakeClient.query.mock.calls[0][0]).toContain("LIMIT 20000");
    });
    test("a backfill interrupted mid-drain resumes as a backfill", async () => {
      jest.useFakeTimers().setSystemTime(new Date("2026-08-10T12:00:00.000Z"));
      fakeClient.query.mockResolvedValue({ records: fullPage, done: true });
      const { context, getState } = createContext(
        {},
        { enabled: true, batchSize: 50 },
      );
      await pollChangesTrigger.perform(
        context,
        { paginationState: undefined } as never,
        baseParams({
          lookBackDate: "2026-08-01T00:00:00.000Z",
          maxRecordsToFetch: 2,
          dynamicValues: { Industry: "Banking" },
        }) as never,
      );
      const persisted = getState().cursor as PollingCursor;
      expect(persisted.isBackfill).toBe(true);
      fakeClient.query.mockClear();
      fakeClient.query.mockResolvedValue({ records: [], done: true });
      const { context: resumed } = createContext(getState(), {
        enabled: true,
        batchSize: 50,
      });
      await pollChangesTrigger.perform(
        resumed,
        { paginationState: undefined } as never,
        baseParams({
          lookBackDate: "2026-08-01T00:00:00.000Z",
          maxRecordsToFetch: 2,
          dynamicValues: { Industry: "Banking" },
        }) as never,
      );
      const soql = fakeClient.query.mock.calls[0][0] as string;
      expect(soql).toContain("CreatedDate >= 2026-08-01T00:00:00Z");
      expect(soql).not.toContain("Industry");
    });
    test("persists the cursor on round one of a batching flow", async () => {
      fakeClient.query.mockResolvedValue({ records: fullPage, done: true });
      const { context, getState } = createContext(
        { lastPolledAt: "2026-08-10T10:00:00.000Z" },
        { enabled: true, batchSize: 50 },
      );
      const result = await pollChangesTrigger.perform(
        context,
        { paginationState: undefined } as never,
        baseParams({ maxRecordsToFetch: 2 }) as never,
      );
      expect(result.payload.paginationState).toBeDefined();
      expect(getState().cursor).toEqual(result.payload.paginationState);
    });
    test("persists the cursor on round one when the flow does not batch", async () => {
      fakeClient.query.mockResolvedValue({ records: fullPage, done: true });
      const { context, getState } = createContext(
        { lastPolledAt: "2026-08-10T10:00:00.000Z" },
        { enabled: false },
      );
      await pollChangesTrigger.perform(
        context,
        { paginationState: undefined } as never,
        baseParams({ maxRecordsToFetch: 2 }) as never,
      );
      expect(getState().cursor).toBeDefined();
    });
  });
  test("an incremental poll adds no CreatedDate bound", async () => {
    jest.useFakeTimers().setSystemTime(new Date("2026-08-10T11:00:00.000Z"));
    fakeClient.query.mockResolvedValue({ records: [], done: true });
    const { context } = createContext({
      lastPolledAt: "2026-08-10T10:00:00.000Z",
    });
    await pollChangesTrigger.perform(
      context,
      { paginationState: undefined } as never,
      baseParams() as never,
    );
    const soql = fakeClient.query.mock.calls[0][0] as string;
    expect(soql).not.toContain("CreatedDate >=");
  });
  test("a backfill ignores both toggles and emits each record exactly once", async () => {
    jest.useFakeTimers().setSystemTime(new Date("2026-08-10T11:00:00.000Z"));
    const createdInsideEditedSince = record(
      "new-1",
      "2026-08-05T00:00:00.000+0000",
      "2026-08-06T00:00:00.000+0000",
    );
    fakeClient.query.mockResolvedValue({
      records: [createdInsideEditedSince],
      done: true,
    });
    const { context } = createContext({});
    const result = await pollChangesTrigger.perform(
      context,
      { paginationState: undefined } as never,
      baseParams({
        lookBackDate: "2026-08-01T00:00:00.000Z",
        showNewRecords: false,
        showUpdatedRecords: false,
      }) as never,
    );
    const data = result.payload.body.data as SalesforceChangesObject;
    expect(data.createdRecords).toEqual([createdInsideEditedSince]);
    expect(data.updatedRecords).toEqual([]);
  });
  test("the frozen output shape survives the composition: exactly updatedRecords, createdRecords, deletedRecords in that order", async () => {
    fakeClient.query.mockResolvedValue({ records: [], done: true });
    const { context } = createContext({
      lastPolledAt: "2026-08-10T10:00:00.000Z",
    });
    const result = await pollChangesTrigger.perform(
      context,
      { paginationState: undefined } as never,
      baseParams() as never,
    );
    expect(Object.keys(result.payload.body.data)).toEqual([
      "updatedRecords",
      "createdRecords",
      "deletedRecords",
    ]);
  });
  describe("the composed batching loop", () => {
    const resolver = pollChangesTrigger.triggerResolver;
    const batchSize = pollChangesTrigger.batchConfig?.batchSize as number;
    const resolveItems = (payload: unknown): SalesforceRecordChange[] =>
      (resolver?.resolveItems?.({} as never, { payload } as never) ??
        []) as SalesforceRecordChange[];
    const nextPaginationState = (payload: unknown): PollingCursor | null =>
      (resolver?.getNextPaginationState?.({} as never, { payload } as never) ??
        null) as PollingCursor | null;
    const chunk = <T>(items: T[], size: number): T[][] => {
      const chunks: T[][] = [];
      for (let index = 0; index < items.length; index += size) {
        chunks.push(items.slice(index, index + size));
      }
      return chunks;
    };
    interface Round {
      items: SalesforceRecordChange[];
      data: SalesforceChangesObject;
      polledNoChanges: boolean;
      next: PollingCursor | null;
    }
    const resolverDrain = async (
      params: TestParams,
      initialState: PollingState,
    ) => {
      const { context } = createContext(initialState);
      const rounds: Round[] = [];
      let next: PollingCursor | null = null;
      for (let round = 0; round < 20; round++) {
        const result = await pollChangesTrigger.perform(
          context,
          { paginationState: next ?? undefined } as never,
          params as never,
        );
        rounds.push({
          items: resolveItems(result.payload),
          data: result.payload.body.data as SalesforceChangesObject,
          polledNoChanges: Boolean(result.polledNoChanges),
          next: nextPaginationState(result.payload),
        });
        next = rounds[rounds.length - 1].next;
        if (next === null) return rounds;
      }
      throw new Error(
        "resolver-driven drain did not terminate within 20 rounds",
      );
    };
    const idOf = (item: SalesforceRecordChange): string =>
      item.changeType === "deleted"
        ? item.record.id
        : (item.record.Id as string);
    test("every round's item count equals the change count perform used, and no-changes never coincides with items", async () => {
      jest.useFakeTimers().setSystemTime(new Date("2026-08-10T11:00:00.000Z"));
      seedQuery(fakeClient, cycleRecords);
      const rounds = await resolverDrain(baseParams(), {
        lastPolledAt: "2026-08-10T10:00:00.000Z",
      });
      for (const { items, data, polledNoChanges } of rounds) {
        expect(items).toHaveLength(
          data.createdRecords.length +
            data.updatedRecords.length +
            data.deletedRecords.length,
        );
        if (polledNoChanges) {
          expect(items).toEqual([]);
        }
      }
    });
    test("no round ever reports polledNoChanges while the resolver still has a next page", async () => {
      jest.useFakeTimers().setSystemTime(new Date("2026-08-10T11:00:00.000Z"));
      seedQuery(fakeClient, cycleRecords);
      const rounds = await resolverDrain(
        baseParams({ showNewRecords: false }),
        {
          lastPolledAt: "2026-08-10T10:00:00.000Z",
        },
      );
      expect(rounds.length).toBeGreaterThan(1);
      for (const { polledNoChanges, next } of rounds) {
        expect(polledNoChanges && next !== null).toBe(false);
      }
    });
    test("deleted records reach the resolver as items with IsDeleted preserved, on exactly one round", async () => {
      jest.useFakeTimers().setSystemTime(new Date("2026-08-10T11:00:00.000Z"));
      seedQuery(fakeClient, cycleRecords);
      fakeClient.sobject.mockReturnValue({
        deleted: jest.fn().mockResolvedValue({
          deletedRecords: [
            { id: "001000000000009", deletedDate: "2026-08-10T10:20:00.000Z" },
          ],
          latestDateCovered: "2026-08-10T10:59:00.000Z",
        }),
      });
      const rounds = await resolverDrain(
        baseParams({ showDeletedRecords: true }),
        {
          lastPolledAt: "2026-08-10T10:00:00.000Z",
          lastDeletedAt: "2026-08-10T09:00:00.000Z",
        },
      );
      expect(rounds.length).toBeGreaterThan(1);
      const deletedItems = rounds.map((r) =>
        r.items.filter((i) => i.changeType === "deleted"),
      );
      expect(
        deletedItems.filter((perRound) => perRound.length > 0),
      ).toHaveLength(1);
      expect(deletedItems[0]).toEqual([
        {
          changeType: "deleted",
          record: {
            id: "001000000000009",
            deletedDate: "2026-08-10T10:20:00.000Z",
            IsDeleted: true,
          },
        },
      ]);
    });
    test("a resolver-driven drain terminates, delivers every record exactly once, and ends with a null next page", async () => {
      jest.useFakeTimers().setSystemTime(new Date("2026-08-10T11:00:00.000Z"));
      seedQuery(fakeClient, cycleRecords);
      const rounds = await resolverDrain(baseParams(), {
        lastPolledAt: "2026-08-10T10:00:00.000Z",
      });
      expect(rounds.length).toBeGreaterThan(1);
      expect(rounds[rounds.length - 1].next).toBeNull();
      expect(rounds.slice(0, -1).every((r) => r.next !== null)).toBe(true);
      const allIds = rounds.flatMap((r) => r.items.map(idOf));
      expect([...new Set(allIds)].sort()).toEqual(["a", "b", "c", "d", "e"]);
      for (const id of ["a", "b", "d", "e"]) {
        expect({
          id,
          count: allIds.filter((seen) => seen === id).length,
        }).toEqual({
          id,
          count: 1,
        });
      }
    });
    test("a round larger than the batch size chunks on exact boundaries with no loss or duplication", async () => {
      jest.useFakeTimers().setSystemTime(new Date("2026-08-10T11:00:00.000Z"));
      const many: PollingTriggerObject[] = Array.from(
        { length: 120 },
        (_unused, index) => {
          const at = new Date(
            new Date("2026-08-10T10:05:00.000Z").getTime() + index * 1000,
          );
          return record(
            `r${index}`,
            "2020-01-01T00:00:00.000+0000",
            at.toISOString(),
          );
        },
      );
      fakeClient.query.mockResolvedValue({ records: many, done: true });
      const rounds = await resolverDrain(
        baseParams({ maxRecordsToFetch: 200 }),
        {
          lastPolledAt: "2026-08-10T10:00:00.000Z",
        },
      );
      expect(rounds).toHaveLength(1);
      const { items } = rounds[0];
      expect(items).toHaveLength(120);
      const chunks = chunk(items, batchSize);
      expect(chunks.map((c) => c.length)).toEqual([50, 50, 20]);
      expect(chunks.flat()).toEqual(items);
      expect(chunks.flat().map(idOf)).toEqual(many.map((r) => r.Id as string));
    });
    test("items arrive in created, then updated, then deleted order, so chunk boundaries replay identically", async () => {
      jest.useFakeTimers().setSystemTime(new Date("2026-08-10T11:00:00.000Z"));
      const createdOnly = record(
        "new-1",
        "2026-08-10T10:05:00.000Z",
        "2026-08-10T10:05:00.000Z",
      );
      const updatedOnly = record(
        "old-1",
        "2020-01-01T00:00:00.000Z",
        "2026-08-10T10:10:00.000Z",
      );
      fakeClient.query.mockResolvedValue({
        records: [createdOnly, updatedOnly],
        done: true,
      });
      fakeClient.sobject.mockReturnValue({
        deleted: jest.fn().mockResolvedValue({
          deletedRecords: [
            { id: "del-1", deletedDate: "2026-08-10T10:20:00.000Z" },
            { id: "del-2", deletedDate: "2026-08-10T10:30:00.000Z" },
          ],
          latestDateCovered: "2026-08-10T10:59:00.000Z",
        }),
      });
      const rounds = await resolverDrain(
        baseParams({ maxRecordsToFetch: 5, showDeletedRecords: true }),
        {
          lastPolledAt: "2026-08-10T10:00:00.000Z",
          lastDeletedAt: "2026-08-10T09:00:00.000Z",
        },
      );
      const { items, data } = rounds[0];
      expect(items.map((i) => i.changeType)).toEqual([
        "created",
        "updated",
        "deleted",
        "deleted",
      ]);
      expect(items.map(idOf)).toEqual([
        ...data.createdRecords.map((r) => r.Id as string),
        ...data.updatedRecords.map((r) => r.Id as string),
        ...data.deletedRecords.map((r) => r.id),
      ]);
      expect(items.map(idOf)).toEqual(["new-1", "old-1", "del-1", "del-2"]);
    });
  });
});
