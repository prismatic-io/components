import {
  createConnection,
  defaultTriggerPayload,
  invokeTrigger,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { oauth } from "../connections";
import {
  DEFAULT_ALERT_THRESHOLD,
  GOOGLE_ADS_API_VERSION,
  GOOGLE_ADS_BASE_URL,
  googleAdsSearchPath,
} from "../constants";
import type {
  BudgetAlertChangesObject,
  BudgetStatus,
  CampaignChange,
  CampaignChangesObject,
  ChangeEventResponse,
  ChangeHistoryChangesObject,
} from "../types";
import {
  clampToChangeEventWindow,
  getCurrentDate,
  getGAQLDateTime,
  getPreviousDate,
  resolveBudgetAlerts,
  resolveCampaignChanges,
  resolveChangeHistoryItems,
} from "../util";
import { budgetAlertTrigger } from "./budgetAlertTrigger";
import { campaignChangesTrigger } from "./campaignChangesTrigger";
import { changeHistoryTrigger } from "./changeHistoryTrigger";
test.each([
  ["New and Updated Campaigns", campaignChangesTrigger],
  ["Account Change History", changeHistoryTrigger],
  ["Campaign Budget Alerts", budgetAlertTrigger],
])("%s is opt-in batchable with a default batch size", (_label, trigger) => {
  expect(trigger.triggerResolverSupport).toBe("valid");
  expect(trigger.batchConfig).toEqual({ batchSize: 50 });
  expect(trigger.triggerResolver?.resolveItems).toBeInstanceOf(Function);
});
describe("resolveCampaignChanges", () => {
  const change: CampaignChange = {
    changeType: "created",
    campaignId: "12345678901",
    campaignName: "Example-Campaign-1",
    field: "campaign",
    oldValue: null,
    newValue: {
      resourceName: "customers/1234567890/campaigns/12345678901",
      status: "ENABLED",
      name: "Example-Campaign-1",
      id: "12345678901",
    },
    changedAt: "2026-01-01 12:00:00",
  };
  test("wraps individual change records in tagged envelopes", () => {
    const data: CampaignChangesObject = {
      changes: [change],
      changesDetected: 1,
      timeRange: { start: "2026-01-01 11:00:00", end: "2026-01-01 12:10:00" },
      syncedAt: "2026-01-01 12:10:00",
    };
    expect(resolveCampaignChanges(data)).toEqual([
      { changeType: "created", record: change },
    ]);
  });
  test("returns [] for empty or undefined changes", () => {
    expect(
      resolveCampaignChanges({
        changes: [],
        changesDetected: 0,
        timeRange: { start: "", end: "" },
        syncedAt: "",
      }),
    ).toEqual([]);
    expect(resolveCampaignChanges(undefined)).toEqual([]);
  });
});
describe("resolveChangeHistoryItems", () => {
  const event: ChangeEventResponse = {
    changeEvent: {
      resourceName: "customers/6577008345/changeEvents/1764141874897602~0~1",
      changeDateTime: "2025-11-26 01:24:34.897602",
      changeResourceType: "CAMPAIGN_BUDGET",
      changeResourceName: "customers/6577008345/campaignBudgets/15170398017",
      clientType: "GOOGLE_ADS_WEB_CLIENT",
      oldResource: { campaignBudget: {} },
      newResource: {
        campaignBudget: {
          resourceName: "customers/6577008345/campaignBudgets/15170398017",
          amountMicros: "481350000",
        },
      },
      resourceChangeOperation: "CREATE",
    },
  };
  test("wraps individual change event records in tagged envelopes", () => {
    const data: ChangeHistoryChangesObject = {
      changes: [event],
      changeCount: 1,
      timeRange: { start: "2025-11-26 01:11:50", end: "2025-11-26 01:30:17" },
    };
    expect(resolveChangeHistoryItems(data)).toEqual([
      { changeType: "created", record: event },
    ]);
  });
  test("returns [] for empty or undefined changes", () => {
    expect(
      resolveChangeHistoryItems({
        changes: [],
        changeCount: 0,
        timeRange: { start: "", end: "" },
      }),
    ).toEqual([]);
    expect(resolveChangeHistoryItems(undefined)).toEqual([]);
  });
});
describe("resolveBudgetAlerts", () => {
  const alert: BudgetStatus = {
    campaignId: "23302011123",
    campaignName: "Example-Campaign-1",
    budgetAmount: 100,
    spent: 95,
    percentSpent: 95,
    remaining: 5,
    period: "DAILY",
    shouldAlert: true,
    severity: "warning" as BudgetStatus["severity"],
    message: "Campaign approaching daily budget limit",
  };
  test("wraps individual budget alert records in tagged envelopes", () => {
    const data: BudgetAlertChangesObject = {
      alerts: [alert],
      totalCampaignsMonitored: 10,
      alertThreshold: 80,
    };
    expect(resolveBudgetAlerts(data)).toEqual([
      { changeType: "warning", record: alert },
    ]);
  });
  test("returns [] for empty or undefined changes", () => {
    expect(
      resolveBudgetAlerts({
        alerts: [],
        totalCampaignsMonitored: 0,
        alertThreshold: 0,
      }),
    ).toEqual([]);
    expect(resolveBudgetAlerts(undefined)).toEqual([]);
  });
});
test("campaignChangesTrigger resolveItems flattens the payload shape perform returns", () => {
  const change: CampaignChange = {
    changeType: "budget",
    campaignId: "12345678901",
    campaignName: "Example-Campaign-1",
    field: "budget_amount_micros",
    oldValue: "50000000",
    newValue: "75000000",
    changedAt: "2026-01-01 12:05:00",
  };
  const payload = {
    ...defaultTriggerPayload(),
    body: {
      data: {
        changes: [change],
        changesDetected: 1,
        timeRange: { start: "2026-01-01 11:00:00", end: "2026-01-01 12:10:00" },
        syncedAt: "2026-01-01 12:10:00",
      },
    },
  };
  expect(
    campaignChangesTrigger.triggerResolver?.resolveItems?.({} as never, {
      payload,
    }),
  ).toEqual([{ changeType: "budget", record: change }]);
});
test("changeHistoryTrigger resolveItems flattens the payload shape perform returns", () => {
  const event: ChangeEventResponse = {
    changeEvent: {
      resourceName: "customers/6577008345/changeEvents/1764141874897602~0~1",
      changeDateTime: "2025-11-26 01:24:34.897602",
      changeResourceType: "CAMPAIGN_BUDGET",
      changeResourceName: "customers/6577008345/campaignBudgets/15170398017",
      clientType: "GOOGLE_ADS_WEB_CLIENT",
      oldResource: {},
      newResource: {},
      resourceChangeOperation: "CREATE",
    },
  };
  const payload = {
    ...defaultTriggerPayload(),
    body: {
      data: {
        changes: [event],
        changeCount: 1,
        timeRange: { start: "2025-11-26 01:11:50", end: "2025-11-26 01:30:17" },
      },
    },
  };
  expect(
    changeHistoryTrigger.triggerResolver?.resolveItems?.({} as never, {
      payload,
    }),
  ).toEqual([{ changeType: "created", record: event }]);
});
test("budgetAlertTrigger resolveItems flattens the payload shape perform returns", () => {
  const alert: BudgetStatus = {
    campaignId: "23302011123",
    campaignName: "Example-Campaign-1",
    budgetAmount: 100,
    spent: 95,
    percentSpent: 95,
    remaining: 5,
    period: "DAILY",
    shouldAlert: true,
    severity: "warning" as BudgetStatus["severity"],
    message: "Campaign approaching daily budget limit",
  };
  const payload = {
    ...defaultTriggerPayload(),
    body: {
      data: {
        alerts: [alert],
        totalCampaignsMonitored: 10,
        alertThreshold: 80,
      },
    },
  };
  expect(
    budgetAlertTrigger.triggerResolver?.resolveItems?.({} as never, {
      payload,
    }),
  ).toEqual([{ changeType: "warning", record: alert }]);
});
describe("trigger performs", () => {
  const CUSTOMER_ID = "1234567890";
  const SEARCH_PATH = `/${GOOGLE_ADS_API_VERSION}${googleAdsSearchPath(CUSTOMER_ID)}`;
  const TIMEZONE_QUERY = "SELECT customer.time_zone FROM customer LIMIT 1";
  const connection = createConnection(
    oauth,
    { developerToken: "test-developer-token" },
    { access_token: "test-access-token" },
  );
  const mockTimezone = () =>
    nock(GOOGLE_ADS_BASE_URL)
      .post(SEARCH_PATH, { query: TIMEZONE_QUERY })
      .reply(200, { results: [{ customer: { timeZone: "UTC" } }] });
  const asTrigger = (trigger: unknown) => trigger as never;
  const pollingContext = (state: Record<string, unknown>) => {
    const setState = vi.fn();
    const context = {
      polling: { getState: () => state, setState },
    } as never;
    return { context, setState };
  };
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-03-15T12:00:00Z"));
  });
  afterEach(() => {
    vi.useRealTimers();
    nock.cleanAll();
  });
  test("changeHistoryTrigger clamps a cursor older than the change_event window", async () => {
    const staleCursor = getGAQLDateTime("UTC", 40 * 24);
    let changeQuery = "";
    const timezoneScope = mockTimezone();
    const searchScope = nock(GOOGLE_ADS_BASE_URL)
      .post(SEARCH_PATH, (body) => {
        if (!String(body.query).includes("FROM change_event")) return false;
        changeQuery = body.query;
        return true;
      })
      .reply(200, { results: [] });
    const { context } = pollingContext({
      lastChangeTime: staleCursor,
      errorCount: 0,
      consecutiveErrors: 0,
    });
    await invokeTrigger(asTrigger(changeHistoryTrigger), context, undefined, {
      connection,
      customerId: CUSTOMER_ID,
      managerCustomerId: undefined,
      resourceTypes: [],
      includeUserInfo: false,
    });
    expect(timezoneScope.isDone()).toBe(true);
    expect(searchScope.isDone()).toBe(true);
    const lowerBound = /change_date_time >= '([^']+)'/.exec(changeQuery)?.[1];
    expect(lowerBound).not.toBe(staleCursor);
    expect(lowerBound).toBe(clampToChangeEventWindow(staleCursor, "UTC"));
  });
  test("campaignChangesTrigger: with no polling state, a look-back date seeds the initial sync (clamped to the 30-day window)", async () => {
    const lookBackDate = "2025-01-01";
    let capturedQuery = "";
    const timezoneScope = mockTimezone();
    const searchScope = nock(GOOGLE_ADS_BASE_URL)
      .post(SEARCH_PATH, (body) => {
        if (!String(body.query).includes("FROM change_event")) return false;
        capturedQuery = body.query;
        return true;
      })
      .reply(200, { results: [] });
    const { context } = pollingContext({});
    await invokeTrigger(asTrigger(campaignChangesTrigger), context, undefined, {
      connection,
      customerId: CUSTOMER_ID,
      managerCustomerId: undefined,
      lookBackDate,
      changeTypes: ["all"],
    });
    expect(timezoneScope.isDone()).toBe(true);
    expect(searchScope.isDone()).toBe(true);
    const lowerBound = /change_event\.change_date_time >= '([^']+)'/.exec(
      capturedQuery,
    )?.[1];
    expect(lowerBound).toBe(
      clampToChangeEventWindow(`${lookBackDate} 00:00:00`, "UTC"),
    );
  });
  test("campaignChangesTrigger: with existing polling state, the look-back date is ignored", async () => {
    const persistedCursor = getGAQLDateTime("UTC", 2);
    let capturedQuery = "";
    const timezoneScope = mockTimezone();
    const searchScope = nock(GOOGLE_ADS_BASE_URL)
      .post(SEARCH_PATH, (body) => {
        if (!String(body.query).includes("FROM change_event")) return false;
        capturedQuery = body.query;
        return true;
      })
      .reply(200, { results: [] });
    const { context } = pollingContext({
      lastChangeTime: persistedCursor,
      errorCount: 0,
      consecutiveErrors: 0,
    });
    await invokeTrigger(asTrigger(campaignChangesTrigger), context, undefined, {
      connection,
      customerId: CUSTOMER_ID,
      managerCustomerId: undefined,
      lookBackDate: "2020-01-01",
      changeTypes: ["all"],
    });
    expect(timezoneScope.isDone()).toBe(true);
    expect(searchScope.isDone()).toBe(true);
    const lowerBound = /change_event\.change_date_time >= '([^']+)'/.exec(
      capturedQuery,
    )?.[1];
    expect(lowerBound).toBe(persistedCursor);
  });
  test("changeHistoryTrigger: with no polling state, a look-back date seeds the initial sync (clamped to the 30-day window)", async () => {
    const lookBackDate = "2025-01-01";
    let capturedQuery = "";
    const timezoneScope = mockTimezone();
    const searchScope = nock(GOOGLE_ADS_BASE_URL)
      .post(SEARCH_PATH, (body) => {
        if (!String(body.query).includes("FROM change_event")) return false;
        capturedQuery = body.query;
        return true;
      })
      .reply(200, { results: [] });
    const { context } = pollingContext({});
    await invokeTrigger(asTrigger(changeHistoryTrigger), context, undefined, {
      connection,
      customerId: CUSTOMER_ID,
      managerCustomerId: undefined,
      lookBackDate,
      resourceTypes: [],
      includeUserInfo: false,
    });
    expect(timezoneScope.isDone()).toBe(true);
    expect(searchScope.isDone()).toBe(true);
    const lowerBound = /change_event\.change_date_time >= '([^']+)'/.exec(
      capturedQuery,
    )?.[1];
    expect(lowerBound).toBe(
      clampToChangeEventWindow(`${lookBackDate} 00:00:00`, "UTC"),
    );
  });
  test("changeHistoryTrigger: with existing polling state, the look-back date is ignored", async () => {
    const persistedCursor = getGAQLDateTime("UTC", 2);
    let capturedQuery = "";
    const timezoneScope = mockTimezone();
    const searchScope = nock(GOOGLE_ADS_BASE_URL)
      .post(SEARCH_PATH, (body) => {
        if (!String(body.query).includes("FROM change_event")) return false;
        capturedQuery = body.query;
        return true;
      })
      .reply(200, { results: [] });
    const { context } = pollingContext({
      lastChangeTime: persistedCursor,
      errorCount: 0,
      consecutiveErrors: 0,
    });
    await invokeTrigger(asTrigger(changeHistoryTrigger), context, undefined, {
      connection,
      customerId: CUSTOMER_ID,
      managerCustomerId: undefined,
      lookBackDate: "2020-01-01",
      resourceTypes: [],
      includeUserInfo: false,
    });
    expect(timezoneScope.isDone()).toBe(true);
    expect(searchScope.isDone()).toBe(true);
    const lowerBound = /change_event\.change_date_time >= '([^']+)'/.exec(
      capturedQuery,
    )?.[1];
    expect(lowerBound).toBe(persistedCursor);
  });
  test("budgetAlertTrigger reports the default threshold when none is set", async () => {
    const timezoneScope = mockTimezone();
    const searchScope = nock(GOOGLE_ADS_BASE_URL)
      .post(SEARCH_PATH, (body) => body.query !== TIMEZONE_QUERY)
      .reply(200, { results: [] });
    const { context } = pollingContext({
      lastSyncDate: "2026-03-14",
      errorCount: 0,
      consecutiveErrors: 0,
    });
    const { result } = await invokeTrigger(
      asTrigger(budgetAlertTrigger),
      context,
      undefined,
      {
        connection,
        customerId: CUSTOMER_ID,
        managerCustomerId: undefined,
        alertThreshold: undefined,
        includeSharedBudgets: false,
      },
    );
    expect(timezoneScope.isDone()).toBe(true);
    expect(searchScope.isDone()).toBe(true);
    const data = result?.payload.body.data as BudgetAlertChangesObject;
    expect(data.alertThreshold).toBe(DEFAULT_ALERT_THRESHOLD);
  });
  test("campaignChangesTrigger: first poll sends the default bounds and persists the new cursor", async () => {
    const invokePoll = (state: Record<string, unknown>) => {
      let capturedQuery = "";
      const timezoneScope = mockTimezone();
      const searchScope = nock(GOOGLE_ADS_BASE_URL)
        .post(SEARCH_PATH, (body) => {
          if (!String(body.query).includes("FROM change_event")) return false;
          capturedQuery = body.query;
          return true;
        })
        .reply(200, { results: [] });
      const { context, setState } = pollingContext(state);
      return {
        timezoneScope,
        searchScope,
        context,
        setState,
        getQuery: () => capturedQuery,
      };
    };
    const runTrigger = async (context: never) => {
      const { result } = await invokeTrigger(
        asTrigger(campaignChangesTrigger),
        context,
        undefined,
        {
          connection,
          customerId: CUSTOMER_ID,
          managerCustomerId: undefined,
          changeTypes: ["all"],
        },
      );
      return result;
    };
    const first = invokePoll({});
    const firstResult = await runTrigger(first.context);
    expect(first.timezoneScope.isDone()).toBe(true);
    expect(first.searchScope.isDone()).toBe(true);
    const lower1 = /change_event\.change_date_time >= '([^']+)'/.exec(
      first.getQuery(),
    )?.[1];
    const upper1 = /change_event\.change_date_time < '([^']+)'/.exec(
      first.getQuery(),
    )?.[1];
    expect(lower1).toBe(getGAQLDateTime("UTC", 1));
    expect(upper1).toBe(getGAQLDateTime("UTC"));
    expect(first.setState).toHaveBeenCalledWith({
      lastChangeTime: upper1,
      errorCount: 0,
      consecutiveErrors: 0,
    });
    expect(firstResult?.polledNoChanges).toBe(true);
    vi.setSystemTime(new Date("2026-03-15T13:00:00Z"));
    const persisted = first.setState.mock.calls[0][0] as Record<
      string,
      unknown
    >;
    const second = invokePoll(persisted);
    const secondResult = await runTrigger(second.context);
    expect(second.timezoneScope.isDone()).toBe(true);
    expect(second.searchScope.isDone()).toBe(true);
    const lower2 = /change_event\.change_date_time >= '([^']+)'/.exec(
      second.getQuery(),
    )?.[1];
    expect(lower2).toBe(upper1);
    expect(secondResult?.polledNoChanges).toBe(true);
  });
  test("changeHistoryTrigger: first poll sends the default bounds and persists the new cursor", async () => {
    const invokePoll = (state: Record<string, unknown>) => {
      let capturedQuery = "";
      const timezoneScope = mockTimezone();
      const searchScope = nock(GOOGLE_ADS_BASE_URL)
        .post(SEARCH_PATH, (body) => {
          if (!String(body.query).includes("FROM change_event")) return false;
          capturedQuery = body.query;
          return true;
        })
        .reply(200, { results: [] });
      const { context, setState } = pollingContext(state);
      return {
        timezoneScope,
        searchScope,
        context,
        setState,
        getQuery: () => capturedQuery,
      };
    };
    const runTrigger = async (context: never) => {
      const { result } = await invokeTrigger(
        asTrigger(changeHistoryTrigger),
        context,
        undefined,
        {
          connection,
          customerId: CUSTOMER_ID,
          managerCustomerId: undefined,
          resourceTypes: [],
          includeUserInfo: false,
        },
      );
      return result;
    };
    const first = invokePoll({});
    const firstResult = await runTrigger(first.context);
    expect(first.timezoneScope.isDone()).toBe(true);
    expect(first.searchScope.isDone()).toBe(true);
    const lower1 = /change_event\.change_date_time >= '([^']+)'/.exec(
      first.getQuery(),
    )?.[1];
    const upper1 = /change_event\.change_date_time < '([^']+)'/.exec(
      first.getQuery(),
    )?.[1];
    expect(lower1).toBe(getGAQLDateTime("UTC", 1));
    expect(upper1).toBe(getGAQLDateTime("UTC"));
    expect(first.setState).toHaveBeenCalledWith({
      lastChangeTime: upper1,
      changeCount: 0,
      errorCount: 0,
      consecutiveErrors: 0,
    });
    expect(firstResult?.polledNoChanges).toBe(true);
    vi.setSystemTime(new Date("2026-03-15T13:00:00Z"));
    const persisted = first.setState.mock.calls[0][0] as Record<
      string,
      unknown
    >;
    const second = invokePoll(persisted);
    const secondResult = await runTrigger(second.context);
    expect(second.timezoneScope.isDone()).toBe(true);
    expect(second.searchScope.isDone()).toBe(true);
    const lower2 = /change_event\.change_date_time >= '([^']+)'/.exec(
      second.getQuery(),
    )?.[1];
    expect(lower2).toBe(upper1);
    expect(secondResult?.polledNoChanges).toBe(true);
  });
  test("budgetAlertTrigger: first poll sends the default bounds and persists the new cursor", async () => {
    const invokePoll = (state: Record<string, unknown>) => {
      let capturedQuery = "";
      const timezoneScope = mockTimezone();
      const searchScope = nock(GOOGLE_ADS_BASE_URL)
        .post(SEARCH_PATH, (body) => {
          if (body.query === TIMEZONE_QUERY) return false;
          capturedQuery = body.query;
          return true;
        })
        .reply(200, { results: [] });
      const { context, setState } = pollingContext(state);
      return {
        timezoneScope,
        searchScope,
        context,
        setState,
        getQuery: () => capturedQuery,
      };
    };
    const runTrigger = async (context: never) => {
      const { result } = await invokeTrigger(
        asTrigger(budgetAlertTrigger),
        context,
        undefined,
        {
          connection,
          customerId: CUSTOMER_ID,
          managerCustomerId: undefined,
          alertThreshold: undefined,
          includeSharedBudgets: false,
        },
      );
      return result;
    };
    const first = invokePoll({});
    const firstResult = await runTrigger(first.context);
    expect(first.timezoneScope.isDone()).toBe(true);
    expect(first.searchScope.isDone()).toBe(true);
    expect(first.getQuery()).toContain("segments.date DURING TODAY");
    expect(first.setState).toHaveBeenCalledWith({
      lastSyncDate: getCurrentDate("UTC"),
      errorCount: 0,
      consecutiveErrors: 0,
    });
    expect(firstResult?.polledNoChanges).toBe(true);
    vi.setSystemTime(new Date("2026-03-16T12:00:00Z"));
    const persisted = first.setState.mock.calls[0][0] as Record<
      string,
      unknown
    >;
    const second = invokePoll(persisted);
    await runTrigger(second.context);
    expect(second.timezoneScope.isDone()).toBe(true);
    expect(second.searchScope.isDone()).toBe(true);
    expect(second.getQuery()).toContain("segments.date DURING TODAY");
  });
  test("budgetAlertTrigger: the daily comparison always queries today's spend, regardless of the persisted cursor", async () => {
    const staleCursor = getPreviousDate("UTC");
    let capturedQuery = "";
    const timezoneScope = mockTimezone();
    const searchScope = nock(GOOGLE_ADS_BASE_URL)
      .post(SEARCH_PATH, (body) => {
        if (body.query === TIMEZONE_QUERY) return false;
        capturedQuery = body.query;
        return true;
      })
      .reply(200, { results: [] });
    const { context } = pollingContext({
      lastSyncDate: staleCursor,
      errorCount: 0,
      consecutiveErrors: 0,
    });
    await invokeTrigger(asTrigger(budgetAlertTrigger), context, undefined, {
      connection,
      customerId: CUSTOMER_ID,
      managerCustomerId: undefined,
      alertThreshold: undefined,
      includeSharedBudgets: false,
    });
    expect(timezoneScope.isDone()).toBe(true);
    expect(searchScope.isDone()).toBe(true);
    expect(capturedQuery).toContain("segments.date DURING TODAY");
    expect(capturedQuery).toContain(
      "campaign_budget.explicitly_shared = FALSE",
    );
  });
  test("budgetAlertTrigger: includeSharedBudgets true (the default) does not filter out shared budgets", async () => {
    let capturedQuery = "";
    const timezoneScope = mockTimezone();
    const searchScope = nock(GOOGLE_ADS_BASE_URL)
      .post(SEARCH_PATH, (body) => {
        if (body.query === TIMEZONE_QUERY) return false;
        capturedQuery = body.query;
        return true;
      })
      .reply(200, { results: [] });
    const { context } = pollingContext({});
    await invokeTrigger(asTrigger(budgetAlertTrigger), context, undefined, {
      connection,
      customerId: CUSTOMER_ID,
      managerCustomerId: undefined,
      alertThreshold: undefined,
      includeSharedBudgets: true,
    });
    expect(timezoneScope.isDone()).toBe(true);
    expect(searchScope.isDone()).toBe(true);
    expect(capturedQuery).not.toContain("explicitly_shared");
  });
});
