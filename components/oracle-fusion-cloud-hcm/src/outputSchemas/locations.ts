export const locationOutputSchema = {
  type: "object" as const,
  properties: {
    LocationId: { type: "integer" },
    LocationCode: { type: "string" },
    LocationName: { type: "string" },
    SetId: { type: "integer" },
    SetCode: { type: "string" },
    SetName: { type: "string" },
    ActiveStatus: { type: ["string", "null"] },
    Description: { type: ["string", "null"] },
    EffectiveStartDate: { type: "string" },
    EffectiveEndDate: { type: "string" },
    addresses: { type: "array", items: { type: "object" } },
    LastUpdateDate: { type: ["string", "null"] },
  },
  required: [
    "LocationId",
    "LocationCode",
    "LocationName",
    "SetId",
    "SetCode",
    "SetName",
    "EffectiveStartDate",
    "EffectiveEndDate",
  ],
};
export const listLocationsOutputSchema = {
  type: "object" as const,
  properties: {
    items: { type: "array", items: locationOutputSchema },
    count: { type: "integer" },
    hasMore: { type: "boolean" },
    limit: { type: "integer" },
    offset: { type: "integer" },
  },
  required: ["items", "count", "hasMore", "limit", "offset"],
};
