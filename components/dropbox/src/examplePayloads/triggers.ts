import type {
  TriggerBaseResult,
  TriggerBranchingResult,
  TriggerPayload,
} from "@prismatic-io/spectral";
import type { ListChangesResult } from "../types";
export const dropboxWebhookExamplePayload: TriggerBranchingResult<TriggerPayload> =
  {
    branch: "Notification",
    payload: {
      globalDebug: false,
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "DropboxWebhooks/1.0",
        "X-Dropbox-Signature":
          "a3f5c19e7d2b48610fe4c8a97b3d5e2016c4f8a1d9b7e3c50a2f6d8b4e17c930",
      },
      queryParameters: null,
      rawBody: {
        data: '{"list_folder": {"accounts": ["dbid:AAH4f99T0taONIb-OurWxbNQ6ywGRopQngc"]}, "delta": {"users": [4245623]}}',
        contentType: "application/json",
      },
      body: {
        data: {
          list_folder: {
            accounts: ["dbid:AAH4f99T0taONIb-OurWxbNQ6ywGRopQngc"],
          },
          delta: {
            users: [4245623],
          },
        },
        contentType: "application/json",
      },
      pathFragment: "",
      webhookUrls: {
        "Flow 1": "https://hooks.example.com/trigger/WEBHOOK_ID",
      },
      webhookApiKeys: {
        "Flow 1": ["sample-api-key"],
      },
      invokeUrl: "https://hooks.example.com/trigger/WEBHOOK_ID",
      executionId: "exampleExecutionId",
      customer: {
        id: "testCustomerId",
        name: "Test Customer",
        externalId: "testCustomerExternalId",
      },
      instance: {
        id: "testInstanceId",
        name: "Test Instance",
      },
      user: {
        id: "testUserId",
        email: "testUserEmail@example.com",
        name: "Test User",
        externalId: "testUserExternalId",
      },
      integration: {
        id: "testIntegrationId",
        name: "Test Integration",
        versionSequenceId: "testIntegrationVersionSequenceId",
        externalVersion: "testExternalVersion",
      },
      flow: {
        id: "testFlowId",
        name: "Test Flow Name",
        stableId: "testFlowStableId",
      },
      startedAt: "2024-11-21 18:07:22.778766+00",
    },
  };
export const pollChangesTriggerExamplePayload: TriggerBaseResult<
  TriggerPayload & {
    body: {
      data: ListChangesResult;
    };
  }
> = {
  crossFlowState: {
    "dropbox-list-changes-cursor:exampleStableFlowId:exampleStepName": {
      cursor: "examplePaginationCursorValue",
      path: "/TestSubfolder",
      recursive: true,
      includeDeleted: false,
    },
  },
  polledNoChanges: false,
  payload: {
    globalDebug: false,
    headers: {
      "Content-Type": "application/json",
    },
    queryParameters: null,
    rawBody: {
      data: null,
    },
    body: {
      data: {
        entries: [
          {
            ".tag": "deleted",
            name: "example_deleted_file.png",
            path_lower: "/testsubfolder/example_deleted_file.png",
            path_display: "/TestSubfolder/example_deleted_file.png",
          },
          {
            ".tag": "file",
            name: "example_added_file.png",
            path_lower: "/testsubfolder/example_added_file.png",
            path_display: "/TestSubfolder/example_added_file.png",
            id: "id:someExampleId",
            client_modified: "2024-11-20T18:29:39Z",
            server_modified: "2024-11-21T18:07:17Z",
            rev: "01627702307738900000002a67d8f21",
            size: 331590,
            is_downloadable: true,
            content_hash: "exampleContentHashValue",
          },
        ],
        cursor: "examplePaginationCursorValue",
        has_more: false,
      },
    },
    pathFragment: "",
    webhookUrls: {
      "Flow 1": "https://hooks.example.com/trigger/WEBHOOK_ID",
    },
    webhookApiKeys: {
      "Flow 1": ["sample-api-key"],
    },
    invokeUrl: "https://hooks.example.com/trigger/WEBHOOK_ID",
    executionId: "exampleExecutionId",
    customer: {
      id: "testCustomerId",
      name: "Test Customer",
      externalId: "testCustomerExternalId",
    },
    instance: {
      id: "testInstanceId",
      name: "Test Instance",
    },
    user: {
      id: "testUserId",
      email: "testUserEmail@example.com",
      name: "Test User",
      externalId: "testUserExternalId",
    },
    integration: {
      id: "testIntegrationId",
      name: "Test Integration",
      versionSequenceId: "testIntegrationVersionSequenceId",
      externalVersion: "testExternalVersion",
    },
    flow: {
      id: "testFlowId",
      name: "Test Flow Name",
      stableId: "testFlowStableId",
    },
    startedAt: "2024-11-21 18:07:22.778766+00",
  },
};
