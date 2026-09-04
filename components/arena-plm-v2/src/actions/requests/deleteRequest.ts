import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { deleteRequestExamplePayload } from "../../examplePayloads";
import { deleteRequestInputs } from "../../inputs";
import { deleteRequestOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const deleteRequest = action({
  display: {
    label: "Delete Request",
    description: "Delete a specific request from Arena PLM system.",
  },
  inputs: deleteRequestInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteRequestOutputSchema,
  }),
  examplePayload: deleteRequestExamplePayload,
  perform: async (context, { connection, requestGuid }) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info(`Deleting request with GUID: ${requestGuid}`);
      await client.delete(`/requests/${requestGuid}`);
      context.logger.info(`Successfully deleted request: ${requestGuid}`);
      return {
        data: { success: true, message: "Request deleted successfully" },
      };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Delete Request");
    }
  },
});
