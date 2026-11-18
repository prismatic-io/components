export const listChangesExamplePayload = {
  data: {
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#users",
    "@odata.nextLink":
      "https://graph.microsoft.com/v1.0/users/delta?$skiptoken=pqwSUjGYvb3jQpbwVAwEL7yuI3dU1LecfkkfLPtnIjsXoYQp_dpA3cNJWc",
    value: [
      {
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
    ],
  },
};
