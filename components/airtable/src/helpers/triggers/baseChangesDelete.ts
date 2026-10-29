import type { ActionContext } from "@prismatic-io/spectral";
import { createAirtableClient } from "../../client";
import type {
  BaseChangesDeleteParams,
  BaseChangesState,
} from "../../interfaces";
import { getBase64FromUrl } from "../../util";

export const baseChangesDelete = async (
  { flow, webhookUrls, crossFlowState, logger, debug }: ActionContext,
  { airtableConnection }: BaseChangesDeleteParams,
) => {
  const integrationFlowName = flow.name;
  const encodedId = getBase64FromUrl(webhookUrls[integrationFlowName]);
  const baseChangesState =
    (crossFlowState?.[encodedId] as unknown as BaseChangesState) ||
    ({} as BaseChangesState);

  const { webhookId, baseId } = baseChangesState;

  if (!webhookId) {
    logger.warn("No webhook ID found in instance state, skipping deletion");
    return;
  }

  const client = createAirtableClient(airtableConnection, debug.enabled);

  logger.info(`Deleting Airtable webhook ${webhookId} from base ${baseId}`);

  try {
    await client.delete(`/v0/bases/${baseId}/webhooks/${webhookId}`);

    logger.info("Airtable webhook deleted successfully");
  } catch (e) {
    const error = e as Error;
    if (error.message.includes("404")) {
      logger.info("Webhook already deleted (404), skipping");
    } else {
      throw e;
    }
  } finally {
    if (crossFlowState[encodedId]) {
      delete crossFlowState[encodedId];
    }
  }
};
