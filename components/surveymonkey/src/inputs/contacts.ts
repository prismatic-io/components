import { input, type KeyValuePair, util } from "@prismatic-io/spectral";
import { toOptionalString } from "../util";
import { connectionInput, fetchAll, page, perPage, extraBody } from "./common";





export const contactId = input({
  label: "Contact ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the contact.",
  example: "1234567890",
  placeholder: "Enter contact ID",
  dataSource: "selectContact",
  clean: util.types.toString,
});

export const contactEmail = input({
  label: "Email",
  type: "string",
  required: true,
  comments: "The contact's email address.",
  example: "john.doe@example.com",
  placeholder: "Enter email address",
  clean: util.types.toString,
});

export const contactFirstName = input({
  label: "First Name",
  type: "string",
  required: false,
  comments: "The contact's first name.",
  example: "John",
  placeholder: "Enter first name",
  clean: toOptionalString,
});

export const contactLastName = input({
  label: "Last Name",
  type: "string",
  required: false,
  comments: "The contact's last name.",
  example: "Doe",
  placeholder: "Enter last name",
  clean: toOptionalString,
});

export const contactCustomFields = input({
  label: "Custom Fields",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  comments: "Custom field values as key-value pairs.",
  placeholder: "Enter custom fields",
  clean: (value: unknown) =>
    util.types.keyValPairListToObject(value as KeyValuePair[]),
});





export const updateExistingContacts = input({
  label: "Update Existing Contacts",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, existing contacts will be updated if they exist.",
  clean: util.types.toBool,
});

export const bulkContacts = input({
  label: "Contacts",
  type: "code",
  language: "json",
  required: true,
  comments:
    'JSON array of contact objects. Each must have "email", optionally "first_name", "last_name", and "custom_fields".',
  example: JSON.stringify(
    [
      { email: "john@example.com", first_name: "John", last_name: "Doe" },
      { email: "jane@example.com", first_name: "Jane" },
    ],
    null,
    2,
  ),
  clean: util.types.toObject,
});





export const listContactsInputs = {
  connection: connectionInput,
  fetchAll,
  page,
  perPage,
};

export const getContactInputs = {
  connection: connectionInput,
  contactId,
};

export const createContactInputs = {
  connection: connectionInput,
  email: contactEmail,
  firstName: contactFirstName,
  lastName: contactLastName,
  customFields: contactCustomFields,
  extraBody,
};

export const updateContactInputs = {
  connection: connectionInput,
  contactId,
  email: { ...contactEmail, required: false, clean: toOptionalString },
  firstName: contactFirstName,
  lastName: contactLastName,
  customFields: contactCustomFields,
  extraBody,
};

export const deleteContactInputs = {
  connection: connectionInput,
  contactId,
};

export const createContactsBulkInputs = {
  connection: connectionInput,
  contacts: bulkContacts,
  updateExistingContacts,
};
