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
        currentPeriodChargedLeads: "15",
        currentPeriodConnectedPhoneCalls: "25",
        currentPeriodPhoneCalls: "30",
        currentPeriodTotalCost: 450.5,
        impressionsLastTwoDays: "1250",
        phoneLeadResponsiveness: 0.95,
        previousPeriodChargedLeads: "12",
        previousPeriodConnectedPhoneCalls: "20",
        previousPeriodPhoneCalls: "28",
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
        aggregatorInfo: {
          aggregatorProviderId: "1234567890",
        },
        businessName: "Example Plumbing Services",
        leadType: "MESSAGE",
        chargeStatus: "CHARGED",
        currencyCode: "USD",
        disputeStatus: "DISPUTE_INELIGIBLE",
        geo: "San Francisco, CA",
        googleAdsLeadId: "1122334455",
        leadCategory: "PLUMBER",
        leadCreationTimestamp: "2026-01-15T10:30:00Z",
        leadId: "987654321",
        leadPrice: 25.5,
        messageLead: {
          customerName: "Jane Smith",
          jobType: "Pipe Repair",
          postalCode: "94105",
        },
        timezone: {
          id: "America/Los_Angeles",
          version: "",
        },
      },
    ],
    nextPageToken: "CJL5XLT2PWDmIpGNGciABRnu",
  },
};

export const listLocalServicesLeadsExamplePayload = {
  data: {
    results: [
      {
        localServicesLead: {
          resourceName: "customers/1234567890/localServicesLeads/5566778899",
          id: "5566778899",
          campaign: "customers/1234567890/campaigns/1122334455",
          categoryId: "xcat:service_area_business_hvac",
          serviceId: "buyer_ac_repair",
          leadType: "PHONE_CALL",
          leadStatus: "ACTIVE",
          creationDateTime: "2026-10-30 09:15:00",
          locale: "en-US",
          contactDetails: {
            phoneNumber: "+15555550123",
            consumerName: "Jordan Smith",
          },
          leadCharged: true,
          leadFeedbackSubmitted: false,
          creditDetails: {
            creditState: "PENDING",
            creditStateLastUpdateDateTime: "2026-10-31 11:00:00",
          },
          note: {
            description: "Called back, scheduled a visit for Tuesday.",
            editDateTime: "2026-10-30 10:02:00",
          },
        },
      },
    ],
    fieldMask:
      "localServicesLead.resourceName,localServicesLead.id,localServicesLead.campaign,localServicesLead.categoryId,localServicesLead.serviceId,localServicesLead.leadType,localServicesLead.leadStatus,localServicesLead.creationDateTime,localServicesLead.locale,localServicesLead.contactDetails,localServicesLead.leadCharged,localServicesLead.leadFeedbackSubmitted,localServicesLead.creditDetails,localServicesLead.note",
  },
};

export const listLeadConversationsExamplePayload = {
  data: {
    results: [
      {
        localServicesLeadConversation: {
          resourceName:
            "customers/1234567890/localServicesLeadConversations/9988776655",
          id: "9988776655",
          lead: "customers/1234567890/localServicesLeads/5566778899",
          conversationChannel: "PHONE_CALL",
          participantType: "CONSUMER",
          eventDateTime: "2026-10-30 09:15:00",
          phoneCallDetails: {
            callDurationMillis: "184000",
            callRecordingUrl: "https://example.com/recordings/9988776655",
          },
        },
      },
    ],
    fieldMask:
      "localServicesLeadConversation.resourceName,localServicesLeadConversation.id,localServicesLeadConversation.lead,localServicesLeadConversation.conversationChannel,localServicesLeadConversation.participantType,localServicesLeadConversation.eventDateTime,localServicesLeadConversation.phoneCallDetails",
  },
};

export const provideLeadFeedbackExamplePayload = {
  data: {
    creditIssuanceDecision: "SUCCESS_NOT_REACHED_THRESHOLD",
  },
};

export const appendLeadConversationExamplePayload = {
  data: {
    responses: [
      {
        localServicesLeadConversation:
          "customers/1234567890/localServicesLeadConversations/9988776656",
      },
    ],
  },
};
