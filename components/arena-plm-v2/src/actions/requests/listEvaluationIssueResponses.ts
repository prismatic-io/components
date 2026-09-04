import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listEvaluationIssueResponsesExamplePayload } from "../../examplePayloads";
import { listEvaluationIssueResponsesInputs } from "../../inputs";
import { listEvaluationIssueResponsesOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listEvaluationIssueResponses = action({
  display: {
    label: "List Evaluation Issue Responses",
    description:
      "List all responses to a specific evaluation issue in Arena PLM system.",
  },
  inputs: listEvaluationIssueResponsesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listEvaluationIssueResponsesOutputSchema,
  }),
  examplePayload: listEvaluationIssueResponsesExamplePayload,
  perform: async (context, { connection, requestGuid, issueGuid }) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info(
        `Fetching responses for evaluation issue ${issueGuid} in request ${requestGuid}`,
      );
      const { data } = await client.get(
        `/requests/${requestGuid}/evaluationissues/${issueGuid}/responses`,
      );
      context.logger.info(
        `Successfully retrieved ${data?.count || 0} responses for evaluation issue`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(
        error,
        context.logger,
        "List Evaluation Issue Responses",
      );
    }
  },
});
