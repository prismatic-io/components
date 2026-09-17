import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { rawRequestInputs } from "../../inputs";
import { getFallbackConnectionToken, validateConnection } from "../../util";
const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Mixpanel",
  },
  inputs: rawRequestInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection, ...params }) => {
    validateConnection(connection);
    const authorization = getFallbackConnectionToken(connection);
    const { data } = await sendRawRequest(
      params.baseUrl,
      { ...params, debugRequest: context.debug.enabled },
      {
        Authorization: authorization,
      },
    );
    return { data };
  },
});
export default rawRequest;
