import { input, util } from "@prismatic-io/spectral";
import { connectionInput } from "./common";


const showNewIncidents = input({
  label: "Show New Incidents",
  type: "boolean",
  required: false,
  default: "true",
  example: "true",
  comments:
    "When enabled, newly created incidents will be included in the trigger output.",
  clean: util.types.toBool,
});


export const pollChangesInputs = {
  connection: connectionInput,
  showNewIncidents,
};
