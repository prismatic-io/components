import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listRequestEvaluationIssuesExamplePayload } from "../../examplePayloads";
import { listRequestEvaluationIssuesInputs } from "../../inputs";
import { listRequestEvaluationIssuesOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listRequestEvaluationIssues = action({
  display: {
    label: "List Request Evaluation Issues",
    description:
      "List all evaluation issues for a request in Arena PLM system.",
  },
  inputs: listRequestEvaluationIssuesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listRequestEvaluationIssuesOutputSchema,
  }),
  examplePayload: listRequestEvaluationIssuesExamplePayload,
  perform: async (context, { connection, requestGuid }) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info(
        `Fetching evaluation issues for request: ${requestGuid}`,
      );
      const { data } = await client.get(
        `/requests/${requestGuid}/evaluationissues`,
      );
      context.logger.info(
        `Successfully retrieved ${data?.count || 0} evaluation issues for request`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "List Request Evaluation Issues");
    }
  },
});
