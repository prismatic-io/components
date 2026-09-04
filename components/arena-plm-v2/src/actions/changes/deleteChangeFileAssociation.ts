import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { deleteChangeFileAssociationExamplePayload } from "../../examplePayloads";
import { deleteChangeFileAssociationInputs } from "../../inputs";
import { deleteChangeFileAssociationOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const deleteChangeFileAssociation = action({
  display: {
    label: "Delete Change File Association",
    description: "Delete a change file association from Arena PLM system.",
  },
  inputs: deleteChangeFileAssociationInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteChangeFileAssociationOutputSchema,
  }),
  examplePayload: deleteChangeFileAssociationExamplePayload,
  perform: async (
    context,
    { connection, changeGuid, changeFileAssociationGuid },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info("Deleting change file association", {
        changeGuid,
        changeFileAssociationGuid,
      });
      await client.delete(
        `/changes/${changeGuid}/files/${changeFileAssociationGuid}`,
      );
      context.logger.info("Change file association deleted successfully", {
        changeGuid,
        changeFileAssociationGuid,
      });
      return {
        data: {
          success: true,
          message: "Change file association deleted successfully",
          changeGuid,
          changeFileAssociationGuid,
        },
      };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        `Delete Change File Association (${changeGuid}/${changeFileAssociationGuid})`,
      );
    }
  },
});
