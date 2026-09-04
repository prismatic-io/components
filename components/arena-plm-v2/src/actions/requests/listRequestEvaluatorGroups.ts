import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listRequestEvaluatorGroupsExamplePayload } from "../../examplePayloads";
import { listRequestEvaluatorGroupsInputs } from "../../inputs";
import { listRequestEvaluatorGroupsOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listRequestEvaluatorGroups = action({
  display: {
    label: "List Request Evaluator Groups",
    description: "List all evaluator groups for requests in Arena PLM system.",
  },
  inputs: listRequestEvaluatorGroupsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listRequestEvaluatorGroupsOutputSchema,
  }),
  examplePayload: listRequestEvaluatorGroupsExamplePayload,
  perform: async (context, { connection }) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info("Fetching request evaluator groups from Arena");
      const { data } = await client.get("/settings/requests/evaluatorgroups");
      context.logger.info(
        `Successfully retrieved ${data?.count || 0} request evaluator groups`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "List Request Evaluator Groups");
    }
  },
});
