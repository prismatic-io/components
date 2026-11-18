export const createApplicationExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#applications/$entity",
    id: "03ef14b0-ca33-4840-8f4f-d6e91916010e",
    deletedDateTime: null,
    isFallbackPublicClient: null,
    appId: "631a96bc-a705-4eda-9f99-fdaf9f54f6a2",
    applicationTemplateId: null,
    identifierUris: [],
    createdDateTime: "2019-09-17T19:10:35.2742618Z",
    displayName: "Display name",
    isDeviceOnlyAuthSupported: null,
    groupMembershipClaims: null,
    optionalClaims: null,
    addIns: [],
    publisherDomain: "contoso.com",
    samlMetadataUrl: "https://graph.microsoft.com/2h5hjaj542de/app",
    signInAudience: "AzureADandPersonalMicrosoftAccount",
    tags: [],
    tokenEncryptionKeyId: null,
    api: {
      requestedAccessTokenVersion: 2,
      acceptMappedClaims: null,
      knownClientApplications: [],
      oauth2PermissionScopes: [],
      preAuthorizedApplications: [],
    },
    appRoles: [],
    publicClient: {
      redirectUris: [],
    },
    info: {
      termsOfServiceUrl: null,
      supportUrl: null,
      privacyStatementUrl: null,
      marketingUrl: null,
      logoUrl: null,
    },
    keyCredentials: [],
    parentalControlSettings: {
      countriesBlockedForMinors: [],
      legalAgeGroupRule: "Allow",
    },
    passwordCredentials: [],
    requiredResourceAccess: [],
    web: {
      redirectUris: [],
      homePageUrl: null,
      logoutUrl: null,
      implicitGrantSettings: {
        enableIdTokenIssuance: false,
        enableAccessTokenIssuance: false,
      },
    },
  },
};

export const listApplicationsExamplePayload = {
  data: {
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#applications",
    value: [
      {
        appId: "00000000-0000-0000-0000-000000000000",
        identifierUris: ["http://contoso/"],
        displayName: "My app",
        publisherDomain: "contoso.com",
        signInAudience: "AzureADMyOrg",
      },
    ],
  },
};

export const upsertApplicationExamplePayload = createApplicationExamplePayload;

export const getApplicationExamplePayload = createApplicationExamplePayload;

export const deleteApplicationExamplePayload = {
  data: {
    success: true,
    id: "03ef14b0-ca33-4840-8f4f-d6e91916010e",
    message: "Application deleted successfully",
  },
};

export const selectApplicationExamplePayload = {
  result: [
    { label: "Display name", key: "03ef14b0-ca33-4840-8f4f-d6e91916010e" },
  ],
};
