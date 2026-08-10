import type { Absence, OracleHcmListResponse } from "../types";
const absenceExample: Absence = {
  personAbsenceEntryId: 300100012340020,
  personId: 300100012345678,
  absenceTypeId: 300100012340100,
  absenceType: "Vacation",
  legalEntityId: 300100012340900,
  absenceStatusCd: "SUBMITTED",
  approvalStatusCd: "APPROVED",
  startDate: "2024-07-01",
  endDate: "2024-07-05",
  duration: 5,
  unitOfMeasure: "DAYS",
  assignmentId: 300100012340003,
};
export const listAbsencesExamplePayload: {
  data: OracleHcmListResponse<Absence>;
} = {
  data: {
    items: [absenceExample],
    count: 1,
    hasMore: false,
    limit: 25,
    offset: 0,
  },
};
export const getAbsenceExamplePayload: {
  data: Absence;
} = { data: absenceExample };
export const createAbsenceExamplePayload: {
  data: Absence;
} = {
  data: {
    ...absenceExample,
    personAbsenceEntryId: 300100099990020,
    approvalStatusCd: "AWAIT",
  },
};
export const updateAbsenceExamplePayload: {
  data: Absence;
} = {
  data: { ...absenceExample, approvalStatusCd: "APPROVED" },
};
export const deleteAbsenceExamplePayload: {
  data: {
    id: string;
    status: string;
  };
} = {
  data: { id: "300100123456789", status: "DELETED" },
};
