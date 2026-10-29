import { randomUUID } from "node:crypto";
import type {
  ActionContext,
  ConfigVarResultCollection,
  Connection,
  TriggerEventFunctionReturn,
} from "@prismatic-io/spectral";
import { util } from "@prismatic-io/spectral";
import { createClassicClient } from "../client";
import { WEBHOOK_AUTH_HEADER, WEBHOOK_NAME_MAX_LENGTH } from "../constants";
import type { ManagedWebhookState } from "../types";

const escapeXml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export const toWebhookXml = (
  fields: Record<string, string | number | boolean | undefined>,
): string => {
  const elements = Object.entries(fields)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `<${key}>${escapeXml(String(value))}</${key}>`)
    .join("");
  return `<webhook>${elements}</webhook>`;
};

export const parseWebhookId = (data: unknown): number | undefined => {
  if (data && typeof data === "object") {
    const id = (data as { webhook?: { id?: number | string } }).webhook?.id;
    if (id !== undefined) return Number(id);
  }
  if (typeof data === "string") {
    const match = data.match(/<id>(\d+)<\/id>/);
    if (match) return Number(match[1]);
  }
  return undefined;
};

export const getStoreKey = (flowStableId: string) =>
  `webhookEvents:${flowStableId}`;

export const buildWebhookName = (
  flowName: string,
  event: string,
  suffix: string,
): string => {
  const fixed = ` - ${event} - ${suffix}`;
  return `${flowName.slice(0, WEBHOOK_NAME_MAX_LENGTH - fixed.length)}${fixed}`;
};

export const createManagedWebhooks = async (
  context: ActionContext<ConfigVarResultCollection>,
  { connection, events }: { connection: Connection; events: string[] },
): Promise<TriggerEventFunctionReturn> => {
  const client = await createClassicClient(connection, context.debug.enabled);
  const targetUrl = context.webhookUrls[context.flow.name];
  const storeKey = getStoreKey(context.flow.stableId);

  const previous = context.crossFlowState[storeKey] as
    | ManagedWebhookState
    | undefined;
  for (const id of previous?.webhookIds ?? []) {
    try {
      await client.delete(`/webhooks/id/${id}`);
    } catch (error) {
      context.logger.warn(
        `Failed to remove previous webhook ${id}: ${util.types.toString(error)}`,
      );
    }
  }

  const webhookAuthValue = randomUUID();
  const nameSuffix = randomUUID().slice(0, 8);
  const webhookIds: number[] = [];
  try {
    for (const event of events) {
      const body = toWebhookXml({
        name: buildWebhookName(context.flow.name, event, nameSuffix),
        event,
        url: targetUrl,
        content_type: "application/json",
        enabled: true,
        authentication_type: "HEADER",
        header: JSON.stringify({ [WEBHOOK_AUTH_HEADER]: webhookAuthValue }),
      });
      const { data } = await client.post<unknown>("/webhooks/id/0", body, {
        headers: { "Content-Type": "application/xml" },
      });
      const id = parseWebhookId(data);
      if (id != null) {
        webhookIds.push(id);
      }
    }
  } catch (error) {
    for (const id of webhookIds) {
      try {
        await client.delete(`/webhooks/id/${id}`);
      } catch {}
    }
    throw error;
  }

  context.crossFlowState[storeKey] = { webhookIds, webhookAuthValue };
  return { crossFlowState: context.crossFlowState };
};

export const deleteManagedWebhooks = async (
  context: ActionContext<ConfigVarResultCollection>,
  { connection }: { connection: Connection },
): Promise<TriggerEventFunctionReturn> => {
  const client = await createClassicClient(connection, context.debug.enabled);
  const storeKey = getStoreKey(context.flow.stableId);
  const state = context.crossFlowState[storeKey] as
    | ManagedWebhookState
    | undefined;
  for (const id of state?.webhookIds ?? []) {
    try {
      await client.delete(`/webhooks/id/${id}`);
    } catch (error) {
      context.logger.error(
        `Failed to delete webhook ${id}: ${util.types.toString(error)}`,
      );
    }
  }
  context.crossFlowState[storeKey] = undefined;
  return { crossFlowState: context.crossFlowState };
};
