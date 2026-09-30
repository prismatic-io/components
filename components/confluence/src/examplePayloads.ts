import type { TriggerBaseResult, TriggerPayload } from "@prismatic-io/spectral";
import type { Page } from "./types";
export const getAttachmentExamplePayload = {
  id: "att456712389",
  status: "current",
  title: "architecture-diagram.png",
  createdAt: "2024-11-15T09:23:45.000Z",
  pageId: "98765432",
  blogPostId: "67891234",
  customContentId: "cc-112233",
  mediaType: "image/png",
  mediaTypeDescription: "PNG Image",
  comment: "Updated architecture diagram for Q4 review",
  fileId: "fid-a1b2c3d4e5f6",
  fileSize: 284729,
  webuiLink: "/spaces/ENG/pages/98765432/architecture-diagram.png",
  downloadLink: "/download/attachments/98765432/architecture-diagram.png",
  version: {
    createdAt: "2024-11-15T09:23:45.000Z",
    message: "Updated with latest service boundaries",
    number: 19,
    minorEdit: true,
    authorId: "5b10a2844c20165700ede21g",
  },
  _links: {
    webui: "/spaces/ENG/pages/98765432/architecture-diagram.png",
    download: "/download/attachments/98765432/architecture-diagram.png",
  },
};
export const listAttachmentsExamplePayload = {
  data: {
    results: [
      getAttachmentExamplePayload,
      {
        ...getAttachmentExamplePayload,
        id: "att998877123",
        status: "archived",
        title: "release-notes-v2.pdf",
        mediaType: "application/pdf",
        mediaTypeDescription: "PDF Document",
        fileId: "fid-9z8y7x6w5v4u",
        fileSize: 51204,
        webuiLink: "/spaces/ENG/pages/98765432/release-notes-v2.pdf",
        downloadLink: "/download/attachments/98765432/release-notes-v2.pdf",
        _links: {
          webui: "/spaces/ENG/pages/98765432/release-notes-v2.pdf",
          download: "/download/attachments/98765432/release-notes-v2.pdf",
        },
      },
    ],
    _links: {
      next: "/api/v2/attachments?cursor=eyJpZCI6IjEyMzQ1Njc4OTAiLCJjb250ZW50T3JkZXIiOiJpZCJ9",
    },
  },
};
export const getPageExamplePayload = {
  id: "98765432",
  status: "current",
  title: "Engineering Onboarding Guide",
  spaceId: "65789012",
  parentId: "11223344",
  parentType: "page",
  position: 57,
  authorId: "5b10a2844c20165700ede21g",
  ownerId: "5b10a2844c20165700ede21g",
  lastOwnerId: "5b10ac8d82e05b22cc7d4ef5",
  createdAt: "2024-08-20T14:30:00.000Z",
  version: {
    createdAt: "2024-11-15T09:23:45.000Z",
    message: "Added new section on CI/CD pipeline setup",
    number: 19,
    minorEdit: true,
    authorId: "5b10a2844c20165700ede21g",
  },
  body: {
    storage: {
      representation: "storage",
      value: "<p>Welcome to the Engineering team! This guide covers...</p>",
    },
    atlas_doc_format: {
      representation: "atlas_doc_format",
      value:
        '{"version":1,"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Welcome to the Engineering team!"}]}]}',
    },
    view: {
      representation: "view",
      value: "<p>Welcome to the Engineering team! This guide covers...</p>",
    },
  },
  _links: {
    webui: "/spaces/ENG/pages/98765432/Engineering+Onboarding+Guide",
    editui: "/pages/resumedraft.action?draftId=98765432",
    tinyui: "/x/ABCDEF",
  },
};
export const createPageExamplePayload = {
  ...getPageExamplePayload,
  version: {
    ...getPageExamplePayload.version,
    createdAt: getPageExamplePayload.createdAt,
    message: "Created page",
    number: 1,
    minorEdit: false,
  },
};
export const listPagesExamplePayload = {
  results: [
    getPageExamplePayload,
    {
      ...getPageExamplePayload,
      id: "55667788",
      status: "draft",
      title: "Incident Response Runbook",
      parentId: "98765432",
      position: 58,
    },
  ],
  _links: {
    next: "/api/v2/pages?cursor=eyJpZCI6Ijk4NzY1NDMyIiwiY29udGVudE9yZGVyIjoiaWQifQ",
  },
};
export const getSpaceExamplePayload = {
  id: "65789012",
  key: "ENG",
  name: "Engineering",
  type: "global",
  status: "current",
  authorId: "5b10a2844c20165700ede21g",
  createdAt: "2023-01-10T08:00:00.000Z",
  homepageId: "11223344",
  description: {
    plain: {
      representation: "plain",
      value: "Engineering team documentation and knowledge base",
    },
    view: {
      representation: "view",
      value: "<p>Engineering team documentation and knowledge base</p>",
    },
  },
  icon: {
    path: "/wiki/images/logo/default-space-logo-256.png",
    apiDownloadLink: "/wiki/download/attachments/65789012/space-logo.png",
  },
  _links: { webui: "/spaces/ENG" },
};
export const listSpacesExamplePayload = {
  results: [
    getSpaceExamplePayload,
    {
      ...getSpaceExamplePayload,
      id: "78901234",
      key: "MKTG",
      name: "Marketing",
      type: "collaboration",
      status: "archived",
      homepageId: "22334455",
    },
  ],
  _links: {
    next: "/api/v2/spaces?cursor=eyJpZCI6IjY1Nzg5MDEyIiwiY29udGVudE9yZGVyIjoiaWQifQ",
  },
};
export const getContentPropertyExamplePayload = {
  id: "prop-998877",
  key: "metadata.source",
  version: {
    createdAt: "2024-11-15T09:23:45.000Z",
    message: "Updated metadata source property",
    number: 19,
    minorEdit: true,
    authorId: "5b10a2844c20165700ede21g",
  },
};
export const createContentPropertyExamplePayload = {
  ...getContentPropertyExamplePayload,
  version: {
    ...getContentPropertyExamplePayload.version,
    createdAt: getContentPropertyExamplePayload.version.createdAt,
    message: "Created content property",
    number: 1,
    minorEdit: false,
  },
};
export const listContentPropertiesExamplePayload = {
  results: [
    getContentPropertyExamplePayload,
    {
      ...getContentPropertyExamplePayload,
      id: "prop-445566",
      key: "metadata.reviewStatus",
    },
  ],
  _links: {
    next: "/api/v2/attachments/att456712389/properties?cursor=eyJpZCI6InByb3AtOTk4ODc3In0",
  },
};
export const pagesPollingTriggerExamplePayload: TriggerBaseResult<
  TriggerPayload & {
    body: {
      data: {
        createdRecords: Page[];
        updatedRecords: Page[];
      };
    };
  }
> = {
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
        createdRecords: [
          {
            id: "78901234",
            title: "Q4 Planning Notes",
            createdAt: "2024-11-21T18:05:00.000Z",
            version: {
              createdAt: "2024-11-21T18:05:00.000Z",
              message: "Created page",
              number: 1,
              minorEdit: false,
              authorId: "5b10a2844c20165700ede21g",
            },
          },
        ],
        updatedRecords: [
          {
            id: "98765432",
            title: "Engineering Onboarding Guide",
            createdAt: "2024-08-20T14:30:00.000Z",
            version: {
              createdAt: "2024-11-21T17:42:00.000Z",
              message: "Added new section on CI/CD pipeline setup",
              number: 20,
              minorEdit: false,
              authorId: "5b10a2844c20165700ede21g",
            },
          },
        ],
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
export const newSpacesPollingTriggerExamplePayload: TriggerBaseResult<TriggerPayload> =
  {
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
        data: [
          {
            id: "78901234",
            name: "Marketing",
            createdAt: "2024-11-21T18:05:00.000Z",
          },
        ],
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
