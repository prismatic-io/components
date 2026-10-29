import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { BASE_URL_V1 } from "../../constants";
import { rawRequestExamplePayload } from "../../examplePayloads";
import { rawRequestV1Inputs } from "../../inputs";
import { toAuthorizationHeaders, validateConnection } from "../../utils";

const rawRequest = action({
  display: {
    label: "Raw Request (V1)",
    description: "Send raw HTTP request to Rippling API.",
  },
  inputs: rawRequestV1Inputs,
  examplePayload: rawRequestExamplePayload,
  perform: async (context, { connection, ...httpClientInputs }) => {
    validateConnection(connection);
    const { data } = await sendRawRequest(
      BASE_URL_V1,
      { ...httpClientInputs, debugRequest: context.debug.enabled },
      toAuthorizationHeaders(connection),
    );
    return { data };
  },
});

export default rawRequest;
