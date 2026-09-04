import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { getChangeImplementationTaskExamplePayload } from "../../examplePayloads";
import { getChangeImplementationTaskInputs } from "../../inputs";
import { changeImplementationTaskSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const getChangeImplementationTask = action({
  display: {
    label: "Get Change Implementation Task",
    description: "Get details of a specific implementation task.",
  },
  inputs: getChangeImplementationTaskInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: changeImplementationTaskSchema,
  }),
  examplePayload: getChangeImplementationTaskExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.get(
        `/changes/${util.types.toString(params.changeGuid)}/implementationtasks/${util.types.toString(params.implementationTaskGuid)}`,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "Get Change Implementation Task");
    }
  },
});
