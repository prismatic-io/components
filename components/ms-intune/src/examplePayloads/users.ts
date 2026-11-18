export const listUsersExamplePayload = {
  data: {
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#users",
    value: [
      {
        businessPhones: [],
        displayName: "Conf Room Adams",
        givenName: null,
        jobTitle: null,
        mail: "Adams@contoso.com",
        mobilePhone: null,
        officeLocation: null,
        preferredLanguage: null,
        surname: null,
        userPrincipalName: "Adams@contoso.com",
        id: "6ea91a8d-e32e-41a1-b7bd-d2d185eed0e0",
      },
      {
        businessPhones: ["425-555-0100"],
        displayName: "MOD Administrator",
        givenName: "MOD",
        jobTitle: null,
        mail: null,
        mobilePhone: "425-555-0101",
        officeLocation: null,
        preferredLanguage: "en-US",
        surname: "Administrator",
        userPrincipalName: "admin@contoso.com",
        id: "4562bcc8-c436-4f95-b7c0-4f8ce89dca5e",
      },
    ],
  },
};

export const getUserExamplePayload = {
  data: {
    businessPhones: ["+1 425 555 0109"],
    displayName: "Adele Vance",
    givenName: "Adele",
    jobTitle: "Retail Manager",
    mail: "AdeleV@contoso.com",
    mobilePhone: "+1 425 555 0109",
    officeLocation: "18/2111",
    preferredLanguage: "en-US",
    surname: "Vance",
    userPrincipalName: "AdeleV@contoso.com",
    id: "87d349ed-44d7-43e1-9a83-5f2406dee5bd",
  },
};

export const createUserExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#users/$entity",
    id: "87d349ed-44d7-43e1-9a83-5f2406dee5bd",
    businessPhones: [],
    displayName: "Adele Vance",
    givenName: "Adele",
    jobTitle: "Product Marketing Manager",
    mail: "AdeleV@contoso.com",
    mobilePhone: "+1 425 555 0109",
    officeLocation: "18/2111",
    preferredLanguage: "en-US",
    surname: "Vance",
    userPrincipalName: "AdeleV@contoso.com",
  },
};

export const reprocessUserLicenseAssignmentExamplePayload = {
  data: {
    ...getUserExamplePayload.data,
    assignedLicenses: [
      {
        disabledPlans: ["11b0131d-43c8-4bbb-b2c8-e80f9a50834a"],
        skuId: "c7df2760-2c81-4ef7-b578-5b5392b571df",
      },
    ],
  },
};

export const deleteUserExamplePayload = {
  data: {
    success: true,
    id: "87d349ed-44d7-43e1-9a83-5f2406dee5bd",
    message: "User deleted successfully.",
  },
};

export const updateUserExamplePayload = {
  data: "Action successfully completed.",
};

export const selectUserExamplePayload = {
  result: [
    { label: "Conf Room Adams", key: "6ea91a8d-e32e-41a1-b7bd-d2d185eed0e0" },
  ],
};
