import { input, util } from "@prismatic-io/spectral";
import { cleanCode, cleanKeyValueListInput } from "../util";
import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { BASE_URL } from "../constants";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
});
export const defaultInputs = {
  connection,
};

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  comments: "Whether to fetch all records or just the first page.",
  clean: util.types.toBool,
});

export const queryParams = input({
  label: "Query Parameters",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  comments: "The query parameters to include in the request.",
  example: "key1=value1&key2=value2",
  placeholder: "key1=value1&key2=value2",
  clean: cleanKeyValueListInput,
});

export const customBody = input({
  label: "Body",
  type: "code",
  language: "json",
  required: false,
  comments: "Custom fields to include in the request body.",
  clean: cleanCode,
});

export const defaultListActionsInputs = {
  queryParams,
  ...defaultInputs,
};

const { debugRequest: _, ...originalHttpClientInputs } = httpClientInputs;

export const rawRequestInputs = {
  connection,
  ...originalHttpClientInputs,
  url: {
    ...originalHttpClientInputs.url,
    comments: `Input the path only (/contacts), The base URL is already included (${BASE_URL}). For example, to connect to ${BASE_URL}contacts, only /contacts is entered in this field. e.g. /contacts`,
    example: "/contacts",
    placeholder: "/contacts",
  },
};
