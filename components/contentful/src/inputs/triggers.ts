import { input, util } from "@prismatic-io/spectral";
import {
  connection,
  contentTypeId,
  environmentId,
  spaceId,
  webhookTopics,
} from "./common";

export const eventsTriggerInputs = {
  connection,
  spaceId,
  topics: webhookTopics,
};

export const webhookTriggerInputs = {
  connection,
};





const showNewRecords = input({
  label: "Show New Entries",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, entries whose `sys.createdAt` falls after the last poll are emitted on the `created` branch.",
  clean: util.types.toBool,
});

const showUpdatedRecords = input({
  label: "Show Updated Entries",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, entries whose `sys.updatedAt` falls after the last poll but were created earlier are emitted on the `updated` branch.",
  clean: util.types.toBool,
});

export const pollChangesInputs = {
  connection,
  spaceId,
  environmentId,
  contentTypeId: {
    ...contentTypeId,
    required: false,
    comments:
      "Restrict polling to a single content type. Leave blank to poll all entries in the environment.",
  },
  showNewRecords,
  showUpdatedRecords,
};
