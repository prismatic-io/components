import { input, util } from "@prismatic-io/spectral";

export const id = input({
  label: "ID",
  type: "string",
  required: true,
  example: "exampleCustomerId",
  placeholder: "Enter customer ID",
  comments: "The unique identifier that targets a specific customer record.",
  clean: util.types.toString,
});

export const region = input({
  label: "Region",
  placeholder: "Enter region",
  type: "string",
  model: [
    { label: "US", value: "US" },
    { label: "EU", value: "EU" },
  ],
  required: true,
  example: "US",
  comments: "The region in which the account is configured.",
  clean: util.types.toString,
});

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Customer.io connection to use.",
});
