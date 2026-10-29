import { input, util } from "@prismatic-io/spectral";
import { cleanFunctionForString, cleanNumber } from "../util";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Adobe Acrobat Sign connection to use.",
});

export const cursor = input({
  label: "Cursor",
  type: "string",
  required: false,
  placeholder: "Enter cursor value",
  comments:
    "Used to navigate through pagination. If not provided, it will default to the first page. Only applied when Fetch All is false.",
  clean: util.types.toString,
});

export const pageSize = input({
  label: "Page Size",
  type: "string",
  required: false,
  placeholder: "Enter page size",
  example: "100",
  comments:
    "The number of results to return per page. If not provided, it is decided by your application settings. Only applied when Fetch All is false.",
  clean: cleanNumber,
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, automatically fetches all pages of results using pagination.",
  clean: util.types.toBool,
});

export const filterQuery = input({
  label: "Filter Query",
  type: "string",
  required: false,
  placeholder: "Enter filter text",
  example: "Engineering",
  comments: "Filter results by matching this text.",
  clean: cleanFunctionForString,
});

export const externalId = input({
  label: "External ID",
  type: "string",
  required: false,
  placeholder: "Enter External ID",
  example: "EXT-2024-001",
  comments:
    "Case-sensitive External ID for which you would like to retrieve agreement information. ExternalId is passed in the call to the agreement creation API. <strong>Note:</strong> The externalId value is visible to all participants through the API, so should not be used to contain a sensitive token.",
  clean: util.types.toString,
});

export const groupId = input({
  label: "Group ID",
  type: "string",
  required: false,
  placeholder: "Enter Group ID",
  example: "CBJCHBCAABAAIYEoZ3VPDavcqvJm3ni7ATNn-O9N3OPf",
  comments:
    "The group identifier, as returned by the group creation API or retrieved from the API to fetch groups.",
  dataSource: "selectGroup",
  clean: util.types.toString,
});

export const email = input({
  label: "Email",
  type: "string",
  required: true,
  placeholder: "Enter email address",
  example: "john.doe@example.com",
  comments: "The email address of the user to be created.",
  clean: util.types.toString,
});

export const company = input({
  label: "Company",
  type: "string",
  required: false,
  placeholder: "Enter company name",
  example: "Acme Corporation",
  comments: "The company of the user.",
  clean: util.types.toString,
});

export const firstName = input({
  label: "First Name",
  type: "string",
  required: false,
  placeholder: "Enter first name",
  example: "John",
  comments: "The first name of the user.",
  clean: util.types.toString,
});

export const lastName = input({
  label: "Last Name",
  type: "string",
  required: false,
  placeholder: "Enter last name",
  example: "Doe",
  comments: "The last name of the user.",
  clean: util.types.toString,
});

export const locale = input({
  label: "Locale",
  type: "string",
  required: false,
  placeholder: "Enter locale",
  example: "en_US",
  comments: "The locale of the user.",
  clean: util.types.toString,
});

export const phone = input({
  label: "Phone",
  type: "string",
  required: false,
  placeholder: "Enter phone number",
  example: "+1-555-123-4567",
  comments: "The phone number of the user.",
  clean: util.types.toString,
});

export const title = input({
  label: "Title",
  type: "string",
  required: false,
  placeholder: "Enter job title",
  example: "Sales Manager",
  comments: "The job title of the user.",
  clean: util.types.toString,
});

export const accountId = input({
  label: "Account ID",
  type: "string",
  required: false,
  placeholder: "Enter Account ID",
  example: "CBJCHBCAABAAxxxxxxxxxxxxxxxxxxxxxxxxxx",
  comments: "The account ID of the user.",
  clean: util.types.toString,
});
