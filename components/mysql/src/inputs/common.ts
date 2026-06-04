import { input } from "@prismatic-io/spectral";

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The MySQL connection to use.",
});
