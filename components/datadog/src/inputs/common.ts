import { type Connection, input } from "@prismatic-io/spectral";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Datadog connection to use for authentication.",
  clean: (value: unknown) => value as Connection,
});
