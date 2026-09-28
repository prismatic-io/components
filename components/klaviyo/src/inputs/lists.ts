import { input, util } from "@prismatic-io/spectral";
import { connection, fields } from "./common";
import { FIELDS_LIST_MODEL } from "../constants";
import { additionalFieldsProfile, fieldsProfile } from "./profiles";
const fieldsList = input({ ...fields, model: FIELDS_LIST_MODEL });
export const listListsInputs = {
  connection,
  fieldsList,
};
const listName = input({
  label: "List Name",
  comments: "A helpful name to label the list.",
  type: "string",
  example: "Newsletter",
  placeholder: "Enter a list name",
  required: true,
  clean: util.types.toString,
});
export const createListInputs = {
  connection,
  listName,
};
const listId = input({
  label: "List ID",
  comments: "The unique identifier of the list.",
  type: "string",
  example: "RE83th",
  placeholder: "Enter a list ID",
  required: true,
  clean: util.types.toString,
  dataSource: "selectList",
});
export const getListInputs = {
  connection,
  listId,
  fieldsList,
};
export const updateListInputs = {
  connection,
  listId,
  listName,
};
export const deleteListInputs = {
  connection,
  listId,
};
export const listListProfilesInputs = {
  connection,
  listId,
  additionalFieldsProfile,
  fieldsProfile,
};
