






export const listPoliciesExamplePayload = {
  data: [
    {
      type: "ACCESS_POLICY",
      id: "policyId",
      status: "ACTIVE",
      name: "Policy name",
      description: "Policy description",
      priority: 1,
      system: true,
      conditions: null,
      created: "2024-04-25T17:35:02.000Z",
      lastUpdated: "2024-04-25T17:35:02.000Z",
      _links: {
        self: {
          href: "https://{yourOktaDomain}/api/v1/policies/{policyId}",
          hints: {
            allow: ["GET", "PUT"],
          },
        },
        rules: {
          href: "https://{yourOktaDomain}/api/v1/policies/{policyId}/rules",
          hints: {
            allow: ["GET", "POST"],
          },
        },
      },
    },
  ],
};
