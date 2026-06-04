import { input, util } from "@prismatic-io/spectral";
import { connection, restaurantExternalId } from "./shared";

const secret = input({
  label: "Secret",
  comments: "The secret key for the webhook",
  type: "string",
  required: true,
  example: "mysecret",
  placeholder: "mysecret",
  clean: util.types.toString,
});

export const webhookInputs = { secret };



const showNewRecords = input({
  label: "Show New Time Entries",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, newly created time entries will be included in the trigger output.",
  clean: util.types.toBool,
});

const showUpdatedRecords = input({
  label: "Show Updated Time Entries",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, time entries modified after the last poll will be included in the trigger output.",
  clean: util.types.toBool,
});



export const pollChangesInputs = {
  connection,
  restaurantExternalId,
  showNewRecords,
  showUpdatedRecords,
};
