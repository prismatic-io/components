import {
  checksumTypeSchema,
  checksumValueProperties,
  commonPrefixSchema,
  dateTimeSchema,
  initiatorSchema,
  ownerSchema,
  requestChargedSchema,
  serverSideEncryptionProperties,
} from "./shared";
export const createMultipartUploadOutputSchema = {
  type: "object" as const,
  properties: {
    AbortDate: dateTimeSchema,
    AbortRuleId: { type: "string" },
    Bucket: { type: "string" },
    Key: { type: "string" },
    UploadId: { type: "string" },
    ...serverSideEncryptionProperties,
    SSEKMSEncryptionContext: { type: "string" },
    RequestCharged: requestChargedSchema,
    ChecksumAlgorithm: { type: "string" },
    ChecksumType: checksumTypeSchema,
  },
  required: [],
};
export const uploadPartOutputSchema = {
  type: "object" as const,
  properties: {
    ETag: { type: "string" },
    ...checksumValueProperties,
    ...serverSideEncryptionProperties,
    RequestCharged: requestChargedSchema,
    part: {
      type: "object",
      properties: { ETag: { type: "string" }, PartNumber: { type: "number" } },
      required: ["PartNumber"],
    },
  },
  required: [],
};
export const generatePresignedForMultiparUploadsOutputSchema = {
  type: "array" as const,
  items: {
    type: "object",
    properties: {
      url: { type: "string", format: "uri" },
      partNumber: { type: "number" },
    },
    required: ["url", "partNumber"],
  },
};
export const completeMultipartUploadOutputSchema = {
  type: "object" as const,
  properties: {
    Location: { type: "string" },
    Bucket: { type: "string" },
    Key: { type: "string" },
    Expiration: { type: "string" },
    ETag: { type: "string" },
    ...checksumValueProperties,
    ChecksumType: checksumTypeSchema,
    ServerSideEncryption: { type: "string" },
    VersionId: { type: "string" },
    SSEKMSKeyId: { type: "string" },
    BucketKeyEnabled: { type: "boolean" },
    RequestCharged: requestChargedSchema,
  },
  required: [],
};
export const listPartsOutputSchema = {
  type: "object" as const,
  properties: {
    AbortDate: dateTimeSchema,
    AbortRuleId: { type: "string" },
    Bucket: { type: "string" },
    Key: { type: "string" },
    UploadId: { type: "string" },
    PartNumberMarker: { type: "string" },
    NextPartNumberMarker: { type: "string" },
    MaxParts: { type: "number" },
    IsTruncated: { type: "boolean" },
    Parts: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          PartNumber: { type: "number" },
          LastModified: dateTimeSchema,
          ETag: { type: "string" },
          Size: { type: "number" },
          ...checksumValueProperties,
        },
        required: [],
      },
    },
    Initiator: initiatorSchema,
    Owner: ownerSchema,
    StorageClass: { type: "string" },
    RequestCharged: requestChargedSchema,
    ChecksumAlgorithm: { type: "string" },
    ChecksumType: checksumTypeSchema,
  },
  required: [],
};
export const listMultipartUploadsOutputSchema = {
  type: "object" as const,
  properties: {
    Bucket: { type: "string" },
    KeyMarker: { type: "string" },
    UploadIdMarker: { type: "string" },
    NextKeyMarker: { type: "string" },
    Prefix: { type: "string" },
    Delimiter: { type: "string" },
    NextUploadIdMarker: { type: "string" },
    MaxUploads: { type: "number" },
    IsTruncated: { type: "boolean" },
    Uploads: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          UploadId: { type: "string" },
          Key: { type: "string" },
          Initiated: dateTimeSchema,
          StorageClass: { type: "string" },
          Owner: ownerSchema,
          Initiator: initiatorSchema,
          ChecksumAlgorithm: { type: "string" },
          ChecksumType: checksumTypeSchema,
        },
        required: [],
      },
    },
    CommonPrefixes: { type: "array", items: commonPrefixSchema },
    EncodingType: { type: "string", enum: ["url"] },
    RequestCharged: requestChargedSchema,
  },
  required: [],
};
export const abortMultipartUploadOutputSchema = {
  type: "object" as const,
  properties: {
    RequestCharged: requestChargedSchema,
  },
  required: [],
};
