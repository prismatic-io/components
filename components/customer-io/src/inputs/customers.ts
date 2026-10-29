import { input, util } from "@prismatic-io/spectral";
import { cleanKeyValueList, cleanOptionalKeyValueList } from "../utils/clean";
import { connectionInput, id, region } from "./common";

export const customerData = input({
  label: "Customer Data",
  type: "string",
  collection: "keyvaluelist",
  required: true,
  comments:
    "The key and value pairs that make up a customer record. The key must be a string, and the value can be a string, number, array, or object.",
  clean: cleanKeyValueList,
});

export const eventData = input({
  label: "Event Data",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  comments:
    "The key and value pairs that describe the event the customer performed.",
  clean: cleanOptionalKeyValueList,
});

export const eventName = input({
  label: "Event Name",
  example: "myCustomerEvent",
  placeholder: "Enter event name",
  type: "string",
  required: true,
  comments: "The identifier recorded for the tracked event.",
  clean: util.types.toString,
});

export const url = input({
  label: "URL",
  type: "string",
  required: true,
  example: "www.example.com",
  placeholder: "Enter page path",
  comments:
    "The page path to track. Enter the full path to track a specific page, or use the asterisk '*' to track any page.",
  clean: util.types.toString,
});

export const destroyInputs = {
  id,
  region,
  cioConnection: connectionInput,
};

export const identifyInputs = {
  id,
  region,
  customerData,
  cioConnection: connectionInput,
};

export const trackInputs = {
  id,
  region,
  eventData,
  eventName,
  cioConnection: connectionInput,
};

export const trackPageViewInputs = {
  id,
  region,
  url,
  cioConnection: connectionInput,
};
