import { deleteResultSchema } from "./common";
export const plannerBucketSchema = {
  type: "object" as const,
  properties: {
    "@odata.etag": { type: "string" },
    id: { type: "string" },
    name: { type: "string" },
    orderHint: { type: "string" },
    planId: { type: "string" },
  },
  required: ["id"],
};

export const plannerBucketCollectionSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    value: { type: "array", items: plannerBucketSchema },
    truncated: { type: "boolean" },
  },
  required: ["value", "truncated"],
};

export const listBucketsInPlanOutputSchema = plannerBucketCollectionSchema;

export const getBucketOutputSchema = plannerBucketSchema;

export const createBucketOutputSchema = plannerBucketSchema;

export const updateBucketOutputSchema = plannerBucketSchema;

export const deleteBucketOutputSchema = deleteResultSchema;
