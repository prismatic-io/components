import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listEventItemsExamplePayload } from "../../examplePayloads";
import { listEventItemsInputs } from "../../inputs";
import { listEventItemsOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
import { fetchArenaList } from "../../util/pagination";
export const listEventItems = action({
  display: {
    label: "List Event Items",
    description:
      "Returns items of an outbound integrations matching the given search criteria for a specific event from Arena PLM system.",
  },
  inputs: listEventItemsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listEventItemsOutputSchema,
  }),
  examplePayload: listEventItemsExamplePayload,
  perform: async (
    context,
    {
      connection,
      integrationGuid,
      eventGuid,
      reconciled,
      reconciledDateTimeFrom,
      reconciledDateTimeTo,
      pagination = {},
      fetchAll,
    },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const params = {
        reconciled,
        reconciledDateTimeFrom,
        reconciledDateTimeTo,
        offset: pagination.offset,
        limit: pagination.limit,
      };
      const path = `/outboundintegrations/${integrationGuid}/events/${eventGuid}/items`;
      const data = await fetchArenaList(client, path, params, fetchAll);
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "List Event Items");
    }
  },
});
