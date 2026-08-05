import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { rawRequestInputs } from "../../inputs";
import {
  getApplicationKeyFromConnection,
  getTokenFromConnection,
  getURLFromConnection,
  validateConnection,
} from "../../util";
export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to ServiceDesk Plus",
  },
  inputs: rawRequestInputs,
  perform: async (context, { connection, urlType, ...httpClientInputs }) => {
    validateConnection(connection);
    const applicationKey = getApplicationKeyFromConnection(connection);
    const completeServiceTitanURL = getURLFromConnection(connection, urlType);
    const token = getTokenFromConnection(connection);
    const { data } = await sendRawRequest(
      completeServiceTitanURL,
      { ...httpClientInputs, debugRequest: context.debug.enabled },
      {
        Authorization: `Bearer ${token}`,
        Accepts: "application/json",
        "Content-type": "application/json",
        "ST-App-Key": applicationKey,
      },
    );
    return { data };
  },
});
