import { input, util } from "@prismatic-io/spectral";
import { toKeyValueObject } from "../util";
import { connectionInput } from "./common";
const eventType = input({
  label: "Event Type",
  type: "string",
  example: "Purchase",
  placeholder: "Enter event type",
  required: true,
  comments:
    "The event type name used to categorize the event in NRDB. Allowed characters: alphanumeric, underscores, and colons.",
  clean: util.types.toString,
});
const additionalAttributes = input({
  label: "Additional Attributes",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  comments: "Key-value pairs to include in the request body.",
  clean: toKeyValueObject,
});
const accountId = input({
  label: "Account ID",
  type: "string",
  example: "8439034",
  placeholder: "Enter account ID",
  required: true,
  comments: "The unique identifier of the New Relic Insights account.",
  clean: util.types.toString,
});
export const sendEventDataInputs = {
  eventType,
  additionalAttributes,
  accountId,
  newRelicConnection: connectionInput,
};
