import {
  fieldMetaSchema,
  metaSchema,
  queryCriteriaSchema,
  underscoreConfirmMessageSchema,
} from "./common";

export const getApplicantOnboardMetadataOutputSchema = {
  type: "object" as const,
  properties: {
    meta: {
      type: "object" as const,
      properties: {
        queryCriteria: queryCriteriaSchema,
        "/applicantOnboarding/onboardingTemplateCode": fieldMetaSchema,
        "/applicantOnboarding/applicantPayrollProfile/payrollGroupCode":
          fieldMetaSchema,
        "/applicantOnboarding/applicantPersonalProfile/birthName/givenName":
          fieldMetaSchema,
        "/applicantOnboarding/applicantPersonalProfile/birthName/familyName":
          fieldMetaSchema,
        "/applicantOnboarding/applicantWorkerProfile/hireDate": fieldMetaSchema,
      },
      required: [],
      additionalProperties: true,
    },
  },
};

export const postApplicantOnboardProcessOutputSchema = {
  type: "object" as const,
  properties: {
    alternateIDs: {
      type: "object" as const,
      properties: {
        applicantID: { type: "string" },
        associateOID: { type: "string" },
      },
    },
    _confirmMessage: underscoreConfirmMessageSchema,
    _meta: metaSchema,
  },
};
