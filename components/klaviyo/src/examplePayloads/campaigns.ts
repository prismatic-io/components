import type {
  GetCampaignResponseCollectionCompoundDocument,
  GetCampaignResponseCompoundDocument,
  PatchCampaignResponse,
  PostCampaignResponse,
} from "klaviyo-api";
import type { TriggerPayload } from "@prismatic-io/spectral";
import type { KlaviyoRecord } from "../types";

const triggerPayloadEnvelope: Omit<TriggerPayload, "body"> = {
  headers: {},
  queryParameters: {},
  rawBody: { data: null },
  pathFragment: "",
  webhookUrls: {},
  webhookApiKeys: {},
  invokeUrl: "",
  executionId: "RXhhbXBsZUV4ZWN1dGlvblJlc3VsdElk",
  customer: {
    id: "testCustomerId",
    name: "Test Customer",
    externalId: "testExternalId",
  },
  instance: { id: "testInstanceId", name: "Test Instance" },
  user: {
    id: "testUserId",
    email: "user@example.com",
    name: "Test User",
    externalId: "testUserExternalId",
  },
  integration: {
    id: "testIntegrationId",
    name: "Test Integration",
    versionSequenceId: "1",
    externalVersion: "",
  },
  flow: { id: "testFlowId", name: "Test Flow", stableId: "testFlowStableId" },
  startedAt: "2024-01-15T00:00:00.000Z",
  globalDebug: false,
};

const pollCampaignChangesTriggerBody: {
  data: { created: KlaviyoRecord[]; updated: KlaviyoRecord[] };
} = {
  data: {
    created: [
      {
        type: "campaign",
        id: "01J5KQHG8AMVR0E92DHZY1GZWN",
        attributes: {
          name: "Summer Sale Announcement",
          status: "Draft",
          archived: false,
          audiences: {
            included: ["Y6nRLr"],
            excluded: [],
          },
          sendOptions: {
            useSmartSending: true,
          },
          trackingOptions: {
            addTrackingParams: true,
            customTrackingParams: [
              {
                type: "static",
                name: "utm_medium",
                value: "campaign",
              },
            ],
            isTrackingClicks: true,
            isTrackingOpens: true,
          },
          sendStrategy: {
            method: "static",
            datetime: "2026-07-01T14:00:00+00:00",
            options: {
              isLocal: false,
            },
          },
          createdAt: "2026-06-15T10:30:00+00:00",
          scheduledAt: "2026-07-01T14:00:00+00:00",
          updatedAt: "2026-06-15T10:30:00+00:00",
          sendTime: "2026-07-01T14:00:00+00:00",
        },
        links: {
          self: "https://a.klaviyo.com/api/campaigns/01J5KQHG8AMVR0E92DHZY1GZWN",
        },
        relationships: {
          campaignMessages: {
            data: [
              {
                type: "campaign-message",
                id: "01J5KQHG8AMVR0E92DHZY1GZWP",
              },
            ],
            links: {
              self: "https://a.klaviyo.com/api/campaigns/01J5KQHG8AMVR0E92DHZY1GZWN/relationships/campaign-messages",
              related:
                "https://a.klaviyo.com/api/campaigns/01J5KQHG8AMVR0E92DHZY1GZWN/campaign-messages",
            },
          },
        },
      },
    ],
    updated: [
      {
        type: "campaign",
        id: "01J3ABCD1234EFGH5678IJKL90",
        attributes: {
          name: "Spring Newsletter",
          status: "Sent",
          archived: false,
          audiences: {
            included: ["UTd5ui"],
            excluded: [],
          },
          sendOptions: {
            useSmartSending: true,
          },
          trackingOptions: {
            addTrackingParams: true,
            customTrackingParams: [
              {
                type: "static",
                name: "utm_medium",
                value: "campaign",
              },
            ],
            isTrackingClicks: true,
            isTrackingOpens: true,
          },
          sendStrategy: {
            method: "static",
            datetime: "2026-04-01T09:00:00+00:00",
            options: {
              isLocal: true,
              sendPastRecipientsImmediately: true,
            },
          },
          createdAt: "2026-03-20T08:00:00+00:00",
          scheduledAt: "2026-04-01T09:00:00+00:00",
          updatedAt: "2026-06-15T11:45:00+00:00",
          sendTime: "2026-04-01T09:00:00+00:00",
        },
        links: {
          self: "https://a.klaviyo.com/api/campaigns/01J3ABCD1234EFGH5678IJKL90",
        },
        relationships: {
          campaignMessages: {
            data: [
              {
                type: "campaign-message",
                id: "01J3ABCD1234EFGH5678IJKL91",
              },
            ],
            links: {
              self: "https://a.klaviyo.com/api/campaigns/01J3ABCD1234EFGH5678IJKL90/relationships/campaign-messages",
              related:
                "https://a.klaviyo.com/api/campaigns/01J3ABCD1234EFGH5678IJKL90/campaign-messages",
            },
          },
        },
      },
    ],
  },
};

export const pollCampaignChangesTriggerExamplePayload: {
  payload: TriggerPayload;
} = {
  payload: {
    ...triggerPayloadEnvelope,
    body: pollCampaignChangesTriggerBody,
  },
};

export const createCampaignExamplePayload: { data: PostCampaignResponse } = {
  data: {
    data: {
      type: "campaign",
      id: "string",
      attributes: {
        name: "string",
        status: "Draft",
        archived: false,
        audiences: {
          included: ["Y6nRLr"],
          excluded: ["UTd5ui"],
        },
        sendOptions: {
          useSmartSending: true,
        },
        trackingOptions: {
          addTrackingParams: true,
          customTrackingParams: [
            {
              type: "static",
              name: "utm_medium",
              value: "campaign",
            },
          ],
          isTrackingClicks: true,
          isTrackingOpens: true,
        },
        sendStrategy: {
          method: "static",
          datetime: new Date("2026-11-08T00:00:00+00:00"),
          options: {
            isLocal: true,
            sendPastRecipientsImmediately: true,
          },
        },
        createdAt: new Date("2026-10-01T00:00:00+00:00"),
        scheduledAt: new Date("2026-11-08T00:00:00+00:00"),
        updatedAt: new Date("2026-10-01T00:00:00+00:00"),
        sendTime: new Date("2026-11-08T00:00:00+00:00"),
      },
      relationships: {
        campaignMessages: {
          data: [
            {
              type: "campaign-message",
              id: "string",
            },
          ],
          links: {
            self: "string",
            related: "string",
          },
        },
        tags: {
          data: [
            {
              type: "tag",
              id: "string",
            },
          ],
          links: {
            self: "string",
            related: "string",
          },
        },
      },
      links: {
        self: "string",
      },
    },
  },
};

export const deleteCampaignExamplePayload: { data: string } = {
  data: "Campaign deleted successfully.",
};

export const getCampaignExamplePayload: {
  data: GetCampaignResponseCompoundDocument;
} = {
  data: {
    data: {
      type: "campaign",
      id: "string",
      attributes: {
        name: "string",
        status: "Draft",
        archived: false,
        audiences: {
          included: ["Y6nRLr"],
          excluded: ["UTd5ui"],
        },
        sendOptions: {
          useSmartSending: true,
        },
        trackingOptions: {
          addTrackingParams: true,
          customTrackingParams: [
            {
              type: "static",
              name: "utm_medium",
              value: "campaign",
            },
          ],
          isTrackingClicks: true,
          isTrackingOpens: true,
        },
        sendStrategy: {
          method: "static",
          datetime: new Date("2022-11-08T00:00:00+00:00"),
          options: {
            isLocal: true,
            sendPastRecipientsImmediately: true,
          },
        },
        createdAt: new Date("2022-11-08T00:00:00+00:00"),
        scheduledAt: new Date("2022-11-08T00:00:00+00:00"),
        updatedAt: new Date("2022-11-08T00:00:00+00:00"),
        sendTime: new Date("2022-11-08T00:00:00+00:00"),
      },
      links: {
        self: "string",
      },
      relationships: {
        campaignMessages: {
          data: [
            {
              type: "campaign-message",
              id: "string",
            },
          ],
          links: {
            self: "string",
            related: "string",
          },
        },
        tags: {
          data: [
            {
              type: "tag",
              id: "string",
            },
          ],
          links: {
            self: "string",
            related: "string",
          },
        },
      },
    },
    included: [
      {
        type: "campaign-message",
        id: "string",
        attributes: {
          definition: {
            channel: "email",
            label: "string",
            content: {
              subject: "Buy our product!",
              previewText: "My preview text",
              fromEmail: "store@my-company.com",
              fromLabel: "My Company",
              replyToEmail: "reply-to@my-company.com",
              ccEmail: "cc@my-company.com",
              bccEmail: "bcc@my-company.com",
            },
          },
          sendTimes: [
            {
              datetime: new Date("2022-11-08T00:00:00+00:00"),
              isLocal: true,
            },
          ],
          createdAt: new Date("2022-11-08T00:00:00+00:00"),
          updatedAt: new Date("2022-11-08T00:00:00+00:00"),
        },
        links: {
          self: "string",
        },
      },
      {
        type: "tag",
        id: "abcd1234-ef56-gh78-ij90-abcdef123456",
        attributes: {
          name: "My Tag",
        },
        links: {
          self: "string",
        },
      },
    ],
  },
};

export const listCampaignsExamplePayload: {
  data: GetCampaignResponseCollectionCompoundDocument;
} = {
  data: {
    data: [
      {
        type: "campaign",
        id: "string",
        attributes: {
          name: "string",
          status: "Draft",
          archived: false,
          audiences: {
            included: ["Y6nRLr"],
            excluded: ["UTd5ui"],
          },
          sendOptions: {
            useSmartSending: true,
          },
          trackingOptions: {
            addTrackingParams: true,
            customTrackingParams: [
              {
                type: "static",
                name: "utm_medium",
                value: "campaign",
              },
            ],
            isTrackingClicks: true,
            isTrackingOpens: true,
          },
          sendStrategy: {
            method: "static",
            datetime: new Date("2022-11-08T00:00:00+00:00"),
            options: {
              isLocal: true,
              sendPastRecipientsImmediately: true,
            },
          },
          createdAt: new Date("2022-11-08T00:00:00+00:00"),
          scheduledAt: new Date("2022-11-08T00:00:00+00:00"),
          updatedAt: new Date("2022-11-08T00:00:00+00:00"),
          sendTime: new Date("2022-11-08T00:00:00+00:00"),
        },
        links: {
          self: "string",
        },
        relationships: {
          campaignMessages: {
            data: [
              {
                type: "campaign-message",
                id: "string",
              },
            ],
            links: {
              self: "string",
              related: "string",
            },
          },
          tags: {
            data: [
              {
                type: "tag",
                id: "string",
              },
            ],
            links: {
              self: "string",
              related: "string",
            },
          },
        },
      },
    ],
    links: {
      self: "string",
      prev: "string",
      next: "string",
    },
    included: [
      {
        type: "campaign-message",
        id: "string",
        attributes: {
          definition: {
            channel: "email",
            label: "string",
            content: {
              subject: "Buy our product!",
              previewText: "My preview text",
              fromEmail: "store@my-company.com",
              fromLabel: "My Company",
              replyToEmail: "reply-to@my-company.com",
              ccEmail: "cc@my-company.com",
              bccEmail: "bcc@my-company.com",
            },
          },
          sendTimes: [
            {
              datetime: new Date("2022-11-08T00:00:00+00:00"),
              isLocal: true,
            },
          ],
          createdAt: new Date("2022-11-08T00:00:00+00:00"),
          updatedAt: new Date("2022-11-08T00:00:00+00:00"),
        },
        links: {
          self: "string",
        },
      },
      {
        type: "tag",
        id: "abcd1234-ef56-gh78-ij90-abcdef123456",
        attributes: {
          name: "My Tag",
        },
        links: {
          self: "string",
        },
      },
    ],
  },
};

export const updateCampaignExamplePayload: { data: PatchCampaignResponse } = {
  data: {
    data: {
      type: "campaign",
      id: "string",
      attributes: {
        name: "string",
        status: "Draft",
        archived: false,
        audiences: {
          included: ["Y6nRLr"],
          excluded: ["UTd5ui"],
        },
        sendOptions: {
          useSmartSending: true,
        },
        trackingOptions: {
          addTrackingParams: true,
          customTrackingParams: [
            {
              type: "static",
              name: "utm_medium",
              value: "campaign",
            },
          ],
          isTrackingClicks: true,
          isTrackingOpens: true,
        },
        sendStrategy: {
          method: "static",
          datetime: new Date("2022-11-08T00:00:00+00:00"),
          options: {
            isLocal: true,
            sendPastRecipientsImmediately: true,
          },
        },
        createdAt: new Date("2022-11-08T00:00:00+00:00"),
        scheduledAt: new Date("2022-11-08T00:00:00+00:00"),
        updatedAt: new Date("2022-11-08T00:00:00+00:00"),
        sendTime: new Date("2022-11-08T00:00:00+00:00"),
      },
      relationships: {
        campaignMessages: {
          data: [
            {
              type: "campaign-message",
              id: "string",
            },
          ],
          links: {
            self: "string",
            related: "string",
          },
        },
        tags: {
          data: [
            {
              type: "tag",
              id: "string",
            },
          ],
          links: {
            self: "string",
            related: "string",
          },
        },
      },
      links: {
        self: "string",
      },
    },
  },
};

export const selectCampaignExamplePayload = {
  result: [{ label: "Spring Sale Email", key: "01HABCDEF0123456789CAMPAIGN" }],
};
