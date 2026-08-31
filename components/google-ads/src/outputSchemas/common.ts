export const googleRpcStatusSchema = {
  type: "object" as const,
  properties: {
    code: { type: "integer" },
    message: { type: "string" },
    details: { type: "array", items: { type: "object" } },
  },
};
export const mutateResourceNameResultSchema = {
  type: "object" as const,
  properties: {
    resourceName: { type: "string" },
  },
  required: ["resourceName"],
};
export const localServicesAggregatorInfoSchema = {
  type: "object" as const,
  properties: {
    aggregatorProviderId: { type: "string" },
  },
};
export const userIdentifierSchema = {
  type: "object" as const,
  properties: {
    userIdentifierSource: {
      type: "string",
      enum: ["UNSPECIFIED", "UNKNOWN", "FIRST_PARTY", "THIRD_PARTY"],
    },
    hashedEmail: { type: "string" },
    hashedPhoneNumber: { type: "string" },
    mobileId: { type: "string" },
    thirdPartyUserId: { type: "string" },
    addressInfo: {
      type: "object",
      properties: {
        hashedFirstName: { type: "string" },
        hashedLastName: { type: "string" },
        city: { type: "string" },
        state: { type: "string" },
        countryCode: { type: "string" },
        postalCode: { type: "string" },
        hashedStreetAddress: { type: "string" },
      },
    },
  },
};
