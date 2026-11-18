import { odataCollectionSchema } from "./common";
import { assignmentTargetSchema } from "./graphTypes";

const deviceCompliancePolicySchema = {
  type: "object" as const,
  properties: {
    "@odata.type": { type: "string" },
    id: { type: "string" },
    createdDateTime: { type: ["string", "null"], format: "date-time" },
    description: { type: ["string", "null"] },
    lastModifiedDateTime: { type: ["string", "null"], format: "date-time" },
    displayName: { type: ["string", "null"] },
    version: { type: ["integer", "null"] },
  },
  required: ["id"],
  additionalProperties: true,
};

const deviceCompliancePolicyAssignmentSchema = {
  type: "object" as const,
  properties: {
    "@odata.type": { type: "string" },
    id: { type: "string" },
    target: { ...assignmentTargetSchema, type: ["object", "null"] },
  },
};

const deviceCompliancePolicySettingStateSummarySchema = {
  type: "object" as const,
  properties: {
    "@odata.type": { type: "string" },
    id: { type: "string" },
    setting: { type: ["string", "null"] },
    settingName: { type: ["string", "null"] },
    platformType: {
      type: ["string", "null"],
      enum: [
        "android",
        "iOS",
        "macOS",
        "windowsPhone81",
        "windows81AndLater",
        "windows10AndLater",
        "androidWorkProfile",
        "linux",
        "all",
        null,
      ],
    },
    unknownDeviceCount: { type: ["integer", "null"] },
    notApplicableDeviceCount: { type: ["integer", "null"] },
    compliantDeviceCount: { type: ["integer", "null"] },
    remediatedDeviceCount: { type: ["integer", "null"] },
    nonCompliantDeviceCount: { type: ["integer", "null"] },
    errorDeviceCount: { type: ["integer", "null"] },
    conflictDeviceCount: { type: ["integer", "null"] },
  },
  required: ["id"],
};

export const assignDeviceCompliancePolicyOutputSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    value: { type: "array", items: deviceCompliancePolicyAssignmentSchema },
  },
  required: ["value"],
};

export const getDeviceCompliancePolicyOutputSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    ...deviceCompliancePolicySchema.properties,
  },
  required: ["id"],
  additionalProperties: true,
};

export const listDeviceCompliancePoliciesOutputSchema = {
  type: "object" as const,
  properties: {
    ...odataCollectionSchema.properties,
    value: { type: "array", items: deviceCompliancePolicySchema },
  },
  required: ["value"],
};

export const getDeviceCompliancePolicySettingStateSummaryOutputSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    ...deviceCompliancePolicySettingStateSummarySchema.properties,
  },
  required: ["id"],
};

export const listDeviceCompliancePolicySettingStateSummariesOutputSchema = {
  type: "object" as const,
  properties: {
    ...odataCollectionSchema.properties,
    value: {
      type: "array",
      items: deviceCompliancePolicySettingStateSummarySchema,
    },
  },
  required: ["value"],
};
