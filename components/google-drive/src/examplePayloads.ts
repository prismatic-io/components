import type { drive_v3 } from "googleapis";
import { MY_DRIVE, MY_DRIVE_LABEL } from "./constants";
export const LIST_CHANGES_EXAMPLE_PAYLOAD = {
  kind: "drive#changeList",
  newStartPageToken: "247040",
  changes: [
    {
      kind: "drive#change",
      removed: false,
      file: {
        kind: "drive#file",
        mimeType: "image/png",
        id: "14FSE_ESVGWta4XlzWGHVm0VultNS-1uO",
        name: "example.png",
      },
      fileId: "14FSE_ESVGWta4XlzWGHVm0VultNS-1uO",
      time: "2022-09-20T21:36:23.687Z",
      changeType: "file" as const,
    },
  ],
};
export const queryDriveActivityExamplePayload = {
  data: {
    activities: [
      {
        primaryActionDetail: {
          create: {
            upload: {},
          },
        },
        actors: [
          {
            user: {
              knownUser: {
                personName: "people/114118080512406438242",
                isCurrentUser: true,
              },
            },
          },
        ],
        actions: [
          {
            detail: {
              create: {
                upload: {},
              },
            },
          },
        ],
        targets: [
          {
            driveItem: {
              name: "items/1fs5xXnjTgQP6-p9LMXYX3_i9hjXl2Ump",
              title: "untitled text 3.csv",
              file: {},
              mimeType: "text/csv",
              owner: {
                user: {
                  knownUser: {
                    personName: "people/114118080512406438242",
                    isCurrentUser: true,
                  },
                },
              },
              driveFile: {},
            },
          },
        ],
        timestamp: "2025-03-11T15:58:37.276Z",
      },
    ],
    nextPageToken:
      "CoUBADFn3tFqHUj7yCuV1klvj0yytkQy7+pfLdrj1eepGfjkD3FB5tGKr3KfLViTU1NXF2EPzJADxALt8O7M1rC98LjHnv9YG6Sl5sxU8F7UOYI1nzzpXhFNaxmAnNmlzBbdRHKt33n2KeX/wKd8uvLETNydZ/9SEYYRlB2aIqzTf41Cp2CUvxIMEgppdGVtcy9yb290GoUBADFn3tFN3fZknT3aMUZoAhEoqOy0S2eimkjEsCV1+t01uERxyQKMsgS5Zn9cSJOzDIj2BR7jkbfIQeDbBLgMhjrtaVaAMppVhBOdQKtn9+u5CKE1JNIuVXREsrEago3Bbd77pDvQJNYTIeW0P+NYbPPP7oRCWTbBZ9soopmJnkyjUX/m5A==",
  },
};
export const BASE_EXAMPLE_PAYLOAD = {
  response: { statusCode: 200, contentType: "application/json" },
  payload: {
    headers: {
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      Host: "hooks.example.io",
      "User-Agent":
        "APIs-Google; (+https://developers.google.com/webmasters/APIs-Google.html)",
      "X-Amz-Cf-Id": "_K9KZtNN78sy1aygl3nJuQ4OoMh65STAsLFsPGENcnm_l68C112345==",
      "X-Amzn-Trace-Id": "Root=1-64931762-5665c8324c471b204f212345",
      "X-Goog-Channel-Expiration": "Wed, 21 Jun 2023 16:28:01 GMT",
      "X-Goog-Channel-ID": "7f0419cf-5477-4bd5-bc86-2aa36af12345",
      "X-Goog-Message-Number": "96035",
      "X-Goog-Resource-ID": "jkkJZYhd8PPV6-Xto6QIo112345",
      "X-Goog-Resource-State": "change",
      "X-Goog-Resource-URI":
        "https://www.googleapis.com/drive/v3/changes?alt=json&pageToken=430&supportsAllDrives=true",
    },
    queryParameters: null,
    rawBody: {
      data: null,
      contentType: "application/octet-stream",
    },
    body: {
      data: null,
      contentType: "application/octet-stream",
    },
    pathFragment: "",
    webhookUrls: {
      "Flow 1": "https://hooks.example.io/trigger/WEBHOOK_ID",
    },
    webhookApiKeys: {
      "Flow 1": ["sample-api-key"],
    },
    invokeUrl: "https://hooks.example.io/trigger/WEBHOOK_ID",
    executionId:
      "SW5zdGFuY2VFeGVjdXRpb25SZXN1bHQ6MGRlZjk2ZjYtYzhhOS00MDgzLWJlOTUtZmIwZDMzNDQ12345",
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
      versionSequenceId: "testVersionSequenceId",
      externalVersion: "testExternalVersion",
    },
    flow: {
      id: "testFlowId",
      name: "Test Flow Name",
      stableId: "testStableFlowId",
    },
    startedAt: "yyyy-mm-dd",
    globalDebug: false,
  },
};
export const pushNotificationWebhookExamplePayload = {
  ...BASE_EXAMPLE_PAYLOAD,
};
export const driveActivityPollingTriggerExamplePayload = {
  ...BASE_EXAMPLE_PAYLOAD,
  payload: {
    ...BASE_EXAMPLE_PAYLOAD.payload,
    rawBody: {
      data: null,
    },
    body: {
      data: [...queryDriveActivityExamplePayload.data.activities],
    },
  },
  polledNoChanges: false,
};
export const pollChangesTriggerExamplePayload = {
  ...BASE_EXAMPLE_PAYLOAD,
  crossFlowState: {
    "google-drive-list-changes-page-token:exampleStableFlowId:exampleStepId":
      "testCursor",
  },
  payload: {
    ...BASE_EXAMPLE_PAYLOAD.payload,
    rawBody: {
      data: null,
    },
    body: {
      data: LIST_CHANGES_EXAMPLE_PAYLOAD,
    },
  },
  polledNoChanges: false,
};
export const listChangesExamplePayload = {
  data: LIST_CHANGES_EXAMPLE_PAYLOAD,
  crossFlowState: {
    "google-drive-list-changes-page-token:exampleStableFlowId:exampleStepId":
      "example-new-page-token",
  },
};
export const getFileExamplePayload = {
  data: Buffer.from("Q3 revenue figures, exported as raw bytes"),
  contentType: "application/octet-stream",
};
export const listDrivesExamplePayload = {
  data: [
    {
      kind: "drive#drive",
      id: "0AAvGyortvuqEUk9PVA",
      name: "Marketing Team Drive",
    },
    {
      kind: "drive#drive",
      id: "0AL9xQm2FhTzkUk9PVA",
      name: "Finance Shared Drive",
    },
  ],
};
export const copyFileExamplePayload = {
  data: {
    id: "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
    name: "example",
  },
};
export const createFileExamplePayload = {
  data: {
    kind: "drive#file",
    id: "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
    name: "Q3 Revenue Report.xlsx",
    mimeType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    parents: ["1xYz2AbC3DeF4GhI5JkL6MnO7PqR8StU"],
    size: "48213",
    createdTime: "2025-07-14T09:12:44.318Z",
    modifiedTime: "2025-07-14T09:12:44.318Z",
  },
};
export const listFilesExamplePayload = {
  data: {
    kind: "drive#fileList",
    incompleteSearch: false,
    nextPageToken: "~!!~AI9FV7RiPMAcQBBrmZFOMt0lBHzXBQvpqYMTNQ",
    files: [
      {
        kind: "drive#file",
        id: "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
        name: "Q3 Revenue Report.xlsx",
        mimeType:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        parents: ["1xYz2AbC3DeF4GhI5JkL6MnO7PqR8StU"],
        size: "48213",
        createdTime: "2025-07-14T09:12:44.318Z",
        modifiedTime: "2025-08-02T16:41:07.902Z",
      },
      {
        kind: "drive#file",
        id: "1xYz2AbC3DeF4GhI5JkL6MnO7PqR8StU",
        name: "Finance",
        mimeType: "application/vnd.google-apps.folder",
        parents: ["0AAvGyortvuqEUk9PVA"],
        createdTime: "2025-01-08T11:03:19.554Z",
        modifiedTime: "2025-07-14T09:12:44.318Z",
      },
    ],
  },
};
export const moveFileExamplePayload = {
  data: {
    id: "1xYz2AbC3DeF4GhI5JkL6MnO7PqR8StU",
    name: "example",
  },
};
export const searchFilesExamplePayload = {
  data: {
    kind: "drive#fileList",
    incompleteSearch: false,
    nextPageToken: "~!!~AI9FV7RiPMAcQBBrmZFOMt0lBHzXBQvpqYMTNQ",
    files: [
      {
        kind: "drive#file",
        id: "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
        name: "Q3 Revenue Report.xlsx",
        mimeType:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        parents: ["1xYz2AbC3DeF4GhI5JkL6MnO7PqR8StU"],
        size: "48213",
        createdTime: "2025-07-14T09:12:44.318Z",
        modifiedTime: "2025-08-02T16:41:07.902Z",
      },
    ],
  },
};
export const updateFileExamplePayload = {
  data: {
    kind: "drive#file",
    id: "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
    name: "Q3 Revenue Report.xlsx",
    mimeType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    parents: ["1xYz2AbC3DeF4GhI5JkL6MnO7PqR8StU"],
    size: "51940",
    createdTime: "2025-07-14T09:12:44.318Z",
    modifiedTime: "2025-08-02T16:41:07.902Z",
  },
};
export const createFolderExamplePayload = {
  data: {
    id: "1QwErTy2UiOp3AsDf4GhJk5LzXcVbNm6",
    name: "example",
  },
};
export const listFoldersExamplePayload = {
  data: {
    kind: "drive#fileList",
    incompleteSearch: false,
    nextPageToken: "~!!~AI9FV7RiPMAcQBBrmZFOMt0lBHzXBQvpqYMTNQ",
    files: [
      {
        kind: "drive#file",
        id: "1xYz2AbC3DeF4GhI5JkL6MnO7PqR8StU",
        name: "Finance",
        mimeType: "application/vnd.google-apps.folder",
        parents: ["0AAvGyortvuqEUk9PVA"],
        createdTime: "2025-01-08T11:03:19.554Z",
        modifiedTime: "2025-07-14T09:12:44.318Z",
      },
      {
        kind: "drive#file",
        id: "1QwErTy2UiOp3AsDf4GhJk5LzXcVbNm6",
        name: "Campaign Assets",
        mimeType: "application/vnd.google-apps.folder",
        parents: ["0AAvGyortvuqEUk9PVA"],
        createdTime: "2025-02-19T08:47:02.110Z",
        modifiedTime: "2025-06-30T13:22:58.041Z",
      },
    ],
  },
};
export const searchFoldersExamplePayload = {
  data: {
    kind: "drive#fileList",
    incompleteSearch: false,
    nextPageToken: "~!!~AI9FV7RiPMAcQBBrmZFOMt0lBHzXBQvpqYMTNQ",
    files: [
      {
        kind: "drive#file",
        id: "1QwErTy2UiOp3AsDf4GhJk5LzXcVbNm6",
        name: "Campaign Assets",
        mimeType: "application/vnd.google-apps.folder",
        parents: ["0AAvGyortvuqEUk9PVA"],
        createdTime: "2025-02-19T08:47:02.110Z",
        modifiedTime: "2025-06-30T13:22:58.041Z",
      },
    ],
  },
};
export const createDriveWebhookExamplePayload = {
  data: {
    kind: "api#channel",
    id: "0a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d",
    resourceId: "jkkJZYhd8PPV6-Xto6QIo1abcde",
    type: "web_hook",
    address: "https://hooks.example.io/trigger/WEBHOOK_ID",
    expiration: "1426325213000",
  },
};
export const createFileWebhookExamplePayload = {
  data: {
    kind: "api#channel",
    id: "9f8e7d6c-5b4a-3210-9876-543210fedcba",
    resourceId: "o3hgv1538sdjfh1abcde",
    type: "web_hook",
    address: "https://hooks.example.io/trigger/WEBHOOK_ID",
    expiration: "1426325213000",
  },
};
export const deleteFileExamplePayload = { data: {} as unknown };
export const getFileMetadataExamplePayload: {
  data: drive_v3.Schema$File;
} = {
  data: {
    id: "1t_RTuXpBgBEEC1TfZILWJJSBr2gilSFTyhDO_6RwSBs",
    name: "Fountain AX <> ADP WFN Marketplace Mapping",
    mimeType: "application/vnd.google-apps.spreadsheet",
    thumbnailLink:
      "https://lh3.googleusercontent.com/drive-storage/AJQWtBNQ460KV9YNsFDL_x3WQq6D019SkKdIUuWzGO2YKBSiLOfmFtlunKSyC02yi7bycbMN_n2DB1k7OJ5akXI6ZrQ0s0y6qHOaaTrOJyis6EeSsEnJMrFOeNzzn3jo0kg=s220",
  },
};
export const listExportTypesExamplePayload = {
  data: [
    "application/x-vnd.oasis.opendocument.spreadsheet",
    "text/tab-separated-values",
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/csv",
    "application/zip",
    "application/vnd.oasis.opendocument.spreadsheet",
  ],
};
export const emptyTrashExamplePayload = { data: {} as unknown };
export const getAboutExamplePayload: {
  data: drive_v3.Schema$About;
} = {
  data: {
    user: {
      displayName: "Jane Doe",
      emailAddress: "jane.doe@example.com",
      kind: "drive#user",
    },
  },
};
export const getCurrentUserExamplePayload = {
  data: {
    kind: "drive#user",
    displayName: "Example User",
    photoLink: "https://lh3.googleusercontent.com/a/Example",
    me: true,
    permissionId: "12345678901234567890",
    emailAddress: "jane.doe@example.com",
  },
};
export const rawRequestExamplePayload = {
  data: {
    kind: "drive#fileList",
    incompleteSearch: false,
    files: [
      {
        kind: "drive#file",
        id: "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
        name: "Q3 Revenue Report.xlsx",
        mimeType:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    ],
  },
};
export const deleteWebhookExamplePayload = { data: {} as unknown };
export const selectDriveExamplePayload = {
  result: [
    { key: MY_DRIVE, label: MY_DRIVE_LABEL },
    { key: "0AAvGyortvuqEUk9PVA", label: "Marketing Team Drive" },
    { key: "0AL9xQm2FhTzkUk9PVA", label: "Finance Shared Drive" },
  ],
};
export const selectFilesExamplePayload = {
  result: [
    {
      key: "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
      label: "Q3 Revenue Report.xlsx",
    },
    {
      key: "1a2b3c4d5e6f7g8h9i0jKlMnOpQrStUvWxYz1234",
      label: "Team Onboarding.pdf",
    },
  ],
};
export const selectFolderExamplePayload = {
  result: [
    {
      key: "1QwErTy2UiOp3AsDf4GhJk5LzXcVbNm6",
      label: "[Marketing Team Drive] Campaign Assets",
    },
    { key: "1xYz2AbC3DeF4GhI5JkL6MnO7PqR8StU", label: "[My Drive] Finance" },
  ],
};
