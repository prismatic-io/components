import { deleteResultSchema, odataCollectionSchema } from "./common";
import {
  addInSchema,
  apiApplicationSchema,
  appRoleSchema,
  authenticationBehaviorsSchema,
  certificationSchema,
  informationalUrlSchema,
  keyCredentialSchema,
  optionalClaimsSchema,
  parentalControlSettingsSchema,
  passwordCredentialSchema,
  publicClientApplicationSchema,
  requestSignatureVerificationSchema,
  requiredResourceAccessSchema,
  servicePrincipalLockConfigurationSchema,
  spaApplicationSchema,
  verifiedPublisherSchema,
  webApplicationSchema,
} from "./graphTypes";

export const applicationSchema = {
  type: "object" as const,
  properties: {
    addIns: { type: "array", items: addInSchema },
    api: { ...apiApplicationSchema, type: ["object", "null"] },
    appId: { type: "string" },
    applicationTemplateId: { type: ["string", "null"] },
    appRoles: { type: "array", items: appRoleSchema },
    authenticationBehaviors: {
      ...authenticationBehaviorsSchema,
      type: ["object", "null"],
    },
    certification: { ...certificationSchema, type: ["object", "null"] },
    createdByAppId: { type: ["string", "null"] },
    createdDateTime: { type: ["string", "null"], format: "date-time" },
    deletedDateTime: { type: ["string", "null"], format: "date-time" },
    description: { type: ["string", "null"] },
    disabledByMicrosoftStatus: {
      type: ["string", "null"],
      enum: ["NotDisabled", "DisabledDueToViolationOfServicesAgreement", null],
    },
    displayName: { type: ["string", "null"] },
    groupMembershipClaims: { type: ["string", "null"] },
    id: { type: "string" },
    identifierUris: { type: "array", items: { type: "string" } },
    info: { ...informationalUrlSchema, type: ["object", "null"] },
    isDeviceOnlyAuthSupported: { type: ["boolean", "null"] },
    isFallbackPublicClient: { type: ["boolean", "null"] },
    keyCredentials: { type: "array", items: keyCredentialSchema },
    managerApplications: {
      type: "array",
      items: { type: "string", format: "uuid" },
    },
    nativeAuthenticationApisEnabled: { type: ["string", "null"] },
    notes: { type: ["string", "null"] },
    oauth2RequiredPostResponse: { type: ["boolean", "null"] },
    optionalClaims: { ...optionalClaimsSchema, type: ["object", "null"] },
    parentalControlSettings: {
      ...parentalControlSettingsSchema,
      type: ["object", "null"],
    },
    passwordCredentials: { type: "array", items: passwordCredentialSchema },
    publicClient: {
      ...publicClientApplicationSchema,
      type: ["object", "null"],
    },
    publisherDomain: { type: ["string", "null"] },
    requestSignatureVerification: {
      ...requestSignatureVerificationSchema,
      type: ["object", "null"],
    },
    requiredResourceAccess: {
      type: "array",
      items: requiredResourceAccessSchema,
    },
    samlMetadataUrl: { type: ["string", "null"] },
    serviceManagementReference: { type: ["string", "null"] },
    servicePrincipalLockConfiguration: {
      ...servicePrincipalLockConfigurationSchema,
      type: ["object", "null"],
    },
    signInAudience: {
      type: ["string", "null"],
      enum: [
        "AzureADMyOrg",
        "AzureADMultipleOrgs",
        "AzureADandPersonalMicrosoftAccount",
        "PersonalMicrosoftAccount",
        null,
      ],
    },
    spa: { ...spaApplicationSchema, type: ["object", "null"] },
    tags: { type: "array", items: { type: "string" } },
    tokenEncryptionKeyId: { type: ["string", "null"] },
    uniqueName: { type: ["string", "null"] },
    verifiedPublisher: { ...verifiedPublisherSchema, type: ["object", "null"] },
    web: { ...webApplicationSchema, type: ["object", "null"] },
  },
};

export const createApplicationOutputSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    ...applicationSchema.properties,
  },
  required: ["id", "appId"],
};

export const getApplicationOutputSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    ...applicationSchema.properties,
  },
  required: ["id", "appId"],
};

export const listApplicationsOutputSchema = {
  type: "object" as const,
  properties: {
    ...odataCollectionSchema.properties,
    value: { type: "array", items: applicationSchema },
  },
  required: ["value"],
};

export const deleteApplicationOutputSchema = deleteResultSchema;

export const upsertApplicationOutputSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    ...applicationSchema.properties,
    success: { type: "boolean", enum: [true] },
  },
};
