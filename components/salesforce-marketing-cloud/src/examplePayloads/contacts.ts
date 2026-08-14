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
    operationStatus: "OK",
    rowsAffetcted: 1,
    contactKey: "acruz@example.com",
    contactId: 12345678,
    contactTypeID: 0,
    isNewContactKey: false,
    requestServiceMessageID: "8b51b524-28c1-46fc-9a44-02fca5b0a08c",
    hasErrors: false,
    resultMessages: [],
    serviceMessageID: "80676c59-ceb9-48aa-ad35-81e150094a17",
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
export const searchContactsByEmailExamplePayload = {
  data: {
    channelAddressResponseEntities: [
      {
        contactKeyDetails: [
          {
            contactKey: "5cdc4716-c273-4eec-aacf-8e668a01ecbf",
            createDate: "2025-11-15T11:51:00",
          },
        ],
        channelAddress: "dangelo.cunningham@example.com",
      },
    ],
    requestServiceMessageID: "35921326-7074-4cf9-8233-f61e76de0054",
    responseDateTime: "2025-06-13T16:55:21.2506991-06:00",
    resultMessages: [],
    serviceMessageID: "cba1b474-6868-4611-99c3-ea0211e7bc36",
  },
};
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
