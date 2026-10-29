import { input, structuredObjectInput } from "@prismatic-io/spectral";
import { cleanStringInput } from "../util";
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
  billingCity,
  billingCountry,
  billingPostalCode,
  billingState,
  billingStreet,
  birthdate,
  city,
  country,
  email,
  fax,
  firstName,
  lastName,
  mobile,
  phone,
  postalCode,
  state,
  street,
  title,
} from "./fields";

const assistant = input({
  label: "Assistant",
  type: "string",
  required: false,
  placeholder: "Enter assistant name",
  comments: "The name of the contact's assistant.",
  clean: cleanStringInput,
  example: "Jane Doe",
});

const assistantPhone = input({
  label: "Assistant's Phone",
  type: "string",
  required: false,
  placeholder: "Enter assistant's phone number",
  comments: "The phone number of the contact's assistant.",
  clean: cleanStringInput,
  example: "18005555555",
});

const department = input({
  label: "Department",
  type: "string",
  required: false,
  placeholder: "Enter department",
  comments: "The department name associated with the contact.",
  clean: cleanStringInput,
  example: "Sales",
});

const mailingAddress = structuredObjectInput({
  label: "Mailing Address",
  required: false,
  comments:
    "Street, city, state, postal code, and country for the mailing address.",
  inputs: { street, city, state, postalCode, country },
});

const billingAddress = structuredObjectInput({
  label: "Other Address",
  required: false,
  comments:
    "Street, city, state, postal code, and country for the secondary address.",
  inputs: {
    billingStreet,
    billingCity,
    billingState,
    billingPostalCode,
    billingCountry,
  },
});

const nameAndContact = structuredObjectInput({
  label: "Name & Contact Information",
  required: false,
  comments:
    "First and last name, phone, fax, and mobile contact channels, and birthdate.",
  inputs: { firstName, lastName, phone, mobile, fax, birthdate },
});

const additionalFields = structuredObjectInput({
  label: "Additional Fields",
  required: false,
  comments:
    "Additional optional fields: includes Department, Title, Assistant, Assistant's Phone, and Description.",
  inputs: {
    department,
    title,
    assistant,
    assistantPhone,
    description,
  },
});

export const createContactInputs = {
  email,
  version,
  dynamicValues,
  fieldValues,
  nameAndContact,
  mailingAddress,
  billingAddress,
  additionalFields,
  connection: connectionInput,
};

export const updateContactInputs = {
  version,
  recordId: {
    ...recordId,
    dataSource: "selectContact",
  },
  email,
  dynamicValues,
  fieldValues,
  nameAndContact,
  mailingAddress,
  billingAddress,
  additionalFields,
  connection: connectionInput,
};

export const deleteContactInputs = {
  version,
  recordId: {
    ...recordId,
    dataSource: "selectContact",
  },
  connection: connectionInput,
};

export const listContactsInputs = { ...listInputs };
