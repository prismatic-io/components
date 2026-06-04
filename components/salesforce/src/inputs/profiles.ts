import { input, util } from "@prismatic-io/spectral";
import { cleanStringInput } from "../util";
import { connectionInput, listInputs, recordId, version } from "./common";

export const validatePermissions = (value: unknown): Record<string, boolean> | undefined => {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (typeof value !== "object") {
    throw new Error("Invalid permissions value provided.");
  }

  const hasInvalidKeyTypes = Object.keys(value).some((k) => typeof k !== "string");
  if (hasInvalidKeyTypes) {
    throw new Error("All permission keys must be strings.");
  }

  const hasInvalidValueTypes = Object.values(value).some((v) => typeof v !== "boolean");
  if (hasInvalidValueTypes) {
    throw new Error("All permission values must be booleans.");
  }

  return value as Record<string, boolean>;
};

const nameInput = input({
  label: "Name",
  type: "string",
  required: true,
  comments: "The name of the profile.",
  clean: util.types.toString,
});

const descriptionInput = input({
  label: "Description",
  type: "string",
  required: true,
  comments: "Description of the profile.",
  clean: util.types.toString,
});

const permissionsInput = input({
  label: "Permissions",
  type: "data",
  comments:
    "Key/value object with permission name keys and boolean value indicating if a permission is granted or not. Use 'Describe Permissions' to retrieve the permissions of a Record Type.",
});

const userLicenseInput = input({
  label: "User License",
  type: "string",
  required: true,
  comments: "Identifier for associated UserLicense.",
  clean: util.types.toString,
});

export const createProfileInputs = {
  version,
  name: nameInput,
  description: descriptionInput,
  permissions: permissionsInput,
  userLicense: userLicenseInput,
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
