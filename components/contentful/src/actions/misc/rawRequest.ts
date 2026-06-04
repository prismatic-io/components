import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { API_BASE_URL } from "../../constants";
import { rawRequestInputs } from "../../inputs";
import { getAuthHeaders } from "../../util";

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Sends a raw HTTP request to the Contentful API.",
  },
  inputs: rawRequestInputs,
  perform: async (context, { connection, ...httpClientInputs }) => {
    const { data } = await sendRawRequest(
      API_BASE_URL,
      { ...httpClientInputs, debugRequest: context.debug.enabled },
      getAuthHeaders(connection),
    );
    return { data };
  },
});
