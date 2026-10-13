import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { defaultTriggerPayload } from "@prismatic-io/spectral/dist/testing";
import { getSapClient } from "../client";
import type { PollingState, SapRecord } from "../types";
import { lookBackDateClean, resolvePollingRecordChanges } from "../util";
import { pollChangesTrigger } from "./pollChangesTrigger";
vi.mock("../client", () => ({ getSapClient: vi.fn() }));
const created: SapRecord = { CreationDateTime: "2026-01-02T00:00:00Z" };
const updated: SapRecord = { CreationDateTime: "2025-01-01T00:00:00Z" };
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
    const result = (await pollChangesTrigger.perform(
      context as never,
      defaultTriggerPayload(),
      {
        connection: {},
        resourceType: "changeRecords",
        lookBackDate,
        ...toggles,
      } as never,
    )) as {
      payload: {
        body: {
          data: {
            created: SapRecord[];
            updated: SapRecord[];
          };
        };
      };
      polledNoChanges: boolean;
    };
    return { result, getState: () => next };
  };
  beforeEach(() => {
    get.mockReset();
    get.mockResolvedValue({
      data: {
        d: {
          results: [
            {
              CreationDateTime: "2026-01-05T00:00:00Z",
              LastChangeDateTime: "2026-01-05",
            },
            {
              CreationDateTime: "2025-06-01T00:00:00Z",
              LastChangeDateTime: "2026-01-06",
            },
          ],
        },
      },
    });
    vi.mocked(getSapClient).mockReturnValue({ get } as never);
  });
  test("sends the look-back day as an inclusive datetime filter", async () => {
    await run(undefined, lookBackDateClean("2026-01-01"));
    expect(get.mock.calls[0][0]).toContain(
      "$filter=LastChangeDateTime ge datetime'2026-01-01T00:00:00'",
    );
  });
  test("ignores the visibility filters during the initial sync", async () => {
    const { result } = await run(undefined, lookBackDateClean("2026-01-01"), {
      showNewRecords: false,
      showUpdatedRecords: false,
    });
    expect(result.polledNoChanges).toBe(false);
    expect(result.payload.body.data.created).toHaveLength(1);
    expect(result.payload.body.data.updated).toHaveLength(1);
  });
  test("with no state and no look-back, seeds state and honors the toggles", async () => {
    const { result, getState } = await run(undefined, "", {
      showNewRecords: false,
      showUpdatedRecords: false,
    });
    expect(result.polledNoChanges).toBe(true);
    expect(getState()?.lastPolledAt).toBeDefined();
  });
  test("persisted state wins over the Look-back Date", async () => {
    await run(
      { lastPolledAt: "2026-02-01T00:00:00.000Z" },
      lookBackDateClean("2026-01-01"),
    );
    expect(get.mock.calls[0][0]).toContain("datetime'2026-02-01T00:00:00'");
  });
  test("lookBackDateClean rejects bad, impossible, and future dates", () => {
    expect(lookBackDateClean("")).toBe("");
    expect(lookBackDateClean("2026-01-01")).toBe("2026-01-01T00:00:00.000Z");
    expect(() => lookBackDateClean("01/01/2026")).toThrow("Look-back Date");
    expect(() => lookBackDateClean("2026-02-31")).toThrow("Look-back Date");
    expect(() => lookBackDateClean("2999-01-01")).toThrow("future");
  });
});
describe("poll state, classification and pagination", () => {
  const get = vi.fn();
  const NOW = new Date("2026-03-01T12:00:00.000Z");
  type Data = {
    created: SapRecord[];
    updated: SapRecord[];
  };
  const run = async (
    state: PollingState | undefined,
    {
      lookBackDate = "",
      resourceType = "changeRecords",
      showNewRecords = true,
      showUpdatedRecords = true,
    } = {},
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
        resourceType,
        lookBackDate,
        showNewRecords,
        showUpdatedRecords,
      } as never,
    )) as {
      payload: {
        body: {
          data: Data;
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
    get.mockResolvedValue({
      data: {
        d: {
          results: [
            { CreationDateTime: "2026-02-15T00:00:00Z", id: "new" },
            { CreationDateTime: "2025-01-01T00:00:00Z", id: "old" },
          ],
        },
      },
    });
    vi.mocked(getSapClient).mockReturnValue({ get } as never);
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  test("writes lastPolledAt equal to now, after the prior state", async () => {
    const prior = "2026-02-01T00:00:00.000Z";
    const { getState } = await run({ lastPolledAt: prior });
    expect(getState()?.lastPolledAt).toBe(NOW.toISOString());
    expect(new Date(getState()?.lastPolledAt as string) > new Date(prior)).toBe(
      true,
    );
  });
  test("a backfill run also advances lastPolledAt to now", async () => {
    const { getState } = await run(undefined, {
      lookBackDate: "2026-01-01T00:00:00.000Z",
    });
    expect(getState()?.lastPolledAt).toBe(NOW.toISOString());
  });
  test("classifies records created after lastPolledAt as created, the rest as updated", async () => {
    const { result } = await run({ lastPolledAt: "2026-02-01T00:00:00.000Z" });
    expect(result.payload.body.data.created.map((r) => r.id)).toEqual(["new"]);
    expect(result.payload.body.data.updated.map((r) => r.id)).toEqual(["old"]);
  });
  test("both visibility toggles off return empty arrays with polledNoChanges", async () => {
    const { result } = await run(
      { lastPolledAt: "2026-02-01T00:00:00.000Z" },
      { showNewRecords: false, showUpdatedRecords: false },
    );
    expect(result.payload.body.data).toEqual({ created: [], updated: [] });
    expect(result.polledNoChanges).toBe(true);
  });
  test("an unsupported resource type throws", async () => {
    await expect(
      run(
        { lastPolledAt: "2026-02-01T00:00:00.000Z" },
        { resourceType: "nope" },
      ),
    ).rejects.toThrow("Unsupported resource type");
    expect(get).not.toHaveBeenCalled();
  });
  test("a full page of 500 triggers a second $skip request", async () => {
    const page = Array.from({ length: 500 }, (_, i) => ({
      CreationDateTime: "2025-01-01T00:00:00Z",
      id: `r${i}`,
    }));
    get
      .mockResolvedValueOnce({ data: { d: { results: page } } })
      .mockResolvedValueOnce({ data: { d: { results: [] } } });
    const { result } = await run({ lastPolledAt: "2026-02-01T00:00:00.000Z" });
    expect(get).toHaveBeenCalledTimes(2);
    expect(get.mock.calls[0][0]).toContain("$skip=0");
    expect(get.mock.calls[1][0]).toContain("$skip=500");
    expect(result.payload.body.data.updated).toHaveLength(500);
  });
  test("SAP /Date(ms)/ CreationDateTime is classified as updated (observed behavior)", async () => {
    get.mockResolvedValueOnce({
      data: {
        d: {
          results: [{ CreationDateTime: "/Date(1771113600000)/", id: "sap" }],
        },
      },
    });
    const { result } = await run({ lastPolledAt: "2026-02-01T00:00:00.000Z" });
    expect(result.payload.body.data.created).toEqual([]);
    expect(result.payload.body.data.updated.map((r) => r.id)).toEqual(["sap"]);
  });
});
