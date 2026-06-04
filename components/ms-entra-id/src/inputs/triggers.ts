import { input } from "@prismatic-io/spectral";
import { cleanChangeType } from "../util";
import { connection, expirationDateTime } from "./common";

const changeType = input({
  label: "Change Type",
  type: "string",
  collection: "valuelist",
  model: [
    { label: "Created / Updated / Soft Deleted", value: "updated" }, 
    { label: "Permanently Deleted", value: "deleted" },
  ],
  required: true,
  comments:
    "The type of change on the subscribed resource that triggers a notification. 'Created / Updated / Soft Deleted' covers created, updated, and soft-deleted events. 'Permanently Deleted' covers permanent deletion.",
  example: "updated",
  clean: cleanChangeType,
});

const expirationTriggerDateTime = input({
  ...expirationDateTime,
  required: false,
  comments:
    "The date and time when the trigger subscription expires. If not specified, the subscription defaults to 29 days from the current date and time. This trigger must be reactivated after expiration.",
});

export const userTriggerInputs = {
  connection,
  changeType,
  expirationTriggerDateTime,
};

export const groupTriggerInputs = {
  connection,
  changeType,
  expirationTriggerDateTime,
};
