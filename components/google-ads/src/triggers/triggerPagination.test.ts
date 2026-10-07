import {
  createConnection,
  defaultTriggerPayload,
  invokeTrigger,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { oauth } from "../connections";
import {
  GOOGLE_ADS_API_VERSION,
  GOOGLE_ADS_BASE_URL,
  googleAdsSearchPath,
} from "../constants";
import type { ChangeEventCursor } from "../types";
import { campaignChangesTrigger } from "./campaignChangesTrigger";
import { changeHistoryTrigger } from "./changeHistoryTrigger";
vi.mock("../constants", async (importOriginal) => ({
  ...(await importOriginal<typeof import("../constants")>()),
  CHANGE_EVENT_ROW_LIMIT: 3,
  BATCHED_CHANGE_EVENT_ROW_LIMIT: 2,
}));
const PAGE_SIZE = 3;
const BATCHED_PAGE_SIZE = 2;
const CUSTOMER_ID = "1234567890";
const SEARCH_PATH = `/${GOOGLE_ADS_API_VERSION}${googleAdsSearchPath(CUSTOMER_ID)}`;
const TIMEZONE_QUERY = "SELECT customer.time_zone FROM customer LIMIT 1";
const WINDOW_END = "2026-03-15 12:00:00";
const PERSISTED_CURSOR = "2026-03-15 11:00:00";
const connection = createConnection(
  oauth,
  { developerToken: "test-developer-token" },
  { access_token: "test-access-token" },
);
const asTrigger = (trigger: unknown) => trigger as never;
const eventRow = (id: number, changeDateTime: string) => ({
  campaign: { id: String(id), name: `Example-Campaign-${id}` },
  changeEvent: {
    resourceName: `customers/${CUSTOMER_ID}/changeEvents/${id}~0~0`,
    changeDateTime,
    changeResourceType: "CAMPAIGN",
    changeResourceName: `customers/${CUSTOMER_ID}/campaigns/${id}`,
    clientType: "GOOGLE_ADS_WEB_CLIENT",
    resourceChangeOperation: "CREATE",
    oldResource: {},
    newResource: {
      campaign: {
        resourceName: `customers/${CUSTOMER_ID}/campaigns/${id}`,
        status: "ENABLED",
      },
    },
  },
});
const ROW_1 = eventRow(1, "2026-03-15 11:10:00.100000");
const ROW_2 = eventRow(2, "2026-03-15 11:20:00.200000");
const ROW_3 = eventRow(3, "2026-03-15 11:30:00.300000");
const ROW_4 = eventRow(4, "2026-03-15 11:40:00.400000");
type TriggerCase = {
  name: string;
  trigger: typeof campaignChangesTrigger | typeof changeHistoryTrigger;
  params: Record<string, unknown>;
  bodyKeys: string[];
  emittedIds: (data: unknown) => string[];
  extraState: (emitted: number) => Record<string, unknown>;
};
const cases: TriggerCase[] = [
  {
    name: "campaignChangesTrigger",
    trigger: campaignChangesTrigger,
    params: {
      connection,
      customerId: CUSTOMER_ID,
      managerCustomerId: undefined,
      changeTypes: ["all"],
    },
    bodyKeys: ["changes", "changesDetected", "timeRange", "syncedAt"],
    emittedIds: (data) =>
      (
        data as {
          changes: {
            campaignId: string;
          }[];
        }
      ).changes
        .map((c) => c.campaignId)
        .sort(),
    extraState: () => ({}),
  },
  {
    name: "changeHistoryTrigger",
    trigger: changeHistoryTrigger,
    params: {
      connection,
      customerId: CUSTOMER_ID,
      managerCustomerId: undefined,
      resourceTypes: [],
      includeUserInfo: false,
    },
    bodyKeys: ["changes", "changeCount", "timeRange"],
    emittedIds: (data) =>
      (
        data as {
          changes: {
            changeEvent: {
              changeResourceName: string;
            };
          }[];
        }
      ).changes
        .map((c) => c.changeEvent.changeResourceName.split("/").pop() ?? "")
        .sort(),
    extraState: (emitted) => ({ changeCount: emitted }),
  },
];
describe.each(cases)("$name Tier 2 pagination", (tc) => {
  const queries: string[] = [];
  const mockRound = (rows: unknown[]) => {
    nock(GOOGLE_ADS_BASE_URL)
      .post(SEARCH_PATH, { query: TIMEZONE_QUERY })
      .reply(200, { results: [{ customer: { timeZone: "UTC" } }] });
    nock(GOOGLE_ADS_BASE_URL)
      .post(SEARCH_PATH, (body) => {
        if (!String(body.query).includes("FROM change_event")) return false;
        queries.push(body.query);
        return true;
      })
      .reply(200, { results: rows });
  };
  const runRound = async (
    state: Record<string, unknown>,
    paginationState?: ChangeEventCursor,
    extraContext: Record<string, unknown> = {},
  ) => {
    const setState = vi.fn();
    const context = {
      polling: { getState: () => state, setState },
      ...extraContext,
    } as never;
    const payload = paginationState
      ? { ...defaultTriggerPayload(), paginationState }
      : undefined;
    const { result } = await invokeTrigger(
      asTrigger(tc.trigger),
      context,
      payload,
      tc.params as never,
    );
    return { result, setState };
  };
  const nextPaginationState = (payload: unknown) =>
    tc.trigger.triggerResolver?.getNextPaginationState?.(
      {} as never,
      {
        payload,
      } as never,
    );
  const paginationStateOf = (payload: unknown) =>
    (
      payload as
        | {
            paginationState?: ChangeEventCursor;
          }
        | undefined
    )?.paginationState;
  const lowerBound = (query: string) =>
    /change_event\.change_date_time >= '([^']+)'/.exec(query)?.[1];
  const upperBound = (query: string) =>
    /change_event\.change_date_time < '([^']+)'/.exec(query)?.[1];
  const baseState = {
    lastChangeTime: PERSISTED_CURSOR,
    errorCount: 0,
    consecutiveErrors: 0,
  };
  beforeEach(() => {
    queries.length = 0;
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-03-15T12:00:00Z"));
  });
  afterEach(() => {
    vi.useRealTimers();
    nock.cleanAll();
  });
  test("queries ascending with the page size as LIMIT", async () => {
    mockRound([]);
    await runRound(baseState);
    expect(queries[0]).toContain("ORDER BY change_event.change_date_time ASC");
    expect(queries[0]).not.toContain("DESC");
    expect(queries[0]).toContain(`LIMIT ${PAGE_SIZE}`);
    expect(queries[0]).toContain("change_event.resource_name");
  });
  test("a batched flow queries the batched page size", async () => {
    mockRound([]);
    await runRound(baseState, undefined, { batch: { enabled: true } });
    expect(queries[0]).toContain(`LIMIT ${BATCHED_PAGE_SIZE}`);
  });
  test("a single short page keeps the unbatched body, commits the window end and stops", async () => {
    mockRound([ROW_1]);
    const { result, setState } = await runRound(baseState);
    expect(Object.keys(result?.payload.body.data as object).sort()).toEqual(
      [...tc.bodyKeys].sort(),
    );
    expect(tc.emittedIds(result?.payload.body.data)).toEqual(["1"]);
    expect(lowerBound(queries[0])).toBe(PERSISTED_CURSOR);
    expect(upperBound(queries[0])).toBe(WINDOW_END);
    expect(setState).toHaveBeenCalledWith({
      lastChangeTime: WINDOW_END,
      ...tc.extraState(1),
      errorCount: 0,
      consecutiveErrors: 0,
    });
    expect(paginationStateOf(result?.payload)).toBeUndefined();
    expect(nextPaginationState(result?.payload)).toBeNull();
    expect(result?.polledNoChanges).toBe(false);
  });
  test("a truncated page returns and mirrors the cursor without advancing lastChangeTime", async () => {
    mockRound([ROW_1, ROW_2, ROW_3]);
    const { result, setState } = await runRound(baseState);
    const expectedCursor: ChangeEventCursor = {
      sinceTime: "2026-03-15 11:30:00",
      toTime: WINDOW_END,
      boundaryResourceNames: [ROW_3.changeEvent.resourceName],
    };
    expect(paginationStateOf(result?.payload)).toEqual(expectedCursor);
    expect(nextPaginationState(result?.payload)).toEqual(expectedCursor);
    expect(setState).toHaveBeenCalledWith({
      lastChangeTime: PERSISTED_CURSOR,
      inFlightCursor: expectedCursor,
      ...tc.extraState(3),
      errorCount: 0,
      consecutiveErrors: 0,
    });
    expect(Object.keys(result?.payload.body.data as object).sort()).toEqual(
      [...tc.bodyKeys].sort(),
    );
    expect(result?.polledNoChanges).toBe(false);
  });
  test.each([
    ["batching on (platform hands the cursor back)", true],
    ["batching off (the cursor resumes from polling state)", false],
  ])("%s: the drain resumes from the frozen window without re-emitting the boundary row, then commits", async (_label, handCarried) => {
    mockRound([ROW_1, ROW_2, ROW_3]);
    const first = await runRound(baseState);
    const persisted = first.setState.mock.calls[0][0] as Record<
      string,
      unknown
    >;
    vi.setSystemTime(new Date("2026-03-15T12:30:00Z"));
    mockRound([ROW_3, ROW_4]);
    const second = await runRound(
      persisted,
      handCarried ? paginationStateOf(first.result?.payload) : undefined,
    );
    expect(lowerBound(queries[1])).toBe("2026-03-15 11:30:00");
    expect(upperBound(queries[1])).toBe(WINDOW_END);
    expect(tc.emittedIds(first.result?.payload.body.data)).toEqual([
      "1",
      "2",
      "3",
    ]);
    expect(tc.emittedIds(second.result?.payload.body.data)).toEqual(["4"]);
    expect(second.setState).toHaveBeenCalledWith({
      lastChangeTime: WINDOW_END,
      ...tc.extraState(1),
      errorCount: 0,
      consecutiveErrors: 0,
    });
    expect(paginationStateOf(second.result?.payload)).toBeUndefined();
    expect(nextPaginationState(second.result?.payload)).toBeNull();
    expect(second.result?.polledNoChanges).toBe(false);
  });
  test("an empty first round reports no changes", async () => {
    mockRound([]);
    const { result } = await runRound(baseState);
    expect(result?.polledNoChanges).toBe(true);
  });
  test("an empty continuation round commits the window end but does not report no changes", async () => {
    const cursor: ChangeEventCursor = {
      sinceTime: "2026-03-15 11:30:00",
      toTime: WINDOW_END,
      boundaryResourceNames: [ROW_3.changeEvent.resourceName],
    };
    mockRound([]);
    const { result, setState } = await runRound(
      { ...baseState, inFlightCursor: cursor },
      cursor,
    );
    expect(setState).toHaveBeenCalledWith({
      lastChangeTime: WINDOW_END,
      ...tc.extraState(0),
      errorCount: 0,
      consecutiveErrors: 0,
    });
    expect(result?.polledNoChanges).toBe(false);
  });
  test("a failure mid-drain keeps the mirrored cursor and does not advance lastChangeTime", async () => {
    const cursor: ChangeEventCursor = {
      sinceTime: "2026-03-15 11:30:00",
      toTime: WINDOW_END,
      boundaryResourceNames: [ROW_3.changeEvent.resourceName],
    };
    nock(GOOGLE_ADS_BASE_URL)
      .post(SEARCH_PATH, { query: TIMEZONE_QUERY })
      .reply(200, { results: [{ customer: { timeZone: "UTC" } }] });
    nock(GOOGLE_ADS_BASE_URL)
      .post(SEARCH_PATH, (body) =>
        String(body.query).includes("FROM change_event"),
      )
      .reply(500, { error: { message: "Internal error" } });
    const state = { ...baseState, inFlightCursor: cursor };
    const setState = vi.fn();
    const context = {
      polling: { getState: () => state, setState },
    } as never;
    await expect(
      invokeTrigger(
        asTrigger(tc.trigger),
        context,
        undefined,
        tc.params as never,
      ),
    ).rejects.toThrow();
    expect(setState).toHaveBeenCalledWith({
      ...state,
      errorCount: 1,
      consecutiveErrors: 1,
    });
  });
});
