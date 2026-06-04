const contactEnvelope = {
  Id: "bd90b45c-7b92-4e10-84e8-efef27090697",
  Status: "OK",
  ProviderName: "Acme Corp",
  DateTimeUTC: "/Date(1650000000000)/",
};

const sampleContact = {
  ContactID: "a4c2f1e8-3d56-4b91-9f07-2e8a1c6d5b34",
  ContactStatus: "ACTIVE",
  Name: "Jane Smith",
  EmailAddress: "jane.smith@widgetco.com",
  Addresses: [
    {
      AddressType: "POBOX",
    },
    {
      AddressType: "STREET",
      AddressLine1: "123 Main St",
      City: "Portland",
      Region: "OR",
      PostalCode: "97201",
      Country: "US",
    },
  ],
  Phones: [
    { PhoneType: "DDI" },
    { PhoneType: "DEFAULT", PhoneNumber: "503-555-0142" },
    { PhoneType: "FAX" },
    { PhoneType: "MOBILE", PhoneNumber: "503-555-0198" },
  ],
  UpdatedDateUTC: "/Date(1650000123456+0000)/",
  ContactGroups: [],
  IsSupplier: false,
  IsCustomer: true,
  ContactPersons: [],
  HasAttachments: false,
  HasValidationErrors: false,
};

export const listContactsExamplePayload = {
  data: {
    ...contactEnvelope,
    pagination: {
      page: 1,
      pageSize: 100,
      pageCount: 2,
      itemCount: 150,
    },
    Contacts: [sampleContact],
  },
};

export const getContactExamplePayload = {
  data: {
    ...contactEnvelope,
    Contacts: [sampleContact],
  },
};

export const createContactExamplePayload = {
  data: {
    ...contactEnvelope,
    Contacts: [sampleContact],
  },
};

export const updateContactExamplePayload = {
  data: {
    ...contactEnvelope,
    Contacts: [sampleContact],
  },
};

export const archiveContactExamplePayload = {
  data: {
    ...contactEnvelope,
    Contacts: [
      {
        ...sampleContact,
        ContactStatus: "ARCHIVED",
      },
    ],
  },
};

export const getContactHistoryExamplePayload = {
  data: {
    ...contactEnvelope,
    HistoryRecords: [
      {
        Changes: "Edited",
        DateUTCString: "2022-04-15T10:30:24",
        DateUTC: "/Date(1650019824697+0000)/",
        User: "Jane Smith",
        Details: "Name updated from Widget Co to WidgetCo Ltd",
      },
    ],
  },
};
