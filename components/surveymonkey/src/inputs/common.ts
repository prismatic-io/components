import { input, util } from "@prismatic-io/spectral";
import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";


















export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The SurveyMonkey connection to use.",
});





export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, automatically fetches all pages of results using pagination. The API returns up to 100 results per page.",
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

export const perPage = input({
  label: "Per Page",
  type: "string",
  required: false,
  comments: "The maximum number of results to return per page. Maximum: 100.",
  example: "50",
  placeholder: "Enter results per page",
  clean: util.types.toNumber,
});

export const extraBody = input({
  label: "Extra Body Fields",
  type: "code",
  language: "json",
  comments:
    "Additional body fields to include in the request as a JSON object.",
  required: false,
  example: JSON.stringify(
    {
      phone_number: "1234567890",
      href: "https://example.com/contact/1234567890",
    },
    null,
    2,
  ),
  clean: util.types.toObject,
});





export const getCurrentUserInputs = {
  connection: connectionInput,
};






const { debugRequest, ...httpRawRequestInputs } = httpClientInputs;

export const rawRequestInputs = {
  connection: connectionInput,
  ...httpRawRequestInputs,
  url: {
    ...httpRawRequestInputs.url,
    comments:
      "Input the path only (e.g., /surveys). The base URL is already included based on the configured region (e.g., https://api.surveymonkey.com/v3).",
    example: "/surveys",
  },
};
