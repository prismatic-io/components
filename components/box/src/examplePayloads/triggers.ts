import type { TriggerPayload } from "@prismatic-io/spectral";

const triggerPayloadEnvelope: Omit<TriggerPayload, "headers" | "body"> = {
  queryParameters: {},
  rawBody: { data: null },
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
};

const boxWebhookHeaders = {
  "box-delivery-id": "f96bb54b-ee16-4fc5-aa65-8c2d9e5b546f",
  "box-delivery-timestamp": "2026-01-14T18:07:45Z",
  "box-signature-algorithm": "HmacSHA256",
  "box-signature-version": "1",
  "box-signature-primary": "4KvFa5/unRL8aaqOlnbInTwkOmieZkn1ZVzsAJuRipE=",
  "box-signature-secondary": "yxxwBNk7tFyQSy95/VNKAf1o+j8WMPJuo/KcFc7OS0Q=",
};

const boxWebhookEvent = {
  type: "webhook_event",
  id: "0f46a6ca-86bf-44ab-8cf5-f08e1e02876b",
  created_at: "2026-01-14T18:07:45Z",
  trigger: "FILE.UPLOADED",
  webhook: { id: "1234", type: "webhook" },
  created_by: {
    type: "user",
    id: "33333",
    name: "Example User",
    login: "user@example.com",
  },
  source: {
    id: "54321",
    type: "file",
    name: "report.pdf",
    sha1: "85136c79cbf9fe36bb9d05d0639c70c265c18d37",
    parent: { id: "0", type: "folder", name: "All Files" },
  },
  additional_info: [],
};

export const webhookExamplePayload: { payload: TriggerPayload } = {
  payload: {
    ...triggerPayloadEnvelope,
    headers: boxWebhookHeaders,
    body: { data: boxWebhookEvent },
  },
};

export const managedWebhookExamplePayload: { payload: TriggerPayload } = {
  payload: {
    ...triggerPayloadEnvelope,
    headers: boxWebhookHeaders,
    body: { data: boxWebhookEvent },
  },
};

export const newOrUpdatedFileExamplePayload: { payload: TriggerPayload } = {
  payload: {
    ...triggerPayloadEnvelope,
    headers: {},
    body: {
      data: {
        newFiles: {
          data: [
            {
              id: "54321",
              type: "file",
              name: "report.pdf",
              created_at: "2026-01-14T18:07:45.000Z",
              modified_at: "2026-01-14T18:07:45.000Z",
            },
          ],
          polledNoChanges: false,
        },
        updatedFiles: {
          data: [
            {
              id: "67890",
              type: "file",
              name: "contract.pdf",
              created_at: "2025-11-03T15:22:10.000Z",
              modified_at: "2026-01-14T17:45:02.000Z",
            },
          ],
          polledNoChanges: false,
        },
      },
    },
  },
};

export const newFolderExamplePayload: { payload: TriggerPayload } = {
  payload: {
    ...triggerPayloadEnvelope,
    headers: {},
    body: {
      data: {
        newFolders: {
          data: [
            {
              id: "12345",
              type: "folder",
              name: "Contracts",
              created_at: "2026-01-14T18:07:45.000Z",
            },
          ],
          polledNoChanges: false,
        },
      },
    },
  },
};

export const newFileCommentsExamplePayload: { payload: TriggerPayload } = {
  payload: {
    ...triggerPayloadEnvelope,
    headers: {},
    body: {
      data: {
        newComments: {
          data: [
            {
              id: "8826473150",
              type: "comment",
              message: "Please review the figures in section 2.",
              created_at: "2026-01-14T18:07:45.000Z",
            },
          ],
        },
      },
    },
  },
};
