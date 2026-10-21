import { structuredObjectInput } from "@prismatic-io/spectral";
import {
  connectionInput,
  description,
  dynamicValues,
  fieldValues,
  listInputs,
  recordId,
  version,
} from "./common";
import {
  city,
  company,
  country,
  email,
  employeeCount,
  firstName,
  lastName,
  leadSource,
  leadStatus,
  phone,
  postalCode,
  rating,
  revenue,
  state,
  street,
  title,
  website,
} from "./fields";
const address = structuredObjectInput({
  label: "Address",
  required: false,
  comments: "Street, city, state, postal code, and country for the address.",
  inputs: { street, city, state, postalCode, country },
});
const nameAndContact = structuredObjectInput({
  label: "Name & Contact Information",
  required: false,
  comments: "First and last name, phone, and website.",
  inputs: { firstName, lastName, phone, website },
});
const additionalFields = structuredObjectInput({
  label: "Additional Fields",
  required: false,
  comments:
    "Additional optional fields: includes Title, Lead Source, Rating, Number of Employees, Description, and Annual Revenue.",
  inputs: {
    title,
    leadSource,
    rating,
    employeeCount,
    description,
    revenue,
  },
});
export const createLeadInputs = {
  company,
  leadStatus,
  email,
  version,
  dynamicValues,
  fieldValues,
  nameAndContact,
  address,
  additionalFields,
  connection: connectionInput,
};
export const updateLeadInputs = {
  version,
  recordId: {
    ...recordId,
    dataSource: "selectLead",
  },
  company,
  leadStatus,
  email,
  dynamicValues,
  fieldValues,
  nameAndContact,
  address,
  additionalFields,
  connection: connectionInput,
};
export const deleteLeadInputs = {
  version,
  recordId: {
    ...recordId,
    dataSource: "selectLead",
  },
  connection: connectionInput,
};
export const listLeadsInputs = { ...listInputs };
