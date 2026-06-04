import type { PaginatedResponse } from "../types";

export const getEmailDefinitionExamplePayload = {
  data: {
    requestId: "c537a3f4-ea8c-40b3-81bb-41a91666c82a",
    name: "Example Email Definition",
    definitionKey: "welcome-email-def",
    definitionId: "856cf449-8f0b-f111-a5c3-48df37deb009",
    description: "Example transactional email definition",
    classification: "Default Transactional",
    status: "New",
    createdDate: "2026-02-16T17:29:00",
    modifiedDate: "2026-02-16T17:29:00",
    content: {
      customerKey: "7f18a738-74a7-4243-a763-4d80f42fb739",
    },
    subscriptions: {
      list: "All Subscribers - Example",
      autoAddSubscriber: true,
      updateSubscriber: true,
    },
    options: {
      trackLinks: true,
      isReconcilable: false,
    },
    journey: {},
  },
};

export const listEmailDefinitionsExamplePayload: { data: PaginatedResponse } = {
  data: {
    requestId: "92639bbb-7161-4c27-a08b-e5baf6fdef50",
    definitions: [
      {
        name: "Example Email Definition",
        definitionKey: "test-email-def",
        status: "New",
        createdDate: "2026-02-16T17:31:00",
        modifiedDate: "2026-02-16T17:31:00",
      },
    ],
    count: 1,
    page: 1,
    pageSize: 50,
  },
};

export const createEmailDefinitionExamplePayload =
  getEmailDefinitionExamplePayload;

export const updateEmailDefinitionExamplePayload =
  getEmailDefinitionExamplePayload;

export const deleteEmailDefinitionExamplePayload = {
  data: {
    requestId: "c537a3f4-ea8c-40b3-81bb-41a91666c82a",
    deletedDefinitionKey: "welcome-email-def",
  },
};

export const sendEmailExamplePayload = {
  data: {
    requestId: "239a2bc3-bdcb-4f8a-9e08-28aff9f983b7",
    errorcode: 0,
    responses: [
      {
        messageKey: "f4fe74b7-c3c0-4e5a-9f49-b63a641109a2",
      },
    ],
  },
};

export const sendEmailBatchExamplePayload = {
  data: {
    requestId: "ccdb94bf-fcac-4fef-b194-08f534a2079a",
    errorcode: 0,
    responses: [
      {
        messageKey: "nFL4ULgheUeaGbPIMzJJSw",
      },
      {
        messageKey: "GV1LhQ6NFkqFUAE1IsoQ9Q",
      },
    ],
  },
};

export const getEmailSendStatusExamplePayload = {
  data: {
    requestId: "30486456-ed41-46ba-96eb-06c4ff3b95d9",
    eventCategoryType: "TransactionalSendEvents.EmailNotSent",
    timestamp: "2025-07-24T06:26:58.463",
    compositeId:
      "56941A9F-3A8F-E811-80E0-1402EC6B9529.4647028.622338.1.318768528",
    info: {
      messageKey: "9a-zUvWf3UKxLpwwIrqTmQ",
      contactKey: "ec25a8c8-6d4e-42f0-84c3-4ea23564cbe5",
      to: "recipient@example.com",
    },
    statusCode: 16,
    statusMessage: "InvalidAttributeValue",
  },
};
