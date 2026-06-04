import { input, util } from "@prismatic-io/spectral";
import { toOptionalString } from "../util";
import { connection } from "./common";





const contactKey = input({
  label: "Contact Key",
  type: "string",
  required: true,
  comments:
    "The unique identifier (subscriber key) for the contact in Marketing Cloud.",
  example: "contact-abc-123",
  placeholder: "Enter contact key",
  clean: util.types.toString,
});

const contactId = input({
  label: "Contact ID",
  type: "string",
  required: false,
  comments:
    "The numeric identifier assigned to the contact by Marketing Cloud.",
  example: "12345678",
  placeholder: "Enter contact ID",
  clean: toOptionalString,
});

const emailAddress = input({
  label: "Email Address",
  type: "string",
  required: false,
  comments: "The email address associated with the contact.",
  example: "john.doe@example.com",
  placeholder: "Enter email address",
  clean: toOptionalString,
});

const attributeSets = input({
  label: "Attribute Sets",
  type: "code",
  language: "json",
  required: false,
  comments:
    "An array of attribute set objects containing contact data to create or update.",
  example: JSON.stringify(
    [
      {
        name: "Email Addresses",
        items: [
          {
            values: [
              { name: "Email Address", value: "john.doe@example.com" },
              { name: "HTML Enabled", value: "true" },
            ],
          },
        ],
      },
    ],
    null,
    2,
  ),
  clean: util.types.toObject,
});

const searchFilter = input({
  label: "Search Filter",
  type: "code",
  language: "json",
  required: true,
  comments:
    "A filter object to search contacts. Uses the Marketing Cloud Contacts search syntax.",
  example: JSON.stringify(
    {
      filterOperator: "equals",
      propertyName: "ContactKey",
      propertyValue: "contact-abc-123",
    },
    null,
    2,
  ),
  clean: util.types.toObject,
});





const deleteContactKeys = input({
  label: "Contact Keys",
  type: "string",
  collection: "valuelist",
  required: true,
  comments:
    "One or more contact keys (subscriber keys) to delete. Deletion is asynchronous and may take time to complete.",
  example: "contact-abc-123",
  placeholder: "Enter contact key",
  clean: (value: unknown) => value as string[],
});

export const deleteContactInputs = {
  connection,
  deleteContactKeys,
};

export const getContactInputs = {
  connection,
  contactKey,
};

export const createContactInputs = {
  connection,
  contactKey,
  attributeSets,
};

export const updateContactInputs = {
  connection,
  contactKey,
  attributeSets,
};

export const searchContactsInputs = {
  connection,
  searchFilter,
};

export const searchContactsByEmailInputs = {
  connection,
  emailAddress: {
    ...emailAddress,
    required: true,
    clean: util.types.toString,
  },
};

export const getContactSchemaInputs = {
  connection,
};
