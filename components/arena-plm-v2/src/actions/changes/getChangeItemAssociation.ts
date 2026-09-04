import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { getChangeItemAssociationExamplePayload } from "../../examplePayloads";
import { getChangeItemAssociationInputs } from "../../inputs";
import { changeItemAssociationSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const getChangeItemAssociation = action({
  display: {
    label: "Get Change Item Association",
    description:
      "Returns a Change Affected Item with a given GUID included in a change with a given GUID. The response includes inventory disposition and information about each view of the item, including whether or not the view is included in the change and whether or not it contains modifications to the working revision.",
  },
  inputs: getChangeItemAssociationInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: changeItemAssociationSchema,
  }),
  examplePayload: getChangeItemAssociationExamplePayload,
  perform: async (
    context,
    { connection, changeGuid, changeItemAssociationGuid },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info("Getting change item association from Arena", {
        changeGuid: changeGuid,
        changeItemAssociationGuid: changeItemAssociationGuid,
      });
      const { data, status } = await client.get(
        `/changes/${changeGuid}/items/${changeItemAssociationGuid}`,
      );
      context.logger.info("Change item association retrieved successfully", {
        changeGuid: changeGuid,
        changeItemAssociationGuid: changeItemAssociationGuid,
        responseGuid: data.guid,
        statusCode: status,
      });
      return {
        data,
      };
    } catch (error) {
      handleArenaError(error, context.logger, "Get Change Item Association");
    }
  },
});
