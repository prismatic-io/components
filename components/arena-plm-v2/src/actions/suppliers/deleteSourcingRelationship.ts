import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { deleteSourcingRelationshipExamplePayload } from "../../examplePayloads";
import { deleteSourcingRelationshipInputs } from "../../inputs";
import { deleteSourcingRelationshipOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const deleteSourcingRelationship = action({
  display: {
    label: "Delete Sourcing Relationship",
    description:
      "Delete a specified sourcing relationship for an item in Arena PLM system.",
  },
  inputs: deleteSourcingRelationshipInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteSourcingRelationshipOutputSchema,
  }),
  examplePayload: deleteSourcingRelationshipExamplePayload,
  perform: async (
    context,
    { connection, itemGuid, sourcingRelationshipGuid },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info("Deleting sourcing relationship from Arena", {
        itemGuid: itemGuid,
        sourcingRelationshipGuid: sourcingRelationshipGuid,
      });
      const response = await client.delete(
        `/items/${itemGuid}/sourcing/${sourcingRelationshipGuid}`,
      );
      context.logger.info("Sourcing relationship deleted successfully", {
        itemGuid: itemGuid,
        sourcingRelationshipGuid: sourcingRelationshipGuid,
        statusCode: response.status,
      });
      return {
        data: {
          success: true,
          itemGuid: itemGuid,
          sourcingRelationshipGuid: sourcingRelationshipGuid,
          message: "Sourcing relationship deleted successfully",
          statusCode: response.status,
        },
      };
    } catch (error) {
      handleArenaError(error, context.logger, "Delete Sourcing Relationship");
    }
  },
});
