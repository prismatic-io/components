import { action, outputSchema, PerformSafety } from "@prismatic-io/spectral";
import { getWebhookEventsInputs } from "../../inputs";
import { createWebhookClient } from "../../client";
import { fetchAllCursorEvents } from "../../util";
import { getWebhookEventsExamplePayload } from "../../examplePayloads";
import { getWebhookEventsOutputSchema } from "../../outputSchemas";

export const getWebhookEvents = action({
  display: {
    label: "Get Webhook Events",
    description:
      "Gets webhook events based on the partner application's scopes for Gusto.",
  },
  inputs: getWebhookEventsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getWebhookEventsOutputSchema,
  }),
  perform: async (context, params) => {
    const client = await createWebhookClient(
      params.connection,
      context.debug.enabled,
    );

    if (params.fetchAll) {
      const data = await fetchAllCursorEvents(client, "/events", {
        resource_uuid: params.resourceUuid,
        event_type: params.eventType,
        sort_order: params.sortOrder,
      });
      return { data: { data, headers: {} } };
    }

    const queryParams = {
      resource_uuid: params.resourceUuid,
      event_type: params.eventType,
      starting_after_uuid: params.pagination?.startingAfterUuid,
      limit: params.pagination?.limit,
      sort_order: params.sortOrder,
    };

    const { data, headers } = await client.get(`/events`, {
      params: queryParams,
    });
    return { data: { data, headers } };
  },
  performSafety: PerformSafety.NOT_ALLOWED,
  examplePayload: getWebhookEventsExamplePayload,
});
