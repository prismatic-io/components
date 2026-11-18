import { deleteResultSchema, odataCollectionSchema } from "./common";
import {
  assignedLicenseSchema,
  assignedPlanSchema,
  employeeOrgDataSchema,
  licenseAssignmentStateSchema,
  mailboxSettingsSchema,
  objectIdentitySchema,
  onPremisesExtensionAttributesSchema,
  onPremisesProvisioningErrorSchema,
  passwordProfileSchema,
  provisionedPlanSchema,
  serviceProvisioningErrorSchema,
  signInActivitySchema,
} from "./graphTypes";

const userSchema = {
  type: "object" as const,
  properties: {
    aboutMe: { type: ["string", "null"] },
    accountEnabled: { type: ["boolean", "null"] },
    ageGroup: {
      type: ["string", "null"],
      enum: ["Minor", "NotAdult", "Adult", null],
    },
    assignedLicenses: { type: "array", items: assignedLicenseSchema },
    assignedPlans: { type: "array", items: assignedPlanSchema },
    birthday: { type: ["string", "null"], format: "date-time" },
    businessPhones: { type: "array", items: { type: "string" } },
    city: { type: ["string", "null"] },
    companyName: { type: ["string", "null"] },
    consentProvidedForMinor: {
      type: ["string", "null"],
      enum: ["Granted", "Denied", "NotRequired", null],
    },
    country: { type: ["string", "null"] },
    createdDateTime: { type: ["string", "null"], format: "date-time" },
    creationType: { type: ["string", "null"] },
    customSecurityAttributes: { type: ["object", "null"] },
    deletedDateTime: { type: ["string", "null"], format: "date-time" },
    department: { type: ["string", "null"] },
    displayName: { type: ["string", "null"] },
    employeeHireDate: { type: ["string", "null"], format: "date-time" },
    employeeLeaveDateTime: { type: ["string", "null"], format: "date-time" },
    employeeId: { type: ["string", "null"] },
    employeeOrgData: { ...employeeOrgDataSchema, type: ["object", "null"] },
    employeeType: { type: ["string", "null"] },
    externalUserState: { type: ["string", "null"] },
    externalUserStateChangeDateTime: {
      type: ["string", "null"],
      format: "date-time",
    },
    faxNumber: { type: ["string", "null"] },
    givenName: { type: ["string", "null"] },
    hireDate: { type: ["string", "null"], format: "date-time" },
    id: { type: "string" },
    identities: { type: "array", items: objectIdentitySchema },
    imAddresses: { type: "array", items: { type: "string" } },
    interests: { type: "array", items: { type: "string" } },
    isManagementRestricted: { type: ["boolean", "null"] },
    isResourceAccount: { type: ["boolean", "null"] },
    jobTitle: { type: ["string", "null"] },
    lastPasswordChangeDateTime: {
      type: ["string", "null"],
      format: "date-time",
    },
    legalAgeGroupClassification: {
      type: ["string", "null"],
      enum: [
        "Undefined",
        "MinorWithoutParentalConsent",
        "MinorWithParentalConsent",
        "Adult",
        "NotAdult",
        "MinorNoParentalConsentRequired",
        null,
      ],
    },
    licenseAssignmentStates: {
      type: "array",
      items: licenseAssignmentStateSchema,
    },
    mail: { type: ["string", "null"] },
    mailboxSettings: { ...mailboxSettingsSchema, type: ["object", "null"] },
    mailNickname: { type: ["string", "null"] },
    mobilePhone: { type: ["string", "null"] },
    mySite: { type: ["string", "null"] },
    officeLocation: { type: ["string", "null"] },
    onPremisesDistinguishedName: { type: ["string", "null"] },
    onPremisesDomainName: { type: ["string", "null"] },
    onPremisesExtensionAttributes: {
      ...onPremisesExtensionAttributesSchema,
      type: ["object", "null"],
    },
    onPremisesImmutableId: { type: ["string", "null"] },
    onPremisesLastSyncDateTime: {
      type: ["string", "null"],
      format: "date-time",
    },
    onPremisesProvisioningErrors: {
      type: "array",
      items: onPremisesProvisioningErrorSchema,
    },
    onPremisesSamAccountName: { type: ["string", "null"] },
    onPremisesSecurityIdentifier: { type: ["string", "null"] },
    onPremisesSyncEnabled: { type: ["boolean", "null"] },
    onPremisesUserPrincipalName: { type: ["string", "null"] },
    otherMails: { type: "array", items: { type: "string" } },
    passwordPolicies: { type: ["string", "null"] },
    passwordProfile: { ...passwordProfileSchema, type: ["object", "null"] },
    pastProjects: { type: "array", items: { type: "string" } },
    postalCode: { type: ["string", "null"] },
    preferredDataLocation: { type: ["string", "null"] },
    preferredLanguage: { type: ["string", "null"] },
    preferredName: { type: ["string", "null"] },
    provisionedPlans: { type: "array", items: provisionedPlanSchema },
    proxyAddresses: { type: "array", items: { type: "string" } },
    refreshTokensValidFromDateTime: {
      type: ["string", "null"],
      format: "date-time",
    },
    responsibilities: { type: "array", items: { type: "string" } },
    serviceProvisioningErrors: {
      type: "array",
      items: serviceProvisioningErrorSchema,
    },
    schools: { type: "array", items: { type: "string" } },
    securityIdentifier: { type: ["string", "null"] },
    showInAddressList: { type: ["boolean", "null"] },
    signInActivity: { ...signInActivitySchema, type: ["object", "null"] },
    signInSessionsValidFromDateTime: {
      type: ["string", "null"],
      format: "date-time",
    },
    skills: { type: "array", items: { type: "string" } },
    state: { type: ["string", "null"] },
    streetAddress: { type: ["string", "null"] },
    surname: { type: ["string", "null"] },
    usageLocation: { type: ["string", "null"] },
    userPrincipalName: { type: ["string", "null"] },
    userType: { type: ["string", "null"] },
  },
};

export const createUserOutputSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    ...userSchema.properties,
  },
  required: ["id"],
};

export const getUserOutputSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    ...userSchema.properties,
  },
  required: [],
};

export const listUsersOutputSchema = {
  type: "object" as const,
  properties: {
    ...odataCollectionSchema.properties,
    value: { type: "array", items: userSchema },
  },
  required: ["value"],
};

export const reprocessUserLicenseAssignmentOutputSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    ...userSchema.properties,
  },
  required: [],
};

export const deleteUserOutputSchema = deleteResultSchema;

export const updateUserOutputSchema = { type: "string" as const };
