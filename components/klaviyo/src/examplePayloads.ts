import {
  EqualsEnum,
  type GetAccountResponse,
  type GetAccountResponseCollection,
  type GetCampaignResponseCollectionCompoundDocument,
  type GetCampaignResponseCompoundDocument,
  type GetEventResponseCollectionCompoundDocument,
  type GetEventResponseCompoundDocument,
  type GetImageResponse,
  type GetImageResponseCollection,
  type GetListListResponseCollectionCompoundDocument,
  type GetListMemberResponseCollection,
  type GetListRetrieveResponseCompoundDocument,
  type GetProfileResponseCollectionCompoundDocument,
  type GetProfileResponseCompoundDocument,
  type GetSegmentListResponseCollectionCompoundDocument,
  type GetSegmentRetrieveResponseCompoundDocument,
  type GetTemplateResponse,
  type GetTemplateResponseCollection,
  GreaterThanEnum,
  type PatchCampaignResponse,
  type PatchImageResponse,
  type PatchListPartialUpdateResponse,
  type PatchProfileResponse,
  type PatchSegmentPartialUpdateResponse,
  type PatchTemplateResponse,
  type PostCampaignResponse,
  type PostImageResponse,
  type PostListCreateResponse,
  type PostProfileResponse,
  type PostSegmentCreateResponse,
  type PostTemplateResponse,
} from "klaviyo-api";

export const getAccountExamplePayload: { data: GetAccountResponse } = {
  data: {
    data: {
      type: "account",
      id: "string",
      attributes: {
        testAccount: true,
        contactInformation: {
          defaultSenderName: "Klaviyo Demo",
          defaultSenderEmail: "contact@klaviyo-demo.com",
          websiteUrl: "https://www.klaviyo.com",
          organizationName: "Klaviyo Demo",
          streetAddress: {
            address1: "125 Summer Street",
            address2: "5th Floor",
            city: "Boston",
            region: "MA",
            country: "US",
            zip: "04323",
          },
        },
        industry: "Software / SaaS",
        timezone: "US/Eastern",
        preferredCurrency: "USD",
        publicApiKey: "AbC123",
        locale: "en-US",
      },
      links: {
        self: "string",
      },
    },
  },
};

export const listAccountsExamplePayload: {
  data: GetAccountResponseCollection;
} = {
  data: {
    data: [
      {
        type: "account",
        id: "string",
        attributes: {
          testAccount: true,
          contactInformation: {
            defaultSenderName: "Klaviyo Demo",
            defaultSenderEmail: "contact@klaviyo-demo.com",
            websiteUrl: "https://www.klaviyo.com",
            organizationName: "Klaviyo Demo",
            streetAddress: {
              address1: "125 Summer Street",
              address2: "5th Floor",
              city: "Boston",
              region: "MA",
              country: "US",
              zip: "04323",
            },
          },
          industry: "Software / SaaS",
          timezone: "US/Eastern",
          preferredCurrency: "USD",
          publicApiKey: "AbC123",
          locale: "en-US",
        },
        links: {
          self: "string",
        },
      },
    ],
    links: {
      self: "string",
      first: "string",
      last: "string",
      prev: "string",
      next: "string",
    },
  },
};

export const createCampaignExamplePayload: { data: PostCampaignResponse } = {
  data: {
    data: {
      type: "campaign",
      id: "string",
      attributes: {
        name: "string",
        status: "string",
        archived: true,
        audiences: {
          included: ["Y6nRLr"],
          excluded: ["UTd5ui"],
        },
        sendOptions: {
          useSmartSending: true,
        },
        trackingOptions: {
          isAddUtm: true,
          utmParams: [
            {
              name: "utm_medium",
              value: "campaign",
            },
          ],
          isTrackingClicks: true,
          isTrackingOpens: true,
        },
        sendStrategy: {
          method: "static",
          optionsStatic: {
            datetime: new Date(),
            isLocal: true,
            sendPastRecipientsImmediately: true,
          },
          optionsThrottled: {
            datetime: new Date(),
            throttlePercentage: 0,
          },
          optionsSto: {
            date: "2024-07-14",
          },
        },
        createdAt: new Date(),
        scheduledAt: new Date(),
        updatedAt: new Date(),
        sendTime: new Date(),
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
        status: "string",
        archived: true,
        audiences: {
          included: ["Y6nRLr"],
          excluded: ["UTd5ui"],
        },
        sendOptions: {
          useSmartSending: true,
        },
        trackingOptions: {
          isAddUtm: true,
          utmParams: [
            {
              name: "utmMedium",
              value: "campaign",
            },
          ],
          isTrackingClicks: true,
          isTrackingOpens: true,
        },
        sendStrategy: {
          method: "static",
          optionsStatic: {
            datetime: new Date("2022-11-08T00:00:00+00:00"),
            isLocal: true,
            sendPastRecipientsImmediately: true,
          },
          optionsThrottled: {
            datetime: new Date("2024-07-14T01:37:30.052Z"),
            throttlePercentage: 0,
          },
          optionsSto: {
            date: "2024-07-14",
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
          label: "string",
          channel: "string",
          content: {
            subject: "Buy our product!",
            previewText: "My preview text",
            fromEmail: "store@my-company.com",
            fromLabel: "My Company",
            replyToEmail: "reply-to@my-company.com",
            ccEmail: "cc@my-company.com",
            bccEmail: "bcc@my-company.com",
          },
          sendTimes: [
            {
              datetime: new Date("2022-11-08T00:00:00+00:00"),
              isLocal: true,
            },
          ],
          renderOptions: {
            shortenLinks: true,
            addOrgPrefix: true,
            addInfoLink: true,
            addOptOutLanguage: false,
          },
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
          status: "string",
          archived: true,
          audiences: {
            included: ["Y6nRLr"],
            excluded: ["UTd5ui"],
          },
          sendOptions: {
            useSmartSending: true,
          },
          trackingOptions: {
            isAddUtm: true,
            utmParams: [
              {
                name: "utmMedium",
                value: "campaign",
              },
            ],
            isTrackingClicks: true,
            isTrackingOpens: true,
          },
          sendStrategy: {
            method: "static",
            optionsStatic: {
              datetime: new Date("2022-11-08T00:00:00+00:00"),
              isLocal: true,
              sendPastRecipientsImmediately: true,
            },
            optionsThrottled: {
              datetime: new Date("2024-07-14T01:37:30.052Z"),
              throttlePercentage: 0,
            },
            optionsSto: {
              date: "2024-07-14",
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
      first: "string",
      last: "string",
      prev: "string",
      next: "string",
    },
    included: [
      {
        type: "campaign-message",
        id: "string",
        attributes: {
          label: "string",
          channel: "string",
          content: {
            subject: "Buy our product!",
            previewText: "My preview text",
            fromEmail: "store@my-company.com",
            fromLabel: "My Company",
            replyToEmail: "reply-to@my-company.com",
            ccEmail: "cc@my-company.com",
            bccEmail: "bcc@my-company.com",
          },
          sendTimes: [
            {
              datetime: new Date("2022-11-08T00:00:00+00:00"),
              isLocal: true,
            },
          ],
          renderOptions: {
            shortenLinks: true,
            addOrgPrefix: true,
            addInfoLink: true,
            addOptOutLanguage: false,
          },
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
        status: "string",
        archived: true,
        audiences: {
          included: ["Y6nRLr"],
          excluded: ["UTd5ui"],
        },
        sendOptions: {
          useSmartSending: true,
        },
        trackingOptions: {
          isAddUtm: true,
          utmParams: [
            {
              name: "utmMedium",
              value: "campaign",
            },
          ],
          isTrackingClicks: true,
          isTrackingOpens: true,
        },
        sendStrategy: {
          method: "static",
          optionsStatic: {
            datetime: new Date("2022-11-08T00:00:00+00:00"),
            isLocal: true,
            sendPastRecipientsImmediately: true,
          },
          optionsThrottled: {
            datetime: new Date("2024-07-14T01:37:30.052Z"),
            throttlePercentage: 0,
          },
          optionsSto: {
            date: "2024-07-14",
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

export const bulkCreateEventsExamplePayload: { data: string } = {
  data: "Events created successfully.",
};

export const createEventExamplePayload: { data: string } = {
  data: "Event created successfully.",
};

export const getEventExamplePayload: {
  data: GetEventResponseCompoundDocument;
} = {
  data: {
    data: {
      type: "event",
      id: "string",
      attributes: {
        timestamp: 0,
        eventProperties: {},
        datetime: new Date("2022-11-08T01:23:45+00:00"),
        uuid: "string",
      },
      links: {
        self: "string",
      },
      relationships: {
        profile: {
          data: {
            type: "profile",
            id: "string",
          },
          links: {
            self: "string",
            related: "string",
          },
        },
        metric: {
          data: {
            type: "metric",
            id: "string",
          },
          links: {
            self: "string",
            related: "string",
          },
        },
        attributions: {
          data: [
            {
              type: "attribution",
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
        type: "attribution",
        id: "925e385b52fb405715f3616c337cc65c",
        relationships: {
          event: {
            data: {
              type: "event",
              id: "string",
            },
          },
          attributedEvent: {
            data: {
              type: "event",
              id: "string",
            },
          },
          campaign: {
            data: {
              type: "campaign",
              id: "string",
            },
          },
          campaignMessage: {
            data: {
              type: "campaign-message",
              id: "string",
            },
          },
          flow: {
            data: {
              type: "flow",
              id: "string",
            },
          },
          flowMessage: {
            data: {
              type: "flow-message",
              id: "string",
            },
          },
          flowMessageVariation: {
            data: {
              type: "flow-message",
              id: "string",
            },
          },
        },
        links: {
          self: "string",
        },
      },
      {
        type: "metric",
        id: "string",
        attributes: {
          name: "string",
          created: "string",
          updated: "string",
          integration: {},
        },
        links: {
          self: "string",
        },
      },
      {
        type: "profile",
        id: "01GDDKASAP8TKDDA2GRZDSVP4H",
        attributes: {
          email: "sarah.mason@klaviyo-demo.com",
          phoneNumber: "+15005550006",
          externalId: "string",
          firstName: "Sarah",
          lastName: "Mason",
          organization: "Example Corporation",
          locale: "en-US",
          title: "Regional Manager",
          image:
            "https://images.pexels.com/photos/3760854/pexels-photo-3760854.jpeg",
          created: new Date(),
          updated: new Date(),
          lastEventDate: new Date(),
          location: {
            address1: "89 E 42nd St",
            address2: "1st floor",
            city: "New York",
            country: "United States",
            latitude: "string",
            longitude: "string",
            region: "NY",
            zip: "10017",
            timezone: "America/New_York",
            ip: "127.0.0.1",
          },
          properties: {
            pseudonym: "Dr. Octopus",
          },
        },
        links: {
          self: "string",
        },
      },
    ],
  },
};

export const listEventsExamplePayload: {
  data: GetEventResponseCollectionCompoundDocument;
} = {
  data: {
    data: [
      {
        type: "event",
        id: "string",
        attributes: {
          timestamp: 0,
          eventProperties: {},
          datetime: new Date("2022-11-08T01:23:45+00:00"),
          uuid: "string",
        },
        links: {
          self: "string",
        },
        relationships: {
          profile: {
            data: {
              type: "profile",
              id: "string",
            },
            links: {
              self: "string",
              related: "string",
            },
          },
          metric: {
            data: {
              type: "metric",
              id: "string",
            },
            links: {
              self: "string",
              related: "string",
            },
          },
          attributions: {
            data: [
              {
                type: "attribution",
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
      first: "string",
      last: "string",
      prev: "string",
      next: "string",
    },
    included: [
      {
        type: "attribution",
        id: "925e385b52fb405715f3616c337cc65c",
        relationships: {
          event: {
            data: {
              type: "event",
              id: "string",
            },
          },
          attributedEvent: {
            data: {
              type: "event",
              id: "string",
            },
          },
          campaign: {
            data: {
              type: "campaign",
              id: "string",
            },
          },
          campaignMessage: {
            data: {
              type: "campaign-message",
              id: "string",
            },
          },
          flow: {
            data: {
              type: "flow",
              id: "string",
            },
          },
          flowMessage: {
            data: {
              type: "flow-message",
              id: "string",
            },
          },
          flowMessageVariation: {
            data: {
              type: "flow-message",
              id: "string",
            },
          },
        },
        links: {
          self: "string",
        },
      },
      {
        type: "metric",
        id: "string",
        attributes: {
          name: "string",
          created: "string",
          updated: "string",
          integration: {},
        },
        links: {
          self: "string",
        },
      },
      {
        type: "profile",
        id: "01GDDKASAP8TKDDA2GRZDSVP4H",
        attributes: {
          email: "sarah.mason@klaviyo-demo.com",
          phoneNumber: "+15005550006",
          externalId: "string",
          firstName: "Sarah",
          lastName: "Mason",
          organization: "Example Corporation",
          locale: "en-US",
          title: "Regional Manager",
          image:
            "https://images.pexels.com/photos/3760854/pexels-photo-3760854.jpeg",
          created: new Date(),
          updated: new Date(),
          lastEventDate: new Date(),
          location: {
            address1: "89 E 42nd St",
            address2: "1st floor",
            city: "New York",
            country: "United States",
            latitude: "string",
            longitude: "string",
            region: "NY",
            zip: "10017",
            timezone: "America/New_York",
            ip: "127.0.0.1",
          },
          properties: {
            pseudonym: "Dr. Octopus",
          },
        },
        links: {
          self: "string",
        },
      },
    ],
  },
};

export const getImageExamplePayload: { data: GetImageResponse } = {
  data: {
    data: {
      type: "image",
      id: "7",
      attributes: {
        name: "string",
        imageUrl: "string",
        format: "string",
        size: 0,
        hidden: true,
        updatedAt: new Date("2022-11-08T00:00:00+00:00"),
      },
      links: {
        self: "string",
      },
    },
  },
};

export const listImagesExamplePayload: { data: GetImageResponseCollection } = {
  data: {
    data: [
      {
        type: "image",
        id: "7",
        attributes: {
          name: "string",
          imageUrl: "string",
          format: "string",
          size: 0,
          hidden: true,
          updatedAt: new Date("2022-11-08T00:00:00+00:00"),
        },
        links: {
          self: "string",
        },
      },
    ],
    links: {
      self: "string",
      first: "string",
      last: "string",
      prev: "string",
      next: "string",
    },
  },
};

export const updateImageExamplePayload: { data: PatchImageResponse } = {
  data: {
    data: {
      type: "image",
      id: "7",
      attributes: {
        name: "string",
        imageUrl: "string",
        format: "string",
        size: 0,
        hidden: true,
        updatedAt: new Date("2022-11-08T00:00:00+00:00"),
      },
      links: {
        self: "string",
      },
    },
  },
};

export const uploadImageExamplePayload: { data: PostImageResponse } = {
  data: {
    data: {
      type: "image",
      id: "7",
      attributes: {
        name: "string",
        imageUrl: "string",
        format: "string",
        size: 0,
        hidden: true,
        updatedAt: new Date("2022-11-08T00:00:00+00:00"),
      },
      links: {
        self: "string",
      },
    },
  },
};

export const createListExamplePayload: { data: PostListCreateResponse } = {
  data: {
    data: {
      type: "list",
      id: "Y6nRLr",
      attributes: {
        name: "Newsletter",
        created: new Date("2022-11-08T00:00:00+00:00"),
        updated: new Date("2022-11-08T00:00:00+00:00"),
        optInProcess: "double_opt_in",
      },
      relationships: {
        profiles: {
          data: [
            {
              type: "profile",
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

export const deleteListExamplePayload: { data: string } = {
  data: "List deleted successfully.",
};

export const getListExamplePayload: {
  data: GetListRetrieveResponseCompoundDocument;
} = {
  data: {
    data: {
      type: "list",
      id: "Y6nRLr",
      attributes: {
        name: "Newsletter",
        created: new Date("2022-11-08T00:00:00+00:00"),
        updated: new Date("2022-11-08T00:00:00+00:00"),
        optInProcess: "double_opt_in",
        profileCount: 0,
      },
      links: {
        self: "string",
      },
      relationships: {
        profiles: {
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

export const listListProfilesExamplePayload: {
  data: GetListMemberResponseCollection;
} = {
  data: {
    data: [
      {
        type: "profile",
        id: "01GDDKASAP8TKDDA2GRZDSVP4H",
        attributes: {
          email: "sarah.mason@klaviyo-demo.com",
          phoneNumber: "+15005550006",
          externalId: "string",
          firstName: "Sarah",
          lastName: "Mason",
          organization: "Example Corporation",
          locale: "en-US",
          title: "Regional Manager",
          image:
            "https://images.pexels.com/photos/3760854/pexels-photo-3760854.jpeg",
          created: new Date("2022-11-08T00:00:00+00:00"),
          updated: new Date("2022-11-08T00:00:00+00:00"),
          lastEventDate: new Date("2022-11-08T00:00:00+00:00"),
          location: {
            address1: "89 E 42nd St",
            address2: "1st floor",
            city: "New York",
            country: "United States",
            latitude: "string",
            longitude: "string",
            region: "NY",
            zip: "10017",
            timezone: "America/New_York",
            ip: "127.0.0.1",
          },
          properties: {
            pseudonym: "Dr. Octopus",
          },
          joinedGroupAt: new Date("2022-11-08T00:00:00+00:00"),
          subscriptions: {
            email: {
              marketing: {
                canReceiveEmailMarketing: true,
                consent: "SUBSCRIBED",
                consentTimestamp: new Date("2023-02-21T20:07:38+00:00"),
                lastUpdated: new Date("2023-02-21T20:07:38+00:00"),
                method: "PREFERENCE_PAGE",
                methodDetail: "mydomain.com/signup",
                customMethodDetail: "marketing drive",
                doubleOptin: true,
                suppression: [
                  {
                    reason: "HARD_BOUNCE",
                    timestamp: new Date("2023-02-21T20:07:38+00:00"),
                  },
                ],
                listSuppressions: [
                  {
                    listId: "Y6nRLr",
                    reason: "USER_SUPPRESSED",
                    timestamp: new Date("2023-02-21T20:07:38+00:00"),
                  },
                ],
              },
            },
            sms: {
              marketing: {
                canReceiveSmsMarketing: true,
                consent: "SUBSCRIBED",
                consentTimestamp: new Date("2023-02-21T20:07:38+00:00"),
                method: "TEXT",
                methodDetail: "JOIN",
                lastUpdated: new Date("2023-02-21T20:07:38+00:00"),
              },
            },
          },
          predictiveAnalytics: {
            historicClv: 93.87,
            predictedClv: 27.24,
            totalClv: 121.11,
            historicNumberOfOrders: 2,
            predictedNumberOfOrders: 0.54,
            averageDaysBetweenOrders: 189,
            averageOrderValue: 46.94,
            churnProbability: 0.89,
            expectedDateOfNextOrder: new Date("2022-11-08T00:00:00+00:00"),
          },
        },
        links: {
          self: "string",
        },
        relationships: {
          lists: {
            links: {
              self: "string",
              related: "string",
            },
          },
          segments: {
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
      first: "string",
      last: "string",
      prev: "string",
      next: "string",
    },
  },
};

export const listListsExamplePayload: {
  data: GetListListResponseCollectionCompoundDocument;
} = {
  data: {
    data: [
      {
        type: "list",
        id: "Y6nRLr",
        attributes: {
          name: "Newsletter",
          created: new Date("2022-11-08T00:00:00+00:00"),
          updated: new Date("2022-11-08T00:00:00+00:00"),
          optInProcess: "double_opt_in",
        },
        links: {
          self: "string",
        },
        relationships: {
          profiles: {
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
      first: "string",
      last: "string",
      prev: "string",
      next: "string",
    },
    included: [
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

export const updateListExamplePayload: {
  data: PatchListPartialUpdateResponse;
} = {
  data: {
    data: {
      type: "list",
      id: "Y6nRLr",
      attributes: {
        name: "Newsletter",
        created: new Date("2022-11-08T00:00:00+00:00"),
        updated: new Date("2022-11-08T00:00:00+00:00"),
        optInProcess: "double_opt_in",
      },
      relationships: {
        profiles: {
          data: [
            {
              type: "profile",
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

export const createProfileExamplePayload: { data: PostProfileResponse } = {
  data: {
    data: {
      type: "profile",
      id: "01GDDKASAP8TKDDA2GRZDSVP4H",
      attributes: {
        email: "sarah.mason@klaviyo-demo.com",
        phoneNumber: "+15005550006",
        externalId: "string",
        firstName: "Sarah",
        lastName: "Mason",
        organization: "Example Corporation",
        locale: "en-US",
        title: "Regional Manager",
        image:
          "https://images.pexels.com/photos/3760854/pexels-photo-3760854.jpeg",
        created: new Date("2022-11-08T00:00:00+00:00"),
        updated: new Date("2022-11-08T00:00:00+00:00"),
        lastEventDate: new Date("2022-11-08T00:00:00+00:00"),
        location: {
          address1: "89 E 42nd St",
          address2: "1st floor",
          city: "New York",
          country: "United States",
          latitude: "string",
          longitude: "string",
          region: "NY",
          zip: "10017",
          timezone: "America/New_York",
          ip: "127.0.0.1",
        },
        properties: {
          pseudonym: "Dr. Octopus",
        },
        subscriptions: {
          email: {
            marketing: {
              canReceiveEmailMarketing: true,
              consent: "SUBSCRIBED",
              consentTimestamp: new Date("2023-02-21T20:07:38+00:00"),
              lastUpdated: new Date("2023-02-21T20:07:38+00:00"),
              method: "PREFERENCE_PAGE",
              methodDetail: "mydomain.com/signup",
              customMethodDetail: "marketing drive",
              doubleOptin: true,
              suppression: [
                {
                  reason: "HARD_BOUNCE",
                  timestamp: new Date("2023-02-21T20:07:38+00:00"),
                },
              ],
              listSuppressions: [
                {
                  listId: "Y6nRLr",
                  reason: "USER_SUPPRESSED",
                  timestamp: new Date("2023-02-21T20:07:38+00:00"),
                },
              ],
            },
          },
          sms: {
            marketing: {
              canReceiveSmsMarketing: true,
              consent: "SUBSCRIBED",
              consentTimestamp: new Date("2023-02-21T20:07:38+00:00"),
              method: "TEXT",
              methodDetail: "JOIN",
              lastUpdated: new Date("2023-02-21T20:07:38+00:00"),
            },
          },
        },
        predictiveAnalytics: {
          historicClv: 93.87,
          predictedClv: 27.24,
          totalClv: 121.11,
          historicNumberOfOrders: 2,
          predictedNumberOfOrders: 0.54,
          averageDaysBetweenOrders: 189,
          averageOrderValue: 46.94,
          churnProbability: 0.89,
          expectedDateOfNextOrder: new Date("2022-11-08T00:00:00+00:00"),
        },
      },
      relationships: {
        lists: {
          data: [
            {
              type: "list",
              id: "string",
            },
          ],
          links: {
            self: "string",
            related: "string",
          },
        },
        segments: {
          data: [
            {
              type: "segment",
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

export const getProfileExamplePayload: {
  data: GetProfileResponseCompoundDocument;
} = {
  data: {
    data: {
      type: "profile",
      id: "01GDDKASAP8TKDDA2GRZDSVP4H",
      attributes: {
        email: "sarah.mason@klaviyo-demo.com",
        phoneNumber: "+15005550006",
        externalId: "string",
        firstName: "Sarah",
        lastName: "Mason",
        organization: "Example Corporation",
        locale: "en-US",
        title: "Regional Manager",
        image:
          "https://images.pexels.com/photos/3760854/pexels-photo-3760854.jpeg",
        created: new Date("2022-11-08T00:00:00+00:00"),
        updated: new Date("2022-11-08T00:00:00+00:00"),
        lastEventDate: new Date("2022-11-08T00:00:00+00:00"),
        location: {
          address1: "89 E 42nd St",
          address2: "1st floor",
          city: "New York",
          country: "United States",
          latitude: "string",
          longitude: "string",
          region: "NY",
          zip: "10017",
          timezone: "America/New_York",
          ip: "127.0.0.1",
        },
        properties: {
          pseudonym: "Dr. Octopus",
        },
        subscriptions: {
          email: {
            marketing: {
              canReceiveEmailMarketing: true,
              consent: "SUBSCRIBED",
              consentTimestamp: new Date("2023-02-21T20:07:38+00:00"),
              lastUpdated: new Date("2023-02-21T20:07:38+00:00"),
              method: "PREFERENCE_PAGE",
              methodDetail: "mydomain.com/signup",
              customMethodDetail: "marketing drive",
              doubleOptin: true,
              suppression: [
                {
                  reason: "HARD_BOUNCE",
                  timestamp: new Date("2023-02-21T20:07:38+00:00"),
                },
              ],
              listSuppressions: [
                {
                  listId: "Y6nRLr",
                  reason: "USER_SUPPRESSED",
                  timestamp: new Date("2023-02-21T20:07:38+00:00"),
                },
              ],
            },
          },
          sms: {
            marketing: {
              canReceiveSmsMarketing: true,
              consent: "SUBSCRIBED",
              consentTimestamp: new Date("2023-02-21T20:07:38+00:00"),
              method: "TEXT",
              methodDetail: "JOIN",
              lastUpdated: new Date("2023-02-21T20:07:38+00:00"),
            },
          },
        },
        predictiveAnalytics: {
          historicClv: 93.87,
          predictedClv: 27.24,
          totalClv: 121.11,
          historicNumberOfOrders: 2,
          predictedNumberOfOrders: 0.54,
          averageDaysBetweenOrders: 189,
          averageOrderValue: 46.94,
          churnProbability: 0.89,
          expectedDateOfNextOrder: new Date("2022-11-08T00:00:00+00:00"),
        },
      },
      links: {
        self: "string",
      },
      relationships: {
        lists: {
          data: [
            {
              type: "list",
              id: "string",
            },
          ],
          links: {
            self: "string",
            related: "string",
          },
        },
        segments: {
          data: [
            {
              type: "segment",
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
        type: "list",
        id: "Y6nRLr",
        attributes: {
          name: "Newsletter",
          created: new Date("2022-11-08T00:00:00+00:00"),
          updated: new Date("2022-11-08T00:00:00+00:00"),
          optInProcess: "double_opt_in",
        },
        links: {
          self: "string",
        },
      },
      {
        type: "segment",
        id: "string",
        attributes: {
          name: "Repeat Purchasers",
          definition: {
            conditionGroups: [
              {
                conditions: [
                  {
                    type: "profile-group-membership",
                    groupIds: ["string"],
                    timeframeFilter: {
                      type: "date",
                      operator: "after",
                      date: new Date("2022-11-08T00:00:00+00:00"),
                    },
                    isMember: true,
                  },

                  {
                    type: "profile-metric",
                    metricId: "string",
                    measurement: "count",
                    measurementFilter: {
                      type: "numeric",
                      operator: "equals",
                      value: 0,
                    },
                    timeframeFilter: {
                      type: "date",
                      operator: "after",
                      date: new Date("2022-11-08T00:00:00+00:00"),
                    },
                    metricFilters: [
                      {
                        property: "string",
                        filter: {
                          type: "string",
                          operator: "equals",
                          value: "string",
                        },
                      },
                    ],
                  },
                  {
                    type: "profile-marketing-consent",
                    consent: {
                      channel: "email",
                      consentStatus: {
                        subscription: "any",
                      },
                      canReceiveMarketing: true,
                    },
                  },
                  {
                    type: "profile-postal-code-distance",
                    countryCode: "string",
                    postalCode: "string",
                    unit: "kilometers",
                    filter: {
                      type: "numeric",
                      operator: GreaterThanEnum.GreaterThan,
                      value: 0,
                    },
                  },
                  {
                    type: "profile-property",
                    property: "string",
                    filter: {
                      type: "string",
                      operator: "contains",
                      value: "string",
                    },
                  },
                  {
                    type: "profile-region",
                    inRegion: true,
                    region: "european_union",
                  },
                  {
                    type: "profile-predictive-analytics",
                    dimension: "average_days_between_orders",
                    filter: {
                      type: "numeric",
                      operator: "equals",
                      value: 0,
                    },
                  },
                  {
                    type: "profile-predictive-analytics",
                    dimension: "predicted_gender",
                    filter: {
                      type: "string",
                      operator: EqualsEnum.Equals,
                      value: "likely_female",
                    },
                  },
                ],
              },
            ],
          },
          created: new Date("2022-11-08T00:00:00+00:00"),
          updated: new Date("2022-11-08T00:00:00+00:00"),
          isActive: true,
          isProcessing: true,
          isStarred: true,
        },
        links: {
          self: "string",
        },
      },
    ],
  },
};

export const listProfileExamplePayload: {
  data: GetProfileResponseCollectionCompoundDocument;
} = {
  data: {
    data: [
      {
        type: "profile",
        id: "01GDDKASAP8TKDDA2GRZDSVP4H",
        attributes: {
          email: "sarah.mason@klaviyo-demo.com",
          phoneNumber: "+15005550006",
          externalId: "string",
          firstName: "Sarah",
          lastName: "Mason",
          organization: "Example Corporation",
          locale: "en-US",
          title: "Regional Manager",
          image:
            "https://images.pexels.com/photos/3760854/pexels-photo-3760854.jpeg",
          created: new Date("2022-11-08T00:00:00+00:00"),
          updated: new Date("2022-11-08T00:00:00+00:00"),
          lastEventDate: new Date("2022-11-08T00:00:00+00:00"),
          location: {
            address1: "89 E 42nd St",
            address2: "1st floor",
            city: "New York",
            country: "United States",
            latitude: "string",
            longitude: "string",
            region: "NY",
            zip: "10017",
            timezone: "America/New_York",
            ip: "127.0.0.1",
          },
          properties: {
            pseudonym: "Dr. Octopus",
          },
          subscriptions: {
            email: {
              marketing: {
                canReceiveEmailMarketing: true,
                consent: "SUBSCRIBED",
                consentTimestamp: new Date("2023-02-21T20:07:38+00:00"),
                lastUpdated: new Date("2023-02-21T20:07:38+00:00"),
                method: "PREFERENCE_PAGE",
                methodDetail: "mydomain.com/signup",
                customMethodDetail: "marketing drive",
                doubleOptin: true,
                suppression: [
                  {
                    reason: "HARD_BOUNCE",
                    timestamp: new Date("2023-02-21T20:07:38+00:00"),
                  },
                ],
                listSuppressions: [
                  {
                    listId: "Y6nRLr",
                    reason: "USER_SUPPRESSED",
                    timestamp: new Date("2023-02-21T20:07:38+00:00"),
                  },
                ],
              },
            },
            sms: {
              marketing: {
                canReceiveSmsMarketing: true,
                consent: "SUBSCRIBED",
                consentTimestamp: new Date("2023-02-21T20:07:38+00:00"),
                method: "TEXT",
                methodDetail: "JOIN",
                lastUpdated: new Date("2023-02-21T20:07:38+00:00"),
              },
            },
          },
          predictiveAnalytics: {
            historicClv: 93.87,
            predictedClv: 27.24,
            totalClv: 121.11,
            historicNumberOfOrders: 2,
            predictedNumberOfOrders: 0.54,
            averageDaysBetweenOrders: 189,
            averageOrderValue: 46.94,
            churnProbability: 0.89,
            expectedDateOfNextOrder: new Date("2022-11-08T00:00:00+00:00"),
          },
        },
        links: {
          self: "string",
        },
        relationships: {
          lists: {
            links: {
              self: "string",
              related: "string",
            },
          },
          segments: {
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
      first: "string",
      last: "string",
      prev: "string",
      next: "string",
    },
  },
};

export const subscribeProfilesExamplePayload: { data: string } = {
  data: "Profiles subscribed successfully.",
};

export const unsubscribeProfilesExamplePayload: { data: string } = {
  data: "Profiles unsubscribed successfully.",
};

export const updateProfileExamplePayload: {
  data: PatchProfileResponse;
} = {
  data: {
    data: {
      type: "profile",
      id: "01GDDKASAP8TKDDA2GRZDSVP4H",
      attributes: {
        email: "sarah.mason@klaviyo-demo.com",
        phoneNumber: "+15005550006",
        externalId: "string",
        firstName: "Sarah",
        lastName: "Mason",
        organization: "Example Corporation",
        locale: "en-US",
        title: "Regional Manager",
        image:
          "https://images.pexels.com/photos/3760854/pexels-photo-3760854.jpeg",
        created: new Date("2022-11-08T00:00:00+00:00"),
        updated: new Date("2022-11-08T00:00:00+00:00"),
        lastEventDate: new Date("2022-11-08T00:00:00+00:00"),
        location: {
          address1: "89 E 42nd St",
          address2: "1st floor",
          city: "New York",
          country: "United States",
          latitude: "string",
          longitude: "string",
          region: "NY",
          zip: "10017",
          timezone: "America/New_York",
          ip: "127.0.0.1",
        },
        properties: {
          pseudonym: "Dr. Octopus",
        },
        subscriptions: {
          email: {
            marketing: {
              canReceiveEmailMarketing: true,
              consent: "SUBSCRIBED",
              consentTimestamp: new Date("2023-02-21T20:07:38+00:00"),
              lastUpdated: new Date("2023-02-21T20:07:38+00:00"),
              method: "PREFERENCE_PAGE",
              methodDetail: "mydomain.com/signup",
              customMethodDetail: "marketing drive",
              doubleOptin: true,
              suppression: [
                {
                  reason: "HARD_BOUNCE",
                  timestamp: new Date("2023-02-21T20:07:38+00:00"),
                },
              ],
              listSuppressions: [
                {
                  listId: "Y6nRLr",
                  reason: "USER_SUPPRESSED",
                  timestamp: new Date("2023-02-21T20:07:38+00:00"),
                },
              ],
            },
          },
          sms: {
            marketing: {
              canReceiveSmsMarketing: true,
              consent: "SUBSCRIBED",
              consentTimestamp: new Date("2023-02-21T20:07:38+00:00"),
              method: "TEXT",
              methodDetail: "JOIN",
              lastUpdated: new Date("2023-02-21T20:07:38+00:00"),
            },
          },
        },
        predictiveAnalytics: {
          historicClv: 93.87,
          predictedClv: 27.24,
          totalClv: 121.11,
          historicNumberOfOrders: 2,
          predictedNumberOfOrders: 0.54,
          averageDaysBetweenOrders: 189,
          averageOrderValue: 46.94,
          churnProbability: 0.89,
          expectedDateOfNextOrder: new Date("2022-11-08T00:00:00+00:00"),
        },
      },
      relationships: {
        lists: {
          data: [
            {
              type: "list",
              id: "string",
            },
          ],
          links: {
            self: "string",
            related: "string",
          },
        },
        segments: {
          data: [
            {
              type: "segment",
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

export const createSegmentExamplePayload: { data: PostSegmentCreateResponse } =
  {
    data: {
      data: {
        type: "segment",
        id: "string",
        attributes: {
          name: "Repeat Purchasers",
          definition: {
            conditionGroups: [
              {
                conditions: [
                  {
                    type: "profile-group-membership",
                    groupIds: ["string"],
                    timeframeFilter: {
                      type: "date",
                      operator: "after",
                      date: new Date("2022-11-08T00:00:00+00:00"),
                    },
                    isMember: true,
                  },
                  {
                    type: "profile-metric",
                    metricId: "string",
                    measurement: "count",
                    measurementFilter: {
                      type: "numeric",
                      operator: "equals",
                      value: 0,
                    },
                    timeframeFilter: {
                      type: "date",
                      operator: "after",
                      date: new Date("2022-11-08T00:00:00+00:00"),
                    },
                    metricFilters: [
                      {
                        property: "string",
                        filter: {
                          type: "string",
                          operator: "equals",
                          value: "string",
                        },
                      },
                    ],
                  },
                  {
                    type: "profile-marketing-consent",
                    consent: {
                      channel: "email",
                      consentStatus: {
                        subscription: "any",
                      },
                      canReceiveMarketing: true,
                    },
                  },
                  {
                    type: "profile-postal-code-distance",
                    countryCode: "string",
                    postalCode: "string",
                    unit: "kilometers",
                    filter: {
                      type: "numeric",
                      operator: GreaterThanEnum.GreaterThan,
                      value: 0,
                    },
                  },
                  {
                    type: "profile-property",
                    property: "string",
                    filter: {
                      type: "string",
                      operator: "contains",
                      value: "string",
                    },
                  },
                  {
                    type: "profile-region",
                    inRegion: true,
                    region: "european_union",
                  },
                  {
                    type: "profile-predictive-analytics",
                    dimension: "average_days_between_orders",
                    filter: {
                      type: "numeric",
                      operator: "equals",
                      value: 0,
                    },
                  },
                  {
                    type: "profile-predictive-analytics",
                    dimension: "predicted_gender",
                    filter: {
                      type: "string",
                      operator: EqualsEnum.Equals,
                      value: "likely_female",
                    },
                  },
                ],
              },
            ],
          },
          created: new Date("2022-11-08T00:00:00+00:00"),
          updated: new Date("2022-11-08T00:00:00+00:00"),
          isActive: true,
          isProcessing: true,
          isStarred: true,
        },
        relationships: {
          profiles: {
            data: [
              {
                type: "profile",
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

export const deleteSegmentExamplePayload: { data: string } = {
  data: "Segment deleted successfully.",
};

export const getSegmentExamplePayload: {
  data: GetSegmentRetrieveResponseCompoundDocument;
} = {
  data: {
    data: {
      type: "segment",
      id: "string",
      attributes: {
        name: "Repeat Purchasers",
        definition: {
          conditionGroups: [
            {
              conditions: [
                {
                  type: "profile-group-membership",
                  groupIds: ["string"],
                  timeframeFilter: {
                    type: "date",
                    operator: "after",
                    date: new Date("2022-11-08T00:00:00+00:00"),
                  },
                  isMember: true,
                },
                {
                  type: "profile-metric",
                  metricId: "string",
                  measurement: "count",
                  measurementFilter: {
                    type: "numeric",
                    operator: "equals",
                    value: 0,
                  },
                  timeframeFilter: {
                    type: "date",
                    operator: "after",
                    date: new Date("2022-11-08T00:00:00+00:00"),
                  },
                  metricFilters: [
                    {
                      property: "string",
                      filter: {
                        type: "string",
                        operator: "equals",
                        value: "string",
                      },
                    },
                  ],
                },
                {
                  type: "profile-marketing-consent",
                  consent: {
                    channel: "email",
                    consentStatus: {
                      subscription: "any",
                    },
                    canReceiveMarketing: true,
                  },
                },
                {
                  type: "profile-postal-code-distance",
                  countryCode: "string",
                  postalCode: "string",
                  unit: "kilometers",
                  filter: {
                    type: "numeric",
                    operator: GreaterThanEnum.GreaterThan,
                    value: 0,
                  },
                },
                {
                  type: "profile-property",
                  property: "string",
                  filter: {
                    type: "string",
                    operator: "contains",
                    value: "string",
                  },
                },
                {
                  type: "profile-region",
                  inRegion: true,
                  region: "european_union",
                },
                {
                  type: "profile-predictive-analytics",
                  dimension: "average_days_between_orders",
                  filter: {
                    type: "numeric",
                    operator: "equals",
                    value: 0,
                  },
                },
                {
                  type: "profile-predictive-analytics",
                  dimension: "predicted_gender",
                  filter: {
                    type: "string",
                    operator: EqualsEnum.Equals,
                    value: "likely_female",
                  },
                },
              ],
            },
          ],
        },
        created: new Date("2022-11-08T00:00:00+00:00"),
        updated: new Date("2022-11-08T00:00:00+00:00"),
        isActive: true,
        isProcessing: true,
        isStarred: true,
        profileCount: 0,
      },
      links: {
        self: "string",
      },
      relationships: {
        profiles: {
          links: {
            self: "string",
            related: "string",
          },
        },
        tags: {
          data: [
            {
              type: "tag",
              id: "abcd1234-ef56-gh78-ij90-abcdef123456",
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

export const listSegmentsExamplePayload: {
  data: GetSegmentListResponseCollectionCompoundDocument;
} = {
  data: {
    data: [
      {
        type: "segment",
        id: "string",
        attributes: {
          name: "Repeat Purchasers",
          definition: {
            conditionGroups: [
              {
                conditions: [
                  {
                    type: "profile-group-membership",
                    groupIds: ["string"],
                    timeframeFilter: {
                      type: "date",
                      operator: "after",
                      date: new Date("2022-11-08T00:00:00+00:00"),
                    },
                    isMember: true,
                  },
                  {
                    type: "profile-metric",
                    metricId: "string",
                    measurement: "count",
                    measurementFilter: {
                      type: "numeric",
                      operator: "equals",
                      value: 0,
                    },
                    timeframeFilter: {
                      type: "date",
                      operator: "after",
                      date: new Date("2022-11-08T00:00:00+00:00"),
                    },
                    metricFilters: [
                      {
                        property: "string",
                        filter: {
                          type: "string",
                          operator: "equals",
                          value: "string",
                        },
                      },
                    ],
                  },
                  {
                    type: "profile-marketing-consent",
                    consent: {
                      channel: "email",
                      consentStatus: {
                        subscription: "any",
                      },
                      canReceiveMarketing: true,
                    },
                  },
                  {
                    type: "profile-postal-code-distance",
                    countryCode: "string",
                    postalCode: "string",
                    unit: "kilometers",
                    filter: {
                      type: "numeric",
                      operator: GreaterThanEnum.GreaterThan,
                      value: 0,
                    },
                  },
                  {
                    type: "profile-property",
                    property: "string",
                    filter: {
                      type: "string",
                      operator: "contains",
                      value: "string",
                    },
                  },
                  {
                    type: "profile-region",
                    inRegion: true,
                    region: "european_union",
                  },
                  {
                    type: "profile-predictive-analytics",
                    dimension: "average_days_between_orders",
                    filter: {
                      type: "numeric",
                      operator: "equals",
                      value: 0,
                    },
                  },
                  {
                    type: "profile-predictive-analytics",
                    dimension: "predicted_gender",
                    filter: {
                      type: "string",
                      operator: EqualsEnum.Equals,
                      value: "likely_female",
                    },
                  },
                ],
              },
            ],
          },
          created: new Date("2022-11-08T00:00:00+00:00"),
          updated: new Date("2022-11-08T00:00:00+00:00"),
          isActive: true,
          isProcessing: true,
          isStarred: true,
        },
        links: {
          self: "string",
        },
        relationships: {
          profiles: {
            links: {
              self: "string",
              related: "string",
            },
          },
          tags: {
            data: [
              {
                type: "tag",
                id: "abcd1234-ef56-gh78-ij90-abcdef123456",
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
      first: "string",
      last: "string",
      prev: "string",
      next: "string",
    },
    included: [
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

export const updateSegmentExamplePayload: {
  data: PatchSegmentPartialUpdateResponse;
} = {
  data: {
    data: {
      type: "segment",
      id: "string",
      attributes: {
        name: "Repeat Purchasers",
        definition: {
          conditionGroups: [
            {
              conditions: [
                {
                  type: "profile-group-membership",
                  groupIds: ["string"],
                  timeframeFilter: {
                    type: "date",
                    operator: "after",
                    date: new Date("2022-11-08T00:00:00+00:00"),
                  },
                  isMember: true,
                },
                {
                  type: "profile-metric",
                  metricId: "string",
                  measurement: "count",
                  measurementFilter: {
                    type: "numeric",
                    operator: "equals",
                    value: 0,
                  },
                  timeframeFilter: {
                    type: "date",
                    operator: "after",
                    date: new Date("2022-11-08T00:00:00+00:00"),
                  },
                  metricFilters: [
                    {
                      property: "string",
                      filter: {
                        type: "string",
                        operator: "equals",
                        value: "string",
                      },
                    },
                  ],
                },
                {
                  type: "profile-marketing-consent",
                  consent: {
                    channel: "email",
                    consentStatus: {
                      subscription: "any",
                    },
                    canReceiveMarketing: true,
                  },
                },
                {
                  type: "profile-postal-code-distance",
                  countryCode: "string",
                  postalCode: "string",
                  unit: "kilometers",
                  filter: {
                    type: "numeric",
                    operator: GreaterThanEnum.GreaterThan,
                    value: 0,
                  },
                },
                {
                  type: "profile-property",
                  property: "string",
                  filter: {
                    type: "string",
                    operator: "contains",
                    value: "string",
                  },
                },
                {
                  type: "profile-region",
                  inRegion: true,
                  region: "european_union",
                },
                {
                  type: "profile-predictive-analytics",
                  dimension: "average_days_between_orders",
                  filter: {
                    type: "numeric",
                    operator: "equals",
                    value: 0,
                  },
                },
                {
                  type: "profile-predictive-analytics",
                  dimension: "predicted_gender",
                  filter: {
                    type: "string",
                    operator: EqualsEnum.Equals,
                    value: "likely_female",
                  },
                },
              ],
            },
          ],
        },
        created: new Date("2022-11-08T00:00:00+00:00"),
        updated: new Date("2022-11-08T00:00:00+00:00"),
        isActive: true,
        isProcessing: true,
        isStarred: true,
      },
      relationships: {
        profiles: {
          data: [
            {
              type: "profile",
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

export const createTemplateExamplePayload: { data: PostTemplateResponse } = {
  data: {
    data: {
      type: "template",
      id: "string",
      attributes: {
        name: "string",
        editorType: "string",
        html: "string",
        text: "string",
        created: new Date("2022-11-08T00:00:00+00:00"),
        updated: new Date("2022-11-08T00:00:00+00:00"),
      },
      links: {
        self: "string",
      },
    },
  },
};

export const deleteTemplateExamplePayload: { data: string } = {
  data: "Template deleted successfully.",
};

export const getTemplateExamplePayload: { data: GetTemplateResponse } = {
  data: {
    data: {
      type: "template",
      id: "string",
      attributes: {
        name: "string",
        editorType: "string",
        html: "string",
        text: "string",
        created: new Date("2022-11-08T00:00:00+00:00"),
        updated: new Date("2022-11-08T00:00:00+00:00"),
      },
      links: {
        self: "string",
      },
    },
  },
};

export const listTemplatesExamplePayload: {
  data: GetTemplateResponseCollection;
} = {
  data: {
    data: [
      {
        type: "template",
        id: "string",
        attributes: {
          name: "string",
          editorType: "string",
          html: "string",
          text: "string",
          created: new Date("2022-11-08T00:00:00+00:00"),
          updated: new Date("2022-11-08T00:00:00+00:00"),
        },
        links: {
          self: "string",
        },
      },
    ],
    links: {
      self: "string",
      first: "string",
      last: "string",
      prev: "string",
      next: "string",
    },
  },
};

export const updateTemplateExamplePayload: { data: PatchTemplateResponse } = {
  data: {
    data: {
      type: "template",
      id: "string",
      attributes: {
        name: "string",
        editorType: "string",
        html: "string",
        text: "string",
        created: new Date("2022-11-08T00:00:00+00:00"),
        updated: new Date("2022-11-08T00:00:00+00:00"),
      },
      links: {
        self: "string",
      },
    },
  },
};
