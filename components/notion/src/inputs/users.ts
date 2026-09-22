import { input, util } from "@prismatic-io/spectral";
import { connectionInput, fetchAllInput, paginationInput } from "./common";
const userIdInput = input({
  label: "User ID",
  required: true,
  type: "string",
  placeholder: "Enter user ID",
  example: "d9824bdc84454327be8b5b47500af6ce",
  comments:
    "The unique identifier of the user in Notion. See [Notion API User Reference](https://developers.notion.com/reference/user).",
  clean: util.types.toString,
  dataSource: "selectUser",
});
export const getCurrentUserInputs = {
  connection: connectionInput,
};
export const getUserInputs = {
  connection: connectionInput,
  userId: userIdInput,
};
export const listUsersInputs = {
  connection: connectionInput,
  fetchAll: {
    ...fetchAllInput,
    comments:
      "When true, automatically fetches all pages of results using pagination. This ignores the Start Cursor and Page Size inputs.",
  },
  pagination: paginationInput,
};
