import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import type { ActionContext } from "@prismatic-io/spectral/dist/serverTypes";
import type {
  AtlassianWebhookState,
  CreateWebhookTriggerParams,
} from "../interfaces/Webhooks";
import {
  createAtlassianWebhook,
  createAtlassianWebhookBasic,
  daysUntilExpiration,
  deleteAtlassianWebhookById,
  deleteAtlassianWebhookByIdBasic,
  needsRefresh,
  refreshAtlassianWebhook,
} from "./utils";

const getStateKey = (context: ActionContext): string => context.flow.stableId;

const LEGACY_WEBHOOK_STATE_KEY = "atlassianWebhook";

const resolveWebhookState = (
  context: ActionContext,
): { state: AtlassianWebhookState | undefined; isLegacy: boolean } => {
  const key = getStateKey(context);
  const state = context.crossFlowState[key] as unknown as
    | AtlassianWebhookState
    | undefined;
  if (state?.webhookId) return { state, isLegacy: false };

  const legacyState = context.crossFlowState[
    LEGACY_WEBHOOK_STATE_KEY
  ] as unknown as AtlassianWebhookState | undefined;
  if (legacyState?.webhookId) return { state: legacyState, isLegacy: true };

  return { state: undefined, isLegacy: false };
};

const clearWebhookState = (context: ActionContext, isLegacy: boolean): void => {
  if (isLegacy) {
    delete context.crossFlowState[LEGACY_WEBHOOK_STATE_KEY];
  } else {
    delete context.crossFlowState[getStateKey(context)];
  }
};

export const createWebhookTrigger = async (
  client: HttpClient,
  params: CreateWebhookTriggerParams,
  context: ActionContext,
): Promise<AtlassianWebhookState> => {
  const flowId = context.flow.id;
  const flowName = context.flow.name;
  const webhookUrl = context.webhookUrls[flowName];

  const { state: existingState, isLegacy } = resolveWebhookState(context);
  if (existingState?.webhookId) {
    context.logger.info(
      "Existing webhook found, deleting before creating new one",
      {
        webhookId: existingState.webhookId,
        legacyState: isLegacy,
      },
    );
    await deleteAtlassianWebhookById(client, existingState.webhookId);
    clearWebhookState(context, isLegacy);
  }

  context.logger.info(
    `Creating Atlassian webhook for flow ${flowName} (${flowId})`,
  );

  const response = await createAtlassianWebhook(client, webhookUrl, [
    {
      events: params.events,
      ...(params.jqlFilter && { jqlFilter: params.jqlFilter }),
      ...(params.fieldIdsFilter && { fieldIdsFilter: params.fieldIdsFilter }),
      ...(params.issuePropertyKeysFilter && {
        issuePropertyKeysFilter: params.issuePropertyKeysFilter,
      }),
    },
  ]);
  if (context.debug.enabled) {
    context.logger.debug("Atlassian webhook creation response", {
      response,
    });
  }

  const result = response.webhookRegistrationResult[0];

  if (!result.createdWebhookId) {
    const errorMsg = result.errors?.join(", ") || "Unknown error";
    context.logger.error("Failed to create Atlassian webhook", {
      error: errorMsg,
    });
    throw new Error(`Failed to create Atlassian webhook: ${errorMsg}`);
  }

  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 30);

  const webhookState: AtlassianWebhookState = {
    webhookId: result.createdWebhookId,
    expirationDate: expirationDate.toISOString(),
    events: params.events,
    jqlFilter: params.jqlFilter,
  };

  context.crossFlowState[getStateKey(context)] = webhookState;

  context.logger.info("Atlassian webhook created successfully", {
    webhookId: webhookState.webhookId,
    expirationDate: webhookState.expirationDate,
  });

  return webhookState;
};

export const createWebhookTriggerBasic = async (
  client: HttpClient,
  params: CreateWebhookTriggerParams,
  context: ActionContext,
): Promise<AtlassianWebhookState> => {
  const flowId = context.flow.id;
  const flowName = context.flow.name;
  const webhookUrl = context.webhookUrls[flowName];

  const { state: existingState, isLegacy } = resolveWebhookState(context);
  if (existingState?.webhookId) {
    context.logger.info(
      "Existing webhook found, deleting before creating new one",
      {
        webhookId: existingState.webhookId,
        legacyState: isLegacy,
      },
    );
    await deleteAtlassianWebhookByIdBasic(client, existingState.webhookId);
    clearWebhookState(context, isLegacy);
  }

  context.logger.info(
    `Creating Atlassian webhook (Basic Auth) for flow ${flowName} (${flowId})`,
  );

  const webhookName = `Webhook for flow - ${flowName}`;

  const response = await createAtlassianWebhookBasic(client, webhookUrl, {
    events: params.events,
    filters: {
      "issue-related-events-section": params.jqlFilter,
    },
    excludeBody: false,
    name: webhookName,
  });

  const selfUrl = response.self;
  const webhookId = Number.parseInt(selfUrl.split("/").pop() || "0", 10);

  if (!webhookId) {
    context.logger.error(
      "Failed to create Atlassian webhook: Could not extract webhook ID from response",
    );
    throw new Error(
      "Failed to create Atlassian webhook: Could not extract webhook ID from response",
    );
  }

  const webhookState: AtlassianWebhookState = {
    webhookId,
    expirationDate: "",
    events: params.events,
    jqlFilter: params.jqlFilter,
  };

  context.crossFlowState[getStateKey(context)] = webhookState;

  context.logger.info("Atlassian webhook (Basic Auth) created successfully", {
    webhookId: webhookState.webhookId,
  });

  return webhookState;
};

export const deleteWebhookTrigger = async (
  client: HttpClient,
  context: ActionContext,
): Promise<void> => {
  const { state: webhookState, isLegacy } = resolveWebhookState(context);
  const flowId = context.flow.id;
  const flowName = context.flow.name;

  if (!webhookState?.webhookId) {
    context.logger.warn(
      "No webhook ID found in cross flow state, skipping deletion",
      { flowId, flowName },
    );
    return;
  }

  context.logger.info("Deleting Atlassian webhook", {
    flowId,
    flowName,
    webhookId: webhookState.webhookId,
  });

  const result = await deleteAtlassianWebhookById(
    client,
    webhookState.webhookId,
  );

  clearWebhookState(context, isLegacy);

  context.logger.info("Atlassian webhook deleted", {
    webhookId: webhookState.webhookId,
    deleted: result.deleted,
  });
};

export const deleteWebhookTriggerBasic = async (
  client: HttpClient,
  context: ActionContext,
): Promise<void> => {
  const { state: webhookState, isLegacy } = resolveWebhookState(context);
  const flowId = context.flow.id;
  const flowName = context.flow.name;

  if (!webhookState?.webhookId) {
    context.logger.warn(
      "No webhook ID found in cross flow state, skipping deletion",
      { flowId, flowName },
    );
    return;
  }

  context.logger.info("Deleting Atlassian webhook (Basic Auth)", {
    flowId,
    flowName,
    webhookId: webhookState.webhookId,
  });

  const result = await deleteAtlassianWebhookByIdBasic(
    client,
    webhookState.webhookId,
  );

  clearWebhookState(context, isLegacy);

  context.logger.info("Atlassian webhook (Basic Auth) deleted", {
    webhookId: webhookState.webhookId,
    deleted: result.deleted,
  });
};

export const checkAndRefreshWebhook = async (
  client: HttpClient,
  context: ActionContext,
): Promise<AtlassianWebhookState | undefined> => {
  const { state: webhookState, isLegacy } = resolveWebhookState(context);

  if (!webhookState?.webhookId || !webhookState?.expirationDate) {
    return webhookState;
  }

  if (isLegacy) {
    context.logger.info("Migrating legacy webhook state to new key", {
      webhookId: webhookState.webhookId,
    });
    context.crossFlowState[getStateKey(context)] = webhookState;
  }

  if (!needsRefresh(webhookState.expirationDate)) {
    return webhookState;
  }

  const daysLeft = daysUntilExpiration(webhookState.expirationDate);

  context.logger.warn("Atlassian webhook expiring soon, refreshing", {
    webhookId: webhookState.webhookId,
    expirationDate: webhookState.expirationDate,
    daysUntilExpiration: daysLeft,
  });

  try {
    const refreshResponse = await refreshAtlassianWebhook(client, [
      webhookState.webhookId,
    ]);

    const updatedState: AtlassianWebhookState = {
      ...webhookState,
      expirationDate: refreshResponse.expirationDate,
    };

    context.crossFlowState[getStateKey(context)] = updatedState;

    context.logger.info("Atlassian webhook refreshed successfully", {
      webhookId: webhookState.webhookId,
      newExpirationDate: refreshResponse.expirationDate,
    });

    return updatedState;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    context.logger.error("Failed to refresh Atlassian webhook", {
      webhookId: webhookState.webhookId,
      error: errorMessage,
    });

    return webhookState;
  }
};
