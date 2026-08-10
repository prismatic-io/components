export const positionOutputSchema = {
  type: "object" as const,
  properties: {
    PositionId: { type: "integer" },
    Name: { type: "string" },
    PositionCode: { type: ["string", "null"] },
    BusinessUnitId: { type: "integer" },
    DepartmentId: { type: "integer" },
    JobId: { type: "integer" },
    LocationId: { type: ["integer", "null"] },
    PositionType: {
      type: ["string", "null"],
      enum: ["SINGLE", "pooled", null],
    },
    HiringStatus: {
      type: ["string", "null"],
      enum: ["PROPOSED", "frozen", "approved", null],
    },
    ActiveStatus: { type: ["string", "null"] },
    EffectiveStartDate: { type: "string" },
    EffectiveEndDate: { type: "string" },
  },
  required: [
    "PositionId",
    "Name",
    "BusinessUnitId",
    "DepartmentId",
    "JobId",
    "EffectiveStartDate",
    "EffectiveEndDate",
  ],
};
export const listPositionsOutputSchema = {
  type: "object" as const,
  properties: {
    items: { type: "array", items: positionOutputSchema },
    count: { type: "integer" },
    hasMore: { type: "boolean" },
    limit: { type: "integer" },
    offset: { type: "integer" },
  },
  required: ["items", "count", "hasMore", "limit", "offset"],
};
