import { dateTimeSchema } from "./shared";
export const getBucketLocationOutputSchema = {
  type: "string" as const,
};
export const listBucketsOutputSchema = {
  type: ["array", "null"],
  items: {
    type: "object" as const,
    properties: {
      Name: { type: "string" },
      CreationDate: dateTimeSchema,
      BucketRegion: { type: "string" },
      BucketArn: { type: "string" },
    },
    required: [],
  },
};
export const headBucketOutputSchema = {
  type: "object" as const,
  properties: {
    BucketArn: { type: "string" },
    BucketLocationType: { type: "string" },
    BucketLocationName: { type: "string" },
    BucketRegion: { type: "string" },
    AccessPointAlias: { type: "boolean" },
  },
  required: [],
};
