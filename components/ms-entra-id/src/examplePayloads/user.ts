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

export const listUsersExamplePayload = {
  data: {
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#users",
    value: [getUserExamplePayload.data],
  },
};

export const updateUserExamplePayload = { data: { success: true } };

export const deleteUserExamplePayload = {
  data: {
    success: true,
    id: "87d349ed-44d7-43e1-9a83-5f2406dee5bd",
    message: "User deleted successfully",
  },
};

export const selectUserExamplePayload = {
  result: [
    { label: "Adele Vance", key: "87d349ed-44d7-43e1-9a83-5f2406dee5bd" },
  ],
};
