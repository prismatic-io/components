import { input, util } from "@prismatic-io/spectral";
export const timestamp = input({
  label: "Timestamp",
  type: "string",
  example: "1562767499238",
  placeholder: "Enter UNIX timestamp",
  required: true,
  comments: "A valid UNIX timestamp to be passed alongside the logs.",
  clean: util.types.toString,
});
export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The New Relic connection to use.",
});
