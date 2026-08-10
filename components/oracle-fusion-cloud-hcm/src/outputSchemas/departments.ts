export const departmentOutputSchema = {
  type: "object" as const,
  properties: {
    OrganizationId: { type: "integer" },
    Name: { type: ["string", "null"] },
    OrganizationCode: { type: ["string", "null"] },
    Status: { type: ["string", "null"] },
    EffectiveStartDate: { type: ["string", "null"] },
    EffectiveEndDate: { type: ["string", "null"] },
    LastUpdateDate: { type: ["string", "null"] },
  },
  required: [],
};
export const listDepartmentsOutputSchema = {
  type: "object" as const,
  properties: {
    items: { type: "array", items: departmentOutputSchema },
    count: { type: "integer" },
    hasMore: { type: "boolean" },
    limit: { type: "integer" },
    offset: { type: "integer" },
  },
  required: ["items", "count", "hasMore", "limit", "offset"],
};
