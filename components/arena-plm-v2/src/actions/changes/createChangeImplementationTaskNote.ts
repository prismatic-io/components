import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { createChangeImplementationTaskNoteExamplePayload } from "../../examplePayloads";
import { createChangeImplementationTaskNoteInputs } from "../../inputs";
import { changeImplementationNoteSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const createChangeImplementationTaskNote = action({
  display: {
    label: "Create Change Implementation Task Note",
    description: "Create a new note for an implementation task.",
  },
  inputs: createChangeImplementationTaskNoteInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: changeImplementationNoteSchema,
  }),
  examplePayload: createChangeImplementationTaskNoteExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const requestData: {
        note: string;
        label?: string;
        private?: boolean;
      } = {
        note: util.types.toString(params.note),
      };
      if (params.label) {
        requestData.label = util.types.toString(params.label);
      }
      if (params.isPrivate !== null && params.isPrivate !== undefined) {
        requestData.private = util.types.toBool(params.isPrivate);
      }
      const { data } = await client.post(
        `/changes/${util.types.toString(params.changeGuid)}/implementationtasks/${util.types.toString(params.implementationTaskGuid)}/notes`,
        requestData,
      );
      return { data };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        "Create Change Implementation Task Note",
      );
    }
  },
});
