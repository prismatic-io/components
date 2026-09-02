import type { TriggerPayload } from "@prismatic-io/spectral";
import type { CannyPostChangesObject } from "../types";
const exampleBoard = {
  id: "553c3ef8b8cdcd1501ba1234",
  created: "2026-04-16T01:07:22.189Z",
  isPrivate: false,
  name: "Feature Requests",
  postCount: 123,
  privateComments: false,
  token: "b2b4d0d4-2b8e-4a1b-9c1d-6f0b3a5e7c21",
  url: "https://your-company.canny.io/admin/board/feature-requests",
};
const exampleAuthor = {
  id: "553c3ef8b8cdcd1501ba123a",
  created: "2026-04-16T01:07:22.189Z",
  email: "sally.doe@example.com",
  isAdmin: false,
  name: "Sally Doe",
  url: "https://your-company.canny.io/admin/users/sally-doe",
  userID: "1234",
};
const exampleAdmin = {
  id: "524c3ef8b8cdcd1501ba246b",
  created: "2026-04-16T01:07:22.189Z",
  email: "john.doe@example.com",
  isAdmin: true,
  name: "John Doe",
  url: "https://your-company.canny.io/admin/users/john-doe",
  userID: "5678",
};
const exampleTriggerAttributes = {
  headers: {},
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
  startedAt: "2026-04-16T00:00:00.000Z",
  globalDebug: false,
};
export const pollChangesTriggerExamplePayload: {
  payload: Omit<TriggerPayload, "body"> & {
    body: {
      data: CannyPostChangesObject;
    };
  };
  polledNoChanges: boolean;
} = {
  payload: {
    ...exampleTriggerAttributes,
    body: {
      data: {
        created: [
          {
            id: "553c3ef8b8cdcd1501ba1238",
            author: exampleAuthor,
            board: exampleBoard,
            by: null,
            category: null,
            commentCount: 0,
            created: "2026-04-16T01:07:22.189Z",
            customFields: { priority: "high" },
            details:
              "We'd love the ability to customize the color scheme to match our brand.",
            eta: "",
            etaPublic: false,
            imageURLs: [
              "https://canny.io/images/93fc5808937760b82c3dc00aa5cd86b8.png",
            ],
            jira: { linkedIssues: [] },
            mergeHistory: [],
            owner: null,
            score: 3,
            status: "open",
            statusChangedAt: "2026-04-16T01:07:22.189Z",
            tags: [],
            title: "Support custom color schemes",
            url: "https://your-company.canny.io/admin/board/feature-requests/p/support-custom-color-schemes",
          },
        ],
        updated: [
          {
            id: "553c3ef8b8cdcd1501ba6789",
            author: exampleAuthor,
            board: exampleBoard,
            by: exampleAdmin,
            category: null,
            commentCount: 10,
            created: "2026-02-02T18:41:05.412Z",
            customFields: { priority: "medium" },
            details: "Let admins export a board's posts as a CSV file.",
            eta: "May 2026",
            etaPublic: true,
            imageURLs: [],
            jira: { linkedIssues: [] },
            mergeHistory: [],
            owner: exampleAdmin,
            score: 72,
            status: "in progress",
            statusChangedAt: "2026-04-16T01:04:11.007Z",
            tags: [],
            title: "Export posts to CSV",
            url: "https://your-company.canny.io/admin/board/feature-requests/p/export-posts-to-csv",
          },
        ],
      },
    },
  },
  polledNoChanges: false,
};
export const webhookExamplePayload: {
  payload: TriggerPayload;
} = {
  payload: {
    ...exampleTriggerAttributes,
    headers: {
      "content-type": "application/json",
      "canny-timestamp": "1776301642189",
      "canny-nonce": "e4f1c0a8b7d24f3e9a5c6b8d0e2f4a19",
      "canny-signature": "j5Rr8gYb2mQ9xK1sV0dTn7WcZaHpLfEuIoNbXyMkQvA=",
    },
    rawBody: {
      data: '{"created":"2026-04-16T01:07:22.189Z","object":{"id":"553c3ef8b8cdcd1501ba1238","title":"Support custom color schemes"},"objectType":"post","type":"post.created"}',
      contentType: "application/json",
    },
    body: {
      data: {
        created: "2026-04-16T01:07:22.189Z",
        object: {
          id: "553c3ef8b8cdcd1501ba1238",
          author: exampleAuthor,
          board: exampleBoard,
          by: null,
          category: null,
          commentCount: 0,
          created: "2026-04-16T01:07:22.189Z",
          details:
            "We'd love the ability to customize the color scheme to match our brand.",
          eta: null,
          imageURLs: [],
          score: 1,
          status: "open",
          tags: [],
          title: "Support custom color schemes",
          url: "https://your-company.canny.io/admin/board/feature-requests/p/support-custom-color-schemes",
        },
        objectType: "post",
        type: "post.created",
      },
      contentType: "application/json",
    },
  },
};
