import { input, util } from "@prismatic-io/spectral";
import { EMPLOYEE_TYPE_OPTIONS, STATUS_CODE_OPTIONS } from "../constants";
import { cleanString } from "../util";
import { connectionInput, paginationInputs } from "./common";
import { companyId } from "./employee";





export const jobId = input({
  label: "Job ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the job.",
  placeholder: "Enter job ID",
  example: "JOB-001",
  dataSource: "selectJob",
  clean: util.types.toString,
});

export const locationId = input({
  label: "Location ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the location.",
  placeholder: "Enter location ID",
  example: "LOC-001",
  dataSource: "selectLocation",
  clean: util.types.toString,
});

export const positionCode = input({
  label: "Position Code",
  type: "string",
  required: false,
  comments: "Filter positions by position code.",
  placeholder: "Enter position code",
  example: "ENG-SR",
  dataSource: "selectPosition",
  clean: cleanString,
});

export const employeeType = input({
  label: "Employee Type",
  type: "string",
  required: false,
  comments: "Filter by employee type (Full-Time, Part-Time, Contractor, Temporary).",
  placeholder: "Select employee type",
  example: "FT",
  model: EMPLOYEE_TYPE_OPTIONS,
  clean: cleanString,
});

export const payGroupCode = input({
  label: "Pay Group Code",
  type: "string",
  required: false,
  comments: "Filter by pay group code (e.g., WEEKLY, BIWEEKLY, MONTHLY).",
  placeholder: "Enter pay group code",
  example: "WEEKLY",
  clean: cleanString,
});

export const statusCode = input({
  label: "Status Code",
  type: "string",
  required: false,
  comments: "Filter by employee status code (Active, Inactive, Terminated, Leave of Absence).",
  placeholder: "Select status code",
  example: "A",
  model: STATUS_CODE_OPTIONS,
  clean: cleanString,
});

export const projectCode = input({
  label: "Project Code",
  type: "string",
  required: false,
  comments: "Filter by project code.",
  placeholder: "Enter project code",
  example: "PROJ-001",
  clean: cleanString,
});

export const shiftGroupCode = input({
  label: "Shift Group Code",
  type: "string",
  required: false,
  comments: "Filter by shift group code (e.g., DAY, NIGHT, SWING).",
  placeholder: "Enter shift group code",
  example: "DAY",
  clean: cleanString,
});

export const countryCode = input({
  label: "Country Code",
  type: "string",
  required: false,
  comments: "Filter locations by country code (e.g., US, CA, GB).",
  placeholder: "Enter country code",
  example: "US",
  clean: cleanString,
});

export const isActive = input({
  label: "Is Active",
  type: "boolean",
  required: false,
  comments: "When true, filters to only active jobs.",
  clean: util.types.toBool,
});

export const isProrated = input({
  label: "Is Prorated",
  type: "boolean",
  required: false,
  comments: "When true, filters to only prorated employee positions.",
  clean: util.types.toBool,
});

export const isApproved = input({
  label: "Is Approved",
  type: "boolean",
  required: false,
  comments: "When true, filters to only approved employee positions.",
  clean: util.types.toBool,
});

export const isElegibleForBenefits = input({
  label: "Is Eligible For Benefits",
  type: "boolean",
  required: false,
  comments: "When true, filters to only employee positions eligible for benefits.",
  clean: util.types.toBool,
});

export const companyCode = input({
  label: "Company Code",
  type: "string",
  required: false,
  comments: "Filter by company code.",
  placeholder: "Enter company code",
  example: "COMP-001",
  clean: cleanString,
});

export const masterCompanyId = input({
  label: "Master Company ID",
  type: "string",
  required: false,
  comments: "Filter by master company ID.",
  placeholder: "Enter master company ID",
  example: "MCOMP-001",
  clean: cleanString,
});

export const isMasterCompany = input({
  label: "Is Master Company",
  type: "boolean",
  required: false,
  comments: "When true, filters to only master companies.",
  clean: util.types.toBool,
});





export const getJobInputs = {
  connection: connectionInput,
  jobId,
};

export const getSingleLocationInputs = {
  connection: connectionInput,
  locationId,
};

export const listJobsInputs = {
  connection: connectionInput,
  companyId,
  ...paginationInputs,
};

export const listCompaniesInputs = {
  connection: connectionInput,
  companyId: {
    ...companyId,
    required: false,
  },
  masterCompanyId,
  companyCode,
  isMasterCompany,
  ...paginationInputs,
};

export const listLocationsInputs = {
  connection: connectionInput,
  countryCode,
  isActive,
};

export const listPositionsInputs = {
  companyId,
  employeeType,
  payGroupCode,
  statusCode,
  positionCode,
  projectCode,
  shiftGroupCode,
  isProrated,
  isApproved,
  isElegibleForBenefits,
  ...paginationInputs,
  connection: connectionInput,
};
