import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listChangeImplementationFilesExamplePayload } from "../../examplePayloads";
import { listChangeImplementationFilesInputs } from "../../inputs";
import { fileAssociationListSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listChangeImplementationFiles = action({
  display: {
    label: "List Change Implementation Files",
    description: "List all implementation files for a specific change.",
  },
  inputs: listChangeImplementationFilesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: fileAssociationListSchema,
  }),
  examplePayload: listChangeImplementationFilesExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.get(
        `/changes/${util.types.toString(params.changeGuid)}/implementationfiles`,
      );
      return { data };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        "List Change Implementation Files",
      );
    }
  },
});
