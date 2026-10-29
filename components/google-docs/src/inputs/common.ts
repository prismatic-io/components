import { input, util } from "@prismatic-io/spectral";

export const cleanString = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Google Docs connection to use.",
});
