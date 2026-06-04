import type { TriggerPayload } from "@prismatic-io/spectral";
import { BUDGET_SEVERITY } from "./constants";











export const externalAttributionDataPayload = {
  externalAttributionCredit: 0.75,
  externalAttributionModel: "LINEAR",
};






export const customVariablePayload = {
  conversionCustomVariable:
    "customers/1234567890/conversionCustomVariables/11111",
  value: "premium_tier",
};






export const itemPayload = {
  productId: "SKU-12345",
  quantity: 2,
  unitPrice: 49.99,
};






export const cartDataPayload = {
  merchantId: "1234567",
  feedCountryCode: "US",
  feedLanguageCode: "EN",
  localTransactionCost: 5.99,
  items: [itemPayload],
};






export const offlineUserAddressInfo = {
  hashedFirstName:
    "a8cfcd74832004951b4408cdb0a5dbcd8c7e52d43f7fe244bf720582e05241da",
  hashedLastName:
    "2c624232cdd221771294dfbb310aca000a0df6ac8b166e8b32c4bdc2a5a5cc0a",
  city: "San Francisco",
  state: "CA",
  countryCode: "US",
  postalCode: "94105",
  hashedStreetAddress:
    "d4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35",
};






export const userIdentifierPayload = {
  userIdentifierSource: "FIRST_PARTY",
  hashedEmail:
    "a1159e9df3670d549d04524532629f5477ceb7deec9b45e47e8c009506ecb2c8",
  hashedPhoneNumber:
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  mobileId: "cdda802e-fb9c-47ad-0794d394c913",
  thirdPartyUserId: "ext-user-98765",
  addressInfo: offlineUserAddressInfo,
};






export const consentPayload = {
  adUserData: "GRANTED",
  adPersonalization: "GRANTED",
};






export const conversionsPayload = [
  {
    gbraid: "gbraid_identifier_string",
    wbraid: "wbraid_identifier_string",
    externalAttributionData: externalAttributionDataPayload,
    customVariables: [customVariablePayload],
    cartData: cartDataPayload,
    userIdentifiers: [userIdentifierPayload],
    conversionEnvironment: "WEB",
    consent: consentPayload,
    gclid: "TeSter123.gClIdString_xYz",
    conversionAction: "customers/1234567890/conversionActions/987654321",
    conversionDateTime: "2026-01-15 10:30:00-05:00",
    conversionValue: 149.99,
    currencyCode: "USD",
    orderId: "ORDER-2026-00123",
  },
];






export const dataManagerEventsPayload = [
  {
    eventTimestamp: "2026-05-15T12:30:00Z",
    adIdentifiers: {
      gclid: "TeSter123.gClIdString_xYz",
    },
    conversionValue: 149.99,
    currency: "USD",
    transactionId: "ORDER-2026-00123",
    consent: {
      adUserData: "GRANTED",
      adPersonalization: "GRANTED",
    },
  },
];







export const ingestOfflineConversionsExamplePayload = {
  data: {
    requestId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  },
};






export const operation = {
  updateMask: "status,name",
  create: {
    name: "Example Campaign",
    advertisingChannelType: "SEARCH",
    status: "PAUSED",
    campaignBudget: "customers/1234567890/campaignBudgets/9876543210",
  },
  update: {
    resourceName: "customers/1234567890/campaigns/1122334455",
    status: "ENABLED",
  },
  remove: "customers/1234567890/campaigns/1122334455",
};

export const operationPayload = [operation];






export const operationCriteriaPayload = [
  {
    updateMask: "bidModifier",
    create: {
      campaign: "customers/1234567890/campaigns/1122334455",
      location: {
        geoTargetConstant: "geoTargetConstants/1014044",
      },
    },
    update: {
      resourceName:
        "customers/1234567890/campaignCriteria/1122334455~987654321",
      bidModifier: 1.5,
    },
    remove: "customers/1234567890/campaignCriteria/1122334455~987654321",
  },
];








export const uploadConversionGenericResponseExamplePayload = {
  data: {
    partialFailureError: {
      code: 3,
      message:
        "Multiple errors in 'conversions' field. Details are provided in the 'details' field.",
      details: [
        {
          "@type":
            "type.googleapis.com/google.ads.googleads.v23.errors.GoogleAdsFailure",
          errors: [
            {
              errorCode: {
                conversionUploadError: "INVALID_CONVERSION_ACTION",
              },
              message:
                "The conversion action specified in the request is invalid.",
              location: {
                fieldPathElements: [
                  { fieldName: "conversions", index: 0 },
                  { fieldName: "conversionAction" },
                ],
              },
            },
          ],
        },
      ],
    },
    results: [
      {
        callerId: "+18005551234",
        callStartDateTime: "2026-01-15 09:30:00-05:00",
        conversionAction: "customers/1234567890/conversionActions/987654321",
        conversionDateTime: "2026-01-15 10:30:00-05:00",
      },
    ],
  },
};












export const confirmClientLinkExamplePayload = {
  data: {
    results: [
      {
        resourceName:
          "customers/2222222222/customerManagerLinks/1111111111~3333333333",
      },
    ],
  },
};







export const getCustomerExamplePayload = {
  data: {
    results: [
      {
        customer: {
          resourceName: "customers/1234567890",
          id: "1234567890",
          descriptiveName: "Example Customer Account",
          status: "ENABLED",
          testAccount: false,
          manager: false,
        },
      },
    ],
    fieldMask:
      "customer.id,customer.descriptiveName,customer.status,customer.testAccount,customer.manager",
    queryResourceConsumption: "80",
  },
};







export const getConversionActionExamplePayload = {
  data: {
    results: [
      {
        conversionAction: {
          resourceName: "customers/1234567890/conversionActions/987654321",
          id: "987654321",
          name: "Purchase Conversion",
        },
      },
    ],
    fieldMask:
      "conversionAction.id,conversionAction.name,conversionAction.resourceName",
    queryResourceConsumption: "702",
  },
};







export const mutateCampaignExamplePayload = {
  data: {
    results: [
      {
        resourceName: "customers/1234567890/campaigns/9876543210",
      },
    ],
  },
};







export const mutateCampaignCriteriaExamplePayload = {
  data: {
    results: [
      {
        resourceName: "customers/1234567890/campaignCriteria/9876543210~123456",
      },
    ],
  },
};







export const searchAdsExamplePayload: { data: unknown } = {
  data: {
    results: [
      {
        campaign: {
          resourceName: "customers/1234567890/campaigns/9876543210",
          id: "9876543210",
          name: "Local Services Campaign",
          status: "ENABLED",
        },
      },
    ],
    nextPageToken: "CJL5XLT2PWDmIpGNGciABRnu",
    fieldMask:
      "campaign.resourceName,campaign.id,campaign.name,campaign.status",
    queryResourceConsumption: "74",
  },
};







export const accountReportsExamplePayload = {
  data: {
    accountReports: [
      {
        accountId: "1234567890",
        aggregatorInfo: {
          aggregatorProviderId: "1234567890",
        },
        averageFiveStarRating: 4.8,
        averageWeeklyBudget: 500,
        businessName: "Example Plumbing Services",
        currentPeriodChargedLeads: 15,
        currentPeriodConnectedPhoneCalls: 25,
        currentPeriodPhoneCalls: 30,
        currentPeriodTotalCost: 450.5,
        impressionsLastTwoDays: 1250,
        phoneLeadResponsiveness: 0.95,
        previousPeriodChargedLeads: 12,
        previousPeriodConnectedPhoneCalls: 20,
        previousPeriodPhoneCalls: 28,
        previousPeriodTotalCost: 380.25,
        totalReview: 125,
      },
    ],
    nextPageToken: "CJL5XLT2PWDmIpGNGciABRnu",
  },
};







export const detailedLeadReportsExamplePayload = {
  data: {
    detailedLeadReports: [
      {
        accountId: "1234567890",
        businessName: "Example Plumbing Services",
        leadType: "MESSAGE",
        chargeStatus: "CHARGED",
        currencyCode: "USD",
        disputeStatus: "DISPUTE_INELIGIBLE",
        geo: "San Francisco, CA",
        leadCategory: "PLUMBER",
        leadCreationTimestamp: "2026-01-15T10:30:00Z",
        leadId: "987654321",
        leadPrice: 25.5,
        messageLead: {
          customerName: "Jane Smith",
          jobType: "Pipe Repair",
          postalCode: "94105",
        },
      },
    ],
    nextPageToken: "CJL5XLT2PWDmIpGNGciABRnu",
  },
};










export const inviteUserExamplePayload = {
  data: {
    result: {
      resourceName:
        "customers/1234567890/customerUserAccessInvitations/9876543210",
    },
  },
};







export const listAccessibleCustomersExamplePayload = {
  data: {
    resourceNames: ["customers/1234567890", "customers/5555555555"],
  },
};







export const listCustomersExamplePayload: { data: unknown } = {
  data: {
    results: [
      {
        customerClient: {
          resourceName: "customers/1234567890/customerClients/1234567890",
          clientCustomer: "customers/1234567890",
          id: "1234567890",
          hidden: false,
          level: "1",
        },
      },
      {
        customerClient: {
          resourceName: "customers/1234567890/customerClients/5555555555",
          clientCustomer: "customers/5555555555",
          id: "5555555555",
          hidden: false,
          level: "2",
        },
      },
    ],
    nextPageToken: "CJL5XLT2PWDmIpGNGciABRnu",
    fieldMask:
      "customerClient.resourceName,customerClient.clientCustomer,customerClient.id,customerClient.level,customerClient.hidden,customerClient.level",
  },
};






export const createClientLinkExamplePayload = {
  data: {
    resourceName:
      "customers/1111111111/customerClientLinks/2222222222~3333333333",
    managerCustomerId: "1111111111",
    clientCustomerId: "2222222222",
    managerLinkId: "3333333333",
  },
};







export const rawRequestExamplePayload = {
  data: {
    resourceNames: ["customers/1234567890", "customers/5555555555"],
  },
};











export const campaignChangesTriggerExamplePayload: { payload: TriggerPayload } =
  {
    payload: {
      headers: {},
      queryParameters: {},
      rawBody: { data: null },
      body: {
        data: {
          changes: [
            {
              changeType: "created",
              campaignId: "12345678901",
              campaignName: "Example-Campaign-1",
              field: "campaign",
              oldValue: null,
              newValue: {
                campaign: {
                  resourceName: "customers/1234567890/campaigns/12345678901",
                  status: "ENABLED",
                  name: "Example-Campaign-1",
                  id: "12345678901",
                },
              },
              changedAt: "2026-01-01T12:00:00.000Z",
            },
          ],
          totalCampaigns: 1,
          changesDetected: 1,
          syncedAt: "2026-01-01",
        },
      },
      pathFragment: "",
      webhookUrls: {},
      webhookApiKeys: {},
      invokeUrl: "",
      executionId: "RXhhbXBsZUV4ZWN1dGlvblJlc3VsdElk",
      customer: {
        id: "testCustomerId",
        name: "Test Customer",
        externalId: "testExternalId",
      },
      instance: { id: "testInstanceId", name: "Test Instance" },
      user: {
        id: "testUserId",
        email: "user@example.com",
        name: "Test User",
        externalId: "testUserExternalId",
      },
      integration: {
        id: "testIntegrationId",
        name: "Test Integration",
        versionSequenceId: "1",
        externalVersion: "",
      },
      flow: { id: "testFlowId", name: "Test Flow", stableId: "" },
      startedAt: "2024-01-15T00:00:00.000Z",
      globalDebug: false,
    },
  };






export const budgetAlertTriggerExamplePayload: { payload: TriggerPayload } = {
  payload: {
    headers: {},
    queryParameters: {},
    rawBody: { data: null },
    body: {
      data: {
        alerts: [
          {
            campaignId: "23302011123",
            campaignName: "Example-Campaign-1",
            budgetAmount: 100,
            spent: 1000,
            percentSpent: 1000,
            remaining: -900,
            period: "DAILY",
            shouldAlert: true,
            severity: BUDGET_SEVERITY.CRITICAL,
            message: "Campaign has exceeded daily",
          },
        ],
        totalCampaignsMonitored: 1,
        alertThreshold: 80,
      },
    },
    pathFragment: "",
    webhookUrls: {},
    webhookApiKeys: {},
    invokeUrl: "",
    executionId: "RXhhbXBsZUV4ZWN1dGlvblJlc3VsdElk",
    customer: {
      id: "testCustomerId",
      name: "Test Customer",
      externalId: "testExternalId",
    },
    instance: { id: "testInstanceId", name: "Test Instance" },
    user: {
      id: "testUserId",
      email: "user@example.com",
      name: "Test User",
      externalId: "testUserExternalId",
    },
    integration: {
      id: "testIntegrationId",
      name: "Test Integration",
      versionSequenceId: "1",
      externalVersion: "",
    },
    flow: { id: "testFlowId", name: "Test Flow", stableId: "" },
    startedAt: "2024-01-15T00:00:00.000Z",
    globalDebug: false,
  },
};






export const changeHistoryTriggerExamplePayload: { payload: TriggerPayload } = {
  payload: {
    headers: {},
    queryParameters: {},
    rawBody: { data: null },
    body: {
      data: {
        changes: [
          {
            changeEvent: {
              resourceName:
                "customers/6577008345/changeEvents/1764141874897602~0~1",
              changeDateTime: "2025-11-26 01:24:34.897602",
              changeResourceType: "CAMPAIGN_BUDGET",
              changeResourceName:
                "customers/6577008345/campaignBudgets/15170398017",
              clientType: "GOOGLE_ADS_WEB_CLIENT",
              userEmail: "exampleUser@email.com",
              oldResource: {
                campaignBudget: {},
              },
              newResource: {
                campaignBudget: {
                  resourceName:
                    "customers/6577008345/campaignBudgets/15170398017",
                  deliveryMethod: "STANDARD",
                  period: "DAILY",
                  type: "STANDARD",
                  id: "15170398017",
                  amountMicros: "481350000",
                  explicitlyShared: false,
                },
              },
              resourceChangeOperation: "CREATE",
            },
          },
        ],
        changeCount: 1,
        timeRange: {
          start: "2025-11-26 01:11:50",
          end: "2025-11-26 01:30:17",
        },
      },
    },
    pathFragment: "",
    webhookUrls: {},
    webhookApiKeys: {},
    invokeUrl: "",
    executionId: "RXhhbXBsZUV4ZWN1dGlvblJlc3VsdElk",
    customer: {
      id: "testCustomerId",
      name: "Test Customer",
      externalId: "testExternalId",
    },
    instance: { id: "testInstanceId", name: "Test Instance" },
    user: {
      id: "testUserId",
      email: "user@example.com",
      name: "Test User",
      externalId: "testUserExternalId",
    },
    integration: {
      id: "testIntegrationId",
      name: "Test Integration",
      versionSequenceId: "1",
      externalVersion: "",
    },
    flow: { id: "testFlowId", name: "Test Flow", stableId: "" },
    startedAt: "2024-01-15T00:00:00.000Z",
    globalDebug: false,
  },
};
