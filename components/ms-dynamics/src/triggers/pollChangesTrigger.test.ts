import { afterEach, describe, expect, test, vi } from "vitest";
import { createMockConnection } from "../testHelpers";
import type { DynamicsChangesObject } from "../types";
const getData = (result: {
  payload: {
    body: {
      data: unknown;
    };
  };
}) => result.payload.body.data as DynamicsChangesObject;
const { mockRetrieveMultiple } = vi.hoisted(() => ({
  mockRetrieveMultiple: vi.fn(),
}));
vi.mock("../client", () => ({
  createCrmClient: vi.fn().mockResolvedValue({
    retrieveMultiple: mockRetrieveMultiple,
  }),
}));
vi.mock("../util", async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>;
  return {
    ...actual,
    paginateQueryEntities: vi
      .fn()
      .mockImplementation(
        async (retrieveFn: (...args: unknown[]) => unknown) => {
          const data = await retrieveFn();
          return { data };
        },
      ),
  };
});
import { pollChangesTrigger } from "./pollChangesTrigger";
const conn = createMockConnection();
const createPollingContext = (state: Record<string, unknown> = {}) => {
  let currentState = state;
  return {
    debug: { enabled: false },
    logger: { debug: () => {}, info: () => {} },
    polling: {
      getState: () => currentState,
      setState: (s: Record<string, unknown>) => {
        currentState = s;
      },
    },
    getCurrentState: () => currentState,
  } as any;
};
describe("pollChangesTrigger", () => {
  afterEach(() => vi.clearAllMocks());
  test("cursor/state advance: first poll with lookBackDate uses it as filter start", async () => {
    mockRetrieveMultiple.mockResolvedValueOnce({
      value: [
        {
          accountid: "id-1",
          name: "New Account",
          createdon: "2025-06-01T10:00:00Z",
          modifiedon: "2025-06-01T10:00:00Z",
        },
      ],
    });
    const ctx = createPollingContext({});
    const result = await pollChangesTrigger.perform(
      ctx,
      { body: {} } as any,
      {
        connection: conn,
        entityType: "accounts",
        lookBackDate: "2025-01-01",
        filterExpression: undefined,
        showNewRecords: true,
        showUpdatedRecords: true,
      } as any,
    );
    const newState = ctx.polling.getState();
    expect(newState.lastPolledAt).toBe("2025-06-01T10:00:00Z");
    expect(getData(result).created).toHaveLength(1);
    expect(result.polledNoChanges).toBe(false);
  });
  test("dedup/classification: createdon > lastPolledAt is created, modifiedon > lastPolledAt is updated", async () => {
    const lastPolledAt = "2025-05-01T00:00:00Z";
    mockRetrieveMultiple.mockResolvedValueOnce({
      value: [
        {
          accountid: "new-1",
          createdon: "2025-05-15T10:00:00Z",
          modifiedon: "2025-05-15T10:00:00Z",
        },
        {
          accountid: "updated-1",
          createdon: "2025-01-01T10:00:00Z",
          modifiedon: "2025-05-15T12:00:00Z",
        },
      ],
    });
    const ctx = createPollingContext({ lastPolledAt });
    const result = await pollChangesTrigger.perform(
      ctx,
      { body: {} } as any,
      {
        connection: conn,
        entityType: "accounts",
        lookBackDate: undefined,
        filterExpression: undefined,
        showNewRecords: true,
        showUpdatedRecords: true,
      } as any,
    );
    expect(getData(result).created).toHaveLength(1);
    expect(getData(result).created[0].accountid).toBe("new-1");
    expect(getData(result).updated).toHaveLength(1);
    expect(getData(result).updated[0].accountid).toBe("updated-1");
  });
  test("showNewRecords=false excludes created records", async () => {
    const lastPolledAt = "2025-05-01T00:00:00Z";
    mockRetrieveMultiple.mockResolvedValueOnce({
      value: [
        {
          accountid: "new-1",
          createdon: "2025-05-15T10:00:00Z",
          modifiedon: "2025-05-15T10:00:00Z",
        },
        {
          accountid: "updated-1",
          createdon: "2025-01-01T10:00:00Z",
          modifiedon: "2025-05-15T12:00:00Z",
        },
      ],
    });
    const ctx = createPollingContext({ lastPolledAt });
    const result = await pollChangesTrigger.perform(
      ctx,
      { body: {} } as any,
      {
        connection: conn,
        entityType: "accounts",
        lookBackDate: undefined,
        filterExpression: undefined,
        showNewRecords: false,
        showUpdatedRecords: true,
      } as any,
    );
    expect(getData(result).created).toHaveLength(0);
    expect(getData(result).updated).toHaveLength(1);
  });
  test("cursor advances to max modifiedon from returned records", async () => {
    const lastPolledAt = "2025-05-01T00:00:00Z";
    mockRetrieveMultiple.mockResolvedValueOnce({
      value: [
        {
          accountid: "a",
          createdon: "2025-05-10T08:00:00Z",
          modifiedon: "2025-05-10T08:00:00Z",
        },
        {
          accountid: "b",
          createdon: "2025-05-12T09:00:00Z",
          modifiedon: "2025-05-15T14:00:00Z",
        },
        {
          accountid: "c",
          createdon: "2025-05-11T07:00:00Z",
          modifiedon: "2025-05-13T11:00:00Z",
        },
      ],
    });
    const ctx = createPollingContext({ lastPolledAt });
    await pollChangesTrigger.perform(
      ctx,
      { body: {} } as any,
      {
        connection: conn,
        entityType: "accounts",
        lookBackDate: undefined,
        filterExpression: undefined,
        showNewRecords: true,
        showUpdatedRecords: true,
      } as any,
    );
    expect(ctx.polling.getState().lastPolledAt).toBe("2025-05-15T14:00:00Z");
  });
  test("empty result falls back to now and returns polledNoChanges: true", async () => {
    mockRetrieveMultiple.mockResolvedValueOnce({ value: [] });
    const before = new Date().toISOString();
    const ctx = createPollingContext({ lastPolledAt: "2025-05-01T00:00:00Z" });
    const result = await pollChangesTrigger.perform(
      ctx,
      { body: {} } as any,
      {
        connection: conn,
        entityType: "accounts",
        lookBackDate: undefined,
        filterExpression: undefined,
        showNewRecords: true,
        showUpdatedRecords: true,
      } as any,
    );
    const after = new Date().toISOString();
    expect(getData(result).created).toHaveLength(0);
    expect(getData(result).updated).toHaveLength(0);
    expect(result.polledNoChanges).toBe(true);
    const cursor = ctx.polling.getState().lastPolledAt as string;
    expect(cursor >= before).toBe(true);
    expect(cursor <= after).toBe(true);
  });
});
