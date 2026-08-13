import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { API_URL, API_VERSIONS } from "../constants";
import { apiVersion, connection } from "./common";
export const rawRequestInputs = {
  connection,
  apiVersion,
  ...httpClientInputs,
  url: {
    ...httpClientInputs.url,
    comments: `Input the path only (/deviceManagement/detectedApps), The base URL is already included (${API_URL}${API_VERSIONS.v1}). For example, to connect to ${API_URL}${API_VERSIONS.v1}/deviceManagement/detectedApps, only /deviceManagement/detectedApps is entered in this field. e.g. /deviceManagement/detectedApps`,
  },
  debugRequest: {
    ...httpClientInputs.debugRequest,
    comments: "Enable this to log the request and response",
  },
};
