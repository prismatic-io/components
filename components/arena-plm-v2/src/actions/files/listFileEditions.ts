import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listFileEditionsExamplePayload } from "../../examplePayloads";
import { listFileEditionsInputs } from "../../inputs";
import { listFileEditionsOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listFileEditions = action({
  display: {
    label: "List File Editions",
    description: "Retrieve all edition information of a file.",
  },
  inputs: listFileEditionsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listFileEditionsOutputSchema,
  }),
  examplePayload: listFileEditionsExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      context.logger.info(`Fetching file editions for file ${params.fileGuid}`);
      const { data } = await client.get(`/files/${params.fileGuid}/editions`);
      context.logger.info(
        `Successfully retrieved ${data?.count || 0} file editions`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "List File Editions");
    }
  },
});
