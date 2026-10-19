import type { ActionContext } from "@prismatic-io/spectral";
import {
  createConnection,
  defaultTriggerPayload,
  invokeTrigger,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { jamfClientCredentials } from "../connections";
import { MAX_PAGE_SIZE } from "../constants";
import { listComputersExamplePayload } from "../examplePayloads";
import type {
  ComputerInventory,
  ComputerPollCursor,
  ComputerPollingState,
  MobileDevicePollingState,
} from "../types";
import { resolveNewComputerChanges } from "../util";
import { pollNewComputers } from "./pollNewComputers";
import { pollNewMobileDevices } from "./pollNewMobileDevices";
vi.mock("../constants", async (importOriginal) => ({
  ...(await importOriginal<typeof import("../constants")>()),
  MAX_PAGE_SIZE: 3,
  MAX_POLL_PAGES: 2,
}));
const computer: ComputerInventory = {
  id: "1",
  udid: "55900BDC-347C-58B1-D249-F32244B11D30",
  general: {
    name: "Boalime-MacBook-Pro",
    lastContactTime: "2026-06-14T18:22:05.000Z",
    platform: "Mac",
    assetTag: null,
    reportDate: "2026-06-14T18:22:05.000Z",
    remoteManagement: { managed: true },
    supervised: true,
  },
};
const secondComputer: ComputerInventory = {
  ...computer,
  id: "2",
  udid: "3A6D2F51-8C7E-4B1A-9F2D-6E0C1B7A4D92",
};
describe("pollNewComputers batching", () => {
  test("New Computers is opt-in batchable with a default batch size", () => {
    expect(pollNewComputers.triggerResolverSupport).toBe("valid");
    expect(pollNewComputers.batchConfig).toEqual({ batchSize: 50 });
    expect(pollNewComputers.triggerResolver?.resolveItems).toBeInstanceOf(
      Function,
    );
  });
  test("resolveNewComputerChanges tags every computer as created", () => {
    expect(resolveNewComputerChanges([computer, secondComputer])).toEqual([
      { changeType: "created", record: computer },
      { changeType: "created", record: secondComputer },
    ]);
  });
  test("resolveNewComputerChanges returns [] for empty or undefined data", () => {
    expect(resolveNewComputerChanges([])).toEqual([]);
    expect(resolveNewComputerChanges(undefined)).toEqual([]);
  });
  test("resolveItems flattens the payload shape perform actually returns", () => {
    const payload = {
      ...defaultTriggerPayload(),
      body: { data: [computer] },
    };
    expect(
      pollNewComputers.triggerResolver?.resolveItems?.({} as never, {
        payload,
      }),
    ).toEqual([{ changeType: "created", record: computer }]);
  });
});
const BASE = "https://example.jamfcloud.com";
const NOW = "2026-06-10T12:00:00.000Z";
const HORIZON = "2026-06-10T11:59:00Z";
const LOOK_BACK = "2026-01-01T00:00:00.000Z";
const T0 = Date.parse("2026-06-10T00:00:00.000Z");
const at = (seconds: number, ms = 0): string =>
  new Date(T0 + seconds * 1000 + ms).toISOString();
const sec = (iso: string): string => iso.replace(/\.\d+Z$/, "Z");
const connection = createConnection(jamfClientCredentials, {
  baseUrl: BASE,
  clientId: "client-id",
  clientSecret: "client-secret",
});
const comp = (id: string, enrolledAt: string): ComputerInventory => ({
  ...computer,
  id,
  general: {
    ...(computer.general as NonNullable<ComputerInventory["general"]>),
    lastEnrolledDate: enrolledAt,
  },
});
type PollResult = {
  payload: {
    body: {
      data: ComputerInventory[];
    };
    paginationState?: ComputerPollCursor;
  };
  polledNoChanges: boolean;
};
const createPollingContext = (
  initialState: ComputerPollingState = {},
  batchEnabled = false,
) => {
  let store: ComputerPollingState = initialState;
  const polling = {
    getState: () => store,
    setState: (state: ComputerPollingState) => {
      store = state;
    },
  };
  return {
    context: {
      polling,
      debug: { enabled: false },
      batch: { enabled: batchEnabled },
    } as unknown as Partial<ActionContext>,
    getStore: () => store,
  };
};
const poll = async (
  context: Partial<ActionContext>,
  options: {
    lookBackDate?: string;
    paginationState?: ComputerPollCursor;
  } = {},
): Promise<PollResult> => {
  const { result } = await invokeTrigger(
    pollNewComputers as never,
    context,
    options.paginationState
      ? ({ paginationState: options.paginationState } as never)
      : undefined,
    { connection, lookBackDate: options.lookBackDate ?? "" } as never,
  );
  return result as unknown as PollResult;
};
const mockToken = () =>
  nock(BASE)
    .post("/api/v1/oauth/token")
    .reply(200, { access_token: "test-token" });
const NORMAL_SORT = "general.lastEnrolledDate:asc,id:asc";
const TIE_SORT = "id:asc";
const normalFilter = (watermark: string, horizon = HORIZON): string =>
  `general.lastEnrolledDate=ge="${sec(watermark)}";general.lastEnrolledDate=le="${horizon}"`;
const tieFilter = (watermark: string, lastKey?: string): string =>
  `general.lastEnrolledDate=ge="${sec(watermark)}";general.lastEnrolledDate=lt="${sec(new Date(Date.parse(watermark) + 1000).toISOString())}"${lastKey ? `;id=gt=${lastKey}` : ""}`;
const mockPage = (filter: string, sort: string, results: ComputerInventory[]) =>
  nock(BASE, { reqheaders: { authorization: "Bearer test-token" } })
    .get("/api/v3/computers-inventory")
    .query({
      section: "GENERAL",
      filter,
      sort,
      page: "0",
      "page-size": String(MAX_PAGE_SIZE),
    })
    .reply(200, { results, totalCount: results.length });
const chunk = <T>(items: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
};
describe("pollNewComputers perform", () => {
  beforeEach(() => {
    nock.disableNetConnect();
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(NOW));
  });
  afterEach(() => {
    vi.useRealTimers();
    nock.cleanAll();
    nock.enableNetConnect();
  });
  test("lists the optional Look-back Date directly below the required inputs", () => {
    expect(Object.keys(pollNewComputers.inputs ?? {})).toEqual([
      "connection",
      "lookBackDate",
    ]);
  });
  test("first poll without a Look-back Date baselines at now and fetches nothing", async () => {
    const { context, getStore } = createPollingContext();
    mockToken();
    const result = await poll(context);
    expect(result.payload.body.data).toEqual([]);
    expect(result.polledNoChanges).toBe(true);
    expect(getStore()).toEqual({
      lastPolledAt: "2026-06-10T12:00:00.000Z",
      boundaryIds: [],
    });
  });
  test("first poll with a Look-back Date seeds the filter from it", async () => {
    const { context, getStore } = createPollingContext();
    mockToken();
    const scope = mockPage(normalFilter(LOOK_BACK), NORMAL_SORT, [
      comp("1", at(10)),
      comp("2", at(20)),
    ]);
    const result = await poll(context, { lookBackDate: LOOK_BACK });
    expect(scope.isDone()).toBe(true);
    expect(result.payload.body.data.map((c) => c.id)).toEqual(["1", "2"]);
    expect(result.polledNoChanges).toBe(false);
    expect(getStore()).toEqual({ lastPolledAt: at(20), boundaryIds: ["2"] });
  });
  test("the next poll resumes from the committed watermark and skips delivered boundary ids", async () => {
    const { context, getStore } = createPollingContext({
      lastPolledAt: at(20),
      boundaryIds: ["2"],
    });
    mockToken();
    const scope = mockPage(normalFilter(at(20)), NORMAL_SORT, [
      comp("2", at(20, 400)),
      comp("3", at(30)),
    ]);
    const result = await poll(context, { lookBackDate: LOOK_BACK });
    expect(scope.isDone()).toBe(true);
    expect(result.payload.body.data.map((c) => c.id)).toEqual(["3"]);
    expect(getStore()).toEqual({ lastPolledAt: at(30), boundaryIds: ["3"] });
  });
  test("a computer below the watermark is skipped without delivery", async () => {
    const { context } = createPollingContext({
      lastPolledAt: at(20),
      boundaryIds: [],
    });
    mockToken();
    mockPage(normalFilter(at(20)), NORMAL_SORT, [
      comp("1", at(19, 900)),
      comp("2", at(21)),
    ]);
    const result = await poll(context);
    expect(result.payload.body.data.map((c) => c.id)).toEqual(["2"]);
  });
  test("an empty response reports no changes and keeps the watermark", async () => {
    const { context, getStore } = createPollingContext({
      lastPolledAt: at(20),
      boundaryIds: ["2"],
    });
    mockToken();
    const scope = mockPage(normalFilter(at(20)), NORMAL_SORT, []);
    const result = await poll(context);
    expect(scope.isDone()).toBe(true);
    expect(result.polledNoChanges).toBe(true);
    expect(getStore()).toEqual({ lastPolledAt: at(20), boundaryIds: ["2"] });
  });
  test("resolveItems over an example payload chunks by the configured batch size", () => {
    const example = listComputersExamplePayload.data.results[0];
    const computers = Array.from({ length: 120 }, (_, i) => ({
      ...example,
      id: String(i + 1),
    }));
    const payload = { ...defaultTriggerPayload(), body: { data: computers } };
    const items =
      pollNewComputers.triggerResolver?.resolveItems?.({} as never, {
        payload,
      }) ?? [];
    const batches = chunk(items, pollNewComputers.batchConfig?.batchSize ?? 0);
    expect(items).toHaveLength(120);
    expect(batches.map((batch) => batch.length)).toEqual([50, 50, 20]);
    expect(batches[0][0]).toEqual({
      changeType: "created",
      record: computers[0],
    });
  });
});
describe("pollNewComputers watermark drain", () => {
  beforeEach(() => {
    nock.disableNetConnect();
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(NOW));
  });
  afterEach(() => {
    vi.useRealTimers();
    nock.cleanAll();
    nock.enableNetConnect();
  });
  test("getNextPaginationState echoes the cursor perform decided, or null", () => {
    const cursor: ComputerPollCursor = { watermark: at(5), boundaryIds: ["1"] };
    const next = pollNewComputers.triggerResolver?.getNextPaginationState;
    expect(
      next?.(
        {} as never,
        {
          payload: { ...defaultTriggerPayload(), paginationState: cursor },
        } as never,
      ),
    ).toEqual(cursor);
    expect(
      next?.({} as never, { payload: defaultTriggerPayload() } as never),
    ).toBeNull();
  });
  test("batching on: each round reads one page and the platform-fed cursor drains the backlog", async () => {
    const { context, getStore } = createPollingContext({}, true);
    mockToken();
    mockPage(normalFilter(LOOK_BACK), NORMAL_SORT, [
      comp("1", at(1)),
      comp("2", at(2)),
      comp("3", at(3)),
    ]);
    const round1 = await poll(context, { lookBackDate: LOOK_BACK });
    expect(round1.payload.body.data.map((c) => c.id)).toEqual(["1", "2", "3"]);
    expect(round1.payload.paginationState).toEqual({
      watermark: at(3),
      boundaryIds: ["3"],
    });
    expect(round1.polledNoChanges).toBe(false);
    expect(getStore().lastPolledAt).toBe(LOOK_BACK);
    mockToken();
    mockPage(normalFilter(at(3)), NORMAL_SORT, [
      comp("3", at(3, 100)),
      comp("4", at(4)),
    ]);
    const round2 = await poll(context, {
      lookBackDate: LOOK_BACK,
      paginationState: round1.payload.paginationState,
    });
    expect(round2.payload.body.data.map((c) => c.id)).toEqual(["4"]);
    expect(round2.payload.paginationState).toBeUndefined();
    expect(getStore()).toEqual({ lastPolledAt: at(4), boundaryIds: ["4"] });
  });
  test("batching off: two scheduled polls with no hand-fed paginationState drain the backlog", async () => {
    const { context, getStore } = createPollingContext();
    mockToken();
    mockPage(normalFilter(LOOK_BACK), NORMAL_SORT, [
      comp("1", at(1)),
      comp("2", at(2)),
      comp("3", at(3)),
    ]);
    mockPage(normalFilter(at(3)), NORMAL_SORT, [
      comp("3", at(3, 100)),
      comp("4", at(4)),
      comp("5", at(5)),
    ]);
    const first = await poll(context, { lookBackDate: LOOK_BACK });
    expect(first.payload.body.data.map((c) => c.id)).toEqual([
      "1",
      "2",
      "3",
      "4",
      "5",
    ]);
    expect(getStore()).toEqual({
      lastPolledAt: LOOK_BACK,
      cursor: { watermark: at(5), boundaryIds: ["5"] },
    });
    mockToken();
    mockPage(normalFilter(at(5)), NORMAL_SORT, [
      comp("5", at(5, 200)),
      comp("6", at(6)),
    ]);
    const second = await poll(context, { lookBackDate: LOOK_BACK });
    expect(second.payload.body.data.map((c) => c.id)).toEqual(["6"]);
    expect(getStore()).toEqual({ lastPolledAt: at(6), boundaryIds: ["6"] });
  });
  test("polledNoChanges is never true on a platform-driven round, even with nothing to deliver", async () => {
    const { context } = createPollingContext({}, true);
    mockToken();
    mockPage(normalFilter(at(3)), NORMAL_SORT, [comp("3", at(3, 100))]);
    const result = await poll(context, {
      paginationState: { watermark: at(3), boundaryIds: ["3"] },
    });
    expect(result.payload.body.data).toEqual([]);
    expect(result.polledNoChanges).toBe(false);
  });
  test("a tie group drains by id keyset starting with no lastKey, and a short page ends the window not the stream", async () => {
    const W = at(10);
    const { context, getStore } = createPollingContext(
      { lastPolledAt: W, boundaryIds: [] },
      true,
    );
    mockToken();
    mockPage(normalFilter(W), NORMAL_SORT, [
      comp("9", at(10, 100)),
      comp("8", at(10, 200)),
      comp("7", at(10, 300)),
    ]);
    const round1 = await poll(context);
    expect(round1.payload.body.data.map((c) => c.id)).toEqual(["9", "8", "7"]);
    expect(round1.payload.paginationState).toEqual({
      watermark: W,
      boundaryIds: ["9", "8", "7"],
      tieGroup: { lastKey: null },
    });
    mockToken();
    mockPage(tieFilter(W), TIE_SORT, [
      comp("1", at(10, 900)),
      comp("2", at(10, 800)),
      comp("7", at(10, 300)),
    ]);
    const round2 = await poll(context, {
      paginationState: round1.payload.paginationState,
    });
    expect(round2.payload.body.data.map((c) => c.id)).toEqual(["1", "2"]);
    expect(round2.payload.paginationState).toEqual({
      watermark: W,
      boundaryIds: ["9", "8", "7", "1", "2"],
      tieGroup: { lastKey: "7" },
    });
    mockToken();
    mockPage(tieFilter(W, "7"), TIE_SORT, [
      comp("8", at(10, 200)),
      comp("9", at(10, 100)),
    ]);
    const round3 = await poll(context, {
      paginationState: round2.payload.paginationState,
    });
    expect(round3.payload.body.data).toEqual([]);
    expect(round3.polledNoChanges).toBe(false);
    expect(round3.payload.paginationState).toEqual({
      watermark: at(11),
      boundaryIds: [],
    });
    mockToken();
    mockPage(normalFilter(at(11)), NORMAL_SORT, [comp("10", at(11, 500))]);
    const round4 = await poll(context, {
      paginationState: round3.payload.paginationState,
    });
    expect(round4.payload.body.data.map((c) => c.id)).toEqual(["10"]);
    expect(round4.payload.paginationState).toBeUndefined();
    expect(getStore()).toEqual({ lastPolledAt: at(11), boundaryIds: ["10"] });
  });
  test("a tie round skips, without delivering, a computer not at W", async () => {
    const W = at(10);
    const { context } = createPollingContext({}, true);
    mockToken();
    mockPage(tieFilter(W), TIE_SORT, [
      comp("1", at(10, 100)),
      comp("2", at(9)),
    ]);
    const result = await poll(context, {
      paginationState: {
        watermark: W,
        boundaryIds: [],
        tieGroup: { lastKey: null },
      },
    });
    expect(result.payload.body.data.map((c) => c.id)).toEqual(["1"]);
  });
  test("the no-progress guard throws when a full page cannot move the cursor", async () => {
    const W = at(10);
    const { context, getStore } = createPollingContext(
      { lastPolledAt: W, boundaryIds: [] },
      true,
    );
    mockToken();
    mockPage(normalFilter(W), NORMAL_SORT, [
      comp("1", at(9, 100)),
      comp("2", at(9, 200)),
      comp("3", at(9, 300)),
    ]);
    await expect(poll(context)).rejects.toThrow(
      /pollNewComputers.*page size 3/,
    );
    expect(getStore()).toEqual({ lastPolledAt: W, boundaryIds: [] });
  });
});
describe("pollNewMobileDevices is unchanged", () => {
  beforeEach(() => {
    nock.disableNetConnect();
  });
  afterEach(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });
  const mockDevices = (ids: string[]) =>
    nock(BASE, { reqheaders: { authorization: "Bearer test-token" } })
      .get("/api/v2/mobile-devices")
      .query({ page: "0", "page-size": String(MAX_PAGE_SIZE) })
      .reply(200, {
        results: ids.map((id) => ({ id })),
        totalCount: ids.length,
      });
  const pollDevices = async (state: MobileDevicePollingState) => {
    const { context, getStore } = createPollingContext(
      state as ComputerPollingState,
    );
    const { result } = await invokeTrigger(
      pollNewMobileDevices as never,
      context,
      undefined,
      { connection } as never,
    );
    return {
      result: result as unknown as {
        payload: {
          body: {
            data: {
              id: string;
            }[];
          };
        };
        polledNoChanges: boolean;
      },
      getStore,
    };
  };
  test("the first poll baselines the max id and reports no changes", async () => {
    mockToken();
    mockDevices(["1", "2"]);
    const { result, getStore } = await pollDevices({});
    expect(result.polledNoChanges).toBe(true);
    expect(getStore()).toEqual({ lastMaxId: 2 });
  });
  test("a later poll returns only devices above the stored max id", async () => {
    mockToken();
    mockDevices(["1", "2"]);
    const { result, getStore } = await pollDevices({ lastMaxId: 1 });
    expect(result.payload.body.data).toEqual([{ id: "2" }]);
    expect(result.polledNoChanges).toBe(false);
    expect(getStore()).toEqual({ lastMaxId: 2 });
  });
});
