import { selectMobileAppExamplePayload } from "./mobileApps";

export const selectGroupExamplePayload = selectMobileAppExamplePayload;

export const listGroupsExamplePayload = {
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

export const deleteGroupExamplePayload = {
  data: {
    success: true,
    id: "b320ee12-b1cd-4cca-b648-a437be61c5cd",
    message: "Group deleted successfully.",
  },
};

export const updateGroupExamplePayload = {
  data: "Action successfully completed.",
};

export const createGroupExamplePayload = getGroupExamplePayload;
