import { util } from "@prismatic-io/spectral";
import {
  createConnection,
  defaultTriggerPayload,
  invokeTrigger,
} from "@prismatic-io/spectral/testing";
import nock from "nock";
import { oauth } from "../connections";
import {
  GOOGLE_ADS_API_VERSION,
  GOOGLE_ADS_BASE_URL,
  googleAdsSearchPath,
} from "../constants";
import type { ChangeEventCursor, ResourceChange } from "../types";
import { clampToChangeEventWindow } from "../util";
import { changeStatusTrigger } from "./changeStatusTrigger";

vi.mock("../constants", async (importOriginal) => ({
  ...(await importOriginal<typeof import("../constants")>()),
  CHANGE_EVENT_ROW_LIMIT: 3,
}));

const PAGE_SIZE = 3;
const CUSTOMER_ID = "1234567890";
const SEARCH_PATH = `/${GOOGLE_ADS_API_VERSION}${googleAdsSearchPath(CUSTOMER_ID)}`;
const TIMEZONE_QUERY = "SELECT customer.time_zone FROM customer LIMIT 1";
const WINDOW_END = "2026-03-15 11:55:00";
const PERSISTED_CURSOR = "2026-03-15 11:00:00";

const connection = createConnection(
  oauth,
  { developerToken: "test-developer-token" },
  { access_token: "test-access-token" },
);

const asTrigger = (trigger: unknown) => trigger as never;

const baseParams = {
  connection,
  customerId: CUSTOMER_ID,
  managerCustomerId: undefined,
  resourceTypes: [] as string[],
};

const baseState = {
  lastChangeTime: PERSISTED_CURSOR,
  errorCount: 0,
  consecutiveErrors: 0,
};

const statusRow = (
  id: number,
  lastChangeDateTime: string,
  resourceStatus = "CHANGED",
) => ({
  changeStatus: {
    resourceName: `customers/${CUSTOMER_ID}/changeStatus/${id}-2-${id}`,
    lastChangeDateTime,
    resourceType: "AD_GROUP",
    resourceStatus,
    campaign: `customers/${CUSTOMER_ID}/campaigns/99`,
    adGroup: `customers/${CUSTOMER_ID}/adGroups/${id}`,
  },
});

const ROW_1 = statusRow(1, "2026-03-15 11:10:00.100000");
const ROW_2 = statusRow(2, "2026-03-15 11:20:00.200000");
const ROW_3 = statusRow(3, "2026-03-15 11:30:00.300000");
const ROW_4 = statusRow(4, "2026-03-15 11:40:00.400000");

const queries: string[] = [];

const mockRound = (rows: unknown[]) => {
  nock(GOOGLE_ADS_BASE_URL)
    .post(SEARCH_PATH, { query: TIMEZONE_QUERY })
    .reply(200, { results: [{ customer: { timeZone: "UTC" } }] });
  nock(GOOGLE_ADS_BASE_URL)
    .post(SEARCH_PATH, (body) => {
      if (!util.types.toString(body.query).includes("FROM change_status"))
        return false;
      queries.push(body.query);
      return true;
    })
    .reply(200, { results: rows });
};

const runRound = async (
  state: Record<string, unknown>,
  paginationState?: ChangeEventCursor,
  params: Record<string, unknown> = baseParams,
) => {
  const setState = vi.fn();
  const context = {
    polling: { getState: () => state, setState },
  } as never;
  const payload = paginationState
    ? { ...defaultTriggerPayload(), paginationState }
    : undefined;
  const { result } = await invokeTrigger(
    asTrigger(changeStatusTrigger),
    context,
    payload,
    params as never,
  );
  return { result, setState };
};

const paginationStateOf = (payload: unknown) =>
  (payload as { paginationState?: ChangeEventCursor } | undefined)
    ?.paginationState;

const changesOf = (data: unknown) =>
  (data as { changes: ResourceChange[] }).changes;

const lowerBound = (query: string) =>
  /change_status\.last_change_date_time >= '([^']+)'/.exec(query)?.[1];
const upperBound = (query: string) =>
  /change_status\.last_change_date_time < '([^']+)'/.exec(query)?.[1];

describe("changeStatusTrigger", () => {
  beforeEach(() => {
    queries.length = 0;
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime("2026-03-15T12:00:00Z");
  });

  afterEach(() => {
    vi.useRealTimers();
    nock.cleanAll();
  });

  test("queries change_status ascending, bounded above by the settled window end", async () => {
    mockRound([]);
    await runRound(baseState);

    expect(lowerBound(queries[0])).toBe(PERSISTED_CURSOR);
    expect(upperBound(queries[0])).toBe(WINDOW_END);
    expect(queries[0]).toContain(
      "ORDER BY change_status.last_change_date_time ASC",
    );
    expect(queries[0]).toContain(`LIMIT ${PAGE_SIZE}`);
    expect(queries[0]).not.toContain("change_status.resource_type IN");
  });

  test("narrows the query to the selected resource types", async () => {
    mockRound([]);
    await runRound(baseState, undefined, {
      ...baseParams,
      resourceTypes: ["AD_GROUP_CRITERION", "CAMPAIGN_BUDGET"],
    });

    expect(queries[0]).toContain(
      "AND change_status.resource_type IN ('AD_GROUP_CRITERION','CAMPAIGN_BUDGET')",
    );
  });

  test("clamps a look-back date to the 90-day change_status window", async () => {
    mockRound([]);
    await runRound({}, undefined, {
      ...baseParams,
      lookBackDate: "2025-06-01",
    });

    expect(lowerBound(queries[0])).toBe(
      clampToChangeEventWindow("2025-06-01 00:00:00", "UTC", 90),
    );
    expect(lowerBound(queries[0])?.slice(0, 10)).toBe("2025-12-16");
  });

  test("keeps a look-back date inside the 90-day window that change_event would clamp", async () => {
    mockRound([]);
    await runRound({}, undefined, {
      ...baseParams,
      lookBackDate: "2026-01-20",
    });

    expect(lowerBound(queries[0])).toBe("2026-01-20 00:00:00");
  });

  test("maps resource statuses to change types and names the changed entity", async () => {
    mockRound([
      statusRow(1, "2026-03-15 11:10:00.100000", "ADDED"),
      statusRow(2, "2026-03-15 11:20:00.200000", "REMOVED"),
    ]);
    const { result } = await runRound(baseState);
    const changes = changesOf(result?.payload.body.data);

    expect(changes.map((c) => [c.resourceName, c.changeType])).toEqual([
      [`customers/${CUSTOMER_ID}/adGroups/2`, "removed"],
      [`customers/${CUSTOMER_ID}/adGroups/1`, "created"],
    ]);
    expect(changes[0]).toEqual({
      changeType: "removed",
      resourceType: "AD_GROUP",
      resourceStatus: "REMOVED",
      resourceName: `customers/${CUSTOMER_ID}/adGroups/2`,
      lastChangeDateTime: "2026-03-15 11:20:00.200000",
      changeStatus: statusRow(2, "2026-03-15 11:20:00.200000", "REMOVED")
        .changeStatus,
    });
  });

  test("maps CHANGED to updated", async () => {
    mockRound([ROW_1]);
    const { result } = await runRound(baseState);

    expect(changesOf(result?.payload.body.data)[0].changeType).toBe("updated");
  });

  test("drains a full page by timestamp without re-emitting the boundary row, then commits", async () => {
    mockRound([ROW_1, ROW_2, ROW_3]);
    const first = await runRound(baseState);
    const expectedCursor: ChangeEventCursor = {
      sinceTime: "2026-03-15 11:30:00",
      toTime: WINDOW_END,
      boundaryResourceNames: [ROW_3.changeStatus.resourceName],
    };

    expect(paginationStateOf(first.result?.payload)).toEqual(expectedCursor);
    expect(
      changeStatusTrigger.triggerResolver?.getNextPaginationState?.(
        {} as never,
        { payload: first.result?.payload } as never,
      ),
    ).toEqual(expectedCursor);
    expect(first.setState).toHaveBeenCalledWith({
      lastChangeTime: PERSISTED_CURSOR,
      inFlightCursor: expectedCursor,
      changeCount: 3,
      errorCount: 0,
      consecutiveErrors: 0,
    });
    expect(first.result?.polledNoChanges).toBe(false);

    vi.setSystemTime("2026-03-15T12:30:00Z");
    mockRound([ROW_3, ROW_4]);
    const second = await runRound(
      first.setState.mock.calls[0][0] as Record<string, unknown>,
    );

    expect(lowerBound(queries[1])).toBe("2026-03-15 11:30:00");
    expect(upperBound(queries[1])).toBe(WINDOW_END);
    expect(
      changesOf(second.result?.payload.body.data).map((c) => c.resourceName),
    ).toEqual([`customers/${CUSTOMER_ID}/adGroups/4`]);
    expect(second.setState).toHaveBeenCalledWith({
      lastChangeTime: WINDOW_END,
      changeCount: 1,
      errorCount: 0,
      consecutiveErrors: 0,
    });
    expect(paginationStateOf(second.result?.payload)).toBeUndefined();
    expect(
      changeStatusTrigger.triggerResolver?.getNextPaginationState?.(
        {} as never,
        { payload: second.result?.payload } as never,
      ),
    ).toBeNull();
  });

  test("an empty first round reports no changes", async () => {
    mockRound([]);
    const { result } = await runRound(baseState);

    expect(result?.polledNoChanges).toBe(true);
  });

  test("an empty continuation round does not report no changes", async () => {
    const cursor: ChangeEventCursor = {
      sinceTime: "2026-03-15 11:30:00",
      toTime: WINDOW_END,
      boundaryResourceNames: [ROW_3.changeStatus.resourceName],
    };
    mockRound([]);
    const { result, setState } = await runRound(
      { ...baseState, inFlightCursor: cursor },
      cursor,
    );

    expect(setState).toHaveBeenCalledWith({
      lastChangeTime: WINDOW_END,
      changeCount: 0,
      errorCount: 0,
      consecutiveErrors: 0,
    });
    expect(result?.polledNoChanges).toBe(false);
  });
});
