const sarahMillerContact = {
  contactId: "e0f1a2b3-4c5d-6e7f-8a9b-0c1d2e3f4a5b",
  contactUri: "/contacts/e0f1a2b3-4c5d-6e7f-8a9b-0c1d2e3f4a5b",
  name: "Sarah Miller",
  emails: ["sarah.miller@example.com"],
  organization: "Miller Associates",
  contactPhoneNumbers: [
    { phoneNumber: "+1 415 555 0142", phoneType: "mobile" },
  ],
  shared: "false",
};

export const createContactExamplePayload = {
  data: {
    contacts: [sarahMillerContact],
  },
};

export const getContactExamplePayload = {
  data: {
    contacts: [
      {
        ...sarahMillerContact,
        cloudProvider: "",
        cloudProviderContainerId: "",
        signingGroup: "",
        signingGroupName: "",
        isOwner: true,
        canManage: "true",
      },
    ],
  },
};

export const updateContactExamplePayload = {
  data: {
    contacts: [
      {
        ...sarahMillerContact,
        organization: "Miller & Partners LLP",
      },
    ],
  },
};

export const deleteContactExamplePayload = {
  data: {
    contacts: [sarahMillerContact],
  },
};
