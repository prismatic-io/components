import { type InputFieldChoice, input, util } from "@prismatic-io/spectral";
import { listTimeZones } from "timezone-support";
import { connectionInput, dynamicValues, fieldValues, listInputs, version } from "./common";
import { email, firstName, lastName } from "./fields";

const profile = input({
  label: "Profile",
  type: "string",
  required: true,
  placeholder: "Enter profile name",
  comments:
    "The name of the Salesforce User Profile that defines the user's permissions and settings.",
  example: "Standard User",
  clean: util.types.toString,
});

const userName = input({
  label: "User Name",
  type: "string",
  required: true,
  placeholder: "Enter user name",
  comments: "The username of the Salesforce user to reference.",
  example: "JohnDoe",
  dataSource: "selectUser",
  clean: util.types.toString,
});

const permissionName = input({
  label: "Permission Set",
  type: "string",
  required: true,
  placeholder: "Enter permission set name",
  comments: "The name of the Salesforce Permission Set to assign to or remove from the user.",
  example: "Standard User",
  clean: util.types.toString,
});

const alias = input({
  label: "Alias",
  type: "string",
  required: true,
  placeholder: "Enter alias",
  comments: "A short identifier for the Salesforce user, typically used in reports and list views.",
  example: "JD",
  clean: util.types.toString,
});

const timeZones: InputFieldChoice[] = listTimeZones().map((timeZone) => {
  return { label: timeZone, value: timeZone };
});

const timeZone = input({
  label: "Time Zone",
  type: "string",
  required: true,
  placeholder: "Select time zone",
  comments: "The time zone for the user. Uses IANA format (e.g., America/New_York).",
  model: timeZones,
  clean: util.types.toString,
});

export const createUserInputs = {
  version,
  dynamicValues,
  fieldValues,
  profile,
  userName: { ...userName, dataSource: undefined },
  firstName,
  lastName,
  timeZone,
  alias,
  email,
  connection: connectionInput,
};

export const updateUserInputs = {
  version,
  userName,
  dynamicValues,
  fieldValues,
  connection: connectionInput,
};

export const listUsersInputs = { ...listInputs };

export const addUserPermissionSetInputs = {
  version,
  userName,
  permissionName,
  connection: connectionInput,
};

export const removeUserPermissionSetInputs = {
  version,
  userName,
  permissionName,
  connection: connectionInput,
};
