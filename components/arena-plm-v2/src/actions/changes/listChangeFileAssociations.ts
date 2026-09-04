import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listChangeFileAssociationsExamplePayload } from "../../examplePayloads";
import { listChangeFileAssociationsInputs } from "../../inputs";
import { fileAssociationListSchema } from "../../outputSchemas";
import type { FileAssociationVoResultRep } from "../../types";
import { handleArenaError } from "../../util";
export const listChangeFileAssociations = action({
  display: {
    label: "List Change File Associations",
    description: "Returns a list of files associated with a specific change.",
  },
  inputs: listChangeFileAssociationsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: fileAssociationListSchema,
  }),
  examplePayload: listChangeFileAssociationsExamplePayload,
  perform: async (context, { connection, changeGuid }) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info("Retrieving change file associations", {
        changeGuid,
      });
      const response = await client.get(`/changes/${changeGuid}/files`);
      const fileAssociations: FileAssociationVoResultRep = response.data;
      context.logger.info("Change file associations retrieved successfully", {
        changeGuid,
        count: fileAssociations.count,
        associationCount: fileAssociations.results?.length || 0,
      });
      return { data: fileAssociations };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        `List Change File Associations (${changeGuid})`,
      );
    }
  },
});
