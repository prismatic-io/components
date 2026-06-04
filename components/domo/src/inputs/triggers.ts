import { input, util } from "@prismatic-io/spectral";
import { connection } from "./common";
import { resourceModel } from "../constants";

export const resourceType = input({
  label: "Resource Type",
  type: "string",
  required: true,
  model: resourceModel,
  comments: "The type of resource to monitor for changes.",
  clean: util.types.toString,
});

export const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  comments: "When true, includes newly created records in the results.",
  clean: util.types.toBool,
});

export const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, includes updated records in the results. Only available for resource types that support update tracking (DataSets, Streams, Users).",
  clean: util.types.toBool,
});

export const pollChangesTriggerInputs = {
  connection,
  resourceType,
  showNewRecords,
  showUpdatedRecords,
};
