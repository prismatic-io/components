import { action, util } from "@prismatic-io/spectral";
import { rawRequestInputs } from "../../inputs";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to New Relic.",
  },
  inputs: rawRequestInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection, baseUrl, ...httpInputs }) => {
    const { data } = await sendRawRequest(
      baseUrl,
      { ...httpInputs, debugRequest: context.debug.enabled },
      {
        "Api-Key": util.types.toString(connection.fields.apiKey),
      },
    );
    return { data };
  },
});
export default rawRequest;
