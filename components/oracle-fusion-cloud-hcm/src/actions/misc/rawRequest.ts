import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { getAuthHeaders, getBaseUrl } from "../../client";
import { rawRequestExamplePayload } from "../../examplePayloads/misc";
import { rawRequestInputs } from "../../inputs";
export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send a raw HTTP request to Oracle Fusion Cloud HCM REST API.",
  },
  inputs: rawRequestInputs,
  perform: async (context, { connection, ...inputs }) => {
    const { data } = await sendRawRequest(
      getBaseUrl(connection),
      { ...inputs, debugRequest: context.debug.enabled },
      {
        ...getAuthHeaders(connection),
        "REST-Framework-Version": "3",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    );
    return { data };
  },
  examplePayload: rawRequestExamplePayload,
});
