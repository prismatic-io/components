import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { addRequirementFileExamplePayload } from "../../examplePayloads";
import { addRequirementFileInputs } from "../../inputs";
import { fileAssociationSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const addRequirementFile = action({
  display: {
    label: "Add Requirement File",
    description: "Attach a file to a requirement.",
  },
  inputs: addRequirementFileInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: fileAssociationSchema,
  }),
  examplePayload: addRequirementFileExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.post(
        `/requirements/${params.requirementGuid}/files`,
        { file: { guid: params.fileGuid } },
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "Add Requirement File");
    }
  },
});
