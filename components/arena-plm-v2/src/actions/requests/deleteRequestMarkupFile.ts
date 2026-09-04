import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { deleteRequestMarkupFileExamplePayload } from "../../examplePayloads";
import { deleteRequestMarkupFileInputs } from "../../inputs";
import { deleteRequestMarkupFileOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const deleteRequestMarkupFile = action({
  display: {
    label: "Delete Request Markup File",
    description: "Delete a request markup file from Arena PLM system.",
  },
  inputs: deleteRequestMarkupFileInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteRequestMarkupFileOutputSchema,
  }),
  examplePayload: deleteRequestMarkupFileExamplePayload,
  perform: async (
    context,
    { connection, requestGuid, requestFileAssociationGuid },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info(
        `Deleting markup file association ${requestFileAssociationGuid} from request ${requestGuid}`,
      );
      await client.delete(
        `/requests/${requestGuid}/markupfiles/${requestFileAssociationGuid}`,
      );
      context.logger.info("Successfully deleted markup file from request");
      return {
        data: { success: true, message: "Markup file deleted successfully" },
      };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Delete Request Markup File");
    }
  },
});
