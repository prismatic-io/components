import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { listWebhooksExamplePayload } from "../../examplePayloads";
import {
  connectionInput,
  fetchAll,
  limit,
  listFilterId,
  listFilterType,
  offset,
  total,
} from "../../inputs";
import { fetchAllWithPagination } from "../../util/fetchAllWithPagination";

export const listWebhookSubscriptions = action({
  display: {
    label: "List Webhook Subscriptions",
    description: "List webhook subscriptions with optional filters.",
  },
  perform: async (
    context,
    { connection, limit, offset, total, filterType, filterId, fetchAll },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const params = {
      limit,
      offset,
      total,
      filter_type: filterType,
      filter_id: filterId,
    };

    if (fetchAll) {
      return {
        data: await fetchAllWithPagination({
          client,
          configVars: params,
          endpoint: ENDPOINTS.WEBHOOK_SUBSCRIPTIONS,
          objectKey: "webhook_subscriptions",
        }),
      };
    }
    const { data } = await client.get(ENDPOINTS.WEBHOOK_SUBSCRIPTIONS, {
      params,
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    fetchAll,
    limit,
    offset,
    total,
    filterType: listFilterType,
    filterId: listFilterId,
  },
  examplePayload: listWebhooksExamplePayload,
});
