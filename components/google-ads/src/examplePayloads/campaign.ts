export const campaignOperationsExampleInput = [
  {
    create: {
      name: "Example Campaign",
      advertisingChannelType: "SEARCH",
      status: "PAUSED",
      campaignBudget: "customers/1234567890/campaignBudgets/9876543210",
      manualCpc: {},
      containsEuPoliticalAdvertising:
        "DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING",
    },
  },
  {
    updateMask: "status",
    update: {
      resourceName: "customers/1234567890/campaigns/1122334455",
      status: "ENABLED",
    },
  },
  {
    remove: "customers/1234567890/campaigns/2233445566",
  },
];

export const campaignCriteriaOperationsExampleInput = [
  {
    create: {
      campaign: "customers/1234567890/campaigns/1122334455",
      location: {
        geoTargetConstant: "geoTargetConstants/1014044",
      },
    },
  },
  {
    updateMask: "bidModifier",
    update: {
      resourceName:
        "customers/1234567890/campaignCriteria/1122334455~987654321",
      bidModifier: 1.5,
    },
  },
  {
    remove: "customers/1234567890/campaignCriteria/1122334455~2233445566",
  },
];

export const mutateCampaignExamplePayload = {
  data: {
    results: [
      {
        resourceName: "customers/1234567890/campaigns/9876543210",
      },
    ],
  },
};

export const mutateCampaignCriteriaExamplePayload = {
  data: {
    results: [
      {
        resourceName: "customers/1234567890/campaignCriteria/9876543210~123456",
      },
    ],
  },
};
