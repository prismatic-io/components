import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { BASE_URL_V2 } from "../../../constants";
import { rawRequestV2ExamplePayload } from "../../../examplePayloads";
import { rawRequestV2Inputs } from "../../../inputs";
import { toAuthorizationHeaders, validateConnection } from "../../../utils";

export const rawRequestV2 = action({
  display: {
    label: "Raw Request (V2)",
    description: "Send raw HTTP request to Rippling API.",
  },
  inputs: rawRequestV2Inputs,
  examplePayload: rawRequestV2ExamplePayload,
  perform: async (context, { connection, ...httpClientInputs }) => {
    validateConnection(connection);
    const { data } = await sendRawRequest(
      BASE_URL_V2,
      { ...httpClientInputs, debugRequest: context.debug.enabled },
      toAuthorizationHeaders(connection),
    );
    return { data };
  },
});
