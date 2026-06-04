import { input, util } from "@prismatic-io/spectral";
import { cleanString } from "../util";

export const includeInActive = input({
  label: "Include Inactive",
  type: "boolean",
  required: false,
  comments: "When true, includes inactive users in the list of results.",
  clean: util.types.toBool,
});

export const username = input({
  label: "Username",
  type: "string",
  required: false,
  comments:
    "The username for login. If not defined, the email address is used as the username.",
  example: "user123",
  placeholder: "Enter username",
  clean: cleanString,
});

export const password = input({
  label: "Password",
  type: "password",
  required: true,
  comments: "The password used to authenticate the user.",
  example: "p@ssw0rd-example",
  placeholder: "Enter password",
  clean: cleanString,
});

export const email = input({
  label: "Email",
  type: "string",
  required: true,
  comments: "The email address used to identify and authenticate the user.",
  example: "john.doe@example.com",
  placeholder: "Enter email address",
  clean: cleanString,
});

export const profileId = input({
  label: "Profile ID",
  type: "string",
  required: true,
  comments:
    "The unique identifier of the security profile that determines the user's access rights. Retrieve available profiles using the List Security Profiles action.",
  example: "00000000-0000-0000-0000000000000000",
  placeholder: "Enter security profile ID",
  dataSource: "selectSecurityProfile",
  clean: cleanString,
});

export const firstname = input({
  label: "First Name",
  type: "string",
  required: true,
  comments: "The first name of the user.",
  example: "John",
  placeholder: "Enter first name",
  clean: cleanString,
});

export const lastname = input({
  label: "Last Name",
  type: "string",
  required: true,
  comments: "The last name of the user.",
  example: "Doe",
  placeholder: "Enter last name",
  clean: cleanString,
});
