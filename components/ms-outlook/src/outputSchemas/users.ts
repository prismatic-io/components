import { nullableString, stringArray } from "./shared";

export const getCurrentUserOutputSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": nullableString,
    businessPhones: stringArray,
    displayName: nullableString,
    givenName: nullableString,
    id: { type: "string" },
    jobTitle: nullableString,
    mail: nullableString,
    mobilePhone: nullableString,
    officeLocation: nullableString,
    preferredLanguage: nullableString,
    surname: nullableString,
    userPrincipalName: nullableString,
  },
  required: ["id"],
};
