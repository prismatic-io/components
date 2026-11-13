export const listGroupsOutputSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    value: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          deletedDateTime: { type: ["string", "null"], format: "date-time" },
          classification: { type: ["string", "null"] },
          createdDateTime: { type: "string", format: "date-time" },
          description: { type: ["string", "null"] },
          displayName: { type: "string" },
          expirationDateTime: {
            type: ["string", "null"],
            format: "date-time",
          },
          groupTypes: { type: "array", items: { type: "string" } },
          isAssignableToRole: { type: ["boolean", "null"] },
          mail: { type: ["string", "null"] },
          mailEnabled: { type: "boolean" },
          mailNickname: { type: "string" },
          membershipRule: { type: ["string", "null"] },
          membershipRuleProcessingState: { type: ["string", "null"] },
          onPremisesLastSyncDateTime: {
            type: ["string", "null"],
            format: "date-time",
          },
          onPremisesSecurityIdentifier: { type: ["string", "null"] },
          onPremisesSyncEnabled: { type: ["boolean", "null"] },
          onPremisesProvisioningErrors: {
            type: "array",
            items: {
              type: "object",
              properties: {
                category: { type: "string" },
                occurredDateTime: { type: "string", format: "date-time" },
                propertyCausingError: { type: "string" },
                value: { type: "string" },
              },
            },
          },
          preferredDataLocation: { type: ["string", "null"] },
          preferredLanguage: { type: ["string", "null"] },
          proxyAddresses: { type: "array", items: { type: "string" } },
          renewedDateTime: { type: "string", format: "date-time" },
          resourceBehaviorOptions: { type: "array", items: { type: "string" } },
          resourceProvisioningOptions: {
            type: "array",
            items: { type: "string" },
          },
          securityEnabled: { type: "boolean" },
          theme: { type: ["string", "null"] },
          visibility: {
            type: ["string", "null"],
            enum: ["Private", "Public", "HiddenMembership", null],
          },
        },
        required: ["id"],
      },
    },
    "@odata.nextLink": { type: "string" },
  },
  required: ["value"],
};
