import type { TriggerPayload } from "@prismatic-io/spectral";
import type { FileInfoPayload } from "./types";
export const listDirectoryExamplePayload: {
  data: FileInfoPayload[];
} = {
  data: [
    {
      name: "reports",
      type: 2,
      size: 0,
      rawModifiedAt: "Feb  8 22:16",
      permissions: { user: 7, group: 5, world: 5 },
      hardLinkCount: 2,
      group: "ftpusers",
      user: "deploy",
      isDirectory: true,
      isFile: false,
      isSymbolicLink: false,
    },
    {
      name: "invoice-2024-001.pdf",
      type: 1,
      size: 245760,
      rawModifiedAt: "Jan 23 16:38",
      permissions: { user: 6, group: 4, world: 4 },
      hardLinkCount: 1,
      group: "ftpusers",
      user: "deploy",
      isDirectory: false,
      isFile: true,
      isSymbolicLink: false,
    },
  ],
};
export const readFileExamplePayload = {
  data: Buffer.from("example"),
  contentType: "application/octet-stream",
};
export const deleteFileExamplePayload = null;
export const moveFileExamplePayload = null;
export const writeFileExamplePayload = null;
export const createDirectoryExamplePayload = {
  data: "/path/to/new/directory/",
};
export const newOrModifiedFilesExamplePayload: {
  payload: TriggerPayload;
} = {
  payload: {
    headers: {},
    queryParameters: {},
    rawBody: { data: null },
    body: {
      data: {
        newFiles: [
          {
            path: "/uploads/invoice-2024-001.pdf",
            size: 245760,
            modifiedAt: 1706035080000,
          },
        ],
        modifiedFiles: [
          {
            path: "/uploads/report-q4.xlsx",
            size: 102400,
            modifiedAt: 1706121480000,
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
};
