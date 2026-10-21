import { input, util } from "@prismatic-io/spectral";
import { cleanStringInput, validatePermissions } from "../util";
import { connectionInput, listInputs, recordId, version } from "./common";
const nameInput = input({
  label: "Name",
  placeholder: "Enter profile name",
  type: "string",
  required: true,
  comments: "The name of the profile.",
  clean: util.types.toString,
});
const descriptionInput = input({
  label: "Description",
  placeholder: "Enter profile description",
  type: "string",
  required: true,
  comments:
    "A short summary of what the profile grants and who it is intended for.",
  clean: util.types.toString,
});
const permissionsInput = input({
  label: "Permissions",
  type: "data",
  comments:
    "Key/value object with permission name keys and boolean value indicating if a permission is granted or not. Use 'Describe Permissions' to retrieve the permissions of a Record Type.",
  clean: validatePermissions,
});
const userLicenseInput = input({
  label: "User License",
  placeholder: "Enter user license ID",
  type: "string",
  required: true,
  comments:
    "The ID of the UserLicense the profile is based on, which determines the features its users can access. A 15- or 18-character Salesforce ID starting with 100.",
  clean: util.types.toString,
});
export const createProfileInputs = {
  name: nameInput,
  description: descriptionInput,
  userLicense: userLicenseInput,
  version,
  permissions: permissionsInput,
  connection: connectionInput,
};
export const updateProfileInputs = {
  version,
  recordId: {
    ...recordId,
    dataSource: "selectProfile",
  },
  name: { ...nameInput, required: false, clean: cleanStringInput },
  description: {
    ...descriptionInput,
    required: false,
    clean: cleanStringInput,
  },
  permissions: permissionsInput,
  connection: connectionInput,
};
export const deleteProfileInputs = {
  version,
  recordId: {
    ...recordId,
    dataSource: "selectProfile",
  },
  connection: connectionInput,
};
export const listProfilesInputs = { ...listInputs };
