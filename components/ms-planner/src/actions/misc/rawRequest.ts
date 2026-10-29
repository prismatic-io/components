import { action, util } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { graphBaseUrl, validateConnection } from "../../utils";
import { rawRequestExamplePayload } from "../../examplePayloads";
import { rawRequestInputs } from "../../inputs";
export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send a raw HTTP request to the Microsoft Graph API.",
  },
  inputs: rawRequestInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection, ...params }) => {
    validateConnection(connection);
    const { data } = await sendRawRequest(
      graphBaseUrl(connection),
      {
        ...params,
        debugRequest: context.debug.enabled,
        headers: [
          { key: "Accept", value: "application/json" },
          { key: "Content-Type", value: "application/json" },
          ...params.headers,
        ],
      },
      {
        Authorization: `Bearer ${util.types.toString(connection.token?.access_token)}`,
      },
    );
    return { data };
  },
  examplePayload: rawRequestExamplePayload,
});
