import { input, util } from "@prismatic-io/spectral";
import { toOptionalString } from "../util";
export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Mixpanel connection to use.",
});
export const verbose = input({
  label: "Verbose",
  type: "string",
  clean: toOptionalString,
  comments:
    "When true, Mixpanel will respond with a detailed JSON object describing the success or failure of the tracking call. Set to 1 to enable verbose responses for debugging.",
  placeholder: "Enter 1 to enable verbose mode",
  required: false,
  example: "1",
});
export const redirect = input({
  label: "Redirect",
  type: "string",
  clean: toOptionalString,
  comments:
    "When provided, Mixpanel will serve a redirect to the given URL as a response. Useful for link tracking in notifications.",
  placeholder: "Enter redirect URL",
  required: false,
  example: "https://example.com/redirect",
});
export const region = input({
  label: "Region",
  type: "string",
  clean: util.types.toString,
  comments:
    "The server location to use. Select 'api' for the default US servers or 'api-eu' for EU servers if the account is enrolled in EU Data Residency.",
  placeholder: "Select region",
  model: [
    {
      label: "api",
      value: "api",
    },
    {
      label: "api-eu",
      value: "api-eu",
    },
  ],
  required: true,
});
export const regionAndDomain = input({
  label: "Region and Domain",
  type: "string",
  clean: util.types.toString,
  comments:
    "The server location to use. Select 'mixpanel' for the default US servers or 'eu.mixpanel' for EU servers if the account is enrolled in EU Data Residency.",
  placeholder: "Select region and domain",
  model: [
    {
      label: "mixpanel",
      value: "mixpanel",
    },
    {
      label: "eu.mixpanel",
      value: "eu.mixpanel",
    },
  ],
  required: true,
});
export const dataAndDomain = input({
  label: "Data and Domain",
  type: "string",
  clean: util.types.toString,
  comments:
    "The server location to use. Select 'data' for the default US servers or 'data-eu' for EU servers if the account is enrolled in EU Data Residency.",
  placeholder: "Select data and domain",
  model: [
    {
      label: "data",
      value: "data",
    },
    {
      label: "data-eu",
      value: "data-eu",
    },
  ],
  required: true,
});
export const project_id = input({
  label: "Project ID",
  type: "string",
  clean: toOptionalString,
  comments:
    "The Mixpanel project ID. Required when using service account authentication (Username and Password). Find this in Settings > Project Settings in the Mixpanel dashboard.",
  placeholder: "Enter project ID",
  required: false,
  example: "2891273",
});
export const workspace_id = input({
  label: "Workspace ID",
  type: "string",
  clean: toOptionalString,
  comments:
    "The ID of the workspace if applicable. Only required for workspace-specific queries.",
  placeholder: "Enter workspace ID",
  required: false,
  example: "3847562",
});
export const from_date = input({
  label: "From Date",
  type: "string",
  clean: util.types.toString,
  comments:
    "The start date for querying in YYYY-MM-DD format. This date is inclusive.",
  placeholder: "Enter start date (YYYY-MM-DD)",
  required: true,
  example: "2024-01-01",
});
export const to_date = input({
  label: "To Date",
  type: "string",
  clean: util.types.toString,
  comments:
    "The end date for querying in YYYY-MM-DD format. This date is inclusive.",
  placeholder: "Enter end date (YYYY-MM-DD)",
  required: true,
  example: "2024-01-31",
});
export const where = input({
  label: "Where",
  type: "string",
  clean: toOptionalString,
  comments:
    "An expression to filter events. See [segmentation expressions](https://docs.mixpanel.com/reference/segmentation-expressions) for syntax details.",
  placeholder: "Enter filter expression",
  required: false,
  example: "properties['account_id'] in [1,2,3,4]",
});
export const limit = input({
  label: "Limit",
  type: "string",
  clean: toOptionalString,
  comments:
    "The maximum number of top property values to return. Defaults to 255, maximum 10,000. Only applies when 'on' is specified.",
  placeholder: "Enter limit value",
  required: false,
  example: "100",
});
export const useProjectToken = input({
  label: "Use Project Token",
  type: "boolean",
  clean: util.types.toBool,
  default: "false",
  comments:
    "When true, uses the project token from the connection to authenticate the request instead of service account credentials.",
});
