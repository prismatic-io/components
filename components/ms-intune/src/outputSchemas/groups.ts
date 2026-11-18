import { deleteResultSchema, odataCollectionSchema } from "./common";
import {
  assignedLabelSchema,
  assignedLicenseSchema,
  onPremisesExtensionAttributesSchema,
  onPremisesProvisioningErrorSchema,
  serviceProvisioningErrorSchema,
} from "./graphTypes";

const groupSchema = {
  type: "object" as const,
  properties: {
    accessType: {
      type: ["string", "null"],
      enum: ["none", "private", "secret", "public", "unknownFutureValue", null],
    },
    allowExternalSenders: { type: ["boolean", "null"] },
    assignedLabels: { type: "array", items: assignedLabelSchema },
    assignedLicenses: { type: "array", items: assignedLicenseSchema },
    autoSubscribeNewMembers: { type: ["boolean", "null"] },
    classification: { type: ["string", "null"] },
    createdDateTime: { type: ["string", "null"], format: "date-time" },
    deletedDateTime: { type: ["string", "null"], format: "date-time" },
    description: { type: ["string", "null"] },
    displayName: { type: ["string", "null"] },
    expirationDateTime: { type: ["string", "null"], format: "date-time" },
    groupTypes: { type: "array", items: { type: "string" } },
    hasMembersWithLicenseErrors: { type: ["boolean", "null"] },
    hideFromAddressLists: { type: ["boolean", "null"] },
    hideFromOutlookClients: { type: ["boolean", "null"] },
    id: { type: "string" },
    isArchived: { type: ["boolean", "null"] },
    isAssignableToRole: { type: ["boolean", "null"] },
    isFavorite: { type: ["boolean", "null"] },
    isManagementRestricted: { type: ["boolean", "null"] },
    isSubscribedByMail: { type: ["boolean", "null"] },
    licenseProcessingState: { type: ["string", "null"] },
    mail: { type: ["string", "null"] },
    mailEnabled: { type: ["boolean", "null"] },
    mailNickname: { type: ["string", "null"] },
    membershipRule: { type: ["string", "null"] },
    membershipRuleProcessingState: { type: ["string", "null"] },
    onPremisesDomainName: { type: ["string", "null"] },
    onPremisesExtensionAttributes: {
      ...onPremisesExtensionAttributesSchema,
      type: ["object", "null"],
    },
    onPremisesLastSyncDateTime: {
      type: ["string", "null"],
      format: "date-time",
    },
    onPremisesNetBiosName: { type: ["string", "null"] },
    onPremisesProvisioningErrors: {
      type: "array",
      items: onPremisesProvisioningErrorSchema,
    },
    onPremisesSamAccountName: { type: ["string", "null"] },
    onPremisesSecurityIdentifier: { type: ["string", "null"] },
    onPremisesSyncEnabled: { type: ["boolean", "null"] },
    preferredDataLocation: { type: ["string", "null"] },
    preferredLanguage: { type: ["string", "null"] },
    proxyAddresses: { type: "array", items: { type: "string" } },
    renewedDateTime: { type: ["string", "null"], format: "date-time" },
    resourceBehaviorOptions: { type: "array", items: { type: "string" } },
    resourceProvisioningOptions: { type: "array", items: { type: "string" } },
    securityEnabled: { type: ["boolean", "null"] },
    securityIdentifier: { type: ["string", "null"] },
    serviceProvisioningErrors: {
      type: "array",
      items: serviceProvisioningErrorSchema,
    },
    theme: { type: ["string", "null"] },
    uniqueName: { type: ["string", "null"] },
    unseenConversationsCount: { type: ["integer", "null"] },
    unseenCount: { type: ["integer", "null"] },
    unseenMessagesCount: { type: ["integer", "null"] },
    visibility: { type: ["string", "null"] },
  },
};

export const createGroupOutputSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    ...groupSchema.properties,
  },
  required: ["id"],
};

export const getGroupOutputSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    ...groupSchema.properties,
  },
  required: ["id"],
};

export const listGroupsOutputSchema = {
  type: "object" as const,
  properties: {
    ...odataCollectionSchema.properties,
    value: { type: "array", items: groupSchema },
  },
  required: ["value"],
};

export const deleteGroupOutputSchema = deleteResultSchema;

export const updateGroupOutputSchema = { type: "string" as const };
