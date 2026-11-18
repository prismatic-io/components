import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/http";
import { getAuthHeaders } from "../../client";
import { API_VERSIONS } from "../../constants";
import { rawRequestInputs } from "../../inputs";
import { getBaseUrl } from "../../util";

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Microsoft Intune API.",
  },
  inputs: rawRequestInputs,
  performSafety: "notAllowed",
  perform: async (
    { debug: { enabled: debug } },
    { connection, apiVersion, ...httpClientInputs },
  ) => {
    const useBeta = apiVersion === API_VERSIONS.beta;
    const { data } = await sendRawRequest(
      getBaseUrl(useBeta),
      { ...httpClientInputs, debugRequest: debug },
      getAuthHeaders(connection),
    );
    return { data };
  },
});
