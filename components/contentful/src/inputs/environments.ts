import { input, util } from "@prismatic-io/spectral";
import { toOptionalString } from "../util";
import { connection, environmentId, spaceId } from "./common";
const environmentName = input({
  label: "Environment Name",
  type: "string",
  comments: "The display name for the environment.",
  example: "Staging",
  placeholder: "Enter environment name",
  required: false,
  clean: toOptionalString,
});
export const createEnvironmentInputs = {
  connection,
  spaceId,
  environmentId,
  name: environmentName,
};
export const deleteEnvironmentInputs = {
  connection,
  spaceId,
  environmentId,
};
export const getEnvironmentInputs = {
  connection,
  spaceId,
  environmentId,
};
export const listEnvironmentsInputs = {
  connection,
  spaceId,
};
export const updateEnvironmentInputs = {
  connection,
  spaceId,
  environmentId,
  name: {
    ...environmentName,
    required: true,
    clean: util.types.toString,
  },
};
