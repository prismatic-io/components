import { input, util } from "@prismatic-io/spectral";
import { cleanString, getUserIds } from "../util";
import { userJson } from "../json/userJson";
import { connection, jsonInput } from "./common";

const userIds = input({
  label: "User IDs",
  type: "string",
  collection: "valuelist",
  required: true,
  example: '["a1b5f946-2351-4380-b24e-297e8c708a67"]',
  placeholder: "Enter user IDs",
  comments: "A list of user IDs to delete.",
  clean: getUserIds,
});

const userId = input({
  label: "User ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the user.",
  example: "a1b5f946-2351-4380-b24e-297e8c708a67",
  placeholder: "Enter User ID",
  clean: util.types.toString,
});

const deleteParam = input({
  label: "Delete",
  type: "string",
  required: false,
  comments:
    "A list of groups to remove the user from. A comma-separated list of the following: Groups, PermissionSet or SigningGroupsEmail.",
  example: "Groups",
  placeholder: "Enter delete parameters",
  clean: cleanString,
});

export const deleteUserInputs = {
  connection,
  userIds,
  deleteParam,
};

export const getUserInputs = {
  connection,
  userId,
};

export const updateUserInputs = {
  connection,
  jsonInput: {
    ...jsonInput,
    required: true,
    default: JSON.stringify(userJson, null, 2),
    comments:
      "For extra fields, see the [Update User API reference](https://developers.docusign.com/docs/esign-rest-api/reference/users/users/update/).",
  },
  userId,
};
