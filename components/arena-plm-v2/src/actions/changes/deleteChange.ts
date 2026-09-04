import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { deleteChangeExamplePayload } from "../../examplePayloads";
import { deleteChangeInputs } from "../../inputs";
import { deleteChangeOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const deleteChange = action({
  display: {
    label: "Delete Change",
    description: "Delete an existing change from Arena PLM system.",
  },
  inputs: deleteChangeInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteChangeOutputSchema,
  }),
  examplePayload: deleteChangeExamplePayload,
  perform: async (context, { connection, changeGuid }) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info("Deleting change in Arena", {
        changeGuid: changeGuid,
      });
      const response = await client.delete(`/changes/${changeGuid}`);
      context.logger.info("Change deleted successfully", {
        changeGuid: changeGuid,
        statusCode: response.status,
      });
      return {
        data: {
          success: true,
          changeGuid: changeGuid,
          message: "Change deleted successfully",
        },
      };
    } catch (error) {
      handleArenaError(error, context.logger, "Delete Change");
    }
  },
});
