import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listChangeImplementationTaskFilesExamplePayload } from "../../examplePayloads";
import { listChangeImplementationTaskFilesInputs } from "../../inputs";
import { fileAssociationListSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listChangeImplementationTaskFiles = action({
  display: {
    label: "List Change Implementation Task Files",
    description: "List all files for a specific implementation task.",
  },
  inputs: listChangeImplementationTaskFilesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: fileAssociationListSchema,
  }),
  examplePayload: listChangeImplementationTaskFilesExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.get(
        `/changes/${util.types.toString(params.changeGuid)}/implementationtasks/${util.types.toString(params.implementationTaskGuid)}/files`,
      );
      return { data };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        "List Change Implementation Task Files",
      );
    }
  },
});
