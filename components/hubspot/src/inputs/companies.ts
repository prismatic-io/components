import { input, util } from "@prismatic-io/spectral";
import { toOptionalString } from "../util";
import {
  additionalProperties,
  archived,
  associationsList,
  connectionInput,
  description,
  dynamicValues,
  fetchAll,
  fieldValues,
  pagination,
  timeout,
} from "./common";
const companyId = input({
  label: "Company ID",
  type: "string",
  required: true,
  placeholder: "Enter Company ID",
  example: "097829",
  dataSource: "selectCompany",
  comments: "The unique identifier of the company.",
  clean: util.types.toString,
});
const companyName = input({
  label: "Company Name",
  type: "string",
  required: true,
  placeholder: "Enter company name",
  example: "Acme Inc.",
  comments: "The display name for the company record.",
  clean: util.types.toString,
});
const updateCompanyName = input({
  label: "Company Name",
  type: "string",
  required: false,
  placeholder: "Enter company name",
  example: "Acme Inc.",
  comments: "The updated display name for the company.",
  clean: toOptionalString,
});
const companyPhone = input({
  label: "Phone",
  type: "string",
  required: false,
  placeholder: "Enter phone number",
  example: "(800) 555-1515",
  comments: "The primary contact phone number for the company.",
  clean: toOptionalString,
});
const domain = input({
  label: "Domain",
  type: "string",
  required: true,
  placeholder: "Enter domain",
  example: "www.example.com",
  comments:
    "The company's web domain, used for deduplication and enrichment (e.g. example.com).",
  clean: util.types.toString,
});
const updateDomain = input({
  label: "Domain",
  type: "string",
  required: false,
  placeholder: "Enter domain",
  example: "www.example.com",
  comments: "The updated web domain for the company.",
  clean: toOptionalString,
});
const city = input({
  label: "City",
  type: "string",
  required: false,
  placeholder: "Enter city",
  example: "Atherton",
  comments: "The city where the company is headquartered.",
  clean: toOptionalString,
});
const industry = input({
  label: "Industry",
  type: "string",
  required: false,
  placeholder: "Enter industry",
  example: "Software",
  comments:
    "The company's industry classification, such as Software or Manufacturing.",
  clean: toOptionalString,
});
const state = input({
  label: "State",
  type: "string",
  required: false,
  placeholder: "Enter state",
  example: "California",
  comments: "The state or region where the company is located.",
  clean: toOptionalString,
});
export const listCompaniesInputs = {
  hubspotConnection: connectionInput,
  additionalProperties,
  associationsList,
  archived,
  timeout,
  fetchAll,
  pagination,
};
export const createCompanyInputs = {
  companyName,
  industry,
  companyPhone,
  description,
  domain: { ...domain, required: false, clean: toOptionalString },
  city,
  state,
  fieldValues,
  dynamicValues,
  timeout,
  hubspotConnection: connectionInput,
};
export const updateCompanyInputs = {
  companyId,
  updateCompanyName,
  industry,
  description,
  companyPhone,
  updateDomain,
  city,
  state,
  fieldValues,
  dynamicValues,
  timeout,
  hubspotConnection: connectionInput,
};
export const deleteCompanyInputs = {
  companyId,
  timeout,
  hubspotConnection: connectionInput,
};
export const getCompanyInputs = {
  companyId: { ...companyId, required: false, clean: toOptionalString },
  companyName: { ...companyName, required: false, clean: toOptionalString },
  domain: { ...domain, required: false, clean: toOptionalString },
  additionalProperties,
  associationsList,
  archived,
  timeout,
  hubspotConnection: connectionInput,
};
