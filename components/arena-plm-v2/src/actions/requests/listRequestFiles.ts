import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listRequestFilesExamplePayload } from "../../examplePayloads";
import { listRequestFilesInputs } from "../../inputs";
import { fileAssociationListSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listRequestFiles = action({
  display: {
    label: "List Request Files",
    description: "List all files attached to a request in Arena PLM system.",
  },
  inputs: listRequestFilesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: fileAssociationListSchema,
  }),
  examplePayload: listRequestFilesExamplePayload,
  perform: async (context, { connection, requestGuid }) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info(`Fetching files for request: ${requestGuid}`);
      const { data } = await client.get(`/requests/${requestGuid}/files`);
      context.logger.info(
        `Successfully retrieved ${data?.count || 0} files for request`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "List Request Files");
    }
  },
});
