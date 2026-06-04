import { input, util } from "@prismatic-io/spectral";
import { connectionInput, globalCompanyIdInput } from "./common";
import { pollResourceModel } from "../constants";

export const pollResourceType = input({
  label: "Resource Type",
  type: "string",
  required: true,
  comments: "The type of resource to poll for new records.",
  model: pollResourceModel,
  clean: util.types.toString,
});

export const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: true,
  default: "true",
  comments: "Include newly created records in trigger results.",
  clean: util.types.toBool,
});

export const pollChangesTriggerInputs = {
  connection: connectionInput,
  globalCompanyId: { ...globalCompanyIdInput, required: false },
  resourceType: pollResourceType,
  showNewRecords,
};
