import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { BASE_URL } from "../../constants";
import { rawRequestInputs } from "../../inputs";
import { getBearerToken, validateConnection } from "../../util";
export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send a raw HTTP request to Asana.",
  },
  inputs: rawRequestInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection, ...rawRequestInputs }) => {
    validateConnection(connection);
    const { data } = await sendRawRequest(
      BASE_URL,
      { ...rawRequestInputs, debugRequest: context.debug.enabled },
      { Authorization: getBearerToken(connection) },
    );
    return { data };
  },
});
