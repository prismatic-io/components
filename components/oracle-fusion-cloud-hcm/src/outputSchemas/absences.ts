export const absenceOutputSchema = {
  type: "object" as const,
  properties: {
    personAbsenceEntryId: { type: "integer" },
    personId: { type: "integer" },
    absenceTypeId: { type: "integer" },
    absenceType: { type: ["string", "null"] },
    legalEntityId: { type: "integer" },
    absenceStatusCd: { type: ["string", "null"] },
    approvalStatusCd: { type: ["string", "null"] },
    startDate: { type: ["string", "null"] },
    endDate: { type: ["string", "null"] },
    duration: { type: ["number", "null"] },
    unitOfMeasure: { type: ["string", "null"] },
    assignmentId: { type: ["integer", "null"] },
  },
  required: [
    "personAbsenceEntryId",
    "personId",
    "absenceTypeId",
    "legalEntityId",
  ],
};
export const listAbsencesOutputSchema = {
  type: "object" as const,
  properties: {
    items: { type: "array", items: absenceOutputSchema },
    count: { type: "integer" },
    hasMore: { type: "boolean" },
    limit: { type: "integer" },
    offset: { type: "integer" },
  },
  required: ["items", "count", "hasMore", "limit", "offset"],
};
