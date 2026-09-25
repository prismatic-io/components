import { action, outputSchema } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { createWebhookInputs } from "../../inputs";
import { webhookResponseSchema } from "../../outputSchemas";
export const createWebhook = action({
  display: {
    label: "Create Webhook",
    description: "Create a webhook to send data from Asana to an instance URL.",
  },
  inputs: createWebhookInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: webhookResponseSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    try {
      const { data } = await client.post("/webhooks", {
        data: {
          resource: params.resourceId,
          target: params.endpoint,
          filters: params.filter,
        },
      });
      return { data };
    } catch (err) {
      const error = err as {
        response: {
          data: {
            errors: {
              message: string;
            }[];
          };
        };
      };
      if (error) {
        if (
          error?.response?.data?.errors?.[0]?.message?.includes(
            "Duplicated webhook",
          )
        ) {
          console.warn(
            `Skipping creation of webhook. A webhook with resource (${params.resourceId}) and target (${params.endpoint}) already exists.`,
          );
          return;
        }
      }
      throw err;
    }
  },
});
