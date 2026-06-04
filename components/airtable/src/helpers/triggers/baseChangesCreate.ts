import type { ActionContext } from "@prismatic-io/spectral";
import { createAirtableClient } from "../../client";
import { webhookExists as webhookExistsHelper } from "./webhookExists";
import { getBase64FromUrl } from "../../util";
import type {
  BaseChangesCreateParams,
  BaseChangesState,
} from "../../interfaces";

export const baseChangesCreate = async (
  { flow, webhookUrls, crossFlowState, logger, debug }: ActionContext,
  {
    airtableConnection,
    baseId,
    dataTypes,
    recordChangeScope,
  }: BaseChangesCreateParams,
) => {
  const integrationFlowName = flow.name;
  const encodedId = getBase64FromUrl(webhookUrls[integrationFlowName]);
  const baseChangesState =
    (crossFlowState?.[encodedId] as unknown as BaseChangesState) ||
    ({} as BaseChangesState);

  let stateWebhookId = baseChangesState.webhookId || "";
  const stateBaseId = baseChangesState.baseId || "";
  const stateDataTypes = baseChangesState.dataTypes || [];
  const stateRecordChangeScope = baseChangesState.recordChangeScope || "";

  const stateConfig = `${stateBaseId}${stateDataTypes.join(",")}${stateRecordChangeScope}`;
  const currentConfig = `${baseId}${dataTypes.join(",")}${recordChangeScope || ""}`;

  const sameConfig = stateConfig === currentConfig;
  const client = createAirtableClient(airtableConnection, debug.enabled);

  if (stateWebhookId) {
    

    const webhookExists = await webhookExistsHelper({
      client,
      baseId,
      webhookId: stateWebhookId,
    });
    if (!webhookExists) {
      logger.info(
        `Webhook ${stateWebhookId} from state is deleted or expired, resetting`,
      );
      stateWebhookId = "";
    }
  }

  if (stateWebhookId && sameConfig) {
    logger.info("Webhook already created with this configuration, skipping");
    return;
  }

  if (stateWebhookId && !sameConfig) {
    logger.info(`Config changed, deleting previous webhook ${stateWebhookId}`);

    try {
      await client.delete(
        `/v0/bases/${stateBaseId}/webhooks/${stateWebhookId}`,
      );
    } catch (e) {
      const error = e as Error;
      if (error.message.includes("404")) {
        logger.info("Webhook already deleted (404), skipping");
      } else {
        throw e;
      }
    }
  }

  const webhookUrl = webhookUrls[flow.name];

  logger.info(`Creating Airtable webhook for base ${baseId} at ${webhookUrl}`);

  const specification: {
    options: {
      filters: { dataTypes: string[]; recordChangeScope?: string };
    };
  } = {
    options: {
      filters: {
        dataTypes: dataTypes || ["tableData"],
      },
    },
  };

  if (recordChangeScope) {
    specification.options.filters.recordChangeScope = recordChangeScope;
  }

  const { data: webhook } = await client.post(`/v0/bases/${baseId}/webhooks`, {
    notificationUrl: webhookUrl,
    specification,
  });

  crossFlowState[encodedId] = {
    webhookId: webhook.id,
    macSecret: webhook.macSecretBase64,
    expirationTime: webhook.expirationTime,
    baseId,
    cursor: null,
    dataTypes,
    recordChangeScope,
    webhookUrl,
    createdAt: new Date().toISOString(),
  };
  if (debug.enabled) {
    logger.debug(
      "Stored state",
      JSON.stringify(crossFlowState[encodedId], null, 2),
    );
  }

  logger.info(
    `Airtable webhook created successfully (ID: ${webhook.id}, expires: ${webhook.expirationTime})`,
  );
};
