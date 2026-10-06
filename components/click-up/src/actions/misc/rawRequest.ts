import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import constants from "../../constants";
import { rawRequestExamplePayload } from "../../examplePayloads";
import { rawRequestInputs } from "../../inputs";
import { getBearerToken, validateConnection } from "../../util";
export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send a raw HTTP request to the ClickUp API.",
  },
  examplePayload: rawRequestExamplePayload,
  inputs: rawRequestInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection, ...httpClientInputs }) => {
    validateConnection(connection);
    const { data } = await sendRawRequest(
      constants.CLICK_UP_API_URL,
      { ...httpClientInputs, debugRequest: context.debug.enabled },
      {
        Authorization: `Bearer ${getBearerToken(connection)}`,
      },
    );
    return { data };
  },
});
