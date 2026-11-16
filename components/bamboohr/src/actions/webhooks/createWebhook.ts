import { action, outputSchema } from "@prismatic-io/spectral";
import { createBambooClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { createWebhookExamplePayload } from "../../examplePayloads";
import { createWebhookInputs } from "../../inputs";
import { createWebhookOutputSchema } from "../../outputSchemas";

export const createWebhook = action({
  display: {
    label: "Create Webhook",
    description: "Create a new webhook.",
  },
  inputs: createWebhookInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createWebhookOutputSchema,
  }),
  examplePayload: createWebhookExamplePayload,
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createBambooClient(params.connection, context.debug.enabled);

    if (!params.allowDuplicates) {
      const {
        data: { webhooks: allWebhooks },
      } = await client.get(ENDPOINTS.WEBHOOKS);
      const existingWebhooks = allWebhooks.filter(
        (webhook: { url: string; id: string }) => params.url === webhook.url,
      );
      if (existingWebhooks.length > 0) {
        context.logger.info(
          "A webhook with those parameters already exists. Skipping webhook creation and returning existing webhook.",
        );
        const { data: webhookData } = await client.get(
          `${ENDPOINTS.WEBHOOKS}/${existingWebhooks[0].id}/`,
        );
        return {
          data: webhookData,
        };
      }
    }

    const {
      data: { fields: clientFields },
    } = await client.get(`${ENDPOINTS.WEBHOOKS}/monitor_fields`);
    const aliasClientFields = clientFields
      .map((field: { alias: string }) => field.alias)
      .filter((data: string) => data);

    const postFields = Object.fromEntries(
      params.postFields
        .map((field: unknown) => {
          if (
            aliasClientFields.find(
              (clientField: string) => clientField === field,
            )
          ) {
            return [field, field] as [string, string];
          }
          context.logger.debug(
            `${field} will not be monitored as it is not enabled in this BambooHR account`,
          );
          return null;
        })
        .filter((field): field is [string, string] => field !== null),
    );

    const monitorAvailableFields = params.monitorFields
      .map((field: unknown) => {
        if (
          aliasClientFields.find((clientField: string) => clientField === field)
        ) {
          return field as string;
        }
        context.logger.debug(
          `${field} will not be included in webhook payloads as it is not enabled in this BambooHR account`,
        );
        return null;
      })
      .filter((field): field is string => field !== null);

    const { data } = await client.post(ENDPOINTS.WEBHOOKS, {
      name: params.name,
      monitorFields: monitorAvailableFields,
      postFields,
      url: params.url,
      format: "json",
    });

    const webhookSecrets = Array.isArray(context.crossFlowState.webhookSecrets)
      ? [...context.crossFlowState.webhookSecrets, data.privateKey]
      : [data.privateKey];

    return {
      data,
      crossFlowState: { webhookSecrets },
    };
  },
  examplePerform: async () => createWebhookExamplePayload,
});
