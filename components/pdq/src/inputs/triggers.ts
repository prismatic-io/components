import { input, util } from "@prismatic-io/spectral";
import { pollResourceModel } from "../util";
import { connection } from "./common";
const pollResourceType = input({
  label: "Resource Type",
  type: "string",
  required: true,
  default: "Devices",
  model: pollResourceModel,
  comments:
    "Select the PDQ resource to poll for newly added records. Choose Devices or Groups. Required.",
  clean: util.types.toString,
});
export const pollChangesInputs = { connection, pollResourceType };
