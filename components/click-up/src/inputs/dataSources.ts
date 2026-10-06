import { input, util } from "@prismatic-io/spectral";
import {
  connectionInput,
  folderIdInput,
  listIdInput,
  spaceIdInput,
  teamIdInput,
} from "./common";
const fieldName = input({
  label: "Field Name",
  type: "string",
  placeholder: "Enter field name",
  example: "Sales Stage",
  comments: "The name of the custom field whose options should be returned.",
  required: true,
  default: "Sales Stage",
  clean: util.types.toString,
});
export const teamsInputs = { connection: connectionInput };
export const spacesInputs = {
  connection: connectionInput,
  teamId: teamIdInput,
};
export const foldersInputs = {
  connection: connectionInput,
  spaceId: spaceIdInput,
};
export const listsInputs = {
  folderId: folderIdInput,
  connection: connectionInput,
};
export const customFieldsInputs = {
  listId: listIdInput,
  connection: connectionInput,
};
export const customFieldOptionsInputs = {
  listId: listIdInput,
  connection: connectionInput,
  fieldName,
};
export const tasksInputs = { listId: listIdInput, connection: connectionInput };
export const calendarsInputs = {
  spaceId: spaceIdInput,
  connection: connectionInput,
};
