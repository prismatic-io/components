import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { API_VERSIONS } from "../../constants";
import { rawRequestInputs } from "../../inputs";
import { getBaseUrl, validateConnection } from "../../util";
export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Microsoft Intune API.",
  },
  inputs: rawRequestInputs,
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
