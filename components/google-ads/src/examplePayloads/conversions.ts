export const externalAttributionDataExampleInput = {
  externalAttributionCredit: 0.75,
  externalAttributionModel: "LINEAR",
};

export const customVariableExampleInput = {
  conversionCustomVariable:
    "customers/1234567890/conversionCustomVariables/11111",
  value: "premium_tier",
};

export const cartDataItemExampleInput = {
  productId: "SKU-12345",
  quantity: 2,
  unitPrice: 49.99,
};

export const cartDataExampleInput = {
  merchantId: "1234567",
  feedCountryCode: "US",
  feedLanguageCode: "EN",
  localTransactionCost: 5.99,
  items: [cartDataItemExampleInput],
};

export const offlineUserAddressInfoExampleInput = {
  hashedFirstName:
    "a8cfcd74832004951b4408cdb0a5dbcd8c7e52d43f7fe244bf720582e05241da",
  hashedLastName:
    "2c624232cdd221771294dfbb310aca000a0df6ac8b166e8b32c4bdc2a5a5cc0a",
  city: "San Francisco",
  state: "CA",
  countryCode: "US",
  postalCode: "94105",
  hashedStreetAddress:
    "d4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35",
};

export const userIdentifierExampleInput = {
  userIdentifierSource: "FIRST_PARTY",
  hashedEmail:
    "a1159e9df3670d549d04524532629f5477ceb7deec9b45e47e8c009506ecb2c8",
  hashedPhoneNumber:
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  mobileId: "cdda802e-fb9c-47ad-0794d394c913",
  thirdPartyUserId: "ext-user-98765",
  addressInfo: offlineUserAddressInfoExampleInput,
};

export const consentExampleInput = {
  adUserData: "GRANTED",
  adPersonalization: "GRANTED",
};

export const clickConversionsExampleInput = [
  {
    gbraid: "CjwKCAjwABCDEF1234567890ghijklMNOPQRstuvwxyz",
    wbraid: "CjwKCAjwZYXWVU0987654321LKJIHGfedcbaSTUVWXqr",
    externalAttributionData: externalAttributionDataExampleInput,
    customVariables: [customVariableExampleInput],
    cartData: cartDataExampleInput,
    userIdentifiers: [userIdentifierExampleInput],
    conversionEnvironment: "WEB",
    consent: consentExampleInput,
    gclid: "CjwKCAjw1234567890abcdefGHIJKLmnoPQRStuvwxyz",
    conversionAction: "customers/1234567890/conversionActions/987654321",
    conversionDateTime: "2026-01-15 10:30:00-05:00",
    conversionValue: 149.99,
    currencyCode: "USD",
    orderId: "ORDER-2026-00123",
  },
];

export const ingestOfflineConversionsExamplePayload = {
  data: {
    requestId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    fieldWarnings: [
      {
        reason: "WARNING_REASON_CUSTOM_VARIABLE_NOT_ENABLED",
        description:
          "The custom variable is not enabled in the destination account.",
        field: "events[0].custom_variables[0]",
      },
    ],
  },
};

const uploadConversionsPartialFailureError = {
  code: 3,
  message:
    "Multiple errors in 'conversions' field. Details are provided in the 'details' field.",
  details: [
    {
      "@type":
        "type.googleapis.com/google.ads.googleads.v25.errors.GoogleAdsFailure",
      errors: [
        {
          errorCode: {
            conversionUploadError: "INVALID_CONVERSION_ACTION",
          },
          message: "The conversion action specified in the request is invalid.",
          location: {
            fieldPathElements: [
              { fieldName: "conversions", index: 0 },
              { fieldName: "conversionAction" },
            ],
          },
        },
      ],
    },
  ],
};

export const uploadCallConversionsExamplePayload = {
  data: {
    partialFailureError: uploadConversionsPartialFailureError,
    results: [
      {
        callerId: "+18005551234",
        callStartDateTime: "2026-01-15 09:30:00-05:00",
        conversionAction: "customers/1234567890/conversionActions/987654321",
        conversionDateTime: "2026-01-15 10:30:00-05:00",
      },
    ],
  },
};

export const uploadClickConversionsExamplePayload = {
  data: {
    partialFailureError: uploadConversionsPartialFailureError,
    results: [
      {
        gclid: "CjwKCAjw1234567890abcdefGHIJKLmnoPQRStuvwxyz",
        conversionAction: "customers/1234567890/conversionActions/987654321",
        conversionDateTime: "2026-01-15 10:30:00-05:00",
        userIdentifiers: [
          {
            userIdentifierSource: "FIRST_PARTY",
            hashedEmail:
              "a1159e9df3670d549d04524532629f5477ceb7deec9b45e47e8c009506ecb2c8",
          },
        ],
      },
    ],
    jobId: "1234567890123456789",
  },
};
