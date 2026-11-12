import { input, util } from "@prismatic-io/spectral";
import { cleanString } from "../util";
import { contactJson } from "../json/contactJson";
import { connection, jsonInput } from "./common";

const contactId = input({
  label: "Contact ID",
  type: "string",
  required: true,
  comments: "The ID of a contact person in the account's address book.",
  placeholder: "Enter Contact ID",
  clean: util.types.toString,
});

const cloudProvider = input({
  label: "Cloud Provider",
  type: "string",
  required: false,
  comments:
    "The cloud provider from which to retrieve the contacts. Valid values are: rooms or docusignCore.",
  example: "rooms",
  placeholder: "Enter cloud provider",
  clean: cleanString,
});

export const createContactInputs = {
  connection,
  jsonInput: {
    ...jsonInput,
    required: true,
    default: JSON.stringify(contactJson, null, 2),
    comments:
      "A JSON object with a contactList array of the contacts to add. For extra fields, see the [Create Contacts API reference](https://developers.docusign.com/docs/esign-rest-api/reference/users/contacts/create/).",
  },
};

export const deleteContactInputs = {
  connection,
  contactId,
};

export const getContactInputs = {
  connection,
  contactId,
  cloudProvider,
};

export const updateContactInputs = {
  connection,
  jsonInput: {
    ...jsonInput,
    required: true,
    default: JSON.stringify(contactJson, null, 2),
    comments:
      "A JSON object with a contactList array of the contacts to update, each with its contactId. For extra fields, see the [Update Contacts API reference](https://developers.docusign.com/docs/esign-rest-api/reference/users/contacts/update/).",
  },
};
