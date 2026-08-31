import { defaultTriggerPayload } from "@prismatic-io/spectral/dist/testing";
import type {
  BudgetAlertChangesObject,
  BudgetStatus,
  CampaignChange,
  CampaignChangesObject,
  ChangeEventResponse,
  ChangeHistoryChangesObject,
} from "../types";
import {
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
