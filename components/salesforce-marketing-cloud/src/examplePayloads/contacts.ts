export const getContactExamplePayload = {
  data: {
    contactID: 123456789,
    contactType: "Default",
    contactKey: "user@example.com",
    contactStatus: "Active",
    modifiedDate: "2024-02-08T06:35:03.6",
  },
};

export const createContactExamplePayload = {
  data: {
    contactID: 123456790,
    contactKey: "subscriber-002",
    contactStatus: "active",
    isNewContactKey: true,
    modifiedDate: "2024-02-01T10:30:00.000Z",
  },
};

export const updateContactExamplePayload = getContactExamplePayload;

export const searchContactsExamplePayload = {
  data: {
    count: 1,
    page: 1,
    pageSize: 50,
    items: [
      {
        contactKey: "user@example.com",
        contactID: 123456789,
      },
    ],
  },
};

export const searchContactsByEmailExamplePayload = searchContactsExamplePayload;

export const deleteContactExamplePayload = {
  data: {
    operationID: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    operationInitiated: true,
  },
};

export const getContactSchemaExamplePayload = {
  data: {
    item: {
      schemaID: "470d62a6-cd47-e811-80ce-1402ec819e1d",
      enterpriseID: 10001,
      availableBusinessUnits: [10001],
      version: 123,
      isModelOwner: true,
      schemaType: "Contacts",
      links: {
        attributeGroups: {
          href: "/v1//attributeGroups",
        },
        attributeSetDefinitions: {
          href: "/v1//attributeSetDefinitions",
        },
      },
      objectState: "Created",
    },
    links: {
      schema: {
        href: "/v1/schema",
      },
    },
    requestServiceMessageID: "bc7d6a11-5b3d-4863-b8e5-6d6a18d36982",
    responseDateTime: "2026-02-16T20:30:00.7390062-06:00",
    resultMessages: [],
    serviceMessageID: "960ce7b7-ed05-4889-b83e-f4d1ff528134",
  },
};
