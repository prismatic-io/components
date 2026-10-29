import { input } from "@prismatic-io/spectral";

export const connectionInput = input({
  label: "Connection",
  comments: "The PostgreSQL connection to use.",
  type: "connection",
  required: true,
});
