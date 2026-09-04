import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { createChangeMarkupFileExamplePayload } from "../../examplePayloads";
import { createChangeMarkupFileInputs } from "../../inputs";
import { changeMarkupFileAssociationSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const createChangeMarkupFile = action({
  display: {
    label: "Create Change Markup File",
    description: "Attach a new markup file to a change.",
  },
  inputs: createChangeMarkupFileInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: changeMarkupFileAssociationSchema,
  }),
  examplePayload: createChangeMarkupFileExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const requestData = {
        file: {
          guid: util.types.toString(params.fileGuid),
        },
      };
      const { data } = await client.post(
        `/changes/${util.types.toString(params.changeGuid)}/markupfiles`,
        requestData,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "Create Change Markup File");
    }
  },
});
