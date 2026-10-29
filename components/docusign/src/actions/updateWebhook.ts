import { action } from "@prismatic-io/spectral";
import { getDocuSignClient } from "../client";
import { connection, jsonInput } from "../inputs";
import { webhookJson } from "../json/webhookJson";
import { updateWebhookPayload } from "../examplePayloads";

export const updateWebhook = action({
  display: {
    label: "Update Webhook",
    description: "Update an existing webhook.",
  },
  perform: async (context, { connection, jsonInput }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.put(`/connect`, jsonInput);
    return { data };
  },
  inputs: {
    connection,
    jsonInput: {
      ...jsonInput,
      required: true,
      default: JSON.stringify(webhookJson, null, 2),
      comments:
        "For extra fields, see https://developers.docusign.com/docs/esign-rest-api/reference/connect/connectconfigurations/update/",
    },
  },
  examplePayload: updateWebhookPayload,
});
