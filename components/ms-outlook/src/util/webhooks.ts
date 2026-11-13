import type { Connection } from "@prismatic-io/spectral";
import { util } from "@prismatic-io/spectral";
import { createMsWebhookPerformFN } from "ms-utils";
import { createClient } from "../client";
import { RENEWAL_EXPIRATION_MINUTES, WEBHOOK_RESOURCE_CONFIG } from "../constants";
import type { WebhookResourceType } from "../types";
import { computeEndpointBasedOnConnection } from "./connection";

export const createWebhookPerformFN = (
  resourceType?: WebhookResourceType,
): ReturnType<typeof createMsWebhookPerformFN> => {
  const resourceConfig = resourceType ? WEBHOOK_RESOURCE_CONFIG[resourceType] : undefined;

  return createMsWebhookPerformFN({
    createClient,
    renewalExpirationMinutes: RENEWAL_EXPIRATION_MINUTES,
    fetchResourceData: resourceConfig
      ? async (client, notification, _context, params) => {
          if (params.skipMessageFetch) {
            return undefined;
          }
          const resourceId = util.types.toString(notification?.resourceData?.id);
          if (!resourceId) {
            return undefined;
          }
          const endpoint = `${resourceConfig.endpoint}/${resourceId}`;
          const { data } = await client.get(
            computeEndpointBasedOnConnection(params.connection as Connection, endpoint),
          );
          return { key: resourceConfig.dataKey, data };
        }
      : undefined,
  });
};
