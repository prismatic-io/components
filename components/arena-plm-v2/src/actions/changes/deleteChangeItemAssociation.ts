import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { deleteChangeItemAssociationExamplePayload } from "../../examplePayloads";
import { deleteChangeItemAssociationInputs } from "../../inputs";
import { deleteChangeItemAssociationOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const deleteChangeItemAssociation = action({
  display: {
    label: "Delete Change Item Association",
    description:
      "Removes an item with a given GUID from a change with a given GUID. Items can only be removed from changes in the Open and Unlocked lifecycle phase.",
  },
  inputs: deleteChangeItemAssociationInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteChangeItemAssociationOutputSchema,
  }),
  examplePayload: deleteChangeItemAssociationExamplePayload,
  perform: async (
    context,
    { connection, changeGuid, changeItemAssociationGuid },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info("Deleting change item association from Arena", {
        changeGuid: changeGuid,
        changeItemAssociationGuid: changeItemAssociationGuid,
      });
      const { status } = await client.delete(
        `/changes/${changeGuid}/items/${changeItemAssociationGuid}`,
      );
      context.logger.info("Change item association deleted successfully", {
        changeGuid: changeGuid,
        changeItemAssociationGuid: changeItemAssociationGuid,
        statusCode: status,
      });
      return {
        data: {
          success: true,
          message: "Change item association deleted successfully",
        },
      };
    } catch (error) {
      handleArenaError(error, context.logger, "Delete Change Item Association");
    }
  },
});
