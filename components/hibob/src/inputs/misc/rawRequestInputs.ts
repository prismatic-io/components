import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { HIBOB_API_URL_PROD, HIBOB_API_URL_SANDBOX } from "../../constants";
import { connection } from "../common";

export const rawRequestInputs = {
  connection,
  url: {
    ...httpClientInputs.url,
    comments: `Input the path only (/docs/folders/metadata). The base URL is determined by the connection's sandbox setting (${HIBOB_API_URL_PROD} for production, ${HIBOB_API_URL_SANDBOX} for sandbox). For example, to connect to ${HIBOB_API_URL_PROD}/docs/folders/metadata, only /docs/folders/metadata is entered in this field.`,
    example: "/docs/folders/metadata",
  },
  method: httpClientInputs.method,
  data: httpClientInputs.data,
  formData: httpClientInputs.formData,
  fileData: httpClientInputs.fileData,
  fileDataFileNames: httpClientInputs.fileDataFileNames,
  queryParams: httpClientInputs.queryParams,
  headers: httpClientInputs.headers,
  responseType: httpClientInputs.responseType,
  timeout: httpClientInputs.timeout,
  retryDelayMS: httpClientInputs.retryDelayMS,
  retryAllErrors: httpClientInputs.retryAllErrors,
  maxRetries: httpClientInputs.maxRetries,
  useExponentialBackoff: httpClientInputs.useExponentialBackoff,
};
