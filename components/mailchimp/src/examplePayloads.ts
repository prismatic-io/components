import type { TriggerPayload } from "@prismatic-io/spectral";
export const getWebhookExamplePayload = {
  data: {
    id: "f4c8b5d2e3",
    url: "https://example.com/webhooks/mailchimp",
    events: {
      subscribe: true,
      unsubscribe: true,
      profile: true,
      cleaned: false,
      upemail: true,
      campaign: false,
    },
    sources: {
      user: true,
      admin: true,
      api: false,
    },
    list_id: "a1b2c3d4e5",
    _links: [
      {
        rel: "self",
        href: "https://us1.api.mailchimp.com/3.0/lists/a1b2c3d4e5/webhooks/f4c8b5d2e3",
        method: "GET",
        targetSchema:
          "https://us1.api.mailchimp.com/schema/3.0/Definitions/Lists/Webhooks/Response.json",
      },
      {
        rel: "parent",
        href: "https://us1.api.mailchimp.com/3.0/lists/a1b2c3d4e5/webhooks",
        method: "GET",
        targetSchema:
          "https://us1.api.mailchimp.com/schema/3.0/Definitions/Lists/Webhooks/CollectionResponse.json",
      },
      {
        rel: "update",
        href: "https://us1.api.mailchimp.com/3.0/lists/a1b2c3d4e5/webhooks/f4c8b5d2e3",
        method: "PATCH",
        targetSchema:
          "https://us1.api.mailchimp.com/schema/3.0/Definitions/Lists/Webhooks/Response.json",
        schema:
          "https://us1.api.mailchimp.com/schema/3.0/Definitions/Lists/Webhooks/PATCH.json",
      },
      {
        rel: "delete",
        href: "https://us1.api.mailchimp.com/3.0/lists/a1b2c3d4e5/webhooks/f4c8b5d2e3",
        method: "DELETE",
      },
    ],
  },
};

export const addWebhookExamplePayload = getWebhookExamplePayload;

export const updateWebhookExamplePayload = {
  data: {
    ...getWebhookExamplePayload.data,
    url: "https://example.com/webhooks/mailchimp-updated",
    events: {
      subscribe: true,
      unsubscribe: true,
      profile: true,
      cleaned: true,
      upemail: true,
      campaign: true,
    },
  },
};

export const listWebhooksExamplePayload = {
  data: [
    {
      id: "f4c8b5d2e3",
      url: "https://example.com/webhooks/mailchimp",
      events: {
        subscribe: true,
        unsubscribe: true,
        profile: true,
        cleaned: false,
        upemail: true,
        campaign: false,
      },
      sources: {
        user: true,
        admin: true,
        api: false,
      },
      list_id: "a1b2c3d4e5",
    },
    {
      id: "g5d9c6e4f7",
      url: "https://example.com/webhooks/mailchimp-backup",
      events: {
        subscribe: true,
        unsubscribe: true,
        profile: false,
        cleaned: true,
        upemail: false,
        campaign: true,
      },
      sources: {
        user: true,
        admin: false,
        api: true,
      },
      list_id: "a1b2c3d4e5",
    },
  ],
};

export const deleteWebhookExamplePayload = {
  data: {
    success: true,
    message: "Webhook deleted successfully",
  },
};

export const subscribeWebhookPayload = {
  type: "subscribe",
  fired_at: "2024-12-05T14:30:00Z",
  data: {
    id: "8a25ff1d98",
    list_id: "a6b5da1054",
    email: "john.doe@example.com",
    email_type: "html",
    ip_opt: "192.168.1.100",
    ip_signup: "192.168.1.100",
    merges: {
      EMAIL: "john.doe@example.com",
      FNAME: "John",
      LNAME: "Doe",
      ADDRESS: "",
      PHONE: "",
      BIRTHDAY: "",
    },
  },
};

export const unsubscribeWebhookPayload = {
  type: "unsubscribe",
  fired_at: "2024-12-05T15:45:00Z",
  data: {
    action: "unsub",
    reason: "manual",
    id: "8a25ff1d98",
    list_id: "a6b5da1054",
    email: "john.doe@example.com",
    email_type: "html",
    ip_opt: "192.168.1.100",
    campaign_id: "cb398d21d2",
    merges: {
      EMAIL: "john.doe@example.com",
      FNAME: "John",
      LNAME: "Doe",
      ADDRESS: "",
      PHONE: "",
      BIRTHDAY: "",
    },
  },
};

export const profileUpdateWebhookPayload = {
  type: "profile",
  fired_at: "2024-12-05T16:20:00Z",
  data: {
    id: "8a25ff1d98",
    list_id: "a6b5da1054",
    email: "john.doe@example.com",
    email_type: "html",
    ip_opt: "192.168.1.100",
    merges: {
      EMAIL: "john.doe@example.com",
      FNAME: "John",
      LNAME: "Smith",
      ADDRESS: "123 Main St",
      PHONE: "+1-555-123-4567",
      BIRTHDAY: "01/15",
    },
  },
};

export const emailChangedWebhookPayload = {
  type: "upemail",
  fired_at: "2024-12-05T17:00:00Z",
  data: {
    list_id: "a6b5da1054",
    new_id: "9b36gg2e09",
    new_email: "john.smith@example.com",
    old_email: "john.doe@example.com",
  },
};

export const cleanedWebhookPayload = {
  type: "cleaned",
  fired_at: "2024-12-05T18:30:00Z",
  data: {
    list_id: "a6b5da1054",
    campaign_id: "cb398d21d2",
    reason: "hard",
    email: "bounced@example.com",
  },
};

export const campaignWebhookPayload = {
  type: "campaign",
  fired_at: "2024-12-05T19:00:00Z",
  data: {
    id: "cb398d21d2",
    list_id: "a6b5da1054",
    subject: "Your Monthly Newsletter",
    status: "sent",
  },
};

export const webhookTriggerExamplePayload = {
  payload: {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "MailChimp",
      Host: "hooks.example.com",
    },
    queryParameters: {},
    rawBody: {
      data: subscribeWebhookPayload,
      contentType: "application/x-www-form-urlencoded",
    },
    body: {
      data: subscribeWebhookPayload,
      contentType: "application/x-www-form-urlencoded",
    },
    pathFragment: "",
    webhookUrls: {
      "Mailchimp Webhook Flow":
        "https://hooks.example.com/trigger/aBcDeFgHiJkLmNoPqRsTuVwXyZ",
    },
    webhookApiKeys: {
      "Mailchimp Webhook Flow": ["example_api_key_1234567890"],
    },
    invokeUrl: "https://hooks.example.com/trigger/aBcDeFgHiJkLmNoPqRsTuVwXyZ",
    executionId: "SW5zdGFuY2VFeGVjdXRpb25SZXN1bHQ6OTg3NjU0MzIxMA==",
    customer: {
      id: "Q3VzdG9tZXI6MTIzNDU2Nzg5MA==",
      name: "Acme Corporation",
      externalId: "acme-corp-12345",
    },
    instance: {
      id: "SW5zdGFuY2U6OTg3NjU0MzIxMA==",
      name: "Mailchimp Integration - Acme Corp",
    },
    user: {
      id: "VXNlcjo5ODc2NTQzMjEw",
      email: "admin@example.com",
      name: "Admin User",
      externalId: "admin-12345",
    },
    integration: {
      id: "SW50ZWdyYXRpb246OTg3NjU0MzIxMA==",
      name: "Mailchimp Integration",
      versionSequenceId: "SW50ZWdyYXRpb25WZXJzaW9uU2VxdWVuY2U6MTIzNDU2Nzg5MA==",
      externalVersion: "1.0.0",
    },
    flow: {
      id: "SW5zdGFuY2VGbG93Q29uZmlnOjEyMzQ1Njc4OTA==",
      name: "Mailchimp Webhook Flow",
    },
    startedAt: "2024-12-05T14:30:00.000Z",
  } as unknown as TriggerPayload,
};

export const manualWebhookExamplePayload = webhookTriggerExamplePayload;
