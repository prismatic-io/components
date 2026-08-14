export const campaignOutputSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    description: { type: "string" },
    campaignCode: { type: "string" },
    color: { type: "string" },
    favorite: { type: "boolean" },
    createdDate: { type: "string" },
    modifiedDate: { type: "string" },
  },
  additionalProperties: true,
};
export const listCampaignsOutputSchema = {
  type: "object" as const,
  properties: {
    count: { type: "number" },
    page: { type: "number" },
    pageSize: { type: "number" },
    links: {
      type: "object",
      properties: {
        self: {
          type: "object",
          properties: { href: { type: "string" } },
          additionalProperties: true,
        },
      },
      additionalProperties: true,
    },
    items: { type: "array", items: campaignOutputSchema },
  },
  additionalProperties: true,
};
