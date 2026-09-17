import { input, structuredObjectInput } from "@prismatic-io/spectral";
import { cleanStringInput } from "../util";
import {
  apiVersionInput,
  connection,
  fetchAll,
  fieldValuesInputNonRequired,
  instanceUrlInput,
  pagination,
  sysId,
  sysparmQuery,
} from "./common";
const userName = input({
  label: "Username",
  type: "string",
  required: false,
  comments: "The login username used to authenticate the user.",
  placeholder: "Enter the username",
  clean: cleanStringInput,
});
const email = input({
  label: "Email",
  type: "string",
  required: false,
  comments: "The email address used to contact the user.",
  placeholder: "Enter the email address",
  clean: cleanStringInput,
});
const firstName = input({
  label: "First Name",
  type: "string",
  required: false,
  comments: "The given name of the user.",
  placeholder: "Enter the first name",
  clean: cleanStringInput,
});
const lastName = input({
  label: "Last Name",
  type: "string",
  required: false,
  comments: "The family name of the user.",
  placeholder: "Enter the last name",
  clean: cleanStringInput,
});
const contactInfo = structuredObjectInput({
  label: "Name & Contact Information",
  required: false,
  comments: "First name, last name, and email address.",
  inputs: { firstName, lastName, email },
});
export const createUserInputs = {
  connection,
  instanceUrlInput,
  apiVersionInput,
  fieldValuesInputNonRequired,
  contactInfo,
  userName,
};
export const deleteUserInputs = {
  connection,
  instanceUrlInput,
  apiVersionInput,
  sysId,
};
export const getUserInputs = {
  connection,
  instanceUrlInput,
  apiVersionInput,
  sysId,
};
export const getUserByUsernameInputs = {
  connection,
  instanceUrlInput,
  apiVersionInput,
  userName,
};
export const listUsersInputs = {
  connection,
  instanceUrlInput,
  apiVersionInput,
  sysparmQuery,
  fetchAll,
  pagination,
};
export const updateUserInputs = {
  connection,
  instanceUrlInput,
  apiVersionInput,
  sysId,
  fieldValuesInputNonRequired,
  userName,
  contactInfo,
};
