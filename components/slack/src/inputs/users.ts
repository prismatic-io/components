import { input, util } from "@prismatic-io/spectral";
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

export const listUsersInputs = {
  connection: connectionInput,
  fetchAll,
  limit,
  cursor,
  teamId,
};

export const listUsersConversationsInputs = {
  connection: connectionInput,
  userId,
  fetchAll,
  limit,
  cursor,
  teamId,
};
