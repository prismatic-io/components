import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { createChangeImplementationFileExamplePayload } from "../../examplePayloads";
import { createChangeImplementationFileInputs } from "../../inputs";
import { fileAssociationSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const createChangeImplementationFile = action({
  display: {
    label: "Create Change Implementation File",
    description: "Attach a new implementation file to a change.",
  },
  inputs: createChangeImplementationFileInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: fileAssociationSchema,
  }),
  examplePayload: createChangeImplementationFileExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const requestData = {
        file: {
          guid: util.types.toString(params.fileGuid),
        },
      };
      const { data } = await client.post(
        `/changes/${util.types.toString(params.changeGuid)}/implementationfiles`,
        requestData,
      );
      return { data };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        "Create Change Implementation File",
      );
    }
  },
});
