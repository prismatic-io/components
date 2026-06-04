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

export const refreshWebhookExamplePayload = {
  data: { expirationDate: "2022-12-21T09:20:20.388-0900" },
};



export const jiraBasicAuthWebhookExample = {
  name: "my first webhook via rest",
  description: "description of my first webhook",
  url: "https://www.example.com/webhooks",
  excludeBody: false,
  events: ["jira:issue_created", "jira:issue_updated"],
  filters: {
    "issue-related-events-section": "Project = JRA AND resolution = Fixed",
  },
  enabled: true,
  self: "https://your-domain.atlassian.net/rest/webhooks/1.0/webhook/72",
  lastUpdated: 1706692865788,
  isSigned: true,
};
