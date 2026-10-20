import { input } from "@prismatic-io/spectral";
import { cleanString } from "../utils";
import { connectionInput, fetchAll, pagination, search } from "./common";
const username = input({
  label: "Username",
  type: "string",
  required: false,
  placeholder: "Enter username",
  comments: "Return only the user with this exact username.",
  example: "jdoe",
  clean: cleanString,
});
export const getCurrentUserInputs = { connection: connectionInput };
export const listUsersInputs = {
  connection: connectionInput,
  fetchAll: {
    ...fetchAll,
    comments:
      "When true, automatically fetches all pages of results using keyset pagination, ordered by ID. The API returns up to 100 results per page.",
  },
  pagination,
  search,
  username,
};
