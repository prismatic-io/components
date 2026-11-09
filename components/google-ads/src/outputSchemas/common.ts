export const googleRpcStatusSchema = {
  type: "object" as const,
  properties: {
    code: { type: "integer" },
    message: { type: "string" },
    details: { type: "array", items: { type: "object" } },
  },
};

export const fieldWarningSchema = {
  type: "object" as const,
  properties: {
    reason: {
      type: "string",
      enum: [
        "WARNING_REASON_UNSPECIFIED",
        "WARNING_REASON_CUSTOM_VARIABLE_NOT_ENABLED",
        "WARNING_REASON_CUSTOM_VARIABLE_NOT_PREDEFINED",
        "WARNING_REASON_CART_DATA_NOT_SUPPORTED_WITH_GBRAID_OR_WBRAID",
        "WARNING_REASON_CART_DATA_ITEM_MERCHANT_PRODUCT_ID_MISSING",
        "WARNING_REASON_CART_DATA_ITEM_UNIT_PRICE_MISSING",
        "WARNING_REASON_GENERIC",
        "WARNING_REASON_INVALID_CLIENT_ID",
        "WARNING_REASON_INVALID_SUBDIVISION_CODE",
        "WARNING_REASON_INVALID_REGION_CODE",
        "WARNING_REASON_INVALID_SUBCONTINENT_CODE",
        "WARNING_REASON_INVALID_CONTINENT_CODE",
        "WARNING_REASON_INVALID_DEVICE_CATEGORY",
        "WARNING_REASON_INVALID_DEVICE_SCREEN_RESOLUTION",
        "WARNING_REASON_INVALID_MERCHANT_ID",
      ],
    },
    description: { type: "string" },
    field: { type: "string" },
  },
};

export const mutateResourceNameResultSchema = {
  type: "object" as const,
  properties: {
    resourceName: { type: "string" },
  },
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
