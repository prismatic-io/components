import { input, structuredObjectInput } from "@prismatic-io/spectral";
import { cleanId, cleanOptionalNumber, cleanString } from "../util/transforms";
import {
  additionalFields,
  connection,
  fetchAll,
  includeMetadataLinks,
  pagination,
  personId as personIdFilter,
} from "./common";
const absenceEntryId = input({
  label: "Absence Entry ID",
  type: "string",
  required: true,
  comments:
    "The unique numeric identifier for the Oracle HCM absence entry (AbsenceEntryId).",
  placeholder: "Enter absence entry ID",
  example: "300100012345678",
  clean: cleanId,
});
const personId = input({
  label: "Person ID",
  type: "string",
  required: false,
  comments: "The person the absence belongs to (personId).",
  placeholder: "Enter person ID",
  example: "100000012345678",
  clean: cleanOptionalNumber,
});
const absenceTypeId = input({
  label: "Absence Type ID",
  type: "string",
  required: false,
  comments: "The identifier of the absence type (absenceTypeId).",
  placeholder: "Enter absence type ID",
  example: "300100000000001",
  clean: cleanOptionalNumber,
});
const legalEntityId = input({
  label: "Legal Entity ID",
  type: "string",
  required: false,
  comments:
    "The employer/legal entity the absence is recorded against (legalEntityId).",
  placeholder: "Enter legal entity ID",
  example: "300100000000002",
  clean: cleanOptionalNumber,
});
const startDate = input({
  label: "Start Date",
  type: "string",
  required: false,
  comments: "The absence start date, in YYYY-MM-DD format.",
  placeholder: "Enter start date (YYYY-MM-DD)",
  example: "2024-06-01",
  clean: cleanString,
});
const endDate = input({
  label: "End Date",
  type: "string",
  required: false,
  comments: "The absence end date, in YYYY-MM-DD format.",
  placeholder: "Enter end date (YYYY-MM-DD)",
  example: "2024-06-05",
  clean: cleanString,
});
const duration = input({
  label: "Duration",
  type: "string",
  required: false,
  comments:
    "The total duration of the absence, in the specified unit of measure.",
  placeholder: "Enter duration",
  example: "5",
  clean: cleanOptionalNumber,
});
const unitOfMeasure = input({
  label: "Unit of Measure",
  type: "string",
  required: false,
  comments: "The unit the duration is expressed in (e.g. DAYS or HOURS).",
  placeholder: "Enter unit of measure",
  example: "DAYS",
  clean: cleanString,
});
const absenceReason = input({
  label: "Absence Reason",
  type: "string",
  required: false,
  comments: "The reason for the absence.",
  placeholder: "Enter absence reason",
  example: "Vacation",
  clean: cleanString,
});
const absenceStatusCd = input({
  label: "Absence Status Code",
  type: "string",
  required: false,
  comments:
    "The status of the absence entry. Defaults to SUBMITTED on the API.",
  placeholder: "Enter absence status code",
  example: "SUBMITTED",
  clean: cleanString,
});
const comments = input({
  label: "Comments",
  type: "string",
  required: false,
  comments: "Free-text comments about the absence.",
  placeholder: "Enter comments",
  example: "Annual leave",
  clean: cleanString,
});
const absenceDetails = structuredObjectInput({
  label: "Absence Details",
  required: false,
  comments:
    "Optional absence fields: includes Start Date, End Date, Duration, Unit of Measure, Absence Reason, Absence Status Code, and Comments.",
  inputs: {
    startDate,
    endDate,
    duration,
    unitOfMeasure,
    absenceReason,
    absenceStatusCd,
    comments,
  },
});
export const createAbsenceInputs = {
  connection,
  personId: { ...personId, required: true },
  absenceTypeId: { ...absenceTypeId, required: true },
  legalEntityId: { ...legalEntityId, required: true },
  absenceDetails,
  additionalFields,
};
export const deleteAbsenceInputs = {
  connection,
  absenceEntryId,
};
export const getAbsenceInputs = {
  connection,
  absenceEntryId,
  includeMetadataLinks,
};
export const listAbsencesInputs = {
  connection,
  fetchAll,
  pagination,
  personId: {
    ...personIdFilter,
    required: false,
    comments:
      "Filter absences by Person ID. Omit to retrieve absences across all workers.",
  },
  includeMetadataLinks,
};
export const updateAbsenceInputs = {
  connection,
  absenceEntryId,
  personId,
  absenceTypeId,
  legalEntityId,
  absenceDetails,
  additionalFields,
};
