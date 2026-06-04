export const getOrganizationExamplePayload = {
  sys: {
    type: "Organization",
    id: "0D9ZC8rLWiw6x5qizZGiRs",
    version: 1,
    createdAt: "2015-05-18T11:29:46.809Z",
    updatedAt: "2015-05-18T11:29:46.809Z",
  },
  name: "My organization",
};

export const listOrganizationsExamplePayload = [getOrganizationExamplePayload];

export const updateOrganizationExamplePayload = {
  email: "example@gmail.com",
  sys: {
    type: "Security Contact",
    id: "srdfsguf8325yusf24",
    version: "1",
    organization: {
      sys: {
        id: "0D9ZC8rLWiw6x5qizZGiRs",
        type: "Link",
        linkType: "Organization",
      },
    },
    createdBy: {
      sys: {
        id: "1xGZIRXr2WPnsLkKfREo0z",
        type: "Link",
        linkType: "User",
      },
    },
    updatedBy: {
      sys: {
        id: "1xGZIRXr2WPnsLkKfREo0z",
        type: "Link",
        linkType: "User",
      },
    },
    createdAt: "2019-05-18T11:39:46.809Z",
    updatedAt: "2019-05-18T11:39:46.809Z",
  },
};
