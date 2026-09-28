import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { BASE_URL } from "../../constants";
import { rawRequestInputs as inputs } from "../../inputs";
import { getAuthorizationHeader, validateConnection } from "../../util";
export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Klaviyo.",
  },
  inputs,
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, excludeAuthorization, ...rawRequestInputs },
  ) => {
    validateConnection(connection);
    const authorizationHeader = getAuthorizationHeader(connection);
    const { data } = await sendRawRequest(
      BASE_URL,
      {
        ...rawRequestInputs,
        debugRequest: context.debug.enabled,
      },
      excludeAuthorization ? {} : authorizationHeader,
    );
    return { data };
  },
});
