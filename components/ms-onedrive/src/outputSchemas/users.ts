export const searchUserOutputSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    id: { type: "string" },
    businessPhones: { type: "array", items: { type: "string" } },
    displayName: { type: "string" },
    givenName: { type: ["string", "null"] },
    jobTitle: { type: ["string", "null"] },
    mail: { type: ["string", "null"] },
    mobilePhone: { type: ["string", "null"] },
    officeLocation: { type: ["string", "null"] },
    preferredLanguage: { type: ["string", "null"] },
    surname: { type: ["string", "null"] },
    userPrincipalName: { type: "string" },
  },
  required: ["id"],
};
