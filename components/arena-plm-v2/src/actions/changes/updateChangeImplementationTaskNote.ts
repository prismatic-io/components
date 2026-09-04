import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { updateChangeImplementationTaskNoteExamplePayload } from "../../examplePayloads";
import { updateChangeImplementationTaskNoteInputs } from "../../inputs";
import { changeImplementationNoteSchema } from "../../outputSchemas";
import type { ChangeImplementationTaskNoteUpdateVo } from "../../types";
import { handleArenaError, toOptionalString } from "../../util";
export const updateChangeImplementationTaskNote = action({
  display: {
    label: "Update Change Implementation Task Note",
    description: "Update an existing note on a change implementation task.",
  },
  inputs: updateChangeImplementationTaskNoteInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: changeImplementationNoteSchema,
  }),
  examplePayload: updateChangeImplementationTaskNoteExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const requestData: ChangeImplementationTaskNoteUpdateVo = {
        note: toOptionalString(params.note),
        label: toOptionalString(params.label),
        private:
          params.isPrivate === undefined || params.isPrivate === null
            ? undefined
            : util.types.toBool(params.isPrivate),
      };
      const { data } = await client.put(
        `/changes/${util.types.toString(params.changeGuid)}/implementationtasks/${util.types.toString(params.implementationTaskGuid)}/notes/${util.types.toString(params.noteGuid)}`,
        requestData,
      );
      return { data };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        "Update Change Implementation Task Note",
      );
    }
  },
});
