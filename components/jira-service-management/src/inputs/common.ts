import { input, util } from "@prismatic-io/spectral";
import { toObjectOrEmpty, toOptionalNumber } from "../util";



export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Jira Service Management connection to use.",
});



export const start = input({
  label: "Start",
  type: "string",
  required: false,
  default: "0",
  comments: "The starting index of the returned items. First item is 0.",
  placeholder: "Enter start index",
  example: "50",
  clean: toOptionalNumber,
});

export const limit = input({
  label: "Limit",
  type: "string",
  required: false,
  comments: "The maximum number of items to return per page.",
  placeholder: "Enter limit",
  example: "50",
  clean: toOptionalNumber,
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, automatically fetches all pages of results using pagination. Ignores start and limit when true.",
  clean: util.types.toBool,
});



export const serviceDeskId = input({
  label: "Service Desk ID",
  type: "string",
  required: true,
  comments:
    "The unique identifier of the service desk. Use the List Service Desks action or the Service Desk data source to find this value.",
  placeholder: "Enter service desk ID",
  example: "1",
  dataSource: "selectServiceDesk",
  clean: util.types.toString,
});

export const requestTypeId = input({
  label: "Request Type ID",
  type: "string",
  required: true,
  comments:
    "The ID of the request type to create the request as. Use the List Request Types action or the Request Type data source.",
  placeholder: "Enter request type ID",
  example: "5",
  dataSource: "selectRequestType",
  clean: util.types.toString,
});

export const issueIdOrKey = input({
  label: "Issue ID or Key",
  type: "string",
  required: true,
  comments:
    "The ID or key of the service request issue (e.g., IT-42 or 10001). Use the Select Request data source or List Requests action to find this value.",
  placeholder: "Enter issue ID or key",
  example: "IT-42",
  dataSource: "selectRequest",
  clean: util.types.toString,
});

export const accountIds = input({
  label: "Account IDs",
  type: "code",
  language: "json",
  required: true,
  comments:
    "The Atlassian accountIds to include in the request. Provide a JSON array of string identifiers.",
  placeholder: "Enter account IDs as JSON array",
  example: JSON.stringify(
    ["5b10ac8d82e05b22cc7d4ef5", "5b10a2844c20165700ede21g"],
    null,
    2,
  ),
  clean: util.types.toObject,
});

export const additionalFields = input({
  label: "Additional Fields",
  type: "code",
  language: "json",
  comments:
    "Extra request body properties to merge into the payload alongside the standard inputs. Provide a JSON object keyed by field name.",
  required: false,
  placeholder: "Enter additional fields as JSON",
  example: JSON.stringify({ email: "sally@netflix.com" }, null, 2),
  clean: toObjectOrEmpty,
});

export const additionalQueryParams = input({
  label: "Additional Query Parameters",
  type: "code",
  language: "json",
  comments:
    "Extra query string parameters to merge into the request URL alongside the standard inputs. Provide a JSON object keyed by parameter name.",
  required: false,
  placeholder: "Enter additional query parameters as JSON",
  example: JSON.stringify({ includeCounts: true }, null, 2),
  clean: toObjectOrEmpty,
});
