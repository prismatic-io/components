export const ingestAudienceMembersExamplePayload = {
  data: {
    requestId: "126365e1-16d0-4c81-9de9-f362711e250a",
  },
};

export const removeAudienceMembersExamplePayload = {
  data: {
    requestId: "8f1d2c3b-4a5e-46f7-8a9b-0c1d2e3f4a5b",
  },
};

export const getRequestStatusExamplePayload = {
  data: {
    requestStatusPerDestination: [
      {
        destination: {
          operatingAccount: {
            accountType: "GOOGLE_ADS",
            accountId: "1234567890",
          },
          productDestinationId: "9876543210",
        },
        requestStatus: "SUCCESS",
        audienceMembersIngestionStatus: {
          userDataIngestionStatus: {
            recordCount: "250",
            userIdentifierCount: "480",
            uploadMatchRateRange: "MATCH_RATE_RANGE_61_TO_70",
          },
        },
      },
    ],
  },
};

export const selectUserListDataSourceExamplePayload = {
  result: [
    { label: "Newsletter Subscribers - 9876543210", key: "9876543210" },
    { label: "Past Purchasers - 9876543211", key: "9876543211" },
  ],
};
