import { action, util } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { rawRequestInputs } from "../../inputs";
import { LIVE_API_URL, MOCK_API_URL } from "../../constants";
const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Calendly.",
  },
  inputs: rawRequestInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection, ...rawRequestInputs }) => {
    const { data } = await sendRawRequest(
      util.types.toBool(connection.fields.useLiveServer)
        ? LIVE_API_URL
        : MOCK_API_URL,
      { ...rawRequestInputs, debugRequest: context.debug.enabled },
      { Authorization: `Bearer ${connection.token?.access_token}` },
    );
    return { data };
  },
});
export default rawRequest;
