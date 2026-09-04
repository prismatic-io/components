import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listChangeImplementationTasksExamplePayload } from "../../examplePayloads";
import { listChangeImplementationTasksInputs } from "../../inputs";
import { listChangeImplementationTasksOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listChangeImplementationTasks = action({
  display: {
    label: "List Change Implementation Tasks",
    description: "List all implementation tasks for a specific change.",
  },
  inputs: listChangeImplementationTasksInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listChangeImplementationTasksOutputSchema,
  }),
  examplePayload: listChangeImplementationTasksExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.get(
        `/changes/${util.types.toString(params.changeGuid)}/implementationtasks`,
      );
      return { data };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        "List Change Implementation Tasks",
      );
    }
  },
});
