import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { DEFAULT_VERSION } from "../constants";
import { cleanKeyValuePairs, cleanString, cleanVersion } from "../util/clean";
export const myConnectionField = input({
  label: "Connection",
  type: "connection",
  required: true,
});
export const webhookConnection = {
  ...myConnectionField,
  comments:
    "This connection must be a Meta Ads Client Credentials connection to be able to use webhooks APIs.",
};
export const version = input({
  label: "Graph Version",
  type: "string",
  required: false,
  example: `${DEFAULT_VERSION}`,
  comments: `Provide the version of the Graph API to use. Defaults to ${DEFAULT_VERSION}.`,
  default: `${DEFAULT_VERSION}`,
  clean: cleanVersion,
});
export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "If true, it will fetch all records and ignore parameters like limit, after, and before.",
  clean: util.types.toBool,
});
export const limit = input({
  label: "Limit",
  type: "string",
  required: false,
  comments: "Provide a limit for the result set.",
  example: "30",
  placeholder: "30",
  clean: cleanString,
});
export const after = input({
  label: "After",
  type: "string",
  required: false,
  comments: "Provide the token for the item after the current one.",
  example: "xOTQ1MjAwNzI5NDE=",
  placeholder: "xOTQ1MjAwNzI5NDE=",
  clean: cleanString,
});
export const before = input({
  label: "Before",
  type: "string",
  required: false,
  comments: "Provide the token for the item before the current one.",
  example: "xOTQ1MjAwNzI5NDE=",
  placeholder: "xOTQ1MjAwNzI5NDE=",
  clean: cleanString,
});
export const pagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Limit, before, and after cursor controls.",
  inputs: { limit, before, after },
});
export const fields = input({
  label: "Fields",
  type: "string",
  required: false,
  comments: "Provide a comma separated list of fields to be returned.",
  placeholder: "id,name",
  clean: cleanString,
});
export const optionalValues = input({
  label: "Optional Values",
  type: "string",
  required: false,
  collection: "keyvaluelist",
  comments: "Provide optional values to mutate the given object.",
  clean: cleanKeyValuePairs,
});
export const userId = input({
  label: "User Id",
  type: "string",
  required: true,
  example: "587490763",
  placeholder: "587490763",
  comments: "Provide the Id of a user.",
  clean: util.types.toString,
});
export const adAccountId = input({
  label: "Ad Account",
  type: "string",
  required: true,
  example: "act_342512647855388",
  placeholder: "act_342512647855388",
  comments:
    "Provide the identifier of an Ad Account. This value should be an Id.",
  clean: util.types.toString,
  dataSource: "selectAdAccount",
});
export const adId = input({
  label: "Ad Id",
  type: "string",
  required: true,
  example: "342512647855388",
  placeholder: "342512647855388",
  comments: "Provide the Id of an Ad or Ad Set.",
  clean: util.types.toString,
  dataSource: "selectAdsInAccount",
});
