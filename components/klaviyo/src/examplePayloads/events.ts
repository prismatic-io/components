import type {
  GetEventResponseCollectionCompoundDocument,
  GetEventResponseCompoundDocument,
} from "klaviyo-api";
export const bulkCreateEventsExamplePayload: {
  data: string;
} = {
  data: "Events created successfully.",
};
export const createEventExamplePayload: {
  data: string;
} = {
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
          created: new Date("2026-10-01T00:00:00+00:00"),
          updated: new Date("2026-10-01T00:00:00+00:00"),
          lastEventDate: new Date("2026-10-01T00:00:00+00:00"),
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
          created: new Date("2026-10-01T00:00:00+00:00"),
          updated: new Date("2026-10-01T00:00:00+00:00"),
          lastEventDate: new Date("2026-10-01T00:00:00+00:00"),
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
export const selectEventExamplePayload = {
  result: [{ label: "Placed Order", key: "01HABCDEF0123456789EVENT01" }],
};
