import { defaultTriggerPayload } from "@prismatic-io/spectral/dist/testing";
import { fetchNewIdocs, resolveIdocChanges } from "../util";
import { DEFAULT_DOCNUM, MAX_BATCHED_PAGE_SIZE } from "../constants";
import type { IdocRecord } from "../types";
import { pollIdocTrigger } from "./pollIdocTrigger";
vi.mock("../client", () => ({ createClient: vi.fn(() => ({})) }));
vi.mock("../util", async (importOriginal) => ({
  ...(await importOriginal<typeof import("../util")>()),
  fetchNewIdocs: vi.fn(),
}));
const idoc = (idocNumber: string): IdocRecord => ({
  idocNumber,
  status: "53",
  messageType: "ORDERS",
  idocType: "ORDERS05",
  createdDate: "20260311",
  createdTime: "104530",
  direction: "2",
});
const runPerform = async (batching: boolean, rowCount?: number) => {
  const state: Record<string, unknown> = {};
  const context = {
    polling: { getState: () => state, setState: vi.fn() },
    debug: { enabled: false },
    logger: { error: vi.fn() },
    batch: batching ? { enabled: true } : undefined,
  };
  const result = await pollIdocTrigger.perform(
    context as never,
    defaultTriggerPayload(),
    {
      connection: {} as never,
      endpoint: "/sap/bc/soap/rfc",
      rowCount,
      messageType: undefined,
      direction: undefined,
      startingDocnum: undefined,
    } as never,
  );
  return { result, context };
};
describe("pollIdocTrigger batching", () => {
  test("is opt-in batchable with a default batch size", () => {
    expect(pollIdocTrigger.triggerResolverSupport).toBe("valid");
    expect(pollIdocTrigger.batchConfig).toEqual({ batchSize: 50 });
    expect(pollIdocTrigger.triggerResolver?.resolveItems).toBeInstanceOf(
      Function,
    );
  });
  test("resolveIdocChanges tags every IDoc as created", () => {
    expect(
      resolveIdocChanges({
        records: [idoc("0000000000000025"), idoc("0000000000000026")],
        recordCount: 2,
        lastDocnum: "0000000000000026",
      }),
    ).toEqual([
      { changeType: "created", record: idoc("0000000000000025") },
      { changeType: "created", record: idoc("0000000000000026") },
    ]);
  });
  test("resolveIdocChanges returns [] for empty or undefined changes", () => {
    expect(
      resolveIdocChanges({ records: [], recordCount: 0, lastDocnum: "0" }),
    ).toEqual([]);
    expect(resolveIdocChanges(undefined)).toEqual([]);
    expect(resolveIdocChanges({} as never)).toEqual([]);
  });
  test("resolveItems flattens the payload shape perform actually returns", async () => {
    vi.mocked(fetchNewIdocs).mockResolvedValue([idoc("0000000000000025")]);
    const { result } = await runPerform(false);
    const payload = result?.payload as never;
    expect(
      pollIdocTrigger.triggerResolver?.resolveItems?.({} as never, {
        payload,
      }),
    ).toEqual([{ changeType: "created", record: idoc("0000000000000025") }]);
  });
  test("perform clamps the page size only when batching is enabled", async () => {
    vi.mocked(fetchNewIdocs).mockResolvedValue([]);
    await runPerform(true, 50000);
    expect(vi.mocked(fetchNewIdocs).mock.lastCall?.[1].pageSize).toBe(
      MAX_BATCHED_PAGE_SIZE,
    );
    await runPerform(false, 50000);
    expect(vi.mocked(fetchNewIdocs).mock.lastCall?.[1].pageSize).toBe(50000);
    await runPerform(true, undefined);
    expect(vi.mocked(fetchNewIdocs).mock.lastCall?.[1].pageSize).toBe(50);
  });
  test("perform advances the cursor and reports no changes on an empty page", async () => {
    vi.mocked(fetchNewIdocs).mockResolvedValue([
      idoc("0000000000000025"),
      idoc("0000000000000026"),
    ]);
    const first = await runPerform(false);
    expect(
      (
        first.result as
          | {
              polledNoChanges?: boolean;
            }
          | undefined
      )?.polledNoChanges,
    ).toBe(false);
    expect(first.context.polling.setState).toHaveBeenCalledWith(
      expect.objectContaining({ lastDocnum: "0000000000000026" }),
    );
    vi.mocked(fetchNewIdocs).mockResolvedValue([]);
    const second = await runPerform(false);
    expect(
      (
        second.result as
          | {
              polledNoChanges?: boolean;
            }
          | undefined
      )?.polledNoChanges,
    ).toBe(true);
  });
});
type PerformParams = Parameters<typeof pollIdocTrigger.perform>[2];
type PerformContext = Parameters<typeof pollIdocTrigger.perform>[0];
const runWithState = async (
  state: Record<string, unknown>,
  startingDocnum?: string,
) => {
  const context = {
    polling: { getState: () => state, setState: vi.fn() },
    debug: { enabled: false },
    logger: { error: vi.fn() },
    batch: undefined,
  };
  const params = {
    connection: {},
    endpoint: "/sap/bc/soap/rfc",
    rowCount: undefined,
    messageType: undefined,
    direction: undefined,
    startingDocnum,
  } as unknown as PerformParams;
  const promise = pollIdocTrigger.perform(
    context as unknown as PerformContext,
    defaultTriggerPayload(),
    params,
  );
  return { promise, context };
};
describe("pollIdocTrigger cursor (dedup)", () => {
  test("passes the persisted lastDocnum back to the query", async () => {
    vi.mocked(fetchNewIdocs).mockResolvedValue([]);
    const { promise } = await runWithState({
      lastDocnum: "0000000000000099",
      errorCount: 0,
      consecutiveErrors: 0,
    });
    await promise;
    expect(vi.mocked(fetchNewIdocs).mock.lastCall?.[1].lastDocnum).toBe(
      "0000000000000099",
    );
  });
  test("with no state seeds from startingDocnum when given", async () => {
    vi.mocked(fetchNewIdocs).mockResolvedValue([]);
    const { promise } = await runWithState({}, "0000000000000010");
    await promise;
    expect(vi.mocked(fetchNewIdocs).mock.lastCall?.[1].lastDocnum).toBe(
      "0000000000000010",
    );
  });
  test("with no state and no startingDocnum seeds from DEFAULT_DOCNUM", async () => {
    vi.mocked(fetchNewIdocs).mockResolvedValue([]);
    const { promise } = await runWithState({});
    await promise;
    expect(vi.mocked(fetchNewIdocs).mock.lastCall?.[1].lastDocnum).toBe(
      DEFAULT_DOCNUM,
    );
  });
});
describe("fetchNewIdocs request", () => {
  test("sends DOCNUM GT '<cursor>' in the request body", async () => {
    const actual = await vi.importActual<typeof import("../util")>("../util");
    const post = vi.fn().mockResolvedValue({ data: "<soap/>" });
    await actual
      .fetchNewIdocs({ post } as never, {
        endpoint: "/sap/bc/soap/rfc",
        lastDocnum: "0000000000000042",
        pageSize: 10,
      })
      .catch(() => undefined);
    expect(post).toHaveBeenCalledTimes(1);
    const [endpoint, body] = post.mock.calls[0];
    expect(endpoint).toBe("/sap/bc/soap/rfc");
    expect(body).toContain("DOCNUM GT '0000000000000042'");
  });
});
describe("pollIdocTrigger error path", () => {
  test("increments counters, rethrows, and does not log below 3 consecutive failures", async () => {
    vi.mocked(fetchNewIdocs).mockRejectedValue(new Error("boom"));
    const { promise, context } = await runWithState({
      lastDocnum: "0000000000000005",
      errorCount: 0,
      consecutiveErrors: 0,
    });
    await expect(promise).rejects.toThrow("boom");
    expect(context.polling.setState).toHaveBeenCalledWith(
      expect.objectContaining({
        lastDocnum: "0000000000000005",
        errorCount: 1,
        consecutiveErrors: 1,
      }),
    );
    expect(context.logger.error).not.toHaveBeenCalled();
  });
  test("logs an error at the third consecutive failure", async () => {
    vi.mocked(fetchNewIdocs).mockRejectedValue(new Error("boom"));
    const { promise, context } = await runWithState({
      lastDocnum: "0000000000000005",
      errorCount: 4,
      consecutiveErrors: 2,
    });
    await expect(promise).rejects.toThrow("boom");
    expect(context.polling.setState).toHaveBeenCalledWith(
      expect.objectContaining({ errorCount: 5, consecutiveErrors: 3 }),
    );
    expect(context.logger.error).toHaveBeenCalledTimes(1);
  });
});
