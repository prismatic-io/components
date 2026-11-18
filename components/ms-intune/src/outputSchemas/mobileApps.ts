import { deleteResultSchema, odataCollectionSchema } from "./common";
import { assignmentTargetSchema, mimeContentSchema } from "./graphTypes";

const mobileAppSchema = {
  type: "object" as const,
  properties: {
    "@odata.type": { type: "string" },
    id: { type: "string" },
    displayName: { type: ["string", "null"] },
    description: { type: ["string", "null"] },
    publisher: { type: ["string", "null"] },
    largeIcon: { ...mimeContentSchema, type: ["object", "null"] },
    createdDateTime: { type: ["string", "null"], format: "date-time" },
    lastModifiedDateTime: { type: ["string", "null"], format: "date-time" },
    isFeatured: { type: ["boolean", "null"] },
    privacyInformationUrl: { type: ["string", "null"] },
    informationUrl: { type: ["string", "null"] },
    owner: { type: ["string", "null"] },
    developer: { type: ["string", "null"] },
    notes: { type: ["string", "null"] },
    publishingState: {
      type: ["string", "null"],
      enum: ["notPublished", "processing", "published", null],
    },
  },
  additionalProperties: true,
};

const betaMobileAppSchema = {
  type: "object" as const,
  properties: {
    ...mobileAppSchema.properties,
    uploadState: { type: ["integer", "null"] },
    isAssigned: { type: ["boolean", "null"] },
    roleScopeTagIds: { type: "array", items: { type: "string" } },
    dependentAppCount: { type: ["integer", "null"] },
    supersedingAppCount: { type: ["integer", "null"] },
    supersededAppCount: { type: ["integer", "null"] },
  },
  additionalProperties: true,
};

const excludedAppsSchema = {
  type: "object" as const,
  properties: {
    access: { type: ["boolean", "null"] },
    bing: { type: ["boolean", "null"] },
    excel: { type: ["boolean", "null"] },
    groove: { type: ["boolean", "null"] },
    infoPath: { type: ["boolean", "null"] },
    lync: { type: ["boolean", "null"] },
    oneDrive: { type: ["boolean", "null"] },
    oneNote: { type: ["boolean", "null"] },
    outlook: { type: ["boolean", "null"] },
    powerPoint: { type: ["boolean", "null"] },
    publisher: { type: ["boolean", "null"] },
    sharePointDesigner: { type: ["boolean", "null"] },
    teams: { type: ["boolean", "null"] },
    visio: { type: ["boolean", "null"] },
    word: { type: ["boolean", "null"] },
  },
};

const officeSuiteAppProperties = {
  autoAcceptEula: { type: ["boolean", "null"] },
  productIds: { type: "array", items: { type: "string" } },
  excludedApps: { ...excludedAppsSchema, type: ["object", "null"] },
  useSharedComputerActivation: { type: ["boolean", "null"] },
  updateChannel: { type: ["string", "null"] },
  officeSuiteAppDefaultFileFormat: { type: ["string", "null"] },
  officePlatformArchitecture: { type: ["string", "null"] },
  localesToInstall: { type: "array", items: { type: "string" } },
  installProgressDisplayLevel: { type: ["string", "null"] },
  shouldUninstallOlderVersionsOfOffice: { type: ["boolean", "null"] },
  targetVersion: { type: ["string", "null"] },
  updateVersion: { type: ["string", "null"] },
  officeConfigurationXml: { type: ["string", "null"] },
};

const mobileAppAssignmentSchema = {
  type: "object" as const,
  properties: {
    "@odata.type": { type: "string" },
    id: { type: "string" },
    intent: {
      type: ["string", "null"],
      enum: [
        "available",
        "required",
        "uninstall",
        "availableWithoutEnrollment",
        null,
      ],
    },
    target: { ...assignmentTargetSchema, type: ["object", "null"] },
    settings: {
      type: ["object", "null"],
      properties: {
        "@odata.type": { type: "string" },
      },
      additionalProperties: true,
    },
  },
};

export const getMobileAppOutputSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    ...mobileAppSchema.properties,
  },
  required: ["id"],
  additionalProperties: true,
};

export const getManagedAppOutputSchema = getMobileAppOutputSchema;

export const listMobileAppsOutputSchema = {
  type: "object" as const,
  properties: {
    ...odataCollectionSchema.properties,
    value: { type: "array", items: mobileAppSchema },
  },
  required: ["value"],
};

export const listManagedAppsOutputSchema = {
  type: "object" as const,
  properties: {
    ...odataCollectionSchema.properties,
    value: { type: "array", items: betaMobileAppSchema },
  },
  required: ["value"],
};

export const createManagedAppOutputSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    ...betaMobileAppSchema.properties,
    ...officeSuiteAppProperties,
  },
  required: ["id"],
  additionalProperties: true,
};

export const updateManagedAppOutputSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    ...betaMobileAppSchema.properties,
    ...officeSuiteAppProperties,
  },
  required: ["id"],
  additionalProperties: true,
};

export const createMobileAppAssignmentOutputSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    ...mobileAppAssignmentSchema.properties,
  },
  required: ["id"],
};

export const getMobileAppAssignmentOutputSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    ...mobileAppAssignmentSchema.properties,
  },
  required: ["id"],
};

export const listMobileAppAssignmentsOutputSchema = {
  type: "object" as const,
  properties: {
    ...odataCollectionSchema.properties,
    value: { type: "array", items: mobileAppAssignmentSchema },
  },
  required: ["value"],
};

export const updateMobileAppAssignmentOutputSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    ...mobileAppAssignmentSchema.properties,
  },
  required: ["id"],
};

export const deleteManagedAppOutputSchema = deleteResultSchema;

export const deleteMobileAppAssignmentOutputSchema = deleteResultSchema;

export const assignMobileAppOutputSchema = { type: "string" as const };
