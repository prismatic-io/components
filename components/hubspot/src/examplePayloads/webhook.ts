import { SUCCESS_MESSAGE } from "../constants";

export const listWebhooksExamplePayload = {
  data: {
    results: [
      {
        createdAt: "2024-01-10T20:53:52.503Z",
        propertyName: "lifecyclestage",
        active: true,
        eventType: "contact.propertyChange",
        id: "98765432",
        updatedAt: "2024-01-15T14:22:10.456Z",
      },
      {
        createdAt: "2024-01-12T15:30:20.120Z",
        active: true,
        eventType: "contact.creation",
        id: "98765433",
        updatedAt: "2024-01-15T14:22:10.456Z",
      },
    ],
  },
};

export const createWebhookExamplePayload = {
  data: {
    createdAt: "2024-01-15T20:53:52.517Z",
    propertyName: "email",
    active: true,
    eventType: "contact.propertyChange",
    id: "98765434",
    updatedAt: "2024-01-15T20:53:52.517Z",
  },
};

export const deleteWebhookExamplePayload = { data: "" };

export const deleteAllWebhooksExamplePayload = {
  data: {
    message: SUCCESS_MESSAGE,
  },
};
