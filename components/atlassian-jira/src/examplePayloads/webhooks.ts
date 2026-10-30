export const listWebhooksExamplePayload = {
  data: {
    isLast: true,
    maxResults: 100,
    startAt: 0,
    total: 1,
    values: [
      {
        events: ["jira:issue_created"],
        expirationDate: "2022-12-18T15:22:13.418-0900",
        id: 1,
        jqlFilter: "project = EXAMPLE",
        url: "https://hooks.example.com/jira/events",
      },
    ],
  },
};

export const createWebhookExamplePayload = {
  data: {
    webhookRegistrationResult: [
      {
        createdWebhookId: 7,
      },
    ],
  },
};

export const deleteWebhookExamplePayload = {
  data: null,
};

export const refreshWebhookExamplePayload = {
  data: { expirationDate: "2022-12-21T09:20:20.388-0900" },
};

export const selectWebhookExamplePayload = {
  result: [{ label: "jira:issue_created", key: "1" }],
};
