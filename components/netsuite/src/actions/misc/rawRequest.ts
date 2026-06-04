import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { authorizationHeaders, baseUrl } from "../../client";
import { rawRequestGETExamplePayload } from "../../examplePayloads";
import { rawRequestInputs } from "../../inputs";

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to NetSuite",
  },
  inputs: rawRequestInputs,
  examplePayload: rawRequestGETExamplePayload,
  perform: async (
    context,
    { connection, serviceType, ...httpClientInputs },
  ) => {
    const { data, headers } = await sendRawRequest(
      baseUrl(connection, serviceType),
      { ...httpClientInputs, debugRequest: context.debug.enabled },
      await authorizationHeaders(connection),
    );
    return { data: { data, headers: headers as Record<string, string> } };
  },
});
