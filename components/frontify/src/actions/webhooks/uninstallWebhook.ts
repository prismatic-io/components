import { action } from "@prismatic-io/spectral";
import { gql } from "graphql-request";
import { createClient } from "../../client";
import { uninstallWebhookExamplePayload as examplePayload } from "../../examplePayloads";
import { uninstallWebhookInputs as inputs } from "../../inputs/webhooks";

export const uninstallWebhook = action({
  display: {
    label: "Uninstall Webhook",
    description: "Uninstall a Webhook.",
  },
  perform: async (context, { connection, webhookId }) => {
    const mutation = gql`
      mutation uninstallWebhook($input: UninstallWebhookInput!) {
        uninstallWebhook(input: $input) {
          webhook {
            id
          }
        }
      }
    `;
    const response = await createClient({
      connection,
      debug: context.debug.enabled,
    }).request(mutation, { input: { id: webhookId } });

    return {
      data: response,
    };
  },
  inputs,
  examplePayload,
});
