import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/http";
import { rawRequestExamplePayload } from "../../examplePayloads";
import { rawRequestInputs } from "../../inputs";

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Sends a raw HTTP request to Microsoft Outlook.",
  },
  inputs: rawRequestInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection, ...rawRequestInputs }) => {
    const { data } = await sendRawRequest(
      "https://graph.microsoft.com/v1.0",
      {
        ...rawRequestInputs,
        debugRequest: context.debug.enabled,
        headers: [
          ...rawRequestInputs.headers,
          { key: "Accepts", value: "application/json" },
          { key: "Content-type", value: "application/json" },
        ],
      },
      { Authorization: `Bearer ${connection.token?.access_token}` },
    );
    return { data };
  },
  examplePayload: rawRequestExamplePayload,
});
