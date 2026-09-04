import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { changeEvaluationIssueStatusExamplePayload } from "../../examplePayloads";
import { changeEvaluationIssueStatusInputs } from "../../inputs";
import { requestIssueSchema } from "../../outputSchemas";
import type { RequestIssueChangeStatusVo } from "../../types";
import { handleArenaError } from "../../util";
export const changeEvaluationIssueStatus = action({
  display: {
    label: "Change Evaluation Issue Status",
    description:
      "Change the status of an evaluation issue in Arena PLM system.",
  },
  inputs: changeEvaluationIssueStatusInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: requestIssueSchema,
  }),
  examplePayload: changeEvaluationIssueStatusExamplePayload,
  perform: async (
    context,
    { connection, requestGuid, issueGuid, status, response },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const requestPayload: RequestIssueChangeStatusVo = {
        guid: issueGuid,
        status: status as "OPEN" | "CLOSED",
      };
      if (response) {
        requestPayload.response = response;
      }
      context.logger.info(
        `Changing status of evaluation issue ${issueGuid} to ${status} in request ${requestGuid}`,
      );
      const responseData = await client.post(
        `/requests/${requestGuid}/evaluationissues/statuschange`,
        requestPayload,
      );
      context.logger.info(
        `Successfully changed evaluation issue status: ${responseData.data?.guid || "N/A"}`,
      );
      return { data: responseData.data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Change Evaluation Issue Status");
    }
  },
});
