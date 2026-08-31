import {
  googleRpcStatusSchema,
  mutateResourceNameResultSchema,
} from "./common";
export const mutateCampaignOutputSchema = {
  type: "object" as const,
  properties: {
    partialFailureError: googleRpcStatusSchema,
    results: { type: "array", items: mutateResourceNameResultSchema },
  },
};
export const mutateCampaignCriteriaOutputSchema = {
  type: "object" as const,
  properties: {
    partialFailureError: googleRpcStatusSchema,
    results: { type: "array", items: mutateResourceNameResultSchema },
  },
};
