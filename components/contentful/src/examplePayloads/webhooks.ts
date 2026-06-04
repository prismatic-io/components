export const updateWebhookExamplePayload = {
  sys: {
    type: "WebhookDefinition",
    id: "0KzM2HxYr5O1pZ4SaUzK8h",
    version: 1,
    space: {
      sys: {
        type: "Link",
        linkType: "Space",
        id: "yadj1kx9rmg0",
      },
    },
    createdAt: "2015-05-18T11:29:46.809Z",
    createdBy: {
      sys: {
        type: "Link",
        linkType: "User",
        id: "7BslKh9TdKGOK41VmLDjFZ",
      },
    },
    updatedAt: "2015-05-18T11:29:46.809Z",
    updatedBy: {
      sys: {
        type: "Link",
        linkType: "User",
        id: "4FLrUHftHW3v2BLi9fzfjU",
      },
    },
  },
  name: "My webhook",
  url: "https://www.example.com",
  topics: ["Entry.create", "ContentType.create", "*.publish", "Asset.*"],
  httpBasicUsername: "yolo",
  headers: [
    {
      key: "header1",
      value: "value1",
    },
    {
      key: "header2",
      value: "value2",
    },
  ],
  filters: [],
  active: true,
};

export const createWebhookExamplePayload = updateWebhookExamplePayload;

export const getWebhookExamplePayload = updateWebhookExamplePayload;

export const listWebhooksExamplePayload = [updateWebhookExamplePayload];
