import { action, outputSchema } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { HTTP_CONFLICT } from "../../constants";
import { createWebhookExamplePayload } from "../../examplePayloads";
import { createWebhookInputs } from "../../inputs";
import { createWebhookOutputSchema } from "../../outputSchemas";
import type { CreateWebhookBody } from "../../types";
import { assertTargetType } from "../../util";
export const createWebhook = action({
  display: {
    label: "Create Webhook",
    description: "Create a webhook to send data from Box to an instance URL.",
  },
  inputs: createWebhookInputs,
  performSafety: "notAllowed",
  perform: async (
    { logger, crossFlowState },
    {
      boxConnection,
      address,
      targetId,
      targetType,
      triggerTypes,
      primarySignatureKey,
      secondarySignatureKey,
    },
  ) => {
    const client = createAuthorizedClient({ boxConnection });
    assertTargetType(targetType);
    let data = null;
    try {
      const created = await client.webhooks.createWebhook({
        target: {
          id: targetId,
          type: targetType as CreateWebhookBody["target"]["type"],
        },
        address,
        triggers: triggerTypes as CreateWebhookBody["triggers"],
      });
      data = created.rawData;
    } catch (error) {
      if ((error as Record<string, unknown>)?.statusCode === HTTP_CONFLICT) {
        logger.warn(
          `Skipping creation of webhook. A webhook with this target (${targetId}), application, and user already exists.`,
        );
      } else {
        throw error;
      }
    }
    if (primarySignatureKey) {
      crossFlowState.primarySignatureKey = primarySignatureKey;
    }
    if (secondarySignatureKey) {
      crossFlowState.secondarySignatureKey = secondarySignatureKey;
    }
    return { data, crossFlowState };
  },
  examplePerform: async (
    _context,
    { address, targetId, targetType, triggerTypes },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...createWebhookExamplePayload.data,
      target: { id: targetId, type: targetType },
      address,
      triggers: triggerTypes,
    },
  }),
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createWebhookOutputSchema,
  }),
  examplePayload: createWebhookExamplePayload,
});
