import type { TriggerPayload } from "@prismatic-io/spectral";
import type {
  Agreement,
  AgreementInfo,
  GroupEventType,
  ListGroup,
  ListGroupEvents,
  ListGroupUsers,
  User,
  Webhook,
  WebhookInfo,
} from "./types";

export const createGroupExamplePayload = {
  data: {
    id: "CBJCHBCAABAAIYEoZ3VPDavcqvJm3ni7ATNn-O9N3OPf",
  },
};

export const updateGroupExamplePayload = {
  data: {
    id: "CBJCHBCAABAAIYEoZ3VPDavcqvJm3ni7ATNn-O9N3OPf",
  },
};

export const getGroupExamplePayload = {
  data: {
    groupId: "CBJCHBCAABAAIYEoZ3VPDavcqvJm3ni7ATNn-O9N3OPf",
    createdDate: "2023-12-06T22:02:50Z",
    groupName: "Default Group",
    isDefaultGroup: true,
  },
};

export const getGroupUserExamplePayload = {
  data: {
    email: "example@acme.io",
    company: "Acme",
    id: "CBJCHBCAABAApRvVMBVyo0bIo4jdPROKiKWR9xRhRugJ",
    firstName: "Thomas",
    lastName: "Tedrow",
    isGroupAdmin: false,
  },
};

export const getGroupEventExamplePayload = {
  data: {
    groupEventId: "CBJCHBCAABAA82chKH_73ytJxSou5uTTrIh7rRelwSro",
    date: "2023-12-06T22:02:49Z",
    event: "CREATED" as GroupEventType,
    accountId: "CBJCHBCAABAAd4TPldfK4H2cTTDlWxJ6i4JDiVDoOC2C",
    groupId: "CBJCHBCAABAAIYEoZ3VPDavcqvJm3ni7ATNn-O9N3OPf",
  },
};

export const listGroupsExamplePayload: { data: ListGroup } = {
  data: {
    groupInfoList: [getGroupExamplePayload.data, getGroupExamplePayload.data],
    page: { nextCursor: "" },
  },
};

export const listGroupUsersExamplePayload: { data: ListGroupUsers } = {
  data: {
    userInfoList: [
      getGroupUserExamplePayload.data,
      getGroupUserExamplePayload.data,
    ],
    page: { nextCursor: "" },
  },
};

export const listGroupEventsExamplePayload: { data: ListGroupEvents } = {
  data: {
    groupEvents: [
      getGroupEventExamplePayload.data,
      getGroupEventExamplePayload.data,
    ],
    page: { nextCursor: "" },
  },
};






export const getAccountExamplePayload = {
  data: {
    id: "CBJCHBCAABAAd4TPldfK4H2cTTDlWxJ6i4JDiVDoOC2C",
    name: "Acme",
    company: "Acme Corp",
    accountType: "LICENSED",
    externalId: "acct-1234",
    created: "2024-03-15T10:30:00Z",
    modified: "2024-04-10T14:22:00Z",
  },
};






export const createAccountExamplePayload = {
  data: {
    accountId: "CBJCHBCAABAAd4TPldfK4H2cTTDlWxJ6i4JDiVDoOC2C",
    adminDetails: {
      email: "admin@acme.com",
      status: "ACTIVE",
      userId: "CBJCHBCAABAApRvVMBVyo0bIo4jdPROKiKWR9xRhRugJ",
    },
  },
};








export const createAgreementExamplePayload = {
  data: "CBJCHBCAABAAQ8h3W7QwzG8Xq6t9R5p4N2K",
};













export const deleteAgreementDocumentsExamplePayload = {
  data: null,
};







export const downloadAgreementFileExamplePayload = {
  data: Buffer.from("<binary PDF content>"),
};







export const updateAgreementExamplePayload = {
  data: {
    name: "Service Agreement 2024 (updated)",
    status: "OUT_FOR_SIGNATURE",
    signatureType: "ESIGN",
    participantSetsInfo: [
      {
        role: "SIGNER",
        order: 1,
      },
    ],
    fileInfos: [
      {
        transientDocumentId: "3AAABLblqZhBf0aJb0XZqz5vXy8g3V9R3qQx6",
      },
    ],
  },
};

export const listAgreementsExamplePayload: { data: Agreement[] } = {
  data: [
    {
      id: "CBJCHBCAABAAQ8h3W7QwzG8Xq6t9R5p4N2K",
      name: "Service Agreement 2024",
      type: "AGREEMENT",
      status: "OUT_FOR_SIGNATURE",
      groupId: "CBJCHBCAABAAIYEoZ3VPDavcqvJm3ni7ATNn-O9N3OPf",
      parentId: "",
      latestVersionId: "CBJCHBCAABAAver1",
      displayDate: "2024-03-15T10:30:00Z",
      esign: true,
      hidden: false,
      displayParticipantSetInfos: [
        {
          displayUserSetName: "Signer",
          displayUserSetMemberInfos: [
            {
              fullName: "Jane Signer",
              company: "Example Co",
              email: "signer@example.com",
            },
          ],
        },
      ],
    },
    {
      id: "CBJCHBCAABAAR9k4X8XWxF7Yp7u8S6q3M1L",
      name: "NDA Agreement",
      type: "AGREEMENT",
      status: "SIGNED",
      groupId: "CBJCHBCAABAAIYEoZ3VPDavcqvJm3ni7ATNn-O9N3OPf",
      parentId: "",
      latestVersionId: "CBJCHBCAABAAver2",
      displayDate: "2024-03-10T09:00:00Z",
      esign: true,
      hidden: false,
      displayParticipantSetInfos: [
        {
          displayUserSetName: "Counterparty",
          displayUserSetMemberInfos: [
            {
              fullName: "Bob Vendor",
              company: "Vendor LLC",
              email: "bob@vendor.com",
            },
          ],
        },
      ],
    },
  ],
};








export const getAgreementExamplePayload: { data: AgreementInfo } = {
  data: {
    id: "CBJCHBCAABAAQ8h3W7QwzG8Xq6t9R5p4N2K",
    name: "Service Agreement 2024",
    type: "AGREEMENT",
    state: "IN_PROCESS",
    status: "OUT_FOR_SIGNATURE",
    signatureType: "ESIGN",
    locale: "en_US",
    senderEmail: "sender@acme.com",
    message: "Please review and sign this service agreement.",
    groupId: "CBJCHBCAABAAIYEoZ3VPDavcqvJm3ni7ATNn-O9N3OPf",
    workflowId: "CBJCHBCAABAAFvT4qsB8Y9nJk7L6m5W2pXr",
    parentId: "",
    externalId: { id: "agreement-1234" },
    createdDate: "2024-03-15T10:30:00Z",
    expirationTime: "2024-04-15T10:30:00Z",
    lastEventDate: "2024-03-15T11:45:00Z",
    hasFormFieldData: false,
    hasSignerIdentityReport: false,
    documentVisibilityEnabled: true,
    isDocumentRetentionApplied: false,
    senderSigns: "FIRST",
    firstReminderDelay: 0,
    reminderFrequency: "DAILY_UNTIL_SIGNED",
    sendType: "REGULAR_SEND",
    agreementSettingsInfo: {
      hipaaEnabled: false,
      canEditFiles: true,
      canEditAgreementSettings: true,
      canEditElectronicSeals: false,
    },
    emailOption: {
      sendOptions: {
        initEmails: "ALL",
        inFlightEmails: "ALL",
        completionEmails: "ALL",
      },
    },
    participantSetsInfo: [
      {
        id: "CBJCHBCAABAArole1",
        role: "SIGNER",
        order: 1,
        name: "Signer",
        memberInfos: [
          {
            id: "CBJCHBCAABAAmem1",
            email: "signer@example.com",
            name: "Jane Signer",
            status: "ACTIVE",
            deliverableEmail: true,
          },
        ],
      },
    ],
    fileInfos: [
      {
        label: "Service Agreement",
        document: {
          id: "CBJCHBCAABAAdoc1",
          name: "service-agreement.pdf",
          label: "Service Agreement",
          mimeType: "application/pdf",
          numPages: 4,
          createdDate: "2024-03-15T10:30:00Z",
        },
      },
    ],
  },
};







export const listUsersExamplePayload: { data: User[] } = {
  data: [
    {
      id: "CBJCHBCAABAApRvVMBVyo0bIo4jdPROKiKWR9xRhRugJ",
      accountId: "CBJCHBCAABAAd4TPldfK4H2cTTDlWxJ6i4JDiVDoOC2C",
      email: "alice@acme.com",
      firstName: "Alice",
      lastName: "Admin",
      company: "Acme",
      isAccountAdmin: true,
    },
    {
      id: "CBJCHBCAABAABcD3wQzGh5LpM2Xn7K8RvT4fY6Yw9NeP",
      accountId: "CBJCHBCAABAAd4TPldfK4H2cTTDlWxJ6i4JDiVDoOC2C",
      email: "bob@acme.com",
      firstName: "Bob",
      lastName: "User",
      company: "Acme",
      isAccountAdmin: false,
    },
  ],
};






export const getUserExamplePayload = {
  data: {
    id: "CBJCHBCAABAApRvVMBVyo0bIo4jdPROKiKWR9xRhRugJ",
    accountId: "CBJCHBCAABAAd4TPldfK4H2cTTDlWxJ6i4JDiVDoOC2C",
    accountType: "LICENSED",
    email: "example@company.com",
    firstName: "Acme",
    lastName: "Test",
    initials: "AT",
    company: "Acme",
    title: "Software Engineer",
    phone: "555-555-5555",
    locale: "en_US",
    isAccountAdmin: true,
    primaryGroupId: "CBJCHBCAABAAIYEoZ3VPDavcqvJm3ni7ATNn-O9N3OPf",
    status: "ACTIVE",
    createdDate: "2024-03-15T10:30:00Z",
  },
};







export const createUserExamplePayload = {
  data: {
    id: "CBJCHBCAABAApRvVMBVyo0bIo4jdPROKiKWR9xRhRugJ",
    accountId: "CBJCHBCAABAAd4TPldfK4H2cTTDlWxJ6i4JDiVDoOC2C",
    accountType: "LICENSED",
    email: "example@company.com",
    firstName: "Acme",
    lastName: "Test",
    initials: "AT",
    company: "Acme",
    title: "Software Engineer",
    phone: "555-555-5555",
    locale: "en_US",
    isAccountAdmin: true,
    primaryGroupId: "CBJCHBCAABAAIYEoZ3VPDavcqvJm3ni7ATNn-O9N3OPf",
    status: "ACTIVE",
    createdDate: "2024-03-15T10:30:00Z",
  },
};







export const updateUserExamplePayload = {
  data: {
    id: "CBJCHBCAABAApRvVMBVyo0bIo4jdPROKiKWR9xRhRugJ",
    accountId: "CBJCHBCAABAAd4TPldfK4H2cTTDlWxJ6i4JDiVDoOC2C",
    accountType: "LICENSED",
    email: "replacedEmail@acme.io",
    firstName: "Acme",
    lastName: "Test",
    initials: "AT",
    company: "Not Acme",
    title: "Senior Software Engineer",
    phone: "555-555-5555",
    locale: "en_US",
    isAccountAdmin: true,
    primaryGroupId: "CBJCHBCAABAAIYEoZ3VPDavcqvJm3ni7ATNn-O9N3OPf",
    status: "ACTIVE",
    createdDate: "2024-03-15T10:30:00Z",
  },
};






export const createTransientDocumentExamplePayload = {
  data: {
    transientDocumentId: "3AAABLblqZhBf0aJb0XZqz5vXy8g3V9R3qQx6",
  },
};







export const listWebhooksExamplePayload: { data: Webhook[] } = {
  data: [
    {
      id: "CBJCHBCAABAA82chKH_73ytJxSou5uTTrIh7rRelwSro",
      name: "Agreement Notifications",
      scope: "ACCOUNT",
      status: "ACTIVE",
      lastModified: "2024-03-15T10:30:00Z",
      resourceId: "CBJCHBCAABAAd4TPldfK4H2cTTDlWxJ6i4JDiVDoOC2C",
      resourceType: "ACCOUNT",
      applicationName: "AcmeIntegration",
      applicationDisplayName: "Acme Integration",
      webhookUrlInfo: { url: "https://acme.example.com/webhooks/adobe-sign" },
      webhookSubscriptionEvents: [
        "AGREEMENT_CREATED",
        "AGREEMENT_ACTION_COMPLETED",
      ],
      problemNotificationEmails: [{ email: "ops@acme.com" }],
    },
    {
      id: "CBJCHBCAABAAR7m5K_84zvKxRtT_v3X4WqLp2N9PqRtS",
      name: "Library Document Updates",
      scope: "GROUP",
      status: "ACTIVE",
      lastModified: "2024-04-02T08:15:00Z",
      resourceId: "CBJCHBCAABAAIYEoZ3VPDavcqvJm3ni7ATNn-O9N3OPf",
      resourceType: "GROUP",
      applicationName: "AcmeIntegration",
      applicationDisplayName: "Acme Integration",
      webhookUrlInfo: { url: "https://acme.example.com/webhooks/library-docs" },
      webhookSubscriptionEvents: ["LIBRARY_DOCUMENT_CREATED"],
      problemNotificationEmails: [{ email: "ops@acme.com" }],
    },
  ],
};






export const deleteWebhookExamplePayload = {
  data: null,
};






export const getWebhookExamplePayload: { data: WebhookInfo } = {
  data: {
    id: "CBJCHBCAABAA82chKH_73ytJxSou5uTTrIh7rRelwSro",
    name: "Agreement Notifications",
    scope: "ACCOUNT",
    state: "ACTIVE",
    status: "ACTIVE",
    created: "2024-03-15T10:30:00Z",
    lastModified: "2024-03-15T10:30:00Z",
    resourceId: "CBJCHBCAABAAd4TPldfK4H2cTTDlWxJ6i4JDiVDoOC2C",
    resourceType: "ACCOUNT",
    applicationName: "AcmeIntegration",
    applicationDisplayName: "Acme Integration",
    webhookUrlInfo: {
      url: "https://acme.example.com/webhooks/adobe-sign",
    },
    webhookSubscriptionEvents: [
      "AGREEMENT_CREATED",
      "AGREEMENT_ACTION_COMPLETED",
    ],
    problemNotificationEmails: [{ email: "ops@acme.com" }],
    webhookConditionalParams: {
      webhookAgreementEvents: {
        includeDetailedInfo: true,
        includeDocumentsInfo: true,
        includeParticipantsInfo: true,
        includeSignedDocuments: true,
      },
    },
  },
};






export const createWebhookExamplePayload = {
  data: {
    id: "CBJCHBCAABAA82chKH_73ytJxSou5uTTrIh7rRelwSro",
    name: "Agreement Notifications",
    scope: "ACCOUNT",
    state: "ACTIVE",
    status: "ACTIVE",
    created: "2024-03-15T10:30:00Z",
    lastModified: "2024-03-15T10:30:00Z",
    resourceId: "CBJCHBCAABAAd4TPldfK4H2cTTDlWxJ6i4JDiVDoOC2C",
    resourceType: "ACCOUNT",
    applicationName: "AcmeIntegration",
    applicationDisplayName: "Acme Integration",
    webhookUrlInfo: {
      url: "https://acme.example.com/webhooks/adobe-sign",
    },
    webhookSubscriptionEvents: [
      "AGREEMENT_CREATED",
      "AGREEMENT_ACTION_COMPLETED",
    ],
    problemNotificationEmails: [{ email: "ops@acme.com" }],
    webhookConditionalParams: {
      webhookAgreementEvents: {
        includeDetailedInfo: true,
        includeDocumentsInfo: true,
        includeParticipantsInfo: true,
        includeSignedDocuments: true,
      },
    },
  },
};







export const updateWebhookExamplePayload = {
  data: {
    id: "CBJCHBCAABAA82chKH_73ytJxSou5uTTrIh7rRelwSro",
    name: "Agreement Notifications (updated)",
    scope: "ACCOUNT",
    state: "ACTIVE",
    status: "ACTIVE",
    created: "2024-03-15T10:30:00Z",
    lastModified: "2024-04-10T14:22:00Z",
    resourceId: "CBJCHBCAABAAd4TPldfK4H2cTTDlWxJ6i4JDiVDoOC2C",
    resourceType: "ACCOUNT",
    applicationName: "AcmeIntegration",
    applicationDisplayName: "Acme Integration",
    webhookUrlInfo: {
      url: "https://acme.example.com/webhooks/adobe-sign/v2",
    },
    webhookSubscriptionEvents: [
      "AGREEMENT_CREATED",
      "AGREEMENT_ACTION_COMPLETED",
      "AGREEMENT_EXPIRED",
    ],
    problemNotificationEmails: [{ email: "ops@acme.com" }],
    webhookConditionalParams: {
      webhookAgreementEvents: {
        includeDetailedInfo: true,
        includeDocumentsInfo: true,
        includeParticipantsInfo: true,
        includeSignedDocuments: true,
      },
    },
  },
};

export const searchResourcesExamplePayload = {
  data: {
    scope: ["AGREEMENT_ASSETS"],
    agreementAssetsCriteria: {
      createdDate: {
        range: {
          gt: "2024-01-01T00:00:00Z",
          lt: "2024-01-01T23:00:00Z",
        },
      },
    },
  },
};












export const pollChangesTriggerExamplePayload = {
  payload: {
    headers: {},
    queryParameters: {},
    rawBody: {
      data: "",
      contentType: "application/json",
    },
    body: {
      data: {
        created: [
          {
            id: "CBJCHBCAABAAQ8h3W7QwzG8Xq6t9R5p4N2K",
            name: "Service Agreement 2026",
            type: "AGREEMENT",
            status: "OUT_FOR_SIGNATURE",
            createdDate: "2026-05-28T10:00:00Z",
            modifiedDate: "2026-05-28T10:00:00Z",
            senderEmail: "sender@acme.com",
            groupId: "CBJCHBCAABAAIYEoZ3VPDavcqvJm3ni7ATNn-O9N3OPf",
          },
        ],
        updated: [
          {
            id: "CBJCHBCAABAAR9k4X8XWxF7Yp7u8S6q3M1L",
            name: "NDA Agreement",
            type: "AGREEMENT",
            status: "SIGNED",
            createdDate: "2026-05-20T09:00:00Z",
            modifiedDate: "2026-05-28T12:30:00Z",
            senderEmail: "sender@acme.com",
            groupId: "CBJCHBCAABAAIYEoZ3VPDavcqvJm3ni7ATNn-O9N3OPf",
          },
        ],
      },
      contentType: "application/json",
    },
    pathFragment: "",
    webhookUrls: {
      "Polling Flow": "https://hooks.example.com/trigger/EXAMPLE",
    },
    webhookApiKeys: {
      "Polling Flow": ["example-api-key"],
    },
    invokeUrl: "https://hooks.example.com/trigger/EXAMPLE",
    executionId: "SW5zdGFuY2VFeGVjdXRpb246MTIzNDU=",
    customer: {
      id: "Q3VzdG9tZXI6MTIzNDU=",
      externalId: "example-customer-external-id",
      name: "Example Customer",
    },
    instance: {
      id: "SW5zdGFuY2U6MTIzNDU=",
      name: "Example Instance",
    },
    user: {
      id: "VXNlcjoxMjM0NQ==",
      externalId: "example-user-external-id",
      name: "Example User",
      email: "user@example.com",
    },
  } as unknown as TriggerPayload,
  polledNoChanges: false,
};
