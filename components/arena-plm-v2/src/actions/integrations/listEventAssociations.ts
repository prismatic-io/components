import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listEventAssociationsExamplePayload } from "../../examplePayloads";
import { listEventAssociationsInputs } from "../../inputs";
import { listEventAssociationsOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
import { fetchArenaList } from "../../util/pagination";
export const listEventAssociations = action({
  display: {
    label: "List Event Associations",
    description:
      "Returns unreconciled event objects matching the given search criteria for a specific integration from Arena PLM system.",
  },
  inputs: listEventAssociationsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listEventAssociationsOutputSchema,
  }),
  examplePayload: listEventAssociationsExamplePayload,
  perform: async (
    context,
    {
      connection,
      integrationGuid,
      itemsReconciled,
      creationDateTimeFrom,
      creationDateTimeTo,
      pagination = {},
      fetchAll,
    },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const params = {
        itemsReconciled,
        creationDateTimeFrom,
        creationDateTimeTo,
        offset: pagination.offset,
        limit: pagination.limit,
      };
      const path = `/outboundintegrations/${integrationGuid}/events`;
      const data = await fetchArenaList(client, path, params, fetchAll);
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "List Event Associations");
    }
  },
});
