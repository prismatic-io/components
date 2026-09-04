import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { removeFileFromRequestExamplePayload } from "../../examplePayloads";
import { removeFileFromRequestInputs } from "../../inputs";
import { removeFileFromRequestOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const removeFileFromRequest = action({
  display: {
    label: "Remove File from Request",
    description: "Remove a file from a request in Arena PLM system.",
  },
  inputs: removeFileFromRequestInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: removeFileFromRequestOutputSchema,
  }),
  examplePayload: removeFileFromRequestExamplePayload,
  perform: async (
    context,
    { connection, requestGuid, requestFileAssociationGuid },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info(
        `Removing file association ${requestFileAssociationGuid} from request ${requestGuid}`,
      );
      await client.delete(
        `/requests/${requestGuid}/files/${requestFileAssociationGuid}`,
      );
      context.logger.info("Successfully removed file association from request");
      return {
        data: {
          success: true,
          message: "File removed from request successfully",
        },
      };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Remove File from Request");
    }
  },
});
