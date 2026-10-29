import { beforeEach, describe, expect, test, vi } from "vitest";
import { defaultTriggerPayload } from "@prismatic-io/spectral/dist/testing";
import { createClient } from "../client";
import type { PollingState, SAPBusinessOneRecord } from "../types";
import { lookBackDateClean, resolvePollingRecordChanges } from "../util";
import { pollChangesTrigger } from "./pollChangesTrigger";

vi.mock("../client", () => ({ createClient: vi.fn() }));

const created: SAPBusinessOneRecord = {
  CreateDate: "2026-01-02",
  UpdateDate: "2026-01-02",
};
const updated: SAPBusinessOneRecord = {
  CreateDate: "2025-01-01",
  UpdateDate: "2026-01-02",
};

test("New and Updated Records is opt-in batchable with a default batch size", () => {
  expect(pollChangesTrigger.triggerResolverSupport).toBe("valid");
  expect(pollChangesTrigger.batchConfig).toEqual({ batchSize: 50 });
  expect(pollChangesTrigger.triggerResolver?.resolveItems).toBeInstanceOf(
    Function,
  );
});

test("resolvePollingRecordChanges tags every record with how it changed", () => {
  expect(
    resolvePollingRecordChanges({ created: [created], updated: [updated] }),
  ).toEqual([
    { changeType: "created", record: created },
    { changeType: "updated", record: updated },
  ]);
});

test("resolvePollingRecordChanges returns [] for empty or undefined changes", () => {
  expect(resolvePollingRecordChanges({ created: [], updated: [] })).toEqual([]);
  expect(resolvePollingRecordChanges(undefined)).toEqual([]);
});

test("resolveItems flattens the payload shape perform actually returns", () => {
  const payload = {
    ...defaultTriggerPayload(),
    body: { data: { created: [created] } },
  };
  expect(
    pollChangesTrigger.triggerResolver?.resolveItems?.({} as never, {
      payload,
    }),
  ).toEqual([{ changeType: "created", record: created }]);
});

describe("Look-back Date initial sync", () => {
  const get = vi.fn();

  const run = async (
    state: PollingState | undefined,
    lookBackDate: string,
    toggles = { showNewRecords: true, showUpdatedRecords: true },
  ) => {
    let next: PollingState | undefined = state;
    const context = {
      debug: { enabled: false },
      logger: { debug: vi.fn() },
      polling: {
        getState: () => next,
        setState: (s: PollingState) => {
          next = s;
        },
      },
    };
    const result = await pollChangesTrigger.perform(
      context as never,
      defaultTriggerPayload(),
      {
        connection: {},
        pollResourceType: "Orders",
        lookBackDate,
        ...toggles,
      } as never,
    );
    return { result, getState: () => next };
  };

  beforeEach(() => {
    get.mockReset();
    get.mockResolvedValueOnce({
      data: {
        value: [
          { CreateDate: "2026-01-01", UpdateDate: "2026-01-01" },
          { CreateDate: "2025-06-01", UpdateDate: "2026-01-05" },
        ],
      },
    });
    get.mockResolvedValue({ data: { value: [] } });
    vi.mocked(createClient).mockResolvedValue({ get } as never);
  });

  test("sends the look-back day as a day-precision filter and seeds records dated on it", async () => {
    const { result } = await run(undefined, lookBackDateClean("2026-01-01"));
    expect(get.mock.calls[0][1].params.$filter).toBe(
      "UpdateDate ge '2026-01-01'",
    );
    const data = (
      result as { payload: { body: { data: Record<string, unknown[]> } } }
    ).payload.body.data;
    expect(data.created).toHaveLength(1);
    expect(data.updated).toHaveLength(1);
  });

  test("ignores the visibility filters during the initial sync", async () => {
    const { result } = await run(undefined, lookBackDateClean("2026-01-01"), {
      showNewRecords: false,
      showUpdatedRecords: false,
    });
    expect((result as { polledNoChanges: boolean }).polledNoChanges).toBe(
      false,
    );
  });

  test("persisted state wins over the Look-back Date", async () => {
    const { getState } = await run(
      { lastPolledAt: "2026-02-01T00:00:00.000Z" },
      lookBackDateClean("2026-01-01"),
    );
    expect(get.mock.calls[0][1].params.$filter).toBe(
      "UpdateDate ge '2026-02-01'",
    );
    expect(getState()?.lastPolledAt).not.toBe("2026-02-01T00:00:00.000Z");
  });

  test("lookBackDateClean rejects bad, impossible, and future dates", () => {
    expect(lookBackDateClean("")).toBe("");
    expect(lookBackDateClean("2026-01-01")).toBe("2026-01-01T00:00:00.000Z");
    expect(() => lookBackDateClean("01/01/2026")).toThrow("Look-back Date");
    expect(() => lookBackDateClean("2026-02-31")).toThrow("Look-back Date");
    expect(() => lookBackDateClean("2999-01-01")).toThrow("future");
  });
});

describe("incremental poll behavior", () => {
  const get = vi.fn();
  const NOW = new Date("2026-03-01T12:00:00.000Z");

  const run = async (
    state: PollingState | undefined,
    overrides: Record<string, unknown> = {},
  ) => {
    let next: PollingState | undefined = state;
    const context = {
      debug: { enabled: false },
      logger: { debug: vi.fn() },
      polling: {
        getState: () => next,
        setState: (s: PollingState) => {
          next = s;
        },
      },
    };
    const result = (await pollChangesTrigger.perform(
      context as never,
      defaultTriggerPayload(),
      {
        connection: {},
        pollResourceType: "Orders",
        lookBackDate: "",
        showNewRecords: true,
        showUpdatedRecords: true,
        ...overrides,
      } as never,
    )) as {
      payload: {
        body: {
          data: {
            created: SAPBusinessOneRecord[];
            updated: SAPBusinessOneRecord[];
          };
        };
      };
      polledNoChanges: boolean;
    };
    return { result, getState: () => next };
  };

  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(NOW);
    get.mockReset();
    vi.mocked(createClient).mockReset();
    vi.mocked(createClient).mockResolvedValue({ get } as never);
    get.mockResolvedValueOnce({
      data: {
        value: [
          {
            id: "old",
            CreateDate: "2026-01-01T00:00:00.000Z",
            UpdateDate: "2026-01-01T00:00:00.000Z",
          },
          {
            id: "boundary",
            CreateDate: "2026-02-01T00:00:00.000Z",
            UpdateDate: "2026-02-01T00:00:00.000Z",
          },
          {
            id: "new",
            CreateDate: "2026-02-15T00:00:00.000Z",
            UpdateDate: "2026-02-15T00:00:00.000Z",
          },
          {
            id: "upd",
            CreateDate: "2026-01-01T00:00:00.000Z",
            UpdateDate: "2026-02-20T00:00:00.000Z",
          },
        ],
      },
    });
    get.mockResolvedValue({ data: { value: [] } });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const ids = (rs: SAPBusinessOneRecord[]) => rs.map((r) => r.id);
  const state = { lastPolledAt: "2026-02-01T00:00:00.000Z" };

  test("incremental dedup: strictly newer than lastPolledAt only", async () => {
    const { result, getState } = await run(state);
    expect(ids(result.payload.body.data.created)).toEqual(["new"]);
    expect(ids(result.payload.body.data.updated)).toEqual(["upd"]);
    expect(result.polledNoChanges).toBe(false);
    expect(getState()?.lastPolledAt).toBe(NOW.toISOString());
  });

  test("silent init: no state and no look-back seeds state to now and emits nothing", async () => {
    const { result, getState } = await run(undefined);
    expect(get.mock.calls[0][1].params.$filter).toBe(
      "UpdateDate ge '2026-03-01'",
    );
    expect(result.payload.body.data).toEqual({ created: [], updated: [] });
    expect(result.polledNoChanges).toBe(true);
    expect(getState()?.lastPolledAt).toBe(NOW.toISOString());
  });

  test("early return: both toggles off skips the client and returns empty changes", async () => {
    const { result, getState } = await run(state, {
      showNewRecords: false,
      showUpdatedRecords: false,
    });
    expect(createClient).not.toHaveBeenCalled();
    expect(result.payload.body.data).toEqual({ created: [], updated: [] });
    expect(result.polledNoChanges).toBe(true);
    expect(getState()?.lastPolledAt).toBe(NOW.toISOString());
  });

  test("toggle filtering applies on incremental polls", async () => {
    const onlyNew = await run(state, { showUpdatedRecords: false });
    expect(ids(onlyNew.result.payload.body.data.created)).toEqual(["new"]);
    expect(onlyNew.result.payload.body.data.updated).toEqual([]);
  });

  test("toggle filtering: updated only", async () => {
    const onlyUpdated = await run(state, { showNewRecords: false });
    expect(onlyUpdated.result.payload.body.data.created).toEqual([]);
    expect(ids(onlyUpdated.result.payload.body.data.updated)).toEqual(["upd"]);
  });

  test("unsupported resource type throws", async () => {
    await expect(run(state, { pollResourceType: "Nope" })).rejects.toThrow(
      "Unsupported resource type",
    );
  });
});

describe("lookBackDateClean edge cases", () => {
  test("whitespace-only, undefined and null yield empty string", () => {
    expect(lookBackDateClean("  ")).toBe("");
    expect(lookBackDateClean(undefined)).toBe("");
    expect(lookBackDateClean(null)).toBe("");
  });

  test("surrounding whitespace is trimmed on a valid date", () => {
    expect(lookBackDateClean("  2026-01-01  ")).toBe(
      "2026-01-01T00:00:00.000Z",
    );
  });

  test("leap day: 2024-02-29 valid, 2025-02-29 throws", () => {
    expect(lookBackDateClean("2024-02-29")).toBe("2024-02-29T00:00:00.000Z");
    expect(() => lookBackDateClean("2025-02-29")).toThrow("Look-back Date");
  });
});
