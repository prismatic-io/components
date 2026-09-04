import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { createRequestEvaluationIssueExamplePayload } from "../../examplePayloads";
import { createRequestEvaluationIssueInputs } from "../../inputs";
import { requestIssueSchema } from "../../outputSchemas";
import type { RequestIssueCreateVo } from "../../types";
import { handleArenaError } from "../../util";
export const createRequestEvaluationIssue = action({
  display: {
    label: "Create Request Evaluation Issue",
    description:
      "Create a new evaluation issue for a request in Arena PLM system.",
  },
  inputs: createRequestEvaluationIssueInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: requestIssueSchema,
  }),
  examplePayload: createRequestEvaluationIssueExamplePayload,
  perform: async (
    context,
    { connection, requestGuid, issue, supplierVisibility },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const requestPayload: RequestIssueCreateVo = {
        issue,
      };
      if (supplierVisibility !== undefined) {
        requestPayload.supplierVisibility = supplierVisibility;
      }
      context.logger.info(
        `Creating evaluation issue for request: ${requestGuid}`,
      );
      const { data } = await client.post(
        `/requests/${requestGuid}/evaluationissues`,
        requestPayload,
      );
      context.logger.info(
        `Successfully created evaluation issue: ${data?.guid || "N/A"}`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(
        error,
        context.logger,
        "Create Request Evaluation Issue",
      );
    }
  },
});
