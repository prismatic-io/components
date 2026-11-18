import type { TriggerPayload } from "@prismatic-io/spectral";

export const archiveBoardExamplePayload = {
  data: {
    archive_board: {
      id: "4277545378",
    },
  },
};

export const createBoardExamplePayload = {
  data: {
    create_board: {
      id: "4277545378",
    },
  },
};

export const getBoardExamplePayload = {
  data: {
    boards: [
      {
        id: "2924980809",
        name: "H2 Kickoff",
        state: "active",
        board_folder_id: null,
        columns: [
          {
            title: "Name",
            type: "name",
          },
          {
            title: "Person",
            type: "multiple-person",
          },
          {
            title: "Status",
            type: "color",
          },
          {
            title: "Date",
            type: "date",
          },
        ],
        creator: {
          id: "32002207",
        },
      },
    ],
  },
};

export const getItemsByColumnValueNewExamplePayload = {
  data: {
    items_by_column_values: [
      {
        id: "12345678912",
        name: "task #1",
        creator: {
          email: "example@email.com",
        },
        updated_at: "2024-02-23T15:23:39Z",
        state: "active",
        column_values: [
          {
            id: "person",
            text: "John Doe",
            column: {
              description: null,
              title: "Person",
            },
            type: "people",
            value: '{"personsAndTeams":[{"id":12345678,"kind":"person"}]}',
          },
          {
            id: "status",
            text: "Working on it",
            column: {
              description: null,
              title: "Status",
            },
            type: "status",
            value:
              '{"index":0,"post_id":null,"changed_at":"2019-03-01T17:24:57.321Z"}',
          },
          {
            id: "date4",
            text: "2022-07-12",
            column: {
              description: null,
              title: "Date",
            },
            type: "date",
            value:
              '{"date":"2022-07-12","icon":null,"changed_at":"2022-07-11T20:27:58.362Z"}',
          },
          {
            id: "text",
            text: "This is a text column",
            column: {
              description: null,
              title: "Text",
            },
            type: "text",
            value: '"This is a text column"',
          },
          {
            id: "country",
            text: "United States",
            column: {
              description: null,
              title: "Country",
            },
            type: "country",
            value:
              '{"changed_at":"2024-02-23T15:23:39.043Z","countryCode":"US","countryName":"United States"}',
          },
        ],
      },
    ],
  },
};

export const listBoardsExamplePayload = {
  data: {
    boards: [
      {
        id: "2924980809",
        name: "H2 Kickoff",
        state: "active",
        board_folder_id: null,
        creator: {
          id: "32002207",
        },
      },
      {
        id: "2924980810",
        name: "Engineering Backlog",
        state: "active",
        board_folder_id: "12345",
        creator: {
          id: "32002207",
        },
      },
    ],
  },
};

export const createWebhookExamplePayload = {
  data: {
    create_webhook: {
      id: "147295839",
      board_id: "2924980809",
      event: "create_item",
      config: null,
    },
  },
};

export const deleteWebhookExamplePayload = {
  data: {
    delete_webhook: {
      id: "147295839",
      board_id: "2924980809",
    },
  },
};

export const listWebhooksExamplePayload = {
  data: {
    webhooks: [
      {
        id: "147295839",
        board_id: "2924980809",
        event: "create_item",
        config: null,
      },
      {
        id: "147295840",
        board_id: "2924980809",
        event: "change_column_value",
        config: '{"columnId":"status"}',
      },
    ],
  },
};

export const selectBoardExamplePayload = {
  result: [
    { label: "H2 Kickoff", key: "2924980809" },
    { label: "Engineering Backlog", key: "2924980810" },
  ],
};

export const selectWebhookExamplePayload = {
  result: [
    { label: "147295839 - create_item", key: "147295839" },
    { label: "147295840 - change_column_value", key: "147295840" },
  ],
};

export const webhookExamplePayload: {
  payload: TriggerPayload;
  branch: string;
} = {
  payload: {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.EXAMPLE_PAYLOAD.EXAMPLE_SIGNATURE",
      "User-Agent": "monday-webhooks",
    },
    queryParameters: {},
    rawBody: { data: null },
    body: {
      data: {
        event: {
          userId: 32002207,
          originalTriggerUuid: null,
          boardId: 2924980809,
          pulseId: 4277581981,
          pulseName: "Task 1",
          groupId: "topics",
          groupName: "Group Title",
          groupColor: "#579bfc",
          isTopGroup: true,
          columnValues: {},
          app: "monday",
          type: "create_pulse",
          triggerTime: "2026-05-21T14:00:00.000Z",
          subscriptionId: 147295839,
          triggerUuid: "b5ed2e17c530446a98b25b8e6f0d6a1f",
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
  branch: "Notification",
};

export const pollChangesTriggerExamplePayload: {
  payload: TriggerPayload;
  polledNoChanges: boolean;
} = {
  payload: {
    headers: {},
    queryParameters: {},
    rawBody: { data: null },
    body: {
      data: {
        created: [
          {
            id: "4277581981",
            name: "Task 1",
            created_at: "2026-05-21T14:00:00Z",
            updated_at: "2026-05-21T14:00:00Z",
            state: "active",
          },
        ],
        updated: [
          {
            id: "4277581980",
            name: "Onboard new hire",
            created_at: "2026-04-10T09:15:00Z",
            updated_at: "2026-05-21T15:00:00Z",
            state: "active",
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
    flow: { id: "testFlowId", name: "Test Flow", stableId: "testFlowStableId" },
    startedAt: "2024-01-15T00:00:00.000Z",
    globalDebug: false,
  },
  polledNoChanges: false,
};
