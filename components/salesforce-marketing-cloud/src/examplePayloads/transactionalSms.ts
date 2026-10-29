import type { PaginatedResponse } from "../types";

export const getSmsDefinitionExamplePayload = {
  data: {
    requestId: "582bec09-6d04-4222-bbba-cea616495596",
    name: "Example SMS Definition",
    definitionKey: "example-sms-def",
    description: "Example SMS transactional definition",
    status: "Active",
    createdDate: "2024-07-10T04:20:00",
    modifiedDate: "2024-07-10T04:20:00",
    content: {
      message: "Your verification code is: {{code}}",
    },
    subscriptions: {
      shortCode: "12345",
      countryCode: "US",
      autoAddSubscriber: true,
      updateSubscriber: true,
      keyword: "EXAMPLE",
    },
    options: {
      urlShortenerOptions: {
        isLinkShorteningEnabled: true,
        isSubscriberTrackingEnabled: true,
        shortenerType: "SFMC",
      },
      smsMessageRegulatoryAuthorityTemplateId: "example-template-id-123",
    },
  },
};

export const listSmsDefinitionsExamplePayload: { data: PaginatedResponse } = {
  data: {
    requestId: "ba9633fa-5c8d-4c42-8efa-a16412ac0c53",
    definitions: [
      {
        definitionKey: "example-sms-def",
        status: "Active",
        name: "Example SMS Definition",
        createdDate: "2018-07-18T19:52:00",
        modifiedDate: "2018-07-18T19:52:00",
      },
    ],
    count: 1,
    page: 1,
    pageSize: 10,
  },
};

export const createSmsDefinitionExamplePayload = getSmsDefinitionExamplePayload;

export const updateSmsDefinitionExamplePayload = getSmsDefinitionExamplePayload;

export const deleteSmsDefinitionExamplePayload = {
  data: {
    requestId: "582bec09-6d04-4222-bbba-cea616495596",
    deletedDefinitionKey: "example-sms-def",
  },
};

export const sendSmsExamplePayload = {
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

export const sendSmsBatchExamplePayload = {
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
