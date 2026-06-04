import { input, util } from "@prismatic-io/spectral";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Zendesk Sell connection to use.",
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  clean: util.types.toBool,
  comments:
    "When enabled, automatically fetches all pages of results. Page and Per Page inputs are ignored when this is enabled.",
  required: false,
  default: "false",
});
