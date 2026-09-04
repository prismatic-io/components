import { input, util } from "@prismatic-io/spectral";
import {
  toKeyValueListArray,
  toOptionalObject,
  toOptionalString,
} from "../util";
import { connectionInput } from "./common";
const rawRequestEndpointInput = input({
  label: "Endpoint",
  type: "string",
  required: true,
  placeholder: "Enter API endpoint path",
  comments: "API endpoint path (e.g., /items, /changes, /categories).",
  example: "/items",
  clean: util.types.toString,
});
const rawRequestHttpMethodInput = input({
  label: "HTTP Method",
  type: "string",
  required: true,
  default: "GET",
  comments: "HTTP method for the request.",
  model: [
    { label: "GET", value: "GET" },
    { label: "POST", value: "POST" },
    { label: "PUT", value: "PUT" },
    { label: "PATCH", value: "PATCH" },
    { label: "DELETE", value: "DELETE" },
  ],
  clean: util.types.toString,
});
const rawRequestJsonPayloadInput = input({
  label: "JSON Payload",
  type: "data",
  required: false,
  comments: "JSON payload for POST/PUT/PATCH requests.",
  clean: toOptionalObject,
});
const rawRequestFormDataInput = input({
  label: "Form Data",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  placeholder: "Enter form data",
  comments: "Form data payload for requests (key-value pairs).",
  clean: toKeyValueListArray,
});
const rawRequestFileDataInput = input({
  label: "File Data",
  type: "data",
  required: false,
  comments: "File data for file upload requests (Buffer or file content).",
  clean: util.types.toData,
});
const rawRequestQueryParametersInput = input({
  label: "Query Parameters",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  placeholder: "Enter query parameters",
  comments: "Query parameters as key-value pairs.",
  clean: toKeyValueListArray,
});
const rawRequestHeadersInput = input({
  label: "Additional Headers",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  placeholder: "Enter additional headers",
  comments:
    "Additional HTTP headers as key-value pairs (authentication headers are handled automatically).",
  clean: toKeyValueListArray,
});
const rawRequestResponseTypeInput = input({
  label: "Response Type",
  type: "string",
  required: false,
  default: "json",
  comments: "Expected response format.",
  model: [
    { label: "JSON", value: "json" },
    { label: "Text", value: "text" },
    { label: "Buffer", value: "buffer" },
    { label: "Stream", value: "stream" },
  ],
  clean: toOptionalString,
});
export const rawRequestInputs = {
  connection: connectionInput,
  endpoint: rawRequestEndpointInput,
  httpMethod: rawRequestHttpMethodInput,
  jsonPayload: rawRequestJsonPayloadInput,
  formData: rawRequestFormDataInput,
  fileData: rawRequestFileDataInput,
  queryParameters: rawRequestQueryParametersInput,
  additionalHeaders: rawRequestHeadersInput,
  responseType: rawRequestResponseTypeInput,
};
