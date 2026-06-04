export const getWorkerBusinessTitleChangesExamplePayload = {
  data: {
    data: [
      {
        currentBusinessTitle:
          "Lorem ipsum dolor sit amet, cum choro singulis consectetuer ut, ubique iisque contentiones ex duo. Quo lorem etiam eu.",
        proposedBusinessTitle:
          "Lorem ipsum dolor sit amet, cum choro singulis consectetuer ut, ubique iisque contentiones ex duo. Quo lorem etiam eu.",
        effective: "2024-06-01T07:00:00.000Z",
        due: "2024-06-01T07:00:00.000Z",
        initiated: "2024-06-01T07:00:00.000Z",
        initiator: {
          id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
          descriptor: "string",
          href: "string",
        },
        subject: {
          id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
          descriptor: "string",
          href: "string",
        },
        id: "string",
        href: "string",
        descriptor: "Lorem ipsum dolor sit ame",
      },
    ],
    total: 0,
  },
};

export const postWorkerBusinessTitleChangeExamplePayload = {
  data: {
    proposedBusinessTitle:
      "Lorem ipsum dolor sit amet, cum choro singulis consectetuer ut, ubique iisque contentiones ex duo. Quo lorem etiam eu.",
    id: "string",
    href: "string",
    descriptor: "Lorem ipsum dolor sit ame",
  },
};

export const postJobChangesExamplePayload = {
  data: {
    supervisoryOrganization: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
      descriptor: "string",
      href: "string",
    },
    jobChangeReason: {
      id: "^(?:(?:[0-9a-f]{32})|(?:[0-9]+\\$[0-9]+)|(\\S+=\\S+))$",
      descriptor: "string",
      href: "string",
    },
    moveManagersTeam: true,
    effective: "2024-06-01T07:00:00.000Z",
    proposedOrganizations: [
      {
        id: "string",
        href: "string",
        descriptor: "Lorem ipsum dolor sit ame",
      },
    ],
    id: "string",
    href: "string",
    descriptor: "Lorem ipsum dolor sit ame",
  },
};

export const listOrganizationsExamplePayload = {
  data: {
    data: [
      {
        descriptor: "Lorem ipsum dolor sit ame",
        href: "string",
        id: "string",
      },
    ],
    total: 0,
  },
};

export const getOrganizationByIdExamplePayload = {
  data: {
    descriptor: "Lorem ipsum dolor sit ame",
    href: "string",
    id: "string",
  },
};

export const getCustomerByIdExamplePayload = {
  data: {
    name: "Lorem ipsum dolor sit amet, cum choro singulis consectetuer ut, ubique iisque contentiones ex duo. Quo lorem etiam eu.",
    id: "string",
    descriptor: "Lorem ipsum dolor sit ame",
  },
};
