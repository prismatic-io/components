import { connection } from "../general";
import { input, util } from "@prismatic-io/spectral";
import { EVENT_NAMES_MODEL } from "../../constants";

export const webhookUrl = input({
  label: "Webhook URL",
  comments:
    "A HTTPs url that can accept posted events. It should return 200 OK for GET requests.",
  type: "string",
  required: true,
  example: "https://example.com/webhook",
  placeholder: "https://example.com/webhook",
  clean: util.types.toString,
});

export const eventName = input({
  label: "Event Name",
  comments: "The name of the event to subscribe to.",
  type: "string",
  required: true,
  model: EVENT_NAMES_MODEL,
  clean: util.types.toString,
});

export const eventVersion = input({
  label: "Event Version",
  comments: "The version of the event to subscribe to.",
  type: "string",
  required: true,
  default: "1.0.0",
  clean: util.types.toString,
});

export const createUserSubscriptionInputs = {
  connection,
  webhookUrl,
  eventName,
  eventVersion,
};
