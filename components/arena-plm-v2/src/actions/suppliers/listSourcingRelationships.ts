import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listSourcingRelationshipsExamplePayload } from "../../examplePayloads";
import { listSourcingRelationshipsInputs } from "../../inputs";
import { itemSourcingListSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listSourcingRelationships = action({
  display: {
    label: "List Sourcing Relationships",
    description: "Get sourcing relationships from Arena PLM system.",
  },
  inputs: listSourcingRelationshipsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: itemSourcingListSchema,
  }),
  examplePayload: listSourcingRelationshipsExamplePayload,
  perform: async (context, { connection, itemGuid }) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info("Getting sourcing relationships from Arena", {
        itemGuid: itemGuid,
      });
      const { data, status } = await client.get(`/items/${itemGuid}/sourcing`);
      context.logger.info("Sourcing relationships retrieved successfully", {
        itemGuid: itemGuid,
        count: data?.results?.length || 0,
        statusCode: status,
      });
      return {
        data,
      };
    } catch (error) {
      handleArenaError(error, context.logger, "List Sourcing Relationships");
    }
  },
});
