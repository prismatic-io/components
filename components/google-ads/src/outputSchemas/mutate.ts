import {
  googleRpcStatusSchema,
  mutateResourceNameResultSchema,
} from "./common";

export const mutateResourcesOutputSchema = {
  type: "object" as const,
  properties: {
    mutateOperationResponses: {
      type: "array",
      items: {
        type: "object",
        properties: {
          campaignBudgetResult: mutateResourceNameResultSchema,
          campaignResult: mutateResourceNameResultSchema,
          adGroupResult: mutateResourceNameResultSchema,
          adGroupCriterionResult: mutateResourceNameResultSchema,
        },
        required: [],
        additionalProperties: true,
      },
    },
    partialFailureError: googleRpcStatusSchema,
  },
  required: [],
  additionalProperties: true,
};
