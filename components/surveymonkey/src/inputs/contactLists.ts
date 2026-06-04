import { input, util } from "@prismatic-io/spectral";
import { connectionInput, fetchAll, page, perPage } from "./common";





export const contactListId = input({
  label: "Contact List ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the contact list.",
  example: "1234567890",
  placeholder: "Enter contact list ID",
  dataSource: "selectContactList",
  clean: util.types.toString,
});

export const contactListName = input({
  label: "Contact List Name",
  type: "string",
  required: true,
  comments: "The name of the contact list.",
  example: "Newsletter Subscribers",
  placeholder: "Enter contact list name",
  clean: util.types.toString,
});





export const listContactListsInputs = {
  connection: connectionInput,
  fetchAll,
  page,
  perPage,
};

export const getContactListInputs = {
  connection: connectionInput,
  contactListId,
};

export const createContactListInputs = {
  connection: connectionInput,
  name: contactListName,
};

export const updateContactListInputs = {
  connection: connectionInput,
  contactListId,
  name: contactListName,
};

export const deleteContactListInputs = {
  connection: connectionInput,
  contactListId,
};

export const selectContactListInputs = {
  connection: connectionInput,
};
