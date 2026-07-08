import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import {
  toNumberArray,
  toOptionalBoolean,
  toOptionalNumber,
  toOptionalString,
  toStringArray,
} from "../../util/clean";
import {
  department_id,
  external_department_id,
  job_id,
  requisition_id,
  status,
} from "../v1/common";
import { office_id } from "../v1/jobs";
import {
  anywhere,
  how_to_sell_this_job,
  job_name,
  job_post_name,
  notes,
  number_of_openings,
  team_and_responsibilities,
  template_job_id,
} from "../v1/jobs";
import {
  connectionInput,
  createdAtGte,
  createdAtLte,
  cursorPaginationInputs,
  customFieldsV3,
  updatedAtGte,
  updatedAtLte,
} from "./common";
export const jobId = {
  ...job_id,
  required: true,
  comments: "The numeric ID of the job.",
  example: "107761",
  dataSource: "jobsV3",
  clean: util.types.toString,
};
const ids = input({
  label: "Job IDs",
  type: "string",
  required: false,
  comments:
    "Comma-separated list of specific job IDs to fetch. Maximum 50 items.",
  placeholder: "Enter job IDs",
  example: "107761,107762",
  clean: toOptionalString,
});
const departmentId = {
  ...department_id,
  comments:
    "The Greenhouse department ID. In v3 each job has a single department (not an array).",
  dataSource: "departmentsV3",
  clean: toOptionalNumber,
};
const officeId = {
  ...office_id,
  comments:
    "Filter by office ID. Returns jobs that include this office in their office_ids array.",
  dataSource: "officesV3",
  clean: toOptionalNumber,
};
const confidential = input({
  label: "Confidential",
  type: "boolean",
  required: false,
  comments:
    "Filter legacy confidential jobs. When true, returns only confidential jobs.",
  clean: toOptionalBoolean,
});
const officeIds = input({
  label: "Office IDs",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "Greenhouse office IDs to assign to this job. In v3 this is an integer array. Mutually exclusive with External Office IDs.",
  placeholder: "Enter office ID",
  example: "50891",
  dataSource: "officesV3",
  clean: toNumberArray,
});
const externalOfficeIds = input({
  label: "External Office IDs",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "Partner external identifiers for offices. Mutually exclusive with Office IDs; provide one or the other, never both.",
  placeholder: "Enter external office ID",
  example: "ext-office-1",
  clean: toStringArray,
});
const externalDepartmentId = {
  ...external_department_id,
  comments:
    "Partner external identifier for the department. Mutually exclusive with Department ID; provide one or the other, never both.",
  example: "ext-dept-42",
};
const openingIds = input({
  label: "Opening IDs",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "Partner identifiers for each opening created, positionally paired with the openings. Must match the Number of Openings count when provided.",
  placeholder: "Enter opening ID",
  example: "OP-2026-001",
  clean: toStringArray,
});
const idFilters = structuredObjectInput({
  label: "ID Filters",
  required: false,
  comments:
    "Optional filters that narrow results to jobs matching specific record IDs: job, department, and office IDs.",
  inputs: { ids, departmentId, officeId },
});
const dateRangeFilters = structuredObjectInput({
  label: "Date Range Filters",
  required: false,
  comments:
    "Optional inclusive date-range filters. Narrow results by when jobs were created or last updated.",
  inputs: { createdAtGte, createdAtLte, updatedAtGte, updatedAtLte },
});
export const listJobsV3Inputs = {
  connection: connectionInput,
  ...cursorPaginationInputs,
  idFilters,
  requisitionId: {
    ...requisition_id,
    comments:
      "Filter by external requisition identifier. Non-unique; may match multiple jobs across the organization.",
  },
  status: {
    ...status,
    comments: "Filter by job lifecycle status. One of: open, draft, or closed.",
    example: "open",
  },
  confidential,
  dateRangeFilters,
};
export const getJobV3Inputs = {
  connection: connectionInput,
  jobId,
};
export const createJobV3Inputs = {
  connection: connectionInput,
  templateJobId: { ...template_job_id, dataSource: "jobsV3" },
  numberOfOpenings: {
    ...number_of_openings,
    comments:
      "The number of openings to create for this job. The total open openings across the job cannot exceed 100.",
    clean: util.types.toNumber,
  },
  jobName: job_name,
  jobPostName: job_post_name,
  notes,
  requisitionId: {
    ...requisition_id,
    comments:
      "Partner-supplied external identifier for this job. Free-form string; non-unique across the organization.",
    example: "REQ-2026-001",
  },
  departmentId: {
    ...departmentId,
    comments:
      "The Greenhouse department ID to assign to this job. In v3 each job has a single department (not an array). If omitted, inherits from the template.",
  },
  externalDepartmentId,
  officeIds: {
    ...officeIds,
    comments:
      "Greenhouse office IDs to assign to the new job. In v3 this is an integer array. If omitted, inherits from the template. Mutually exclusive with External Office IDs.",
  },
  externalOfficeIds,
  openingIds,
  customFields: {
    ...customFieldsV3,
    example:
      '[{"name_key": "target_salary", "value": {"amount": 120000, "currency_code": "USD"}}]',
  },
};
export const editJobV3Inputs = {
  connection: connectionInput,
  jobId,
  name: job_name,
  notes,
  requisitionId: {
    ...requisition_id,
    comments:
      "Partner-supplied external identifier. Pass null to clear. Free-form string; non-unique across the organization.",
    example: "REQ-2026-001",
  },
  teamAndResponsibilities: team_and_responsibilities,
  howToSellThisJob: how_to_sell_this_job,
  anywhere: {
    ...anywhere,
    comments:
      "When true, marks the job as remote-anywhere and clears office assignments. Cannot be combined with office_ids.",
    clean: toOptionalBoolean,
  },
  officeIds: {
    ...officeIds,
    comments:
      "Greenhouse office IDs to assign to this job. IMPORTANT: this is a WHOLESALE REPLACEMENT; the supplied list entirely replaces the existing office set. Send the complete desired list, not a delta.",
  },
  externalOfficeIds: {
    ...externalOfficeIds,
    comments:
      "Partner external identifiers for offices; wholesale replacement. Mutually exclusive with Office IDs.",
  },
  departmentId: {
    ...departmentId,
    comments:
      "The Greenhouse department ID to assign. In v3 each job has a single department. Pass null to clear.",
  },
  externalDepartmentId,
  customFields: {
    ...customFieldsV3,
    comments:
      "JSON array of custom field values. IMPORTANT: this is a WHOLESALE REPLACEMENT; the supplied array entirely replaces the existing custom field collection. Each item must include either name_key (string) or custom_field_id (integer), plus a value.",
    example:
      '[{"name_key": "target_salary", "value": {"amount": 130000, "currency_code": "USD"}}]',
  },
};
