import { input } from "@prismatic-io/spectral";

export const id = input({
  label: "ID",
  type: "string",
  required: true,
  example: "exampleCustomerId",
  comments:
    "A customer Id is a unique identifier that lets you target a specific individual.",
});

export const customerData = input({
  label: "Customer Data",
  type: "string",
  collection: "keyvaluelist",
  required: true,
  comments:
    "Provide key and value pairs that make up a customer record. The key must be a string, and the value can either be a string, number, array, or an object.",
});

export const eventData = input({
  label: "Event Data",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  comments:
    "Provide key and value pairs that describe the event that your customer performed.",
});

export const url = input({
  label: "URL",
  type: "string",
  required: true,
  example: "www.example.com",
  comments:
    "To track a specific page, enter the full path. To track any page, use the asterisk '*'",
});

export const eventName = input({
  label: "Event Name",
  example: "myCustomerEvent",
  type: "string",
  required: true,
  comments: "Provide a string value for the name of the new event.",
});

export const region = input({
  label: "Region",
  placeholder: "Region",
  type: "string",
  model: [
    { label: "US", value: "US" },
    { label: "EU", value: "EU" },
  ],
  required: true,
  comments: "Provide the region in which your account is configured on.",
});

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
});
