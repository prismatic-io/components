import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createWebhookExamplePayload } from "../../examplePayloads";
import { createWebhookInputs } from "../../inputs";
import { paginateByPage } from "../../util/pagination";

export const createWebhook = action({
  display: {
    label: "Create Webhook",
    description: "Creates and enables a webhook for a specified resource.",
  },
  perform: async (
    context,
    {
      allowDuplicates,
      callbackUrl,
      connection,
      name,
      scopeObjectId,
      subscopeColumnIds,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    if (!allowDuplicates) {
      
      const allWebhooks = await paginateByPage<{
        callbackUrl: string;
        scopeObjectId: number;
      }>(client, "/webhooks");
      const existingWebhooks = allWebhooks.filter(
        (webhook) =>
          webhook.callbackUrl === callbackUrl &&
          webhook.scopeObjectId === scopeObjectId,
      );
      if (existingWebhooks.length > 0) {
        context.logger.info(
          "A webhook with those parameters already exists. Skipping webhook creation and returning existing webhook.",
        );
        return {
          data: {
            message: "UNCHANGED",
            resultCode: 0,
            result: existingWebhooks[0],
          },
        };
      }
    }

    const createBody: Record<string, unknown> = {
      callbackUrl,
      events: ["*.*"], 
      name,
      scope: "sheet", 
      scopeObjectId,
      version: 1, 
    };

    if (subscopeColumnIds && (subscopeColumnIds as number[]).length > 0) {
      createBody.subscope = { columnIds: subscopeColumnIds };
    }

    
    const createResult = await client.post(`/webhooks`, createBody);

    
    const verificationResult = await client.put(
      `/webhooks/${createResult.data.result.id}`,
      { enabled: true },
    );

    return { data: verificationResult.data };
  },
  inputs: createWebhookInputs,
  examplePayload: createWebhookExamplePayload,
});
