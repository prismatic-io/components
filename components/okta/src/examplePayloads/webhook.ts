






export const getEventHookExamplePayload = {
  data: {
    id: "who8tsqyrhCdmetzx135",
    status: "ACTIVE",
    verificationStatus: "VERIFIED",
    name: "Event Hook Test",
    description: null,
    created: "2023-07-07T17:41:56.000Z",
    createdBy: "00u7xut94qEWYx5ss1e5",
    lastUpdated: "2023-07-07T17:43:03.000Z",
    events: {
      type: "EVENT_TYPE",
      items: ["user.lifecycle.deactivate", "user.lifecycle.activate"],
      filter: null,
    },
    channel: {
      type: "HTTP",
      version: "1.0.0",
      config: {
        uri: "https://example_external_service/userDeactivate",
        headers: [],
        method: "POST",
        authScheme: {
          type: "HEADER",
          key: "authorization",
        },
      },
    },
    _links: {
      self: {
        href: "https://example.com/api/v1/eventHooks/who8tsqyrhCdmetzx135",
      },
      verify: {
        href: "https://example.com/api/v1/eventHooks/who8tsqyrhCdmetzx135/lifecycle/verify",
        hints: {
          allow: ["POST"],
        },
      },
      deactivate: {
        href: "https://example.com/api/v1/eventHooks/who8tsqyrhCdmetzx135/lifecycle/deactivate",
        hints: {
          allow: ["POST"],
        },
      },
    },
  },
};

export const createEventHookExamplePayload = getEventHookExamplePayload;

export const listEventHooksExamplePayload = {
  data: [
    getEventHookExamplePayload.data,
    {
      id: "who8vt36qfNpCGz9H1e6",
      status: "ACTIVE",
      verificationStatus: "VERIFIED",
      name: "Event Hook with Filter",
      description: "An event hook using an Okta Expression Language filter",
      created: "2023-07-07T13:41:56.000Z",
      createdBy: "00u7xut94qEWYx5ss1e5",
      lastUpdated: "2023-07-07T13:43:03.000Z",
      events: {
        type: "EVENT_TYPE",
        items: ["group.user_membership.add"],
        filter: {
          type: "EXPRESSION_LANGUAGE",
          eventFilterMap: [
            {
              event: "group.user_membership.add",
              condition: {
                version: null,
                expression:
                  "event.target.?[type eq 'UserGroup'].size()>0 && event.target.?[displayName eq 'Sales'].size()>0",
              },
            },
          ],
        },
      },
      channel: {
        type: "HTTP",
        version: "1.0.0",
        config: {
          uri: "https://example_external_service/userAdded",
          headers: [],
          method: "POST",
          authScheme: {
            type: "HEADER",
            key: "authorization",
          },
        },
      },
      _links: {
        self: {
          href: "https://example.com/api/v1/eventHooks/who8tsqyrhCdmetzx1e6",
        },
        verify: {
          href: "https://example.com/api/v1/eventHooks/who8tsqyrhCdmetzx1e6/lifecycle/verify",
          hints: {
            allow: ["POST"],
          },
        },
        deactivate: {
          href: "https://example.com/api/v1/eventHooks/who8tsqyrhCdmetzx1e6/lifecycle/deactivate",
          hints: {
            allow: ["POST"],
          },
        },
      },
    },
  ],
};

export const deleteEventHookExamplePayload = {
  data: {
    id: "who8tsqyrhCdmetzx135",
    deleted: true,
  },
};

export const deleteAllEventHooksExamplePayload = {
  data: [deleteEventHookExamplePayload.data],
};

export const activateEventHookExamplePayload = getEventHookExamplePayload;

export const deactivateEventHookExamplePayload = getEventHookExamplePayload;

export const verifyEventHookExamplePayload = getEventHookExamplePayload;
