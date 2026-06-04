import { input, util } from "@prismatic-io/spectral";
import { cleanCodeInput, cleanKeyValueListInput, cleanString } from "../util";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Bynder connection to use.",
});

export const id = input({
  label: "ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the resource to retrieve.",
  example: "00000000-0000-0000-0000000000000000",
  placeholder: "Enter resource ID",
  clean: util.types.toString,
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  comments:
    "When true, automatically fetches all pages of results using pagination.",
  default: "false",
  clean: util.types.toBool,
});

export const page = input({
  label: "Page",
  type: "string",
  required: false,
  comments: "The page number to retrieve (starts at 1).",
  example: "1",
  placeholder: "Enter page number",
  clean: util.types.toNumber,
});

export const limit = input({
  label: "Limit",
  type: "string",
  required: false,
  comments: "The maximum number of results to return per page.",
  example: "100",
  placeholder: "Enter limit",
  clean: util.types.toNumber,
});

export const bodyData = input({
  label: "Data",
  type: "code",
  language: "json",
  required: false,
  comments:
    "Additional fields to include in the request body as a JSON object.",
  example: JSON.stringify(
    {
      active: 1,
      job: "Developer",
      department: "Development",
      phoneNumber: "+00 123456789",
    },
    null,
    2,
  ),
  placeholder: "Enter additional fields as JSON",
  clean: cleanCodeInput,
});

export const extraParams = input({
  label: "Extra Parameters",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  comments: "Additional query parameters to include in the request.",
  example: '{"keyword": "logo"}',
  clean: cleanKeyValueListInput,
});

export const name = input({
  label: "Name",
  type: "string",
  required: false,
  comments:
    "The display name of the asset. The asset will have no name if this is left empty.",
  example: "Company Logo 2024",
  placeholder: "Enter asset name",
  clean: cleanString,
});

export const description = input({
  label: "Description",
  type: "string",
  required: false,
  comments: "A text description providing additional context about the asset.",
  example: "Official company logo for external use, approved by marketing.",
  placeholder: "Enter asset description",
  clean: cleanString,
});
