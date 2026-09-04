import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listOutboundEventResourcesExamplePayload } from "../../examplePayloads";
import { listOutboundEventResourcesInputs } from "../../inputs";
import { listOutboundEventResourcesOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
import { fetchArenaList } from "../../util/pagination";
export const listOutboundEventResources = action({
  display: {
    label: "List Outbound Event Resources",
    description:
      "List all resources for a specific event in an outbound event integration.",
  },
  inputs: listOutboundEventResourcesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listOutboundEventResourcesOutputSchema,
  }),
  examplePayload: listOutboundEventResourcesExamplePayload,
  perform: async (
    context,
    {
      connection,
      integrationGuid,
      eventGuid,
      objectType,
      reconciled,
      reconciledDateTimeFrom,
      reconciledDateTimeTo,
      pagination,
      fetchAll,
    },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const params = {
        reconciled,
        reconciledDateTimeFrom,
        reconciledDateTimeTo,
        offset: pagination?.offset,
        limit: pagination?.limit,
      };
      const endpoint = `/outboundevents/${integrationGuid}/events/${eventGuid}/${objectType}`;
      const resources = await fetchArenaList(
        client,
        endpoint,
        params,
        fetchAll,
      );
      context.logger.info("Retrieved outbound event resources", {
        integrationGuid,
        eventGuid,
        objectType,
        count: resources.count || 0,
      });
      return { data: resources };
    } catch (error) {
      handleArenaError(error, context.logger, "List Outbound Event Resources");
    }
  },
});
