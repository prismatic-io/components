import { input, util } from "@prismatic-io/spectral";
import { cleanStringInput } from "../util";
export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The SendGrid connection to use.",
});
export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, fetches all pages of results using pagination.",
  clean: util.types.toBool,
});
export const pageSize = input({
  label: "Page Size",
  type: "string",
  required: false,
  placeholder: "Enter page size",
  example: "10",
  comments: "Number of results to return per page (max 100).",
  clean: cleanStringInput,
});
export const pageToken = input({
  label: "Page Token",
  type: "string",
  required: false,
  placeholder: "Enter page token",
  comments: "Token for fetching the next or previous page of results.",
  clean: cleanStringInput,
});
