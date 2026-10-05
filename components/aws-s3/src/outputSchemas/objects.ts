import {
  checksumTypeSchema,
  checksumValueProperties,
  commonPrefixSchema,
  dateTimeSchema,
  ownerSchema,
  requestChargedSchema,
  retentionModeSchema,
  serverSideEncryptionProperties,
} from "./shared";
export const generatePresignedUrlOutputSchema = {
  type: "string" as const,
  format: "uri",
};
export const copyObjectOutputSchema = {
  type: "object" as const,
  properties: {
    CopyObjectResult: {
      type: "object" as const,
      properties: {
        ETag: { type: "string" },
        LastModified: dateTimeSchema,
        ChecksumType: checksumTypeSchema,
        ...checksumValueProperties,
      },
      required: [],
    },
    Expiration: { type: "string" },
    CopySourceVersionId: { type: "string" },
    VersionId: { type: "string" },
    ...serverSideEncryptionProperties,
    SSEKMSEncryptionContext: { type: "string" },
    RequestCharged: requestChargedSchema,
  },
  required: ["CopyObjectResult"],
};
export const putObjectOutputSchema = {
  type: "object" as const,
  properties: {
    Expiration: { type: "string" },
    ETag: { type: "string" },
    ...checksumValueProperties,
    ChecksumType: checksumTypeSchema,
    VersionId: { type: "string" },
    ...serverSideEncryptionProperties,
    SSEKMSEncryptionContext: { type: "string" },
    Size: { type: "number" },
    RequestCharged: requestChargedSchema,
  },
  required: [],
};
export const headObjectOutputSchema = {
  type: "object" as const,
  properties: {
    DeleteMarker: { type: "boolean" },
    AcceptRanges: { type: "string" },
    Expiration: { type: "string" },
    Restore: { type: "string" },
    ArchiveStatus: { type: "string" },
    LastModified: dateTimeSchema,
    ContentLength: { type: "number" },
    ...checksumValueProperties,
    ChecksumType: checksumTypeSchema,
    ETag: { type: "string" },
    MissingMeta: { type: "number" },
    VersionId: { type: "string" },
    CacheControl: { type: "string" },
    ContentDisposition: { type: "string" },
    ContentEncoding: { type: "string" },
    ContentLanguage: { type: "string" },
    ContentType: { type: "string" },
    ContentRange: { type: "string" },
    Expires: dateTimeSchema,
    ExpiresString: { type: "string" },
    WebsiteRedirectLocation: { type: "string" },
    ...serverSideEncryptionProperties,
    Metadata: {
      type: "object" as const,
      additionalProperties: { type: "string" },
    },
    StorageClass: { type: "string" },
    RequestCharged: requestChargedSchema,
    ReplicationStatus: { type: "string" },
    PartsCount: { type: "number" },
    TagCount: { type: "number" },
    ObjectLockMode: retentionModeSchema,
    ObjectLockRetainUntilDate: dateTimeSchema,
    ObjectLockLegalHoldStatus: { type: "string", enum: ["ON", "OFF"] },
  },
  required: [],
};
export const deleteObjectOutputSchema = {
  type: "object" as const,
  properties: {
    DeleteMarker: { type: "boolean" },
    VersionId: { type: "string" },
    RequestCharged: requestChargedSchema,
  },
  required: [],
};
export const deleteObjectsOutputSchema = {
  type: "object" as const,
  properties: {
    Deleted: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          Key: { type: "string" },
          VersionId: { type: "string" },
          DeleteMarker: { type: "boolean" },
          DeleteMarkerVersionId: { type: "string" },
        },
        required: [],
      },
    },
    Errors: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          Key: { type: "string" },
          VersionId: { type: "string" },
          Code: { type: "string" },
          Message: { type: "string" },
        },
        required: [],
      },
    },
    RequestCharged: requestChargedSchema,
  },
  required: [],
};
export const listObjectsOutputSchema = {
  type: ["array", "object"],
  items: { type: "string" },
  properties: {
    IsTruncated: { type: "boolean" },
    Contents: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          Key: { type: "string" },
          LastModified: dateTimeSchema,
          ETag: { type: "string" },
          ChecksumAlgorithm: { type: "array", items: { type: "string" } },
          ChecksumType: checksumTypeSchema,
          Size: { type: "number" },
          StorageClass: { type: "string" },
          Owner: ownerSchema,
          RestoreStatus: {
            type: "object" as const,
            properties: {
              IsRestoreInProgress: { type: "boolean" },
              RestoreExpiryDate: dateTimeSchema,
            },
            required: [],
          },
        },
        required: [],
      },
    },
    Name: { type: "string" },
    Prefix: { type: "string" },
    Delimiter: { type: "string" },
    MaxKeys: { type: "number" },
    CommonPrefixes: { type: "array", items: commonPrefixSchema },
    EncodingType: { type: "string", enum: ["url"] },
    KeyCount: { type: "number" },
    ContinuationToken: { type: "string" },
    NextContinuationToken: { type: "string" },
    StartAfter: { type: "string" },
    RequestCharged: requestChargedSchema,
  },
  required: [],
  additionalProperties: true,
};
export const getObjectAttributesOutputSchema = {
  type: "object" as const,
  properties: {
    DeleteMarker: { type: "boolean" },
    LastModified: dateTimeSchema,
    VersionId: { type: "string" },
    RequestCharged: requestChargedSchema,
    ETag: { type: "string" },
    Checksum: {
      type: "object" as const,
      properties: {
        ...checksumValueProperties,
        ChecksumType: checksumTypeSchema,
      },
      required: [],
    },
    ObjectParts: {
      type: "object" as const,
      properties: {
        TotalPartsCount: { type: "number" },
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
              Size: { type: "number" },
              ...checksumValueProperties,
            },
            required: [],
          },
        },
      },
      required: [],
    },
    StorageClass: { type: "string" },
    ObjectSize: { type: "number" },
  },
  required: [],
  additionalProperties: true,
};
