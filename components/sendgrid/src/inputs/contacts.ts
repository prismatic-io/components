import { input, util } from "@prismatic-io/spectral";
import {
  cleanContactsArrayInput,
  cleanFieldMappingsInput,
  cleanStringInput,
} from "../util";
import { connectionInput } from "./shared";
const contactListIds = input({
  label: "List IDs",
  type: "string",
  required: false,
  placeholder: "Enter comma-separated list IDs",
  example:
    "ca3f4b4f-13a5-4321-9876-a1b2c3d4e5f6,d7e8f9a0-b1c2-d3e4-f5a6-b7c8d9e0f1a2",
  comments:
    "Comma-separated IDs of the lists to add the contact to. These lists must already exist.",
  dataSource: "sendGridListsDataSource",
  clean: cleanStringInput,
});
const contactsInput = input({
  label: "Contacts",
  type: "code",
  language: "json",
  required: true,
  placeholder: "Enter contacts array as JSON",
  example: JSON.stringify(
    [
      {
        email: "ryan.testing@example.com",
        custom_fields: { w2: "George" },
      },
      {
        email: "cassie.testing@example.com",
        first_name: "Cassie",
        last_name: "Testing",
        custom_fields: { w1: "Human" },
      },
    ],
    null,
    2,
  ),
  comments:
    "An array of contact objects to add or update. See SendGrid docs for contact object structure.",
  clean: cleanContactsArrayInput,
});
const emailsInput = input({
  label: "Emails",
  type: "string",
  required: true,
  placeholder: "Enter comma-separated email addresses",
  example: "john.doe@example.com,jane.smith@example.com",
  comments: "Comma-separated email addresses to search for.",
  clean: util.types.toString,
});
const fieldMappingsInput = input({
  label: "Field Mappings",
  type: "code",
  language: "json",
  required: true,
  placeholder: "Enter field mappings as JSON",
  example: JSON.stringify([null, "w1", "_rf1"], null, 2),
  comments:
    "An array of field definition IDs to map the uploaded CSV columns. Use null to skip a column. Get IDs from 'Get All Field Definitions' action.",
  clean: cleanFieldMappingsInput,
});
const jobId = input({
  label: "Job ID",
  type: "string",
  required: true,
  placeholder: "Enter job ID",
  example: "f8a7b6c5-d4e3-f2a1-b0c9-d8e7f6a5b4c3",
  comments:
    "The job ID returned from Import Contacts, Add/Update Contact, or Delete Contacts operations.",
});
const isCompressedInput = input({
  label: "Is Compressed",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, indicates that the CSV file will be gzip-compressed.",
  clean: util.types.toBool,
});
export const addOrUpdateContactInputs = {
  sendGridConnection: connectionInput,
  list_ids: contactListIds,
  contacts: contactsInput,
};
export const getContactsByEmailsInputs = {
  sendGridConnection: connectionInput,
  emails: emailsInput,
};
export const initiateContactsImportInputs = {
  sendGridConnection: connectionInput,
  list_ids: contactListIds,
  field_mappings: fieldMappingsInput,
  is_compressed: isCompressedInput,
};
export const getImportStatusInputs = {
  sendGridConnection: connectionInput,
  job_id: jobId,
};
