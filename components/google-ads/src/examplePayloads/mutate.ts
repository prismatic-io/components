export const mutateResourcesExamplePayload = {
  data: {
    mutateOperationResponses: [
      {
        campaignBudgetResult: {
          resourceName: "customers/1234567890/campaignBudgets/9876543210",
        },
      },
      {
        campaignResult: {
          resourceName: "customers/1234567890/campaigns/1122334455",
        },
      },
      {
        adGroupResult: {
          resourceName: "customers/1234567890/adGroups/5566778899",
        },
      },
      {
        adGroupCriterionResult: {
          resourceName:
            "customers/1234567890/adGroupCriteria/5566778899~123456789",
        },
      },
    ],
  },
};
