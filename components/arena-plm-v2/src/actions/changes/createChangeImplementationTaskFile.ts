import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { createChangeImplementationTaskFileExamplePayload } from "../../examplePayloads";
import { createChangeImplementationTaskFileInputs } from "../../inputs";
import { fileAssociationSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const createChangeImplementationTaskFile = action({
  display: {
    label: "Create Change Implementation Task File",
    description: "Attach a file to an implementation task.",
  },
  inputs: createChangeImplementationTaskFileInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: fileAssociationSchema,
  }),
  examplePayload: createChangeImplementationTaskFileExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const requestData = {
        file: {
          guid: util.types.toString(params.fileGuid),
        },
      };
      const { data } = await client.post(
        `/changes/${util.types.toString(params.changeGuid)}/implementationtasks/${util.types.toString(params.implementationTaskGuid)}/files`,
        requestData,
      );
      return { data };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        "Create Change Implementation Task File",
      );
    }
  },
});
