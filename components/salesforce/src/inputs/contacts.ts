import { input } from "@prismatic-io/spectral";
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

export const createContactInputs = {
  email,
  version,
  dynamicValues,
  fieldValues,
  phone,
  firstName,
  lastName,
  department,
  birthdate,
  fax,
  title,
  mobile,
  assistant,
  assistantPhone,
  description,
  billingCity,
  billingPostalCode,
  billingState,
  billingStreet,
  billingCountry,
  street,
  state,
  country,
  city,
  postalCode,
  connection: connectionInput,
};

export const updateContactInputs = {
  recordId: {
    ...recordId,
    dataSource: "selectContact",
  },
  email,
  version,
  dynamicValues,
  fieldValues,
  phone,
  firstName,
  lastName,
  department,
  birthdate,
  fax,
  title,
  mobile,
  assistant,
  assistantPhone,
  description,
  billingCity,
  billingPostalCode,
  billingState,
  billingStreet,
  billingCountry,
  street,
  state,
  country,
  city,
  postalCode,
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
