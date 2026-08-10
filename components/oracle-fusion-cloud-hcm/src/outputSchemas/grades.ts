export const gradeOutputSchema = {
  type: "object" as const,
  properties: {
    GradeId: { type: "integer" },
    GradeCode: { type: ["string", "null"] },
    GradeName: { type: ["string", "null"] },
    SetId: { type: ["integer", "null"] },
    ActiveStatus: { type: ["string", "null"] },
    EffectiveStartDate: { type: ["string", "null"] },
    EffectiveEndDate: { type: ["string", "null"] },
  },
  required: [],
};
export const listGradesOutputSchema = {
  type: "object" as const,
  properties: {
    items: { type: "array", items: gradeOutputSchema },
    count: { type: "integer" },
    hasMore: { type: "boolean" },
    limit: { type: "integer" },
    offset: { type: "integer" },
  },
  required: ["items", "count", "hasMore", "limit", "offset"],
};
