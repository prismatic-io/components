import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { getAccessToken } from "../../client";
import { API_ROOT_URL } from "../../constants";
import { rawRequestInputs } from "../../inputs";
export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Box.",
  },
  inputs: rawRequestInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection, ...httpClientInputs }) => {
    const accessToken = getAccessToken({ boxConnection: connection });
    const { data } = await sendRawRequest(API_ROOT_URL, httpClientInputs, {
      Authorization: `Bearer ${accessToken}`,
    });
    return { data };
  },
});
