import { input, util } from "@prismatic-io/spectral";
import { connectionInput, fetchAll, pageSize, pageToken } from "./shared";
const listName = input({
  label: "List Name",
  type: "string",
  required: true,
  placeholder: "Enter list name",
  example: "My New Contact List",
  comments: "The display name for the new contact list.",
  clean: util.types.toString,
});
const listId = input({
  label: "List ID",
  type: "string",
  required: true,
  placeholder: "Enter list ID",
  example: "ca3f4b4f-13a5-4321-9876-a1b2c3d4e5f6",
  comments: "The unique identifier for the contact list to retrieve.",
  dataSource: "sendGridListsDataSource",
  clean: util.types.toString,
});
const includeSampleContacts = input({
  label: "Include Sample Contacts",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, includes a sample of contacts in the response.",
  clean: util.types.toBool,
});
export const createListInputs = {
  sendGridConnection: connectionInput,
  name: listName,
};
export const getAllListsInputs = {
  sendGridConnection: connectionInput,
  fetchAll,
  page_size: pageSize,
  page_token: pageToken,
};
export const getListByIdInputs = {
  sendGridConnection: connectionInput,
  list_id: listId,
  contact_sample: includeSampleContacts,
};
export const getAllFieldDefinitionsInputs = {
  sendGridConnection: connectionInput,
  fetchAll,
  page_size: pageSize,
  page_token: pageToken,
};
