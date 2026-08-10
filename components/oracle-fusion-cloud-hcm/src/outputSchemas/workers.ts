export const workerRecordOutputSchema = {
  type: "object" as const,
  properties: {
    PersonId: { type: "integer" },
    PersonNumber: { type: ["string", "null"] },
    DisplayName: { type: ["string", "null"] },
    FullName: { type: ["string", "null"] },
    DateOfBirth: { type: ["string", "null"] },
    CreationDate: { type: ["string", "null"] },
    LastUpdateDate: { type: ["string", "null"] },
  },
  required: [],
};
export const workerOutputSchema = {
  type: "object" as const,
  properties: {
    PersonId: { type: "integer" },
    PersonNumber: { type: "string" },
    DisplayName: { type: ["string", "null"] },
    FirstName: { type: ["string", "null"] },
    LastName: { type: "string" },
    FullName: { type: ["string", "null"] },
    WorkEmail: { type: ["string", "null"] },
    CreationDate: { type: ["string", "null"] },
    LastUpdateDate: { type: ["string", "null"] },
  },
  required: ["PersonNumber", "LastName"],
};
export const listWorkersOutputSchema = {
  type: "object" as const,
  properties: {
    items: { type: "array", items: workerRecordOutputSchema },
    count: { type: "integer" },
    hasMore: { type: "boolean" },
    limit: { type: "integer" },
    offset: { type: "integer" },
  },
  required: ["items", "count", "hasMore", "limit", "offset"],
};
export const listPublicWorkersOutputSchema = {
  type: "object" as const,
  properties: {
    items: { type: "array", items: workerOutputSchema },
    count: { type: "integer" },
    hasMore: { type: "boolean" },
    limit: { type: "integer" },
    offset: { type: "integer" },
  },
  required: ["items", "count", "hasMore", "limit", "offset"],
};
