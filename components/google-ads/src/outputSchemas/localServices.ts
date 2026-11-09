import {
  googleRpcStatusSchema,
  localServicesAggregatorInfoSchema,
} from "./common";

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

export const listLocalServicesLeadsOutputSchema = {
  type: "object" as const,
  properties: {
    results: {
      type: "array",
      items: {
        type: "object",
        properties: {
          localServicesLead: {
            type: "object",
            properties: {
              resourceName: { type: "string" },
              id: { type: "string" },
              campaign: { type: "string" },
              categoryId: { type: "string" },
              serviceId: { type: "string" },
              leadType: {
                type: "string",
                enum: [
                  "UNSPECIFIED",
                  "UNKNOWN",
                  "MESSAGE",
                  "PHONE_CALL",
                  "BOOKING",
                  "COUPON",
                ],
              },
              leadStatus: {
                type: "string",
                enum: [
                  "UNSPECIFIED",
                  "UNKNOWN",
                  "NEW",
                  "ACTIVE",
                  "BOOKED",
                  "DECLINED",
                  "EXPIRED",
                  "DISABLED",
                  "CONSUMER_DECLINED",
                  "WIPED_OUT",
                ],
              },
              creationDateTime: { type: "string" },
              locale: { type: "string" },
              contactDetails: {
                type: "object",
                properties: {
                  phoneNumber: { type: "string" },
                  phoneNumberExtension: { type: "string" },
                  consumerName: { type: "string" },
                },
                required: [],
                additionalProperties: true,
              },
              leadCharged: { type: "boolean" },
              leadFeedbackSubmitted: { type: "boolean" },
              creditDetails: {
                type: "object",
                properties: {
                  creditState: {
                    type: "string",
                    enum: ["UNSPECIFIED", "UNKNOWN", "PENDING", "CREDITED"],
                  },
                  creditStateLastUpdateDateTime: { type: "string" },
                },
                required: [],
                additionalProperties: true,
              },
              note: {
                type: "object",
                properties: {
                  description: { type: "string" },
                  editDateTime: { type: "string" },
                },
                required: [],
                additionalProperties: true,
              },
            },
            required: [],
            additionalProperties: true,
          },
        },
        required: [],
        additionalProperties: true,
      },
    },
    nextPageToken: { type: "string" },
    fieldMask: { type: "string" },
    queryResourceConsumption: { type: "string" },
  },
  required: [],
  additionalProperties: true,
};

export const listLeadConversationsOutputSchema = {
  type: "object" as const,
  properties: {
    results: {
      type: "array",
      items: {
        type: "object",
        properties: {
          localServicesLeadConversation: {
            type: "object",
            properties: {
              resourceName: { type: "string" },
              id: { type: "string" },
              lead: { type: "string" },
              conversationChannel: {
                type: "string",
                enum: [
                  "UNSPECIFIED",
                  "UNKNOWN",
                  "EMAIL",
                  "MESSAGE",
                  "PHONE_CALL",
                  "SMS",
                  "BOOKING",
                  "WHATSAPP",
                  "ADS_API",
                ],
              },
              participantType: {
                type: "string",
                enum: ["UNSPECIFIED", "UNKNOWN", "ADVERTISER", "CONSUMER"],
              },
              eventDateTime: { type: "string" },
              phoneCallDetails: {
                type: "object",
                properties: {
                  callDurationMillis: { type: "string" },
                  callRecordingUrl: { type: "string" },
                },
                required: [],
                additionalProperties: true,
              },
              messageDetails: {
                type: "object",
                properties: {
                  text: { type: "string" },
                  attachmentUrls: { type: "array", items: { type: "string" } },
                },
                required: [],
                additionalProperties: true,
              },
            },
            required: [],
            additionalProperties: true,
          },
        },
        required: [],
        additionalProperties: true,
      },
    },
    nextPageToken: { type: "string" },
    fieldMask: { type: "string" },
    queryResourceConsumption: { type: "string" },
  },
  required: [],
  additionalProperties: true,
};

export const provideLeadFeedbackOutputSchema = {
  type: "object" as const,
  properties: {
    creditIssuanceDecision: {
      type: "string",
      enum: [
        "UNSPECIFIED",
        "UNKNOWN",
        "SUCCESS_NOT_REACHED_THRESHOLD",
        "SUCCESS_REACHED_THRESHOLD",
        "FAIL_OVER_THRESHOLD",
        "FAIL_NOT_ELIGIBLE",
      ],
    },
  },
  required: [],
  additionalProperties: true,
};

export const appendLeadConversationOutputSchema = {
  type: "object" as const,
  properties: {
    responses: {
      type: "array",
      items: {
        type: "object",
        properties: {
          localServicesLeadConversation: { type: "string" },
          partialFailureError: googleRpcStatusSchema,
        },
        required: [],
        additionalProperties: true,
      },
    },
  },
  required: [],
  additionalProperties: true,
};
