import { action } from "@prismatic-io/spectral";
import { gql } from "graphql-request";
import { createClient } from "../../client";
import { installWebhookExamplePayload as examplePayload } from "../../examplePayloads";
import { installWebhookInputs as inputs } from "../../inputs/webhooks";

export const installWebhook = action({
  display: {
    label: "Install Webhook",
    description: "Install a Webhook onto a Workspace Project or Library.",
  },
  perform: async (context, { connection, ...input }) => {
    const mutation = gql`
      mutation installWebhook($input: InstallProjectWebhookInput!) {
        installProjectWebhook(input: $input) {
          webhook {
            id
            creator {
              id
              email
              name
            }
            createdAt
            name
            notificationUrl
            secret
          }
        }
      }
    `;
    const response = await createClient({
      connection,
      debug: context.debug.enabled,
    }).request(mutation, { input });

    return {
      data: response,
    };
  },
  inputs,
  examplePayload,
});
