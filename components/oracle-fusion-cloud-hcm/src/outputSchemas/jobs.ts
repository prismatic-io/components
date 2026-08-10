export const jobOutputSchema = {
  type: "object" as const,
  properties: {
    JobId: { type: "integer" },
    JobCode: { type: ["string", "null"] },
    Name: { type: "string" },
    SetId: { type: "integer" },
    ActiveStatus: { type: ["string", "null"] },
    JobFamilyId: { type: ["integer", "null"] },
    EffectiveStartDate: { type: ["string", "null"] },
    EffectiveEndDate: { type: ["string", "null"] },
    LastUpdateDate: { type: ["string", "null"] },
  },
  required: ["Name", "SetId"],
};
export const listJobsOutputSchema = {
  type: "object" as const,
  properties: {
    items: { type: "array", items: jobOutputSchema },
    count: { type: "integer" },
    hasMore: { type: "boolean" },
    limit: { type: "integer" },
    offset: { type: "integer" },
  },
  required: ["items", "count", "hasMore", "limit", "offset"],
};
