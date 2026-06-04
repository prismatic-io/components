import { action } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { connection, apiVersion } from "../../inputs/general";
import { getBaseUrl, validateConnection } from "../../util";
import { API_URL, API_VERSIONS } from "../../constants";

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Microsoft Intune API",
  },
  inputs: {
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
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, apiVersion, ...httpClientInputs },
  ) => {
    validateConnection(connection);
    const useBeta = apiVersion === API_VERSIONS.beta;
    const { data } = await sendRawRequest(
      getBaseUrl(useBeta),
      { ...httpClientInputs, debugRequest: debug },
      {
        Authorization: `Bearer ${connection.token?.access_token}`,
      },
    );
    return { data };
  },
});
