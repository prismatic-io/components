import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { rawRequestExamplePayload } from "../../examplePayloads";
import { rawRequestInputs } from "../../inputs";

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send a raw HTTP request to Airtable.",
  },
  inputs: rawRequestInputs,
  perform: async (context, { connection, ...rest }) => {
    const apiKey = connection.token?.access_token || connection.fields.apiKey;
    const { data, headers } = await sendRawRequest(
      "https://api.airtable.com",
      { ...rest, debugRequest: context.debug.enabled },
      { Authorization: `Bearer ${apiKey}` },
    );
    return { data: { data, headers } };
  },
  examplePayload: rawRequestExamplePayload,
});
