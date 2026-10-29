import type {
  GetListListResponseCollectionCompoundDocument,
  GetListMemberResponseCollection,
  GetListRetrieveResponseCompoundDocument,
  PatchListPartialUpdateResponse,
  PostListCreateResponse,
} from "klaviyo-api";
export const createListExamplePayload: {
  data: PostListCreateResponse;
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
export const deleteListExamplePayload: {
  data: string;
} = {
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
export const selectListExamplePayload = {
  result: [{ label: "Example List", key: "RE83th" }],
};
