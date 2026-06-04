import { action } from "@prismatic-io/spectral";
import { createBambooClient } from "../../client";
import { createWebhookExamplePayload } from "../../examplePayloads";
import { createWebhookInputs } from "../../inputs";


export const createWebhook = action({
  display: {
    label: "Create Webhook",
    description: "Create a new webhook.",
  },
  inputs: createWebhookInputs,
  examplePayload: createWebhookExamplePayload,
  perform: async (context, params) => {
    const client = createBambooClient(params.connection, context.debug.enabled);

    
    if (!params.allowDuplicates) {
      const {
        data: { webhooks: allWebhooks },
      } = await client.get("/v1/webhooks");
      const existingWebhooks = allWebhooks.filter(
        (webhook) => params.url === webhook.url,
      );
      if (existingWebhooks.length > 0) {
        context.logger.info(
          "A webhook with those parameters already exists. Skipping webhook creation and returning existing webhook.",
        );
        const { data: webhookData } = await client.get(
          `/v1/webhooks/${existingWebhooks[0].id}/`,
        );
        return {
          data: webhookData,
        };
      }
    }

    
    const {
      data: { fields: clientFields },
    } = await client.get("/v1/webhooks/monitor_fields");
    const aliasClientFields = clientFields
      .map((field) => field.alias)
      .filter((data) => data);

    const postFields = Object.fromEntries(
      params.postFields
        .map((field) => {
          if (aliasClientFields.find((clientField) => clientField === field)) {
            return [field, field];
          }
          context.logger.debug(
            `${field} will not be monitored as it is not enabled in this BambooHR account`,
          );
          return null;
        })
        .filter((field) => field),
    );

    const monitorAvailableFields = params.monitorFields
      .map((field) => {
        if (aliasClientFields.find((clientField) => clientField === field)) {
          return field;
        }
        context.logger.debug(
          `${field} will not be included in webhook payloads as it is not enabled in this BambooHR account`,
        );
        return null;
      })
      .filter((field) => field);

    const { data } = await client.post("/v1/webhooks", {
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
});
