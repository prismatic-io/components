import { input, util } from "@prismatic-io/spectral";
import { pollResourceModel } from "../util/polling";
import { connectionInput } from "./common";

const pollResourceType = input({
  label: "Resource Type",
  type: "string",
  required: true,
  model: pollResourceModel,
  comments: "The QuickBooks entity type to poll for changes.",
  clean: util.types.toString,
});

const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When enabled, records with `Metadata.CreateTime` after the last poll are included in the `created` bucket.",
  clean: util.types.toBool,
});

const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When enabled, records modified after the last poll (but created earlier) are included in the `updated` bucket.",
  clean: util.types.toBool,
});

export const pollChangesInputs = {
  connection: connectionInput,
  pollResourceType,
  showNewRecords,
  showUpdatedRecords,
};
