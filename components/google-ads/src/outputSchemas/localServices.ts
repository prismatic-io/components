import { localServicesAggregatorInfoSchema } from "./common";
export const accountReportsOutputSchema = {
  type: "object" as const,
  properties: {
    accountReports: {
      type: "array",
      items: {
        type: "object",
        properties: {
          accountId: { type: "string" },
          businessName: { type: "string" },
          averageWeeklyBudget: { type: "number" },
          averageFiveStarRating: { type: "number" },
          totalReview: { type: "integer" },
          impressionsLastTwoDays: { type: "string" },
          phoneLeadResponsiveness: { type: "number" },
          currentPeriodChargedLeads: { type: "string" },
          previousPeriodChargedLeads: { type: "string" },
          currentPeriodTotalCost: { type: "number" },
          previousPeriodTotalCost: { type: "number" },
          currencyCode: { type: "string" },
          currentPeriodPhoneCalls: { type: "string" },
          previousPeriodPhoneCalls: { type: "string" },
          currentPeriodConnectedPhoneCalls: { type: "string" },
          previousPeriodConnectedPhoneCalls: { type: "string" },
          aggregatorInfo: localServicesAggregatorInfoSchema,
        },
      },
    },
    nextPageToken: { type: "string" },
  },
};
export const detailedLeadReportsOutputSchema = {
  type: "object" as const,
  properties: {
    detailedLeadReports: {
      type: "array",
      items: {
        type: "object",
        properties: {
          leadId: { type: "string" },
          googleAdsLeadId: { type: "string" },
          accountId: { type: "string" },
          businessName: { type: "string" },
          leadCreationTimestamp: { type: "string" },
          leadType: {
            type: "string",
            enum: ["LEAD_TYPE_UNSPECIFIED", "MESSAGE", "PHONE_CALL", "BOOKING"],
          },
          leadCategory: { type: "string" },
          geo: { type: "string" },
          leadPrice: { type: "number" },
          chargeStatus: {
            type: "string",
            enum: ["CHARGE_STATUS_UNSPECIFIED", "CHARGED", "NOT_CHARGED"],
          },
          currencyCode: { type: "string" },
          disputeStatus: { type: "string" },
          messageLead: {
            type: "object",
            properties: {
              customerName: { type: "string" },
              jobType: { type: "string" },
              postalCode: { type: "string" },
              consumerPhoneNumber: { type: "string" },
            },
          },
          phoneLead: {
            type: "object",
            properties: {
              chargedCallTimestamp: { type: "string" },
              chargedConnectedCallDurationSeconds: { type: "string" },
              consumerPhoneNumber: { type: "string" },
            },
          },
          bookingLead: {
            type: "object",
            properties: {
              customerName: { type: "string" },
              consumerPhoneNumber: { type: "string" },
              jobType: { type: "string" },
              consumerEmail: { type: "string" },
              bookingAppointmentTimestamp: { type: "string" },
            },
          },
          aggregatorInfo: localServicesAggregatorInfoSchema,
          timezone: {
            type: "object",
            properties: {
              id: { type: "string" },
              version: { type: "string" },
            },
          },
        },
      },
    },
    nextPageToken: { type: "string" },
  },
};
