import type { TriggerBaseResult, TriggerPayload } from "@prismatic-io/spectral";
import type {
  DataSourceItemsChangesObject,
  DataSourcesChangesObject,
  PagesChangesObject,
} from "../types";
export const pagesPollingTriggerExamplePayload: TriggerBaseResult<
  TriggerPayload & {
    body: {
      data: PagesChangesObject;
    };
  }
> = {
  payload: {
    headers: {},
    queryParameters: {},
    rawBody: { data: null },
    body: {
      data: {
        newPages: [
          {
            object: "page",
            id: "12345678-1234-1234-1234-123456789012",
            created_time: "2026-01-23T10:00:00.000Z",
            last_edited_time: "2026-01-23T10:00:00.000Z",
            properties: {
              title: {
                id: "title",
                type: "title",
                title: [{ plain_text: "New Page Title" }],
              },
            },
            url: "https://www.notion.so/New-Page-12345678123412341234123456789012",
          },
        ],
        updatedPages: [
          {
            object: "page",
            id: "87654321-4321-4321-4321-210987654321",
            created_time: "2026-01-20T14:30:00.000Z",
            last_edited_time: "2026-01-23T11:15:00.000Z",
            properties: {
              title: {
                id: "title",
                type: "title",
                title: [{ plain_text: "Updated Page Title" }],
              },
            },
            url: "https://www.notion.so/Updated-Page-87654321432143214321210987654321",
          },
        ],
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
  polledNoChanges: false,
};
export const dataSourcesPollingTriggerExamplePayload: TriggerBaseResult<
  TriggerPayload & {
    body: {
      data: DataSourcesChangesObject;
    };
  }
> = {
  payload: {
    headers: {},
    queryParameters: {},
    rawBody: { data: null },
    body: {
      data: {
        newDataSources: [
          {
            object: "data_source",
            id: "12345678-1234-1234-1234-123456789012",
            created_time: "2026-01-23T10:00:00.000Z",
            last_edited_time: "2026-01-23T10:00:00.000Z",
            title: [{ plain_text: "New Database" }],
            properties: {
              Name: { id: "title", type: "title" },
              Status: { id: "abc123", type: "select" },
            },
            url: "https://www.notion.so/12345678123412341234123456789012",
          },
        ],
        updatedDataSources: [
          {
            object: "data_source",
            id: "87654321-4321-4321-4321-210987654321",
            created_time: "2026-01-20T14:30:00.000Z",
            last_edited_time: "2026-01-23T11:15:00.000Z",
            title: [{ plain_text: "Updated Database" }],
            properties: {
              Name: { id: "title", type: "title" },
            },
            url: "https://www.notion.so/87654321432143214321210987654321",
          },
        ],
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
  polledNoChanges: false,
};
export const dataSourceItemsPollingTriggerExamplePayload: TriggerBaseResult<
  TriggerPayload & {
    body: {
      data: DataSourceItemsChangesObject;
    };
  }
> = {
  payload: {
    headers: {},
    queryParameters: {},
    rawBody: { data: null },
    body: {
      data: {
        newItems: [
          {
            object: "page",
            id: "12345678-1234-1234-1234-123456789012",
            created_time: "2026-01-23T10:00:00.000Z",
            last_edited_time: "2026-01-23T10:00:00.000Z",
            parent: {
              type: "data_source_id",
              data_source_id: "87654321-4321-4321-4321-210987654321",
            },
            properties: {
              Name: {
                id: "title",
                type: "title",
                title: [{ plain_text: "New Record" }],
              },
              Status: {
                id: "status",
                type: "select",
                select: { name: "Active", color: "green" },
              },
            },
            url: "https://www.notion.so/New-Record-12345678123412341234123456789012",
          },
        ],
        updatedItems: [
          {
            object: "page",
            id: "12345678-1234-1234-1234-123456789012",
            created_time: "2026-01-23T10:00:00.000Z",
            last_edited_time: "2026-01-23T10:00:00.000Z",
            parent: {
              type: "data_source_id",
              data_source_id: "87654321-4321-4321-4321-210987654321",
            },
            properties: {
              Name: {
                id: "title",
                type: "title",
                title: [{ plain_text: "New Record" }],
              },
              Status: {
                id: "status",
                type: "select",
                select: { name: "Active", color: "green" },
              },
            },
            url: "https://www.notion.so/New-Record-12345678123412341234123456789012",
          },
          {
            object: "page",
            id: "11111111-1111-1111-1111-111111111111",
            created_time: "2026-01-20T14:30:00.000Z",
            last_edited_time: "2026-01-23T11:15:00.000Z",
            properties: {
              Name: {
                id: "title",
                type: "title",
                title: [{ plain_text: "Updated Record" }],
              },
              Status: {
                id: "status",
                type: "select",
                select: { name: "Completed", color: "blue" },
              },
            },
            url: "https://www.notion.so/Updated-Record-11111111111111111111111111111111",
          },
        ],
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
  polledNoChanges: false,
};
