import type { ActionContext } from "@prismatic-io/spectral";
import { invokeTrigger } from "@prismatic-io/spectral/dist/testing";
import { afterEach, describe, expect, it, test, vi } from "vitest";
import { DEFAULT_BATCH_SIZE } from "../constants";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import type {
  PollingChangesObject,
  PollingRecordChange,
  SageIntacctRecord,
} from "../types";
import { resolvePollingRecordChanges } from "../util";
import { pollChangesTrigger } from "./pollChangesTrigger";
const mockQueryRecordsPaginated = vi.fn<() => Promise<SageIntacctRecord[]>>();
vi.mock("../util", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../util")>();
  return {
    ...actual,
    queryRecordsPaginated: () => mockQueryRecordsPaginated(),
  };
});
const createdVendor: SageIntacctRecord = {
  RECORDNO: "10042",
  WHENMODIFIED: "2026-01-15T14:30:00Z",
  WHENCREATED: "2026-01-15T14:30:00Z",
  VENDORID: "V-1042",
};
const createdVendorTwo: SageIntacctRecord = {
  RECORDNO: "10043",
  WHENMODIFIED: "2026-01-15T14:31:00Z",
  WHENCREATED: "2026-01-15T14:31:00Z",
  VENDORID: "V-1043",
};
const updatedVendor: SageIntacctRecord = {
  RECORDNO: "10001",
  WHENMODIFIED: "2026-01-15T14:35:00Z",
  WHENCREATED: "2025-12-01T09:00:00Z",
  VENDORID: "V-1001",
};
const updatedVendorTwo: SageIntacctRecord = {
  RECORDNO: "10002",
  WHENMODIFIED: "2026-01-15T14:36:00Z",
  WHENCREATED: "2025-12-02T09:00:00Z",
  VENDORID: "V-1002",
};
describe("pollChangesTrigger batching declaration", () => {
  it("declares opt-in batching with a default batch size", () => {
    expect(pollChangesTrigger.triggerResolverSupport).toBe("valid");
    expect(pollChangesTrigger.batchConfig).toEqual({
      batchSize: DEFAULT_BATCH_SIZE,
    });
    expect(pollChangesTrigger.triggerResolver?.resolveItems).toBeInstanceOf(
      Function,
    );
  });
});
describe("resolvePollingRecordChanges", () => {
  it("tags every record with how it changed", () => {
    expect(
      resolvePollingRecordChanges({
        created: [createdVendor],
        updated: [updatedVendor],
      }),
    ).toEqual<PollingRecordChange[]>([
      { changeType: "created", record: createdVendor },
      { changeType: "updated", record: updatedVendor },
    ]);
  });
  it("emits created records before updated records, preserving source order", () => {
    expect(
      resolvePollingRecordChanges({
        created: [createdVendor, createdVendorTwo],
        updated: [updatedVendor, updatedVendorTwo],
      }),
    ).toEqual<PollingRecordChange[]>([
      { changeType: "created", record: createdVendor },
      { changeType: "created", record: createdVendorTwo },
      { changeType: "updated", record: updatedVendor },
      { changeType: "updated", record: updatedVendorTwo },
    ]);
  });
  it("returns [] for an empty changes object", () => {
    expect(resolvePollingRecordChanges({})).toEqual([]);
    expect(resolvePollingRecordChanges({ created: [], updated: [] })).toEqual(
      [],
    );
  });
  it("returns [] when the changes object is undefined", () => {
    expect(resolvePollingRecordChanges(undefined)).toEqual([]);
  });
  it("handles one array present and the other absent", () => {
    expect(resolvePollingRecordChanges({ created: [createdVendor] })).toEqual<
      PollingRecordChange[]
    >([{ changeType: "created", record: createdVendor }]);
    expect(resolvePollingRecordChanges({ updated: [updatedVendor] })).toEqual<
      PollingRecordChange[]
    >([{ changeType: "updated", record: updatedVendor }]);
  });
});
describe("pollChangesTrigger resolveItems", () => {
  const fixture = pollChangesTriggerExamplePayload.payload.body
    .data as PollingChangesObject;
  const fixtureCreated = fixture.created ?? [];
  const fixtureUpdated = fixture.updated ?? [];
  it("flattens the documented example payload", () => {
    expect(fixtureCreated.length).toBeGreaterThan(0);
    expect(fixtureUpdated.length).toBeGreaterThan(0);
    expect(
      pollChangesTrigger.triggerResolver?.resolveItems?.({} as never, {
        payload: pollChangesTriggerExamplePayload.payload,
      }),
    ).toEqual<PollingRecordChange[]>([
      ...fixtureCreated.map(
        (record): PollingRecordChange => ({ changeType: "created", record }),
      ),
      ...fixtureUpdated.map(
        (record): PollingRecordChange => ({ changeType: "updated", record }),
      ),
    ]);
  });
  it("returns [] for the no-changes payload perform emits alongside polledNoChanges", () => {
    expect(
      pollChangesTrigger.triggerResolver?.resolveItems?.({} as never, {
        payload: {
          ...pollChangesTriggerExamplePayload.payload,
          body: { data: { created: [], updated: [] } },
        },
      }),
    ).toEqual([]);
  });
});
const NOW = "2026-06-01T12:00:00.000Z";
const SEEDED_CURSOR = "2026-05-01T00:00:00.000Z";
interface PollingStore {
  currentState: () => Record<string, unknown>;
  context: Partial<ActionContext>;
}
const createPollingStore = (
  seedState: Record<string, unknown> = {},
): PollingStore => {
  let state: Record<string, unknown> = seedState;
  return {
    currentState: () => state,
    context: {
      polling: {
        getState: () => state,
        setState: (newState: Record<string, unknown>) => {
          state = newState;
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
interface PollResult {
  payload: {
    body: {
      data: {
        created: SageIntacctRecord[];
        updated: SageIntacctRecord[];
      };
    };
  };
  polledNoChanges: boolean;
}
const poll = async (
  store: PollingStore,
  overrides: Partial<{
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
      pollResourceType: "vendors",
      showNewRecords: true,
      showUpdatedRecords: true,
      lookBackDate: undefined,
      ...overrides,
    } as Record<string, unknown>,
  );
  return result as unknown as PollResult;
};
describe("pollChangesTrigger initial sync ignores visibility toggles", () => {
  afterEach(() => {
    vi.useRealTimers();
    mockQueryRecordsPaginated.mockReset();
  });
  test("initial sync seeds all records despite toggles=false", async () => {
    const store = createPollingStore();
    freezeClockAt(NOW);
    mockQueryRecordsPaginated.mockResolvedValueOnce([
      createdVendor,
      updatedVendor,
    ]);
    const result = await poll(store, {
      showNewRecords: false,
      showUpdatedRecords: false,
      lookBackDate: "2026-01-01T00:00:00.000Z",
    });
    const total =
      result.payload.body.data.created.length +
      result.payload.body.data.updated.length;
    expect(total).toBeGreaterThan(0);
    expect(result.polledNoChanges).toBe(false);
  });
  test("steady-state respects toggles after initial sync", async () => {
    const store = createPollingStore({ lastPolledAt: SEEDED_CURSOR });
    freezeClockAt(NOW);
    const result = await poll(store, {
      showNewRecords: false,
      showUpdatedRecords: false,
    });
    expect(result.payload.body.data.created).toEqual([]);
    expect(result.payload.body.data.updated).toEqual([]);
    expect(result.polledNoChanges).toBe(true);
  });
});
