import { input } from "@prismatic-io/spectral";
import { toTrimmedString } from "../util/clean";
import { oneDriveConnection } from "./common";

export const userId = input({
  label: "User ID or Email",
  type: "string",
  required: true,
  example: "87d349ed-44d7-43e1-9a83-5f2406dee5bd",
  placeholder: "Enter user ID or email",
  comments: "The unique identifier or email address of the user.",
  dataSource: "listUsers",
  clean: toTrimmedString,
});

export const searchUserInputs = {
  connection: oneDriveConnection,
  userId,
};
