import { input, util } from "@prismatic-io/spectral";
import { pollResourceModel } from "../util";
import { apiVersion, connectionInput, timeout } from "./common";
import { events } from "./webhooks";
export const tableauTriggerInputs = {
  connectionInput,
  events: {
    ...events,
    required: true,
    collection: "valuelist" as const,
    comments: "The events to subscribe to.",
    clean: (value: unknown) => {
      if (Array.isArray(value)) {
        return value;
      }
      return [value];
    },
  },
  apiVersion,
  timeout,
};
const pollResourceType = input({
  label: "Resource Type",
  type: "string",
  required: true,
  default: "workbooks",
  model: pollResourceModel,
  comments:
    "The Tableau resource collection to poll for new and updated records.",
  example: "workbooks",
  clean: util.types.toString,
});
const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, records whose `createdAt` falls after the last poll are emitted on the `created` branch.",
  clean: util.types.toBool,
});
const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, records whose `updatedAt` falls after the last poll but were created earlier are emitted on the `updated` branch.",
  clean: util.types.toBool,
});
export const pollChangesInputs = {
  tableauConnection: connectionInput,
  pollResourceType,
  showNewRecords,
  showUpdatedRecords,
};
