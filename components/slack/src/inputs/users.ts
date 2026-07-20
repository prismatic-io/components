import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import {
  connectionInput,
  cursor,
  fetchAll,
  limit,
  teamId,
  userId,
} from "./common";
export const email = input({
  label: "Email",
  placeholder: "Enter email address",
  type: "string",
  required: true,
  example: "someone@example.com",
  comments: "The email address of the user.",
  clean: util.types.toString,
});
export const getUserInputs = {
  connection: connectionInput,
  email,
};
export const getUserByIdInputs = {
  connection: connectionInput,
  user: userId,
};
const listUsersPagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Cursor and page-size controls for paging through results.",
  inputs: { limit, cursor },
});
export const listUsersInputs = {
  connection: connectionInput,
  fetchAll,
  pagination: listUsersPagination,
  teamId,
};
const listUsersConversationsPagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Cursor and page-size controls for paging through results.",
  inputs: { limit, cursor },
});
export const listUsersConversationsInputs = {
  connection: connectionInput,
  userId,
  fetchAll,
  pagination: listUsersConversationsPagination,
  teamId,
};
