import type { ActionContext } from "@prismatic-io/spectral";
import { invokeTrigger } from "@prismatic-io/spectral/dist/testing";
import type { AdobeRecord } from "../types/triggers";
import { pollChangesTrigger } from "./pollChangesTrigger";

const mockGet = vi.fn();

vi.mock("../client", () => ({
  createClient: vi
    .fn()
    .mockReturnValue({ get: (...args: unknown[]) => mockGet(...args) }),
}));

vi.mock("../util", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../util")>();
  return { ...actual };
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
          throw new Error("not stubbed");
        },
      },
      debug: { enabled: false },
      logger: { debug: vi.fn() },
    } as unknown as Partial<ActionContext>,
  };
};

const triggerUnderTest = {
  perform: pollChangesTrigger.perform,
} as unknown as Parameters<typeof invokeTrigger>[0];

interface PollChanges {
  created: AdobeRecord[];
  updated: AdobeRecord[];
}
interface PollResult {
  payload: { body: { data: PollChanges } };
  polledNoChanges: boolean;
}

const poll = async (
  store: PollingStore,
  overrides: Partial<{
    resourceType: string;
    globalCompanyId: string;
    showNewRecords: boolean;
  }> = {},
): Promise<PollResult> => {
  const { result } = await invokeTrigger(
    triggerUnderTest,
    store.context,
    undefined,
    {
      connection: {},
      resourceType: "companies",
      globalCompanyId: undefined,
      showNewRecords: true,
      ...overrides,
    } as Record<string, unknown>,
  );
  return result as unknown as PollResult;
};

describe("pollChangesTrigger", () => {
  afterEach(() => {
    mockGet.mockReset();
  });

  test("first poll seeds knownIds and returns empty results", async () => {
    const store = createPollingStore();

    mockGet.mockResolvedValueOnce({
      data: {
        imsOrgs: [
          { companies: [{ globalCompanyId: "c1" }, { globalCompanyId: "c2" }] },
        ],
      },
    });

    const result = await poll(store);

    expect(result.payload.body.data.created).toEqual([]);
    expect(result.payload.body.data.updated).toEqual([]);
    expect(result.polledNoChanges).toBe(true);
    expect(store.currentState()).toEqual({ knownIds: ["c1", "c2"] });
  });

  test("second poll detects new records not in knownIds", async () => {
    const store = createPollingStore({ knownIds: ["c1"] });

    mockGet.mockResolvedValueOnce({
      data: {
        imsOrgs: [
          { companies: [{ globalCompanyId: "c1" }, { globalCompanyId: "c2" }] },
        ],
      },
    });

    const result = await poll(store);

    expect(
      result.payload.body.data.created.map((r) => r.globalCompanyId),
    ).toEqual(["c2"]);
    expect(result.polledNoChanges).toBe(false);
    expect(store.currentState()).toEqual({ knownIds: ["c1", "c2"] });
  });

  test("showNewRecords=false suppresses created output but still updates knownIds", async () => {
    const store = createPollingStore({ knownIds: ["c1"] });

    mockGet.mockResolvedValueOnce({
      data: {
        imsOrgs: [
          { companies: [{ globalCompanyId: "c1" }, { globalCompanyId: "c2" }] },
        ],
      },
    });

    const result = await poll(store, { showNewRecords: false });

    expect(result.payload.body.data.created).toEqual([]);
    expect(result.polledNoChanges).toBe(true);
    expect(store.currentState()).toEqual({ knownIds: ["c1", "c2"] });
  });

  test("throws when polling reportSuites without globalCompanyId", async () => {
    const store = createPollingStore();

    await expect(poll(store, { resourceType: "reportSuites" })).rejects.toThrow(
      "Global Company ID is required when polling report suites.",
    );
  });

  test("polls report suites when globalCompanyId is provided", async () => {
    const store = createPollingStore();

    mockGet.mockResolvedValueOnce({
      data: {
        content: [{ rsid: "rs1" }],
        nextPage: false,
      },
    });

    const result = await poll(store, {
      resourceType: "reportSuites",
      globalCompanyId: "comp123",
    });

    expect(result.polledNoChanges).toBe(true);
    expect(store.currentState()).toEqual({ knownIds: ["rs1"] });
    expect(mockGet).toHaveBeenCalledWith(
      "/api/comp123/reportsuites/collections/suites",
      expect.objectContaining({ params: { limit: 1000, page: 0 } }),
    );
  });
});
