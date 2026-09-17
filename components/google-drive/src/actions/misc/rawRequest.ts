import { action, util } from "@prismatic-io/spectral";
import {
  handleErrors,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { rawRequestInputs } from "../../inputs";
import { rawRequestExamplePayload } from "../../examplePayloads";
const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Google Drive",
  },
  inputs: rawRequestInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection, ...requestParams }) => {
    try {
      const { data } = await sendRawRequest(
        "https://www.googleapis.com/drive/v3",
        { ...requestParams, debugRequest: context.debug.enabled },
        {
          Authorization: `Bearer ${connection?.token?.access_token}`,
        },
      );
      return { data };
    } catch (error) {
      throw new Error(util.types.toJSON(handleErrors(error)));
    }
  },
  examplePayload: rawRequestExamplePayload,
});
export default rawRequest;
