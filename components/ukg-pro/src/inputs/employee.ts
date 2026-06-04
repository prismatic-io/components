import { input, util } from "@prismatic-io/spectral";
import { cleanString } from "../util";
import { connectionInput, dateRangeInputs, filterParameters, paginationInputs } from "./common";





export const employeeId = input({
  label: "Employee ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the employee in UKG Pro.",
  placeholder: "Enter employee ID",
  example: "12345",
  clean: util.types.toString,
});

export const companyId = input({
  label: "Company ID",
  type: "string",
  required: true,
  comments:
    "The 5-digit company identifier in UKG Pro. See [Company Access Code documentation](https://developer.ukg.com/hcm/docs/company-access-code) for details.",
  placeholder: "Enter company ID",
  example: "12345",
  dataSource: "selectCompany",
  clean: util.types.toString,
});





export const companyIds = input({
  label: "Company IDs",
  type: "string",
  required: false,
  comments: "Filter by one or more company IDs (comma-separated). Example: ABC,DEF,GHI",
  placeholder: "Enter company ID(s)",
  example: "ABC,DEF",
  clean: cleanString,
});

export const primaryJobCode = input({
  label: "Primary Job Code",
  type: "string",
  required: false,
  comments: "Filter by one or more primary job codes (comma-separated). Example: SW-ENG,MKT-MGR",
  placeholder: "Enter job code(s)",
  example: "SW-ENG,MKT-MGR",
  clean: cleanString,
});

export const primaryWorkLocationCode = input({
  label: "Primary Work Location Code",
  type: "string",
  required: false,
  comments: "Filter by one or more work location codes (comma-separated). Example: ATL-HQ,SF-WEST",
  placeholder: "Enter location code(s)",
  example: "ATL-HQ,SF-WEST",
  clean: cleanString,
});

export const primaryProjectCode = input({
  label: "Primary Project Code",
  type: "string",
  required: false,
  comments: "Filter by one or more project codes (comma-separated). Example: PROJ-001,PROJ-002",
  placeholder: "Enter project code(s)",
  example: "PROJ-001,PROJ-002",
  clean: cleanString,
});

export const deductionGroupCode = input({
  label: "Deduction Group Code",
  type: "string",
  required: false,
  comments: "Filter by one or more deduction group codes (comma-separated).",
  placeholder: "Enter deduction group code(s)",
  example: "DED-001,DED-002",
  clean: cleanString,
});

export const earningGroupCode = input({
  label: "Earning Group Code",
  type: "string",
  required: false,
  comments: "Filter by one or more earning group codes (comma-separated).",
  placeholder: "Enter earning group code(s)",
  example: "EARN-001,EARN-002",
  clean: cleanString,
});





export const listEmployeesInputs = {
  ...paginationInputs,
  ...dateRangeInputs,
  connection: connectionInput,
};

export const getAllEmploymentDetailsByCompanyInputs = {
  connection: connectionInput,
  companyId,
  ...paginationInputs,
  filterParameters,
};

export const getAllPersonDetailsInputs = {
  connection: connectionInput,
  companyId: { ...companyId, required: false },
  ...paginationInputs,
  filterParameters,
};

export const getEmployeeChangesByDateInputs = {
  connection: connectionInput,
  ...dateRangeInputs,
  ...paginationInputs,
};

export const getEmployeeChangesByIdInputs = {
  connection: connectionInput,
  employeeId,
};

export const getEmploymentContractDetailsInputs = {
  connection: connectionInput,
  companyId: { ...companyId, required: false },
  ...paginationInputs,
  filterParameters,
};

export const getEmployeeDemographicDetailsInputs = {
  connection: connectionInput,
  companyId: { ...companyId, required: false },
  ...paginationInputs,
  filterParameters,
};

export const getEmployeeEmploymentDetailsInputs = {
  connection: connectionInput,
  companyId: { ...companyId, required: false },
  employeeId: { ...employeeId, required: false },
  primaryJobCode,
  primaryWorkLocationCode,
  primaryProjectCode,
  deductionGroupCode,
  earningGroupCode,
  ...paginationInputs,
  filterParameters,
};

export const getEmployeeEmploymentDetailsByEmployeeIdAndCompanyIdInputs = {
  connection: connectionInput,
  companyId,
  employeeId,
  ...paginationInputs,
  filterParameters,
};

export const getEmployeeJobHistoryInputs = {
  connection: connectionInput,
  employeeId,
  ...paginationInputs,
};

export const getPersonDetailsByCompanyInputs = {
  connection: connectionInput,
  companyId,
  ...paginationInputs,
  filterParameters,
};
