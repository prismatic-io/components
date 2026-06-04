import { input, util } from "@prismatic-io/spectral";
import {
  connectionInput,
  cursor,
  paginationLimitInput,
  paginationStartInput,
  userIdInput,
} from "./common";
import { cleanNumber } from "../util";

const term = input({
  label: "Term",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "The keyword used to match user names or email addresses.",
  example: "john",
  placeholder: "Enter search term",
});

const searchByEmail = input({
  label: "Search By Email",
  type: "string",
  default: "1",
  model: [
    { label: "0", value: "0" },
    { label: "1", value: "1" },
  ],
  clean: cleanNumber,
  comments: "When set to 1, the term is matched against user email addresses only.",
  example: "1",
  placeholder: "Select option",
});

export const getUsersInputs = {
  connection: connectionInput,
};

export const findUsersByNameInputs = {
  connection: connectionInput,
  term,
  searchByEmail,
};

export const getCurrentUserInputs = {
  connection: connectionInput,
};

export const getUserInputs = {
  connection: connectionInput,
  id: userIdInput,
};

export const getUserFollowersInputs = {
  connection: connectionInput,
  id: userIdInput,
  limit: paginationLimitInput,
  cursor,
};

export const getUserPermissionsInputs = {
  connection: connectionInput,
  id: userIdInput,
};

export const getUserRoleAssignmentsInputs = {
  connection: connectionInput,
  id: userIdInput,
  start: paginationStartInput,
  limit: paginationLimitInput,
};

export const getUserRoleSettingsInputs = {
  connection: connectionInput,
  id: userIdInput,
};
