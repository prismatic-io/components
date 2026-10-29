import type {
  GetProfileResponseCollection,
  GetProfileResponsePluralConversationsCompoundDocument,
  PatchProfileResponse,
  PostProfileResponse,
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

const pollProfileAndListChangesTriggerBody: {
  data: { created: KlaviyoRecord[]; updated: KlaviyoRecord[] };
} = {
  data: {
    created: [
      {
        type: "profile",
        id: "01GDDKASAP8TKDDA2GRZDSVP4H",
        attributes: {
          email: "sarah.mason@klaviyo-demo.com",
          phoneNumber: "+15005550006",
          externalId: "ext-profile-001",
          firstName: "Sarah",
          lastName: "Mason",
          organization: "Example Corporation",
          locale: "en-US",
          title: "Regional Manager",
          created: "2026-06-15T10:30:00+00:00",
          updated: "2026-06-15T10:30:00+00:00",
          lastEventDate: "2026-06-15T10:30:00+00:00",
          location: {
            address1: "89 E 42nd St",
            address2: "1st floor",
            city: "New York",
            country: "United States",
            region: "NY",
            zip: "10017",
            timezone: "America/New_York",
          },
          properties: {},
        },
        links: {
          self: "https://a.klaviyo.com/api/profiles/01GDDKASAP8TKDDA2GRZDSVP4H",
        },
      },
    ],
    updated: [
      {
        type: "profile",
        id: "01GDDKBSAP9TKDDA3GRZDSVP5J",
        attributes: {
          email: "john.doe@example.com",
          phoneNumber: "+15005550007",
          externalId: "ext-profile-002",
          firstName: "John",
          lastName: "Doe",
          organization: "Acme Inc",
          locale: "en-US",
          title: "Software Engineer",
          created: "2026-05-01T08:00:00+00:00",
          updated: "2026-06-15T11:45:00+00:00",
          lastEventDate: "2026-06-15T11:45:00+00:00",
          location: {
            address1: "100 Main St",
            city: "San Francisco",
            country: "United States",
            region: "CA",
            zip: "94105",
            timezone: "America/Los_Angeles",
          },
          properties: {
            plan: "enterprise",
          },
        },
        links: {
          self: "https://a.klaviyo.com/api/profiles/01GDDKBSAP9TKDDA3GRZDSVP5J",
        },
      },
    ],
  },
};

export const pollProfileAndListChangesTriggerExamplePayload: {
  payload: TriggerPayload;
} = {
  payload: {
    ...triggerPayloadEnvelope,
    body: pollProfileAndListChangesTriggerBody,
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
  data: GetProfileResponsePluralConversationsCompoundDocument;
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
                      operator: "greater-than",
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
                      operator: "equals",
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
  data: GetProfileResponseCollection;
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

export const selectProfileExamplePayload = {
  result: [
    { label: "jane.doe@example.com", key: "01HPROFILE0123456789ABCDEF" },
  ],
};
