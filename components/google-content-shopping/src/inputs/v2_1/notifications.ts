import { input } from "@prismatic-io/spectral";
import { toOptionalString, valueListInputClean } from "../../util";
import { connectionInput, kind, merchantId } from "./common";
const cloudTopicName = input({
  label: "Cloud Topic Name",
  type: "string",
  clean: toOptionalString,
  comments: "Cloud pub/sub topic to which notifications are sent (read-only).",
  example: "projects/my-project/topics/my-topic",
  placeholder: "Enter Cloud Pub/Sub topic name",
  required: false,
});
const registeredEvents = input({
  label: "Registered Events",
  type: "string",
  collection: "valuelist",
  required: false,
  comments: "List of event types.",
  example: "product.create",
  placeholder: "Enter Event Types",
  clean: valueListInputClean,
});
export const getPubSubNotificationInputs = {
  connectionInput,
  merchantId,
};
export const updatePubSubNotificationInputs = {
  connectionInput,
  merchantId,
  kind,
  cloudTopicName,
  registeredEvents,
};
