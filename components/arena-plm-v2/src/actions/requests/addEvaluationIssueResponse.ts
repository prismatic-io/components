import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { addEvaluationIssueResponseExamplePayload } from "../../examplePayloads";
import { addEvaluationIssueResponseInputs } from "../../inputs";
import { requestIssueResponseSchema } from "../../outputSchemas";
import type { RequestIssueResponseCreateVo } from "../../types";
import { handleArenaError } from "../../util";
export const addEvaluationIssueResponse = action({
  display: {
    label: "Add Evaluation Issue Response",
    description: "Add a response to an evaluation issue in Arena PLM system.",
  },
  inputs: addEvaluationIssueResponseInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: requestIssueResponseSchema,
  }),
  examplePayload: addEvaluationIssueResponseExamplePayload,
  perform: async (
    context,
    { connection, requestGuid, issueGuid, response },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const requestPayload: RequestIssueResponseCreateVo = {
        response,
      };
      context.logger.info(
        `Adding response to evaluation issue ${issueGuid} in request ${requestGuid}`,
      );
      const responseData = await client.post(
        `/requests/${requestGuid}/evaluationissues/${issueGuid}/responses`,
        requestPayload,
      );
      context.logger.info(
        `Successfully added response to evaluation issue: ${responseData.data?.guid || "N/A"}`,
      );
      return { data: responseData.data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Add Evaluation Issue Response");
    }
  },
});
