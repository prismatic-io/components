import { input, util } from "@prismatic-io/spectral";
import { toOptionalString } from "../util";

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The System Surveyor connection to use.",
});

export const siteId = input({
  label: "Site ID",
  type: "string",
  required: true,
  comments: "The unique identifier (UUID) of the site.",
  example: "6ac251fc-5763-4e21-aa82-0a9efac256e5",
  placeholder: "Enter site ID",
  clean: util.types.toString,
  dataSource: "selectSite",
});

export const teamIdInput = input({
  label: "Team ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the team in System Surveyor.",
  example: "33434",
  placeholder: "Enter team ID",
  clean: util.types.toString,
  dataSource: "selectTeam",
});

export const modifiedAfter = input({
  label: "Modified After",
  placeholder: "Enter Unix UTC epoch timestamp (e.g. 1672531199)",
  type: "string",
  required: false,
  comments:
    "Filters results to only include records modified after this Unix UTC epoch timestamp. Leave blank to retrieve all records.",
  example: "1672531199",
  clean: toOptionalString,
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, automatically fetches all pages of results using pagination. When false, returns a single page based on the Page Number and Page Size inputs.",
  clean: util.types.toBool,
});

export const pageNumber = input({
  label: "Page Number",
  type: "string",
  required: false,
  comments:
    "The 1-based page number to retrieve. Used when Fetch All is disabled.",
  example: "1",
  placeholder: "Enter page number",
  clean: toOptionalString,
});

export const pageSize = input({
  label: "Page Size",
  type: "string",
  required: false,
  comments: "The number of records per page. Used when Fetch All is disabled.",
  example: "50",
  placeholder: "Enter page size",
  clean: toOptionalString,
});

export const surveyIds = input({
  label: "Survey IDs",
  type: "string",
  required: true,
  collection: "valuelist",
  example: "6ac251fc-5763-4e21-aa82-0a9efac256e5",
  comments: "A list of survey UUID identifiers to include in the request.",
  placeholder: "Enter survey ID",
  clean: (value) =>
    (Array.isArray(value) ? value : [value]).map((v) => util.types.toString(v)),
  dataSource: "selectSiteSurvey",
});
