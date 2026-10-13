import type { ActionContext } from "@prismatic-io/spectral";
import { invokeTrigger } from "@prismatic-io/spectral/dist/testing";
import type { Account, GA4Record, Property } from "../types";
import { pollChangesTrigger } from "./pollChangesTrigger";
const mockGet = vi.fn();
vi.mock("../client", () => ({
  createAnalyticsClient: vi
    .fn()
    .mockReturnValue({ get: (...args: unknown[]) => mockGet(...args) }),
}));
vi.mock("../util", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../util")>();
  return {
    ...actual,
    paginateRecords: async (
      _client: unknown,
      url: string,
      params: Record<string, unknown>,
      _fetchAll: boolean,
      propertyKey: string,
    ) => {
      const { data } = await mockGet(url, { params });
      return { [propertyKey]: data[propertyKey] ?? [] };
    },
  };
});
const POLL_ONE_AT = "2026-06-01T12:00:00.000Z";
const SEEDED_CURSOR = "2026-05-01T00:00:00.000Z";
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
          throw new Error("not stubbed");
        },
      },
      debug: { enabled: false },
      logger: { debug: vi.fn() },
    } as unknown as Partial<ActionContext>,
  };
};
const freezeClockAt = (iso: string): void => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date(iso));
};
const triggerUnderTest = {
  perform: pollChangesTrigger.perform,
} as unknown as Parameters<typeof invokeTrigger>[0];
interface PollChanges {
  created: GA4Record[];
  updated: GA4Record[];
}
interface PollResult {
  payload: {
    body: {
      data: PollChanges;
    };
  };
  polledNoChanges: boolean;
}
const poll = async (
  store: PollingStore,
  overrides: Partial<{
    pollResourceType: string;
    accountId: string;
    showNewRecords: boolean;
    showUpdatedRecords: boolean;
    lookBackDate: string;
  }> = {},
): Promise<PollResult> => {
  const { result } = await invokeTrigger(
    triggerUnderTest,
    store.context,
    undefined,
    {
      connection: {},
      pollResourceType: "accounts",
      accountId: undefined,
      showNewRecords: true,
      showUpdatedRecords: true,
      lookBackDate: undefined,
      ...overrides,
    } as Record<string, unknown>,
  );
  return result as unknown as PollResult;
};
const makeAccount = (
  name: string,
  createTime: string,
  updateTime: string,
): Account => ({
  name,
  createTime,
  updateTime,
  displayName: name,
  regionCode: "US",
});
const makeProperty = (
  name: string,
  createTime: string,
  updateTime: string,
): Property =>
  ({
    name,
    parent: "accounts/123",
    createTime,
    updateTime,
    displayName: name,
  }) as Property;
describe("pollChangesTrigger", () => {
  afterEach(() => {
    vi.useRealTimers();
    mockGet.mockReset();
  });
  describe("accounts", () => {
    test("advances cursor and splits records into created and updated", async () => {
      const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
      freezeClockAt(POLL_ONE_AT);
      mockGet.mockResolvedValueOnce({
        data: {
          accounts: [
            makeAccount(
              "acct/1",
              "2026-05-15T00:00:00Z",
              "2026-05-15T00:00:00Z",
            ),
            makeAccount(
              "acct/2",
              "2026-04-01T00:00:00Z",
              "2026-05-20T00:00:00Z",
            ),
            makeAccount(
              "acct/3",
              "2026-04-01T00:00:00Z",
              "2026-04-02T00:00:00Z",
            ),
          ],
        },
      });
      const result = await poll(store);
      expect(result.payload.body.data.created.map((r) => r.name)).toEqual([
        "acct/1",
      ]);
      expect(result.payload.body.data.updated.map((r) => r.name)).toEqual([
        "acct/2",
      ]);
      expect(result.polledNoChanges).toBe(false);
      expect(store.currentState()).toEqual({ lastPolledAt: POLL_ONE_AT });
    });
    test("cold first poll seeds cursor and emits nothing", async () => {
      const store = createPollingStore();
      freezeClockAt(POLL_ONE_AT);
      mockGet.mockResolvedValueOnce({
        data: {
          accounts: [
            makeAccount(
              "acct/1",
              "2026-05-15T00:00:00Z",
              "2026-05-15T00:00:00Z",
            ),
          ],
        },
      });
      const result = await poll(store);
      expect(result.payload.body.data.created).toEqual([]);
      expect(result.payload.body.data.updated).toEqual([]);
      expect(result.polledNoChanges).toBe(true);
      expect(store.currentState()).toEqual({ lastPolledAt: POLL_ONE_AT });
    });
  });
  describe("properties", () => {
    test("throws when accountId is not provided", async () => {
      const store = createPollingStore();
      freezeClockAt(POLL_ONE_AT);
      await expect(
        poll(store, { pollResourceType: "properties" }),
      ).rejects.toThrow("Account ID is required when polling Properties");
    });
    test("fetches properties with account filter", async () => {
      const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
      freezeClockAt(POLL_ONE_AT);
      mockGet.mockResolvedValueOnce({
        data: {
          properties: [
            makeProperty(
              "prop/1",
              "2026-05-15T00:00:00Z",
              "2026-05-15T00:00:00Z",
            ),
          ],
        },
      });
      const result = await poll(store, {
        pollResourceType: "properties",
        accountId: "accounts/123",
      });
      expect(result.payload.body.data.created.map((r) => r.name)).toEqual([
        "prop/1",
      ]);
      expect(result.polledNoChanges).toBe(false);
    });
  });
  test("throws for unsupported resource type", async () => {
    const store = createPollingStore();
    freezeClockAt(POLL_ONE_AT);
    await expect(poll(store, { pollResourceType: "invalid" })).rejects.toThrow(
      "Unsupported resource type: invalid",
    );
  });
  test("polledNoChanges when no records match", async () => {
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
    freezeClockAt(POLL_ONE_AT);
    mockGet.mockResolvedValueOnce({ data: { accounts: [] } });
    const result = await poll(store);
    expect(result.polledNoChanges).toBe(true);
    expect(store.currentState()).toEqual({ lastPolledAt: POLL_ONE_AT });
  });
});
