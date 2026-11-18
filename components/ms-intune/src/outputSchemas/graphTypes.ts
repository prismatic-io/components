export const keyValueSchema = {
  type: "object" as const,
  properties: {
    key: { type: ["string", "null"] },
    value: { type: ["string", "null"] },
  },
};

export const assignedLabelSchema = {
  type: "object" as const,
  properties: {
    displayName: { type: ["string", "null"] },
    labelId: { type: ["string", "null"] },
  },
};

export const assignedLicenseSchema = {
  type: "object" as const,
  properties: {
    disabledPlans: { type: "array", items: { type: "string" } },
    skuId: { type: ["string", "null"] },
  },
};

export const onPremisesExtensionAttributesSchema = {
  type: "object" as const,
  properties: {
    extensionAttribute1: { type: ["string", "null"] },
    extensionAttribute2: { type: ["string", "null"] },
    extensionAttribute3: { type: ["string", "null"] },
    extensionAttribute4: { type: ["string", "null"] },
    extensionAttribute5: { type: ["string", "null"] },
    extensionAttribute6: { type: ["string", "null"] },
    extensionAttribute7: { type: ["string", "null"] },
    extensionAttribute8: { type: ["string", "null"] },
    extensionAttribute9: { type: ["string", "null"] },
    extensionAttribute10: { type: ["string", "null"] },
    extensionAttribute11: { type: ["string", "null"] },
    extensionAttribute12: { type: ["string", "null"] },
    extensionAttribute13: { type: ["string", "null"] },
    extensionAttribute14: { type: ["string", "null"] },
    extensionAttribute15: { type: ["string", "null"] },
  },
};

export const onPremisesProvisioningErrorSchema = {
  type: "object" as const,
  properties: {
    category: { type: ["string", "null"] },
    occurredDateTime: { type: ["string", "null"], format: "date-time" },
    propertyCausingError: { type: ["string", "null"] },
    value: { type: ["string", "null"] },
  },
};

export const serviceProvisioningErrorSchema = {
  type: "object" as const,
  properties: {
    createdDateTime: { type: ["string", "null"], format: "date-time" },
    isResolved: { type: ["boolean", "null"] },
    serviceInstance: { type: ["string", "null"] },
  },
};

export const assignedPlanSchema = {
  type: "object" as const,
  properties: {
    assignedDateTime: { type: ["string", "null"], format: "date-time" },
    capabilityStatus: { type: ["string", "null"] },
    service: { type: ["string", "null"] },
    servicePlanId: { type: ["string", "null"] },
  },
};

export const employeeOrgDataSchema = {
  type: "object" as const,
  properties: {
    division: { type: ["string", "null"] },
    costCenter: { type: ["string", "null"] },
  },
};

export const objectIdentitySchema = {
  type: "object" as const,
  properties: {
    signInType: { type: ["string", "null"] },
    issuer: { type: ["string", "null"] },
    issuerAssignedId: { type: ["string", "null"] },
  },
};

export const licenseAssignmentStateSchema = {
  type: "object" as const,
  properties: {
    assignedByGroup: { type: ["string", "null"] },
    disabledPlans: { type: "array", items: { type: "string" } },
    error: { type: ["string", "null"] },
    lastUpdatedDateTime: { type: ["string", "null"], format: "date-time" },
    skuId: { type: ["string", "null"] },
    state: { type: ["string", "null"] },
  },
};

export const dateTimeTimeZoneSchema = {
  type: "object" as const,
  properties: {
    dateTime: { type: ["string", "null"] },
    timeZone: { type: ["string", "null"] },
  },
};

export const automaticRepliesSettingSchema = {
  type: "object" as const,
  properties: {
    externalAudience: {
      type: ["string", "null"],
      enum: ["none", "contactsOnly", "all", null],
    },
    externalReplyMessage: { type: ["string", "null"] },
    internalReplyMessage: { type: ["string", "null"] },
    scheduledEndDateTime: {
      ...dateTimeTimeZoneSchema,
      type: ["object", "null"],
    },
    scheduledStartDateTime: {
      ...dateTimeTimeZoneSchema,
      type: ["object", "null"],
    },
    status: {
      type: ["string", "null"],
      enum: ["disabled", "alwaysEnabled", "scheduled", null],
    },
  },
};

export const localeInfoSchema = {
  type: "object" as const,
  properties: {
    displayName: { type: ["string", "null"] },
    locale: { type: ["string", "null"] },
  },
};

export const timeZoneBaseSchema = {
  type: "object" as const,
  properties: {
    name: { type: ["string", "null"] },
  },
};

export const workingHoursSchema = {
  type: "object" as const,
  properties: {
    daysOfWeek: { type: "array", items: { type: "string" } },
    endTime: { type: ["string", "null"] },
    startTime: { type: ["string", "null"] },
    timeZone: { ...timeZoneBaseSchema, type: ["object", "null"] },
  },
};

export const mailboxSettingsSchema = {
  type: "object" as const,
  properties: {
    archiveFolder: { type: ["string", "null"] },
    automaticRepliesSetting: {
      ...automaticRepliesSettingSchema,
      type: ["object", "null"],
    },
    dateFormat: { type: ["string", "null"] },
    delegateMeetingMessageDeliveryOptions: {
      type: ["string", "null"],
      enum: [
        "sendToDelegateAndInformationToPrincipal",
        "sendToDelegateAndPrincipal",
        "sendToDelegateOnly",
        null,
      ],
    },
    language: { ...localeInfoSchema, type: ["object", "null"] },
    timeFormat: { type: ["string", "null"] },
    timeZone: { type: ["string", "null"] },
    userPurpose: {
      type: ["string", "null"],
      enum: [
        "user",
        "linked",
        "shared",
        "room",
        "equipment",
        "others",
        "unknownFutureValue",
        null,
      ],
    },
    workingHours: { ...workingHoursSchema, type: ["object", "null"] },
  },
};

export const passwordProfileSchema = {
  type: "object" as const,
  properties: {
    forceChangePasswordNextSignIn: { type: ["boolean", "null"] },
    forceChangePasswordNextSignInWithMfa: { type: ["boolean", "null"] },
    password: { type: ["string", "null"] },
  },
};

export const provisionedPlanSchema = {
  type: "object" as const,
  properties: {
    capabilityStatus: { type: ["string", "null"] },
    provisioningStatus: { type: ["string", "null"] },
    service: { type: ["string", "null"] },
  },
};

export const signInActivitySchema = {
  type: "object" as const,
  properties: {
    lastNonInteractiveSignInDateTime: {
      type: ["string", "null"],
      format: "date-time",
    },
    lastNonInteractiveSignInRequestId: { type: ["string", "null"] },
    lastSignInDateTime: { type: ["string", "null"], format: "date-time" },
    lastSignInRequestId: { type: ["string", "null"] },
    lastSuccessfulSignInDateTime: {
      type: ["string", "null"],
      format: "date-time",
    },
    lastSuccessfulSignInRequestId: { type: ["string", "null"] },
  },
};

export const mimeContentSchema = {
  type: "object" as const,
  properties: {
    type: { type: ["string", "null"] },
    value: { type: ["string", "null"] },
  },
};

export const assignmentTargetSchema = {
  type: "object" as const,
  properties: {
    "@odata.type": { type: "string" },
    groupId: { type: ["string", "null"] },
    collectionId: { type: ["string", "null"] },
    targetType: { type: ["string", "null"] },
    entraObjectId: { type: ["string", "null"] },
  },
  additionalProperties: true,
};
