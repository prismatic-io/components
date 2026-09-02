import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { toOptionalNumber, toOptionalString } from "../util";
import {
  additionalFields,
  connection,
  cursorPagination,
  customFields,
  fetchAll,
} from "./common";
const companyIdRequired = input({
  label: "Company ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the company.",
  clean: util.types.toString,
  dataSource: "selectCompany",
  placeholder: "Enter company ID",
  example: "553c3ef8b8cdcd1501ba1111",
});
const companyName = input({
  label: "Name",
  type: "string",
  required: false,
  comments: "The company name (0-100 characters).",
  clean: toOptionalString,
  placeholder: "Enter company name",
  example: "Acme Corp",
});
const monthlySpend = input({
  label: "Monthly Spend",
  type: "string",
  required: false,
  comments: "Monthly recurring revenue in dollars.",
  clean: toOptionalNumber,
  placeholder: "Enter monthly spend",
  example: "5000",
});
const companySearch = input({
  label: "Search",
  type: "string",
  required: false,
  comments: "Search term to filter companies.",
  clean: toOptionalString,
  placeholder: "Enter search term",
  example: "Acme",
});
const segment = input({
  label: "Segment",
  type: "string",
  required: false,
  comments:
    "Restricts results to companies in a single segment, matched exactly against the segment name.",
  clean: toOptionalString,
  placeholder: "Enter segment",
  example: "enterprise",
});
export const listCompaniesInputs = {
  connection,
  companySearch,
  segment,
  fetchAll,
  pagination: cursorPagination,
};
const updateCompanyAdditionalFields = structuredObjectInput({
  label: "Additional Fields",
  required: false,
  comments:
    "Additional optional fields: includes Monthly Spend, Custom Fields, and Additional Fields.",
  inputs: { monthlySpend, customFields, additionalFields },
});
export const updateCompanyInputs = {
  connection,
  companyIdRequired,
  companyName,
  additionalFields: updateCompanyAdditionalFields,
};
export const deleteCompanyInputs = { connection, companyIdRequired };
export const selectCompanyInputs = { connection };
