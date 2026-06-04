





export const createUserExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#users/$entity",
    id: "87d349ed-44d7-43e1-9a83-5f2406dee5bd",
    businessPhones: [],
    displayName: "Adele Vance",
    givenName: "Adele",
    jobTitle: "Product Marketing Manager",
    mail: "AdeleV@contoso.com",
    mobilePhone: "+1 425 555 0109",
    officeLocation: "18/2111",
    preferredLanguage: "en-US",
    surname: "Vance",
    userPrincipalName: "AdeleV@contoso.com",
  },
};





export const emptyExamplePayload = { data: { success: true } };







export const getUserExamplePayload = {
  data: {
    businessPhones: ["+1 425 555 0109"],
    displayName: "Adele Vance",
    givenName: "Adele",
    jobTitle: "Retail Manager",
    mail: "AdeleV@contoso.com",
    mobilePhone: "+1 425 555 0109",
    officeLocation: "18/2111",
    preferredLanguage: "en-US",
    surname: "Vance",
    userPrincipalName: "AdeleV@contoso.com",
    id: "87d349ed-44d7-43e1-9a83-5f2406dee5bd",
  },
};







export const listUsersExamplePayload = {
  data: {
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#users",
    value: [getUserExamplePayload.data],
  },
};







export const createGroupExamplePayload = {
  data: {
    id: "b320ee12-b1cd-4cca-b648-a437be61c5cd",
    deletedDateTime: null,
    classification: null,
    createdDateTime: "2018-12-22T00:51:37Z",
    description: "Self help community for library",
    displayName: "Library Assist",
    groupTypes: ["Unified"],
    mail: "library7423@contoso.com",
    mailEnabled: true,
    mailNickname: "library",
    onPremisesLastSyncDateTime: null,
    onPremisesSecurityIdentifier: null,
    onPremisesSyncEnabled: null,
    preferredDataLocation: "CAN",
    proxyAddresses: ["SMTP:library7423@contoso.com"],
    renewedDateTime: "2018-12-22T00:51:37Z",
    resourceBehaviorOptions: [],
    resourceProvisioningOptions: [],
    securityEnabled: false,
    visibility: "Public",
    onPremisesProvisioningErrors: [],
  },
};







export const getGroupExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#groups/$entity",
    id: "02bd9fd6-8f93-4758-87c3-1fb73740a315",
    deletedDateTime: null,
    classification: null,
    createdDateTime: "2017-07-31T18:56:16Z",
    description: "Welcome to the HR Taskforce team.",
    displayName: "HR Taskforce",
    expirationDateTime: null,
    groupTypes: ["Unified"],
    isAssignableToRole: null,
    mail: "HRTaskforce@contoso.com",
    mailEnabled: true,
    mailNickname: "HRTaskforce",
    membershipRule: null,
    membershipRuleProcessingState: null,
    onPremisesDomainName: null,
    onPremisesLastSyncDateTime: null,
    onPremisesNetBiosName: null,
    onPremisesSamAccountName: null,
    onPremisesSecurityIdentifier: null,
    onPremisesSyncEnabled: null,
    preferredDataLocation: null,
    preferredLanguage: null,
    proxyAddresses: [
      "SMTP:HRTaskforce@contoso.com",
      "SPO:SPO_896cf652-b200-4b74-8111-c013f64406cf@SPO_dcd219dd-bc68-4b9b-bf0b-4a33a796be35",
    ],
    renewedDateTime: "2020-01-24T19:01:14Z",
    resourceBehaviorOptions: [],
    resourceProvisioningOptions: ["Team"],
    securityEnabled: false,
    securityIdentifier: "S-1-12-1-45981654-1196986259-3072312199-363020343",
    serviceProvisioningErrors: [],
    theme: null,
    visibility: "Private",
    onPremisesProvisioningErrors: [],
  },
};







export const listGroupExamplePayload = {
  data: {
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#groups",
    value: [
      {
        id: "45b7d2e7-b882-4a80-ba97-10b7a63b8fa4",
        deletedDateTime: null,
        classification: null,
        createdDateTime: "2018-12-22T02:21:05Z",
        description: "Self help community for golf",
        displayName: "Golf Assist",
        expirationDateTime: null,
        groupTypes: ["Unified"],
        isAssignableToRole: null,
        mail: "golfassist@contoso.com",
        mailEnabled: true,
        mailNickname: "golfassist",
        membershipRule: null,
        membershipRuleProcessingState: null,
        onPremisesLastSyncDateTime: null,
        onPremisesSecurityIdentifier: null,
        onPremisesSyncEnabled: null,
        preferredDataLocation: "CAN",
        preferredLanguage: null,
        proxyAddresses: [
          "smtp:golfassist@contoso.com",
          "SMTP:golfassist@contoso.com",
        ],
        renewedDateTime: "2018-12-22T02:21:05Z",
        resourceBehaviorOptions: [],
        resourceProvisioningOptions: [],
        securityEnabled: false,
        theme: null,
        visibility: "Public",
        onPremisesProvisioningErrors: [],
      },
      {
        id: "d7797254-3084-44d0-99c9-a3b5ab149538",
        deletedDateTime: null,
        classification: null,
        createdDateTime: "2018-11-19T20:29:40Z",
        description: "Talk about golf",
        displayName: "Golf Discussion",
        expirationDateTime: null,
        groupTypes: [],
        isAssignableToRole: null,
        mail: "golftalk@contoso.com",
        mailEnabled: true,
        mailNickname: "golftalk",
        membershipRule: null,
        membershipRuleProcessingState: null,
        onPremisesLastSyncDateTime: null,
        onPremisesSecurityIdentifier: null,
        onPremisesSyncEnabled: null,
        preferredDataLocation: "CAN",
        preferredLanguage: null,
        proxyAddresses: [
          "smtp:golftalk@contoso.com",
          "SMTP:golftalk@contoso.com",
        ],
        renewedDateTime: "2018-11-19T20:29:40Z",
        resourceBehaviorOptions: [],
        resourceProvisioningOptions: [],
        securityEnabled: false,
        serviceProvisioningErrors: [],
        theme: null,
        visibility: null,
        onPremisesProvisioningErrors: [],
      },
    ],
  },
};







export const listGroupMembersExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#directoryObjects",
    value: [
      {
        id: "11111111-2222-3333-4444-555555555555",
        mail: "user1@contoso.com",
      },
    ],
  },
};







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







export const listChangesExamplePayload = {
  data: {
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#users",
    "@odata.nextLink":
      "https://graph.microsoft.com/v1.0/users/delta?$skiptoken=pqwSUjGYvb3jQpbwVAwEL7yuI3dU1LecfkkfLPtnIjsXoYQp_dpA3cNJWc",
    value: [
      {
        businessPhones: ["+1 425 555 0109"],
        displayName: "Adele Vance",
        givenName: "Adele",
        jobTitle: "Retail Manager",
        mail: "AdeleV@contoso.com",
        mobilePhone: "+1 425 555 0109",
        officeLocation: "18/2111",
        preferredLanguage: "en-US",
        surname: "Vance",
        userPrincipalName: "AdeleV@contoso.com",
        id: "87d349ed-44d7-43e1-9a83-5f2406dee5bd",
      },
    ],
  },
};







export const createSubscriptionExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#subscriptions/$entity",
    id: "7f105c7d-2dc5-4530-97cd-4e7ae6534c07",
    resource: "me/mailFolders('Inbox')/messages",
    applicationId: "24d3b144-21ae-4080-943f-7067b395b913",
    changeType: "created",
    clientState: "secretClientValue",
    notificationUrl:
      "https://webhook.azurewebsites.net/api/send/myNotifyClient",
    expirationDateTime: "2016-11-20T18:23:45.9356913Z",
    creatorId: "8ee44408-0679-472c-bc2a-692812af3437",
    latestSupportedTlsVersion: "v1_2",
    notificationContentType: "application/json",
  },
};







export const getSubscriptionExamplePayload = {
  data: {
    id: "7f105c7d-2dc5-4530-97cd-4e7ae6534c07",
    resource: "me/messages",
    applicationId: "24d3b144-21ae-4080-943f-7067b395b913",
    changeType: "created,updated",
    clientState: "secretClientValue",
    notificationUrl:
      "https://webhook.azurewebsites.net/api/send/myNotifyClient",
    lifecycleNotificationUrl:
      "https://webhook.azurewebsites.net/api/send/lifecycleNotifications",
    expirationDateTime: "2016-11-20T18:23:45.9356913Z",
    creatorId: "8ee44408-0679-472c-bc2a-692812af3437",
    latestSupportedTlsVersion: "v1_2",
    encryptionCertificate: "",
    encryptionCertificateId: "",
    includeResourceData: false,
    notificationContentType: "application/json",
  },
};







export const listSubscriptionsExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#subscriptions",
    value: [getSubscriptionExamplePayload.data],
  },
};


export const updateSubscriptionExamplePayload = getSubscriptionExamplePayload;






export const deleteInstancedSubscriptionsExamplePayload = {
  data: {
    subscriptionsRemoved: [
      "26ebd1e9-c54a-4bbe-9583-fc05974952a4",
      "b9b27172-ee2e-4248-86df-fc98cb71d914",
    ],
  },
};
