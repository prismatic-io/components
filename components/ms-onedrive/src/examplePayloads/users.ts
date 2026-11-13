export const searchUserExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#users/$entity",
    id: "efee1b77-fb3b-4f65-99d6-274c11914d12",
    businessPhones: ["+1 (555) 765-4321"],
    displayName: "John Doe",
    givenName: "John",
    jobTitle: "Senior Engineer",
    mail: "john.doe@contoso.com",
    mobilePhone: "+1 (555) 123-4567",
    officeLocation: "Building 2, Office 234",
    preferredLanguage: "en-US",
    surname: "Doe",
    userPrincipalName: "john.doe@contoso.com",
  },
};

export const listUsersExamplePayload = {
  result: [
    {
      label: "john.doe@contoso.com",
      key: "efee1b77-fb3b-4f65-99d6-274c11914d12",
    },
  ],
};
