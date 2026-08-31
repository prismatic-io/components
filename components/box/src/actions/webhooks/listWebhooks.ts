import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { listWebhooksExamplePayload } from "../../examplePayloads";
import { listWebhooksInputs } from "../../inputs";
import { listWebhooksOutputSchema } from "../../outputSchemas";
import { getAllWebhookEntries, getInstanceWebhookIds } from "../../util";
export const listWebhooks = action({
  display: {
    label: "List Webhooks",
    description:
      "List all webhooks configured in Box, including those for other integrations.",
  },
  inputs: listWebhooksInputs,
  performSafety: "notAllowed",
  perform: async (
    { webhookUrls },
    { boxConnection, pagination, showOnlyInstanceWebhooks, fetchAll },
  ) => {
    const client = createAuthorizedClient({ boxConnection });
    let entries: Record<string, unknown>[];
    let extra: Record<string, unknown> = {};
    if (fetchAll) {
      ({ entries } = await getAllWebhookEntries(client));
    } else {
      const options: {
        limit?: number;
        marker?: string;
      } = {};
      if (pagination.limit) options.limit = util.types.toInt(pagination.limit);
      if (pagination.marker)
        options.marker = util.types.toString(pagination.marker);
      const result = await client.webhooks.getWebhooks(options);
      entries = (result.entries ?? []).map(
        (entry) => entry.rawData as Record<string, unknown>,
      );
      extra = { limit: result.limit, next_marker: result.nextMarker };
    }
    if (showOnlyInstanceWebhooks) {
      const instanceWebhookIds = await getInstanceWebhookIds(
        client,
        entries,
        webhookUrls,
      );
      entries = entries.filter((entry) =>
        instanceWebhookIds.has(util.types.toString(entry.id)),
      );
    }
    return { data: { ...extra, entries } };
  },
  examplePerform: async (
    _context,
    params,
  ): Promise<{
    data: {
      limit?: unknown;
      next_marker?: unknown;
      entries: Record<string, unknown>[];
    };
  }> => {
    const { entries, limit, next_marker } = listWebhooksExamplePayload.data;
    if (params.fetchAll) {
      return { data: { entries } };
    }
    return {
      data: {
        limit: util.types.toInt(params.pagination.limit) || limit,
        next_marker,
        entries,
      },
    };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listWebhooksOutputSchema,
  }),
  examplePayload: listWebhooksExamplePayload,
});
