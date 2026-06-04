export const publishBulkActionExamplePayload = {
  sys: {
    id: "2OBWQpv6VaT1rZZXJ4nT3h",
    type: "BulkAction",
    status: "succeeded",
    createdBy: {
      sys: {
        type: "Link",
        linkType: "User",
        id: "7BslKh9TdKGOK41VmLDjFZ",
      },
    },
    createdAt: "2020-01-01T13:00:00.000Z",
    updatedAt: "2020-01-01T13:00:00.000Z",
    space: {
      sys: {
        type: "Link",
        id: "yadj1kx9rmg0",
      },
    },
    environment: {
      sys: {
        type: "Link",
        id: "staging",
      },
    },
  },
  action: "publish",
  payload: {
    entities: {
      items: [
        {
          sys: {
            id: "5KsDBWseXY6QegucYAoacS",
            type: "Link",
            linkType: "Entry",
            version: 1,
          },
        },
      ],
    },
  },
  error: null,
};

export const unpublishBulkActionExamplePayload =
  publishBulkActionExamplePayload;

export const getBulkActionExamplePayload = {
  sys: {
    id: "2OBWQpv6VaT1rZZXJ4nT3h",
    type: "BulkAction",
    status: "succeeded",
    createdBy: {
      sys: {
        type: "Link",
        linkType: "User",
        id: "7BslKh9TdKGOK41VmLDjFZ",
      },
    },
    createdAt: "2020-01-01T13:00:00.000Z",
    updatedAt: "2020-01-01T13:00:00.000Z",
    space: {
      sys: {
        type: "Link",
        linkType: "Space",
        id: "yadj1kx9rmg0",
      },
    },
    environment: {
      sys: {
        type: "Link",
        linkType: "Environment",
        id: "staging",
      },
    },
  },
  action: "publish",
  payload: {
    entities: {
      items: [
        {
          sys: {
            id: "5KsDBWseXY6QegucYAoacS",
            type: "Link",
            linkType: "Entry",
            version: 1,
          },
        },
      ],
    },
  },
  error: null,
};
