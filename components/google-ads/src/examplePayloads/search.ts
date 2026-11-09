export const searchAdsLocalServicesExamplePayload: { data: unknown } = {
  data: {
    results: [
      {
        campaign: {
          resourceName: "customers/1234567890/campaigns/9876543210",
          id: "9876543210",
          name: "Local Services Campaign",
          status: "ENABLED",
        },
      },
    ],
    nextPageToken: "CJL5XLT2PWDmIpGNGciABRnu",
    fieldMask:
      "campaign.resourceName,campaign.id,campaign.name,campaign.status",
    queryResourceConsumption: "74",
  },
};

export const searchStreamExamplePayload = {
  data: {
    results: [
      {
        campaign: {
          resourceName: "customers/1234567890/campaigns/1122334455",
          id: "1122334455",
          name: "Example Campaign",
          status: "ENABLED",
        },
      },
      {
        campaign: {
          resourceName: "customers/1234567890/campaigns/1122334456",
          id: "1122334456",
          name: "Example Campaign 2",
          status: "PAUSED",
        },
      },
    ],
    fieldMask: "campaign.id,campaign.name,campaign.status",
    requestId: "AbCdEfGhIjKlMnOpQrStUv",
  },
};
