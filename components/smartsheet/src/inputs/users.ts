import { input, util } from "@prismatic-io/spectral";
import {
  connectionInput,
  includeAll,
  modifiedSince,
  page,
  pageSize,
  validateId,
} from "./common";

const userId = input({
  label: "User ID",
  type: "string",
  required: true,
  clean: (value) => (value === "me" ? "me" : validateId(value)),
  comments:
    'The unique identifier of the user to fetch. Enter "me" to retrieve the currently authenticated user.',
  placeholder: "Enter user ID",
  dataSource: "selectUser",
});

const email = input({
  label: "Email",
  type: "string",
  required: false,
  clean: (value) => util.types.toString(value) || undefined,
  comments: "The email address to filter users by.",
  placeholder: "Enter email address",
});

export const getUserInputs = {
  connection: connectionInput,
  userId,
};

export const listUsersInputs = {
  connection: connectionInput,
  includeAll,
  page,
  pageSize,
  email,
  modifiedSince,
};
