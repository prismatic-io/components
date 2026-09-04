import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listChangeImplementationTaskNotesExamplePayload } from "../../examplePayloads";
import { listChangeImplementationTaskNotesInputs } from "../../inputs";
import { listChangeImplementationTaskNotesOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listChangeImplementationTaskNotes = action({
  display: {
    label: "List Change Implementation Task Notes",
    description: "List all notes for a specific implementation task.",
  },
  inputs: listChangeImplementationTaskNotesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listChangeImplementationTaskNotesOutputSchema,
  }),
  examplePayload: listChangeImplementationTaskNotesExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.get(
        `/changes/${util.types.toString(params.changeGuid)}/implementationtasks/${util.types.toString(params.implementationTaskGuid)}/notes`,
      );
      return { data };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        "List Change Implementation Task Notes",
      );
    }
  },
});
