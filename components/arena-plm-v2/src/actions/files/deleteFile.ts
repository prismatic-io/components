import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { deleteFileExamplePayload } from "../../examplePayloads";
import { deleteFileInputs } from "../../inputs";
import { deleteFileOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const deleteFile = action({
  display: {
    label: "Delete File",
    description:
      "Delete the latest edition of a file with the specified GUID. When a file has multiple editions, only the latest, unlocked edition can be deleted. To delete an entire file with multiple editions, repeat the request for all editions.",
  },
  inputs: deleteFileInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteFileOutputSchema,
  }),
  examplePayload: deleteFileExamplePayload,
  perform: async (context, { connection, fileGuid }) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info("Deleting file from Arena", {
        fileGuid,
      });
      const { status } = await client.delete(`/files/${fileGuid}`);
      context.logger.info("File deleted successfully", {
        fileGuid,
        statusCode: status,
      });
      return {
        data: {
          success: true,
          message: `File with GUID ${fileGuid} has been deleted successfully`,
          fileGuid,
          statusCode: status,
        },
      };
    } catch (error) {
      handleArenaError(error, context.logger, `Delete File (${fileGuid})`);
    }
  },
});
