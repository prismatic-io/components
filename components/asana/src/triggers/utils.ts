import {
  type Connection,
  type TriggerPayload,
  util,
  type ActionContext,
} from "@prismatic-io/spectral";
import crypto from "crypto";
import { createAsanaClient } from "../client";
import type { WebhookFilterSettings } from "../types/WebhookFilterSettings";
import type { Event } from "../types/Event";
import type { CachedTasks } from "../types/CachedTasks";
import type { CachedStories } from "../types/CachedStories";
import type {
  ResolvedWebhookSecret,
  ResolvedWebhookSecrets,
} from "../types";
import {
  WEBHOOK_SECRETS_STATE_KEY_PREFIX,
  WEBHOOK_SECRET_STATE_KEY_PREFIX,
  WEBHOOK_SECRETS_LEGACY_KEY,
  WEBHOOK_SECRET_LEGACY_KEY,
} from "../constants";

export const isHeartbeatData = (data: any): boolean =>
  typeof data === "object" &&
  Array.isArray(data.events) &&
  data.events.length === 0;

export const webhookSecretsStateKey = (context: ActionContext): string =>
  `${WEBHOOK_SECRETS_STATE_KEY_PREFIX}:${context.flow.stableId}`;

export const webhookSecretStateKey = (context: ActionContext): string =>
  `${WEBHOOK_SECRET_STATE_KEY_PREFIX}:${context.flow.stableId}`;

export const resolveWebhookSecrets = (
  context: ActionContext,
): ResolvedWebhookSecrets => {
  const fromNew = context.crossFlowState[webhookSecretsStateKey(context)] as
    | string[]
    | undefined;
  if (fromNew && fromNew.length > 0) {
    return { value: fromNew, isLegacy: false };
  }
  const fromLegacy = context.instanceState[WEBHOOK_SECRETS_LEGACY_KEY] as
    | string[]
    | undefined;
  if (fromLegacy && fromLegacy.length > 0) {
    return { value: fromLegacy, isLegacy: true };
  }
  return { value: [], isLegacy: false };
};

export const resolveWebhookSecret = (
  context: ActionContext,
): ResolvedWebhookSecret => {
  const fromNew = util.types.toString(
    context.crossFlowState[webhookSecretStateKey(context)],
  );
  if (fromNew) {
    return { value: fromNew, isLegacy: false };
  }
  const fromLegacy = util.types.toString(
    context.instanceState[WEBHOOK_SECRET_LEGACY_KEY],
  );
  if (fromLegacy) {
    return { value: fromLegacy, isLegacy: true };
  }
  return { value: "", isLegacy: false };
};

export const validateHmac = (
  payload: TriggerPayload,
  signature: string,
  secrets: string[],
): void => {
  const body = util.types.toString(payload.rawBody.data);
  for (const secret of secrets) {
    const computedSignature = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex");
    if (computedSignature === signature) {
      return;
    }
  }
  throw new Error(
    "The included signing signature does not match a known Asana signing key. Rejecting.",
  );
};

interface AsanaFilter {
  resource_type?: string;
  resource_subtype?: string;
  action: string;
  fields?: string[];
}

interface CreateWebhookParams {
  endpoint: string;
  resourceId: string;
  filters?: AsanaFilter[];
  asanaConnection: Connection;
}

interface DeleteWebhookParams {
  endpoint: string;
  resourceId: string;
  asanaConnection: Connection;
}

interface AsanaWebhook {
  gid: string;
  resource: {
    gid: string;
    name: string;
  };
  target: string;
  active: boolean;
}







export const findWebhook = async ({
  asanaConnection,
  endpoint,
  resourceId,
}: {
  asanaConnection: Connection;
  endpoint: string;
  resourceId: string;
}): Promise<AsanaWebhook | undefined> => {
  const client = await createAsanaClient(asanaConnection, false);
  const { data: workSpaces } = await client.get("/workspaces", {
    params: { limit: 100 },
  });
  const webhooks: AsanaWebhook[] = [];
  for (const workspace of workSpaces.data) {
    let offset: string | unknown;
    do {
      const { data } = await client.get<{
        data: AsanaWebhook[];
        next_page?: { offset: string };
      }>("/webhooks", {
        params: {
          workspace: workspace.gid,
          limit: 100,
          offset,
        },
      });
      offset = data.next_page?.offset;
      webhooks.push(...data.data);
    } while (offset);
  }
  return webhooks.find(
    (webhook) =>
      webhook.target === endpoint && webhook.resource.gid === resourceId,
  );
};

export const createWebhook = async ({
  endpoint,
  resourceId,
  filters,
  asanaConnection,
}: CreateWebhookParams): Promise<AsanaWebhook> => {
  const client = await createAsanaClient(asanaConnection, false);
  const existingWebhook = await findWebhook({
    endpoint,
    resourceId,
    asanaConnection,
  });
  if (existingWebhook) {
    console.debug("Webhook already exists, skipping creation");
    return existingWebhook;
  } else {
    const { data } = await client.post<{ data: AsanaWebhook }>("/webhooks", {
      data: {
        resource: resourceId,
        target: endpoint,
        filters: filters,
      },
    });
    return data.data;
  }
};

export const deleteWebhook = async ({
  endpoint,
  resourceId,
  asanaConnection,
}: DeleteWebhookParams): Promise<void> => {
  const client = await createAsanaClient(asanaConnection, false);
  const existingWebhook = await findWebhook({
    endpoint,
    resourceId,
    asanaConnection,
  });
  if (!existingWebhook) {
    console.debug("No webhook exists, skipping deletion");
    return;
  } else {
    console.debug(`Deleting webhook ${existingWebhook.gid}`);
    await client.delete<{ data: AsanaWebhook }>(
      `/webhooks/${existingWebhook.gid}`,
    );
    return;
  }
};

export const getFilters = (
  filterSettings: WebhookFilterSettings,
  resourceType: string,
): Array<AsanaFilter> => {
  const filters: Array<AsanaFilter> = [];
  if (filterSettings.triggerWhenAdded)
    filters.push({ resource_type: resourceType, action: "added" });
  if (filterSettings.triggerWhenChanged)
    filters.push({ resource_type: resourceType, action: "changed" });
  if (filterSettings.triggerWhenDeleted)
    filters.push({ resource_type: resourceType, action: "deleted" });
  if (filterSettings.triggerWhenRemoved)
    filters.push({ resource_type: resourceType, action: "removed" });
  if (filterSettings.triggerWhenUndeleted)
    filters.push({ resource_type: resourceType, action: "undeleted" });

  return filters;
};

const extractEvents = (data: unknown): Event[] => {
  return (data as { events?: Event[] })?.events ?? [];
};

const processTask = async (
  taskEvent: Event,
  cachedTasks: CachedTasks,
  asanaConnection: Connection,
  context: ActionContext,
): Promise<void> => {
  if (taskEvent.resource.gid in cachedTasks) {
    taskEvent.task = cachedTasks[taskEvent.resource.gid];
    return;
  }
  const client = await createAsanaClient(asanaConnection, false);
  try {
    const { data: response } = await client.get(
      `/tasks/${taskEvent.resource.gid}`,
    );
    const taskData = response.data;
    taskEvent.task = taskData;
    cachedTasks[taskEvent.resource.gid] = taskData;
  } catch {
    
    context.logger.warn(
      `Task ${taskEvent.resource.gid} does not exist. This usually happens when a task is immediately deleted at the UI.`,
    );
    taskEvent.task = {};
  }
};

const processStory = async (
  storyEvent: Event,
  cachedStories: CachedStories,
  asanaConnection: Connection,
  context: ActionContext,
): Promise<void> => {
  if (storyEvent.resource.gid in cachedStories) {
    storyEvent.task = cachedStories[storyEvent.resource.gid];
    return;
  }
  const client = await createAsanaClient(
    asanaConnection,
    context.debug.enabled,
  );
  try {
    const { data: response } = await client.get(
      `/stories/${storyEvent.resource.gid}`,
    );
    const storyData = response.data;
    storyEvent.story = storyData;
    cachedStories[storyEvent.resource.gid] = storyData;
  } catch {
    
    context.logger.warn(
      `Comment/Activity ${storyEvent.resource.gid} does not exist. This usually happens when a comment or activity is immediately deleted in the UI.`,
    );
    storyEvent.task = {};
  }
};

const getEventsAdditionalData = async (
  asanaConnection: Connection,
  payload: TriggerPayload,
  context: ActionContext,
): Promise<void> => {
  
  const AVOID_ACTIONS = ["deleted", "removed"];
  const RESOURCE_TYPE_TASK = "task";
  const RESOURCE_TYPE_STORY = "story";
  const events = extractEvents(payload.body.data);

  
  const cachedTasks: CachedTasks = {};
  const cachedStories: CachedStories = {};

  for (const event of events) {
    if (!AVOID_ACTIONS.includes(event.action)) {
      switch (event.resource.resource_type) {
        case RESOURCE_TYPE_TASK:
          await processTask(event, cachedTasks, asanaConnection, context);
          break;
        case RESOURCE_TYPE_STORY:
          await processStory(event, cachedStories, asanaConnection, context);
          break;
        default:
          break;
      }
    }
  }
};

export const getAdditionalData = async (
  context: ActionContext,
  payload: TriggerPayload,
  inputs: { asanaConnection: Connection },
): Promise<TriggerPayload> => {
  const events = extractEvents(payload.body.data);
  if (events.length === 0) return Promise.resolve(payload);

  await getEventsAdditionalData(inputs.asanaConnection, payload, context);
  return Promise.resolve(payload);
};
