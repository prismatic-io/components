export const getSpaceExamplePayload = {
  sys: {
    type: "Space",
    id: "yadj1kx9rmg0",
    version: 3,
    organization: {
      sys: {
        id: "0D9ZC8rLWiw6x5qizZGiRs",
        type: "Link",
        linkType: "Organization",
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
  name: "Contentful Example API",
};

export const listSpacesExamplePayload = [getSpaceExamplePayload];

export const createSpaceExamplePayload = getSpaceExamplePayload;

export const updateSpaceExamplePayload = getSpaceExamplePayload;
