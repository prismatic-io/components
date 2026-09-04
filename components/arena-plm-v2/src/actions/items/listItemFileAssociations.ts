import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listItemFileAssociationsExamplePayload } from "../../examplePayloads";
import { listItemFileAssociationsInputs } from "../../inputs";
import { listItemFileAssociationsOutputSchema } from "../../outputSchemas";
import type { ItemFileVoResultRep } from "../../types";
import { handleArenaError } from "../../util";
export const listItemFileAssociations = action({
  display: {
    label: "List Item File Associations",
    description: "Returns a list of files associated with a specific item.",
  },
  inputs: listItemFileAssociationsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listItemFileAssociationsOutputSchema,
  }),
  examplePayload: listItemFileAssociationsExamplePayload,
  perform: async (context, { connection, itemGuid }) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info("Retrieving item file associations", {
        itemGuid,
      });
      const response = await client.get(`/items/${itemGuid}/files`);
      const fileAssociations: ItemFileVoResultRep = response.data;
      context.logger.info("Item file associations retrieved successfully", {
        itemGuid,
        count: fileAssociations.count,
        associationCount: fileAssociations.results?.length || 0,
      });
      return { data: fileAssociations };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        `List Item File Associations (${itemGuid})`,
      );
    }
  },
});
