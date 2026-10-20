import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import {
  cleanString,
  toHeaderObject,
  toKeyValueObject,
  toOptionalPositiveNumber,
  toRelativeApiPath,
} from "../utils";
import { connectionInput } from "./common";
const {
  debugRequest: _debugRequest,
  formData: _formData,
  fileData: _fileData,
  fileDataFileNames: _fileDataFileNames,
  maxRetries: _maxRetries,
  retryDelayMS: _retryDelayMS,
  retryAllErrors: _retryAllErrors,
  useExponentialBackoff: _useExponentialBackoff,
  ...rawRequestHttpInputs
} = httpClientInputs;
export const rawRequestInputs = {
  connection: connectionInput,
  ...rawRequestHttpInputs,
  url: {
    ...rawRequestHttpInputs.url,
    comments:
      "Input the path only (/projects/278964/issues). The base URL, including /api/v4, is already included from the connection. For example, to call https://gitlab.com/api/v4/projects/278964/issues, enter only /projects/278964/issues. Full URLs (with a scheme or starting with //) are rejected.",
    example: "/projects/278964/issues",
    clean: toRelativeApiPath,
  },
  data: {
    ...rawRequestHttpInputs.data,
    clean: cleanString,
  },
  queryParams: {
    ...rawRequestHttpInputs.queryParams,
    clean: toKeyValueObject,
  },
  headers: {
    ...rawRequestHttpInputs.headers,
    clean: toHeaderObject,
  },
  timeout: {
    ...rawRequestHttpInputs.timeout,
    clean: toOptionalPositiveNumber,
  },
};
