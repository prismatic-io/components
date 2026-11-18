export const keyValueSchema = {
  type: "object" as const,
  properties: {
    key: { type: ["string", "null"] },
    value: { type: ["string", "null"] },
  },
};

export const addInSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string", format: "uuid" },
    properties: { type: "array", items: keyValueSchema },
    type: { type: ["string", "null"] },
  },
};

export const permissionScopeSchema = {
  type: "object" as const,
  properties: {
    adminConsentDescription: { type: ["string", "null"] },
    adminConsentDisplayName: { type: ["string", "null"] },
    id: { type: "string", format: "uuid" },
    isEnabled: { type: ["boolean", "null"] },
    type: { type: ["string", "null"] },
    userConsentDescription: { type: ["string", "null"] },
    userConsentDisplayName: { type: ["string", "null"] },
    value: { type: ["string", "null"] },
  },
};

export const preAuthorizedApplicationSchema = {
  type: "object" as const,
  properties: {
    appId: { type: ["string", "null"] },
    delegatedPermissionIds: { type: "array", items: { type: "string" } },
  },
};

export const apiApplicationSchema = {
  type: "object" as const,
  properties: {
    acceptMappedClaims: { type: ["boolean", "null"] },
    knownClientApplications: {
      type: "array",
      items: { type: "string", format: "uuid" },
    },
    oauth2PermissionScopes: { type: "array", items: permissionScopeSchema },
    preAuthorizedApplications: {
      type: "array",
      items: preAuthorizedApplicationSchema,
    },
    requestedAccessTokenVersion: { type: ["integer", "null"] },
  },
};

export const appRoleSchema = {
  type: "object" as const,
  properties: {
    allowedMemberTypes: { type: "array", items: { type: "string" } },
    description: { type: ["string", "null"] },
    displayName: { type: ["string", "null"] },
    id: { type: "string", format: "uuid" },
    isEnabled: { type: ["boolean", "null"] },
    origin: { type: ["string", "null"] },
    value: { type: ["string", "null"] },
  },
};

export const authenticationBehaviorsSchema = {
  type: "object" as const,
  properties: {
    blockAzureADGraphAccess: { type: ["boolean", "null"] },
    coopEnforcement: { type: ["boolean", "null"] },
    removeUnverifiedEmailClaim: { type: ["boolean", "null"] },
    requireClientServicePrincipal: { type: ["boolean", "null"] },
  },
};

export const certificationSchema = {
  type: "object" as const,
  properties: {
    certificationDetailsUrl: { type: ["string", "null"] },
    certificationExpirationDateTime: {
      type: ["string", "null"],
      format: "date-time",
    },
    isCertifiedByMicrosoft: { type: ["boolean", "null"] },
    isPublisherAttested: { type: ["boolean", "null"] },
    lastCertificationDateTime: {
      type: ["string", "null"],
      format: "date-time",
    },
  },
};

export const informationalUrlSchema = {
  type: "object" as const,
  properties: {
    logoUrl: { type: ["string", "null"] },
    marketingUrl: { type: ["string", "null"] },
    privacyStatementUrl: { type: ["string", "null"] },
    supportUrl: { type: ["string", "null"] },
    termsOfServiceUrl: { type: ["string", "null"] },
  },
};

export const keyCredentialSchema = {
  type: "object" as const,
  properties: {
    customKeyIdentifier: { type: ["string", "null"] },
    displayName: { type: ["string", "null"] },
    endDateTime: { type: ["string", "null"], format: "date-time" },
    key: { type: ["string", "null"] },
    keyId: { type: ["string", "null"], format: "uuid" },
    startDateTime: { type: ["string", "null"], format: "date-time" },
    type: { type: ["string", "null"] },
    usage: { type: ["string", "null"] },
  },
};

export const optionalClaimSchema = {
  type: "object" as const,
  properties: {
    additionalProperties: { type: "array", items: { type: "string" } },
    essential: { type: ["boolean", "null"] },
    name: { type: ["string", "null"] },
    source: { type: ["string", "null"] },
  },
};

export const optionalClaimsSchema = {
  type: "object" as const,
  properties: {
    accessToken: { type: "array", items: optionalClaimSchema },
    idToken: { type: "array", items: optionalClaimSchema },
    kerberosTicket: { type: "array", items: optionalClaimSchema },
    saml2Token: { type: "array", items: optionalClaimSchema },
  },
};

export const parentalControlSettingsSchema = {
  type: "object" as const,
  properties: {
    countriesBlockedForMinors: { type: "array", items: { type: "string" } },
    legalAgeGroupRule: {
      type: ["string", "null"],
      enum: [
        "Allow",
        "RequireConsentForPrivacyServices",
        "RequireConsentForMinors",
        "RequireConsentForKids",
        "BlockMinors",
        null,
      ],
    },
  },
};

export const passwordCredentialSchema = {
  type: "object" as const,
  properties: {
    customKeyIdentifier: { type: ["string", "null"] },
    displayName: { type: ["string", "null"] },
    endDateTime: { type: ["string", "null"], format: "date-time" },
    hint: { type: ["string", "null"] },
    keyId: { type: ["string", "null"], format: "uuid" },
    secretText: { type: ["string", "null"] },
    startDateTime: { type: ["string", "null"], format: "date-time" },
  },
};

export const publicClientApplicationSchema = {
  type: "object" as const,
  properties: {
    redirectUris: { type: "array", items: { type: "string" } },
  },
};

export const requestSignatureVerificationSchema = {
  type: "object" as const,
  properties: {
    allowedWeakAlgorithms: { type: ["string", "null"] },
    isSignedRequestRequired: { type: ["boolean", "null"] },
  },
};

export const resourceAccessSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string", format: "uuid" },
    type: { type: ["string", "null"] },
  },
};

export const requiredResourceAccessSchema = {
  type: "object" as const,
  properties: {
    resourceAccess: { type: "array", items: resourceAccessSchema },
    resourceAppId: { type: ["string", "null"] },
  },
};

export const servicePrincipalLockConfigurationSchema = {
  type: "object" as const,
  properties: {
    isEnabled: { type: ["boolean", "null"] },
    allProperties: { type: ["boolean", "null"] },
    credentialsWithUsageVerify: { type: ["boolean", "null"] },
    credentialsWithUsageSign: { type: ["boolean", "null"] },
    tokenEncryptionKeyId: { type: ["boolean", "null"] },
  },
};

export const spaApplicationSchema = {
  type: "object" as const,
  properties: {
    redirectUris: { type: "array", items: { type: "string" } },
  },
};

export const verifiedPublisherSchema = {
  type: "object" as const,
  properties: {
    addedDateTime: { type: ["string", "null"], format: "date-time" },
    displayName: { type: ["string", "null"] },
    verifiedPublisherId: { type: ["string", "null"] },
  },
};

export const implicitGrantSettingsSchema = {
  type: "object" as const,
  properties: {
    enableAccessTokenIssuance: { type: ["boolean", "null"] },
    enableIdTokenIssuance: { type: ["boolean", "null"] },
  },
};

export const webApplicationSchema = {
  type: "object" as const,
  properties: {
    homePageUrl: { type: ["string", "null"] },
    implicitGrantSettings: {
      ...implicitGrantSettingsSchema,
      type: ["object", "null"],
    },
    logoutUrl: { type: ["string", "null"] },
    redirectUris: { type: "array", items: { type: "string" } },
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
    disabledPlans: { type: "array", items: { type: "string", format: "uuid" } },
    skuId: { type: ["string", "null"], format: "uuid" },
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
    servicePlanId: { type: ["string", "null"], format: "uuid" },
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
    externalAudience: { type: ["string", "null"] },
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
    status: { type: ["string", "null"] },
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
    delegateMeetingMessageDeliveryOptions: { type: ["string", "null"] },
    language: { ...localeInfoSchema, type: ["object", "null"] },
    timeFormat: { type: ["string", "null"] },
    timeZone: { type: ["string", "null"] },
    userPurpose: { type: ["string", "null"] },
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
