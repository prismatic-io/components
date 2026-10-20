import {
  codeTypeSchema,
  confirmMessageSchema,
  eventItemBaseSchema,
  eventTransformBaseProperties,
  idTypeSchema,
  linksSchema,
  metaSchema,
  openObjectArraySchema,
  openObjectSchema,
  queryCriteriaSchema,
  statusTypeSchema,
} from "./common";
const distributionInstructionSchema = {
  type: "object" as const,
  properties: {
    itemID: { type: "string" },
    precedenceCode: codeTypeSchema,
    instructionEffectivePeriod: openObjectSchema,
    paymentMethodCode: codeTypeSchema,
    bonusOnlyIndicator: { type: "boolean" },
    instructionStatusCode: statusTypeSchema,
    changeRestrictionStatus: openObjectSchema,
    depositAccount: openObjectSchema,
    payee: openObjectSchema,
    distributionAmount: openObjectSchema,
    distributionPercentage: { type: "number" },
    remainingBalanceIndicator: { type: "boolean" },
    prenote: openObjectSchema,
    thirdPartyBeneficiaryIndicator: { type: "boolean" },
    prenoteIndicator: { type: "boolean" },
    actions: openObjectArraySchema,
  },
};
const attestationIndicatorSchema = {
  type: "object" as const,
  properties: {
    indicatorValue: { type: "boolean" },
    effectiveDate: { type: "string", format: "date" },
  },
};
const payDistributionSchema = {
  type: "object" as const,
  properties: {
    itemID: { type: "string" },
    requestedStartDate: { type: "string", format: "date" },
    distributionPurposeCode: codeTypeSchema,
    distributionStatusCode: statusTypeSchema,
    distributionInstructions: {
      type: "array",
      items: distributionInstructionSchema,
    },
    actions: openObjectArraySchema,
    attestationIndicator: attestationIndicatorSchema,
    workerID: idTypeSchema,
    payrollFileNumber: { type: "string" },
    payrollAgreementDescription: { type: "string" },
    payrollRegionCode: codeTypeSchema,
    payrollGroupCode: codeTypeSchema,
    links: linksSchema,
  },
};
export const getPaymentDistributionsOutputSchema = {
  type: "object" as const,
  properties: {
    payDistributions: { type: "array", items: payDistributionSchema },
    meta: metaSchema,
    confirmMessage: confirmMessageSchema,
  },
};
export const getWorkerPaymentDistributionsMetaOutputSchema = {
  type: "object" as const,
  properties: {
    meta: {
      type: "object" as const,
      properties: {
        "/serviceCategoryCode/codeValue": { type: "string", enum: ["payroll"] },
        "/eventNameCode/codeValue": {
          type: "string",
          enum: ["worker.payDistribution.change"],
        },
        queryCriteria: queryCriteriaSchema,
        "/data/eventContext": openObjectSchema,
        "/data/transforms": {
          type: "array",
          items: {
            type: "object" as const,
            properties: { itemID: { type: "string" } },
            additionalProperties: true,
          },
        },
      },
    },
  },
};
const payDistributionChangeEventSchema = {
  type: "object" as const,
  properties: {
    ...eventItemBaseSchema.properties,
    data: {
      type: "object" as const,
      properties: {
        eventContext: {
          type: "object" as const,
          properties: {
            contextExpressionID: { type: "string" },
            worker: {
              type: "object" as const,
              properties: {
                associateOID: { type: "string" },
                workerID: idTypeSchema,
                workAssignmentID: { type: "string" },
              },
            },
            payDistribution: {
              type: "object" as const,
              properties: {
                itemID: { type: "string" },
                payrollRegionCode: codeTypeSchema,
                payrollGroupCode: codeTypeSchema,
                payrollFileNumber: { type: "string" },
              },
            },
          },
        },
        transform: {
          type: "object" as const,
          properties: {
            ...eventTransformBaseProperties,
            payDistribution: payDistributionSchema,
            attachments: openObjectArraySchema,
          },
        },
        output: {
          type: "object" as const,
          properties: {
            worker: {
              type: "object" as const,
              properties: { associateOID: { type: "string" } },
            },
            payDistribution: payDistributionSchema,
            attachments: openObjectArraySchema,
          },
        },
      },
    },
  },
};
export const updateWorkerPayDistributionOutputSchema = {
  type: "object" as const,
  properties: {
    events: { type: "array", items: payDistributionChangeEventSchema },
    meta: metaSchema,
    confirmMessage: confirmMessageSchema,
  },
};
