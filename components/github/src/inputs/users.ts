import { input } from "@prismatic-io/spectral";
import { cleanString } from "../utils";
import { connectionInput } from "./common";
const username = input({
  label: "Username",
  type: "string",
  required: true,
  placeholder: "Enter username",
  example: "octocat",
  clean: cleanString,
  comments: "The GitHub username.",
});
export const usersGetByUsernameInputs = {
  connection: connectionInput,
  username,
};
export const usersGetAuthenticatedInputs = {
  connection: connectionInput,
};
