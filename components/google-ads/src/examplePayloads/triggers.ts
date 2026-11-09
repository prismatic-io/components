import type { TriggerPayload } from "@prismatic-io/spectral";
import { BUDGET_SEVERITY } from "../constants";

export const campaignChangesTriggerExamplePayload: { payload: TriggerPayload } =
  {
    payload: {
      headers: {},
      queryParameters: {},
      rawBody: { data: null },
      body: {
        data: {
          changes: [
            {
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
            },
            {
              changeType: "budget",
              campaignId: "12345678901",
              campaignName: "Example-Campaign-1",
              field: "budget_amount_micros",
              oldValue: "50000000",
              newValue: "75000000",
              changedAt: "2026-01-01 12:05:00",
            },
          ],
          changesDetected: 2,
          timeRange: {
            start: "2026-01-01 11:00:00",
            end: "2026-01-01 12:10:00",
          },
          syncedAt: "2026-01-01 12:10:00",
        },
      },
      pathFragment: "",
      webhookUrls: {},
      webhookApiKeys: {},
      invokeUrl: "",
      executionId: "RXhhbXBsZUV4ZWN1dGlvblJlc3VsdElk",
      customer: {
        id: "testCustomerId",
        name: "Test Customer",
        externalId: "testExternalId",
      },
      instance: { id: "testInstanceId", name: "Test Instance" },
      user: {
        id: "testUserId",
        email: "user@example.com",
        name: "Test User",
        externalId: "testUserExternalId",
      },
      integration: {
        id: "testIntegrationId",
        name: "Test Integration",
        versionSequenceId: "1",
        externalVersion: "",
      },
      flow: {
        id: "testFlowId",
        name: "Test Flow",
        stableId: "testFlowStableId",
      },
      startedAt: "2024-01-15T00:00:00.000Z",
      globalDebug: false,
    },
  };

export const budgetAlertTriggerExamplePayload: { payload: TriggerPayload } = {
  payload: {
    headers: {},
    queryParameters: {},
    rawBody: { data: null },
    body: {
      data: {
        alerts: [
          {
            campaignId: "23302011123",
            campaignName: "Example-Campaign-1",
            budgetAmount: 100,
            spent: 1000,
            percentSpent: 1000,
            remaining: -900,
            period: "DAILY",
            shouldAlert: true,
            severity: BUDGET_SEVERITY.CRITICAL,
            message: "Campaign has exceeded daily",
          },
        ],
        totalCampaignsMonitored: 1,
        alertThreshold: 80,
      },
    },
    pathFragment: "",
    webhookUrls: {},
    webhookApiKeys: {},
    invokeUrl: "",
    executionId: "RXhhbXBsZUV4ZWN1dGlvblJlc3VsdElk",
    customer: {
      id: "testCustomerId",
      name: "Test Customer",
      externalId: "testExternalId",
    },
    instance: { id: "testInstanceId", name: "Test Instance" },
    user: {
      id: "testUserId",
      email: "user@example.com",
      name: "Test User",
      externalId: "testUserExternalId",
    },
    integration: {
      id: "testIntegrationId",
      name: "Test Integration",
      versionSequenceId: "1",
      externalVersion: "",
    },
    flow: { id: "testFlowId", name: "Test Flow", stableId: "testFlowStableId" },
    startedAt: "2024-01-15T00:00:00.000Z",
    globalDebug: false,
  },
};

export const changeHistoryTriggerExamplePayload: { payload: TriggerPayload } = {
  payload: {
    headers: {},
    queryParameters: {},
    rawBody: { data: null },
    body: {
      data: {
        changes: [
          {
            changeEvent: {
              resourceName:
                "customers/6577008345/changeEvents/1764141874897602~0~1",
              changeDateTime: "2025-11-26 01:24:34.897602",
              changeResourceType: "CAMPAIGN_BUDGET",
              changeResourceName:
                "customers/6577008345/campaignBudgets/15170398017",
              clientType: "GOOGLE_ADS_WEB_CLIENT",
              userEmail: "exampleUser@email.com",
              oldResource: {
                campaignBudget: {},
              },
              newResource: {
                campaignBudget: {
                  resourceName:
                    "customers/6577008345/campaignBudgets/15170398017",
                  deliveryMethod: "STANDARD",
                  period: "DAILY",
                  type: "STANDARD",
                  id: "15170398017",
                  amountMicros: "481350000",
                  explicitlyShared: false,
                },
              },
              resourceChangeOperation: "CREATE",
            },
          },
        ],
        changeCount: 1,
        timeRange: {
          start: "2025-11-26 01:11:50",
          end: "2025-11-26 01:30:17",
        },
      },
    },
    pathFragment: "",
    webhookUrls: {},
    webhookApiKeys: {},
    invokeUrl: "",
    executionId: "RXhhbXBsZUV4ZWN1dGlvblJlc3VsdElk",
    customer: {
      id: "testCustomerId",
      name: "Test Customer",
      externalId: "testExternalId",
    },
    instance: { id: "testInstanceId", name: "Test Instance" },
    user: {
      id: "testUserId",
      email: "user@example.com",
      name: "Test User",
      externalId: "testUserExternalId",
    },
    integration: {
      id: "testIntegrationId",
      name: "Test Integration",
      versionSequenceId: "1",
      externalVersion: "",
    },
    flow: { id: "testFlowId", name: "Test Flow", stableId: "testFlowStableId" },
    startedAt: "2024-01-15T00:00:00.000Z",
    globalDebug: false,
  },
};

export const changeStatusTriggerExamplePayload: { payload: TriggerPayload } = {
  payload: {
    headers: {},
    queryParameters: {},
    rawBody: { data: null },
    body: {
      data: {
        changes: [
          {
            changeType: "updated",
            resourceType: "CAMPAIGN_BUDGET",
            resourceStatus: "CHANGED",
            resourceName: "customers/6577008345/campaignBudgets/15170398017",
            lastChangeDateTime: "2026-11-02 09:41:27.318204",
            changeStatus: {
              resourceName:
                "customers/6577008345/changeStatus/1793634087318204-7-15170398017",
              lastChangeDateTime: "2026-11-02 09:41:27.318204",
              resourceType: "CAMPAIGN_BUDGET",
              resourceStatus: "CHANGED",
              campaignBudget:
                "customers/6577008345/campaignBudgets/15170398017",
            },
          },
          {
            changeType: "created",
            resourceType: "CAMPAIGN_BUDGET",
            resourceStatus: "ADDED",
            resourceName: "customers/6577008345/campaignBudgets/15170398020",
            lastChangeDateTime: "2026-11-02 09:12:05.604913",
            changeStatus: {
              resourceName:
                "customers/6577008345/changeStatus/1793632325604913-7-15170398020",
              lastChangeDateTime: "2026-11-02 09:12:05.604913",
              resourceType: "CAMPAIGN_BUDGET",
              resourceStatus: "ADDED",
              campaignBudget:
                "customers/6577008345/campaignBudgets/15170398020",
            },
          },
        ],
        changeCount: 2,
        timeRange: {
          start: "2026-11-02 09:00:00",
          end: "2026-11-02 09:55:00",
        },
      },
    },
    pathFragment: "",
    webhookUrls: {},
    webhookApiKeys: {},
    invokeUrl: "",
    executionId: "RXhhbXBsZUV4ZWN1dGlvblJlc3VsdElk",
    customer: {
      id: "testCustomerId",
      name: "Test Customer",
      externalId: "testExternalId",
    },
    instance: { id: "testInstanceId", name: "Test Instance" },
    user: {
      id: "testUserId",
      email: "user@example.com",
      name: "Test User",
      externalId: "testUserExternalId",
    },
    integration: {
      id: "testIntegrationId",
      name: "Test Integration",
      versionSequenceId: "1",
      externalVersion: "",
    },
    flow: { id: "testFlowId", name: "Test Flow", stableId: "testFlowStableId" },
    startedAt: "2024-01-15T00:00:00.000Z",
    globalDebug: false,
  },
};
