export const createEntryExamplePayload = {
  data: {
    fields: {
      title: {
        "en-US": "Hello, World!",
      },
      body: {
        "en-US": "Bacon is healthy!",
      },
    },
    metadata: {
      tags: [
        {
          sys: {
            type: "Link",
            linkType: "Tag",
            id: "nyCampaign",
          },
        },
      ],
    },
    sys: {
      id: "5KsDBWseXY6QegucYAoacS",
      type: "Entry",
      contentType: {
        sys: {
          type: "Link",
          linkType: "ContentType",
          id: "hfM9RCJIk0wIm06WkEOQY",
        },
      },
      version: 1,
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
      createdAt: "2015-05-18T11:29:46.809Z",
      createdBy: {
        sys: {
          type: "Link",
          linkType: "User",
          id: "7BslKh9TdKGOK41VmLDjFZ",
        },
      },
      updatedAt: "2015-05-18T11:29:46.809Z",
      updatedBy: {
        sys: {
          type: "Link",
          linkType: "User",
          id: "4FLrUHftHW3v2BLi9fzfjU",
        },
      },
    },
  },
};
export const updateEntryExamplePayload = {
  data: createEntryExamplePayload.data,
};
export const putEntryExamplePayload = {
  data: createEntryExamplePayload.data,
};
export const patchEntryExamplePayload = {
  data: createEntryExamplePayload.data,
};
export const archiveEntryExamplePayload = {
  data: createEntryExamplePayload.data,
};
export const unarchiveEntryExamplePayload = {
  data: createEntryExamplePayload.data,
};
export const listEntriesExamplePayload = {
  data: [createEntryExamplePayload.data],
};
export const listPublishedEntriesExamplePayload = {
  data: listEntriesExamplePayload.data,
};
export const getEntryExamplePayload = {
  data: createEntryExamplePayload.data,
};
export const publishEntryExamplePayload = {
  data: {
    fields: {
      title: {
        "en-US": "Hello, World!",
      },
      body: {
        "en-US": "Bacon is healthy!",
      },
    },
    metadata: {
      tags: [
        {
          sys: {
            type: "Link",
            linkType: "Tag",
            id: "nyCampaign",
          },
        },
      ],
    },
    sys: {
      firstPublishedAt: "2015-05-15T13:38:11.311Z",
      publishedCounter: 2,
      publishedAt: "2015-05-15T13:38:11.311Z",
      publishedBy: {
        sys: {
          type: "Link",
          linkType: "User",
          id: "4FLrUHftHW3v2BLi9fzfjU",
        },
      },
      publishedVersion: 9,
    },
  },
};
export const unpublishEntryExamplePayload = {
  data: {
    fields: {
      title: {
        "en-US": "Hello, World!",
      },
      body: {
        "en-US": "Bacon is healthy!",
      },
    },
    metadata: {
      tags: [
        {
          sys: {
            type: "Link",
            linkType: "Tag",
            id: "nyCampaign",
          },
        },
      ],
    },
  },
};
export const deleteEntryExamplePayload = { data: {} };
