export const dateTimeSchema = { type: "string", format: "date-time" };
export const requestChargedSchema = { type: "string", enum: ["requester"] };
export const checksumTypeSchema = {
  type: "string",
  enum: ["COMPOSITE", "FULL_OBJECT"],
};
export const retentionModeSchema = {
  type: "string",
  enum: ["GOVERNANCE", "COMPLIANCE"],
};
export const checksumValueProperties = {
  ChecksumCRC32: { type: "string" },
  ChecksumCRC32C: { type: "string" },
  ChecksumCRC64NVME: { type: "string" },
  ChecksumSHA1: { type: "string" },
  ChecksumSHA256: { type: "string" },
  ChecksumSHA512: { type: "string" },
  ChecksumMD5: { type: "string" },
  ChecksumXXHASH64: { type: "string" },
  ChecksumXXHASH3: { type: "string" },
  ChecksumXXHASH128: { type: "string" },
};
export const serverSideEncryptionProperties = {
  ServerSideEncryption: { type: "string" },
  SSECustomerAlgorithm: { type: "string" },
  SSECustomerKeyMD5: { type: "string" },
  SSEKMSKeyId: { type: "string" },
  BucketKeyEnabled: { type: "boolean" },
};
export const ownerSchema = {
  type: "object" as const,
  properties: {
    DisplayName: { type: "string" },
    ID: { type: "string" },
  },
  required: [],
};
export const initiatorSchema = {
  type: "object" as const,
  properties: {
    ID: { type: "string" },
    DisplayName: { type: "string" },
  },
  required: [],
};
export const commonPrefixSchema = {
  type: "object" as const,
  properties: {
    Prefix: { type: "string" },
  },
  required: [],
};
