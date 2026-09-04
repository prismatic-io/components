import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { submitQualityStepDecisionExamplePayload } from "../../examplePayloads";
import { submitQualityStepDecisionInputs } from "../../inputs";
import { workflowDecisionResponseSchema } from "../../outputSchemas";
import type { SignOffStepDecisionVo } from "../../types";
import { handleArenaError, toOptionalString } from "../../util";
export const submitQualityStepDecision = action({
  display: {
    label: "Submit Quality Step Decision",
    description:
      "Make a decision (approve/reject/comment) on a quality process sign-off step.",
  },
  inputs: submitQualityStepDecisionInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: workflowDecisionResponseSchema,
  }),
  examplePayload: submitQualityStepDecisionExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const requestPayload: SignOffStepDecisionVo = {
        decision: params.decision,
        comments: toOptionalString(params.comments),
      };
      const { data } = await client.put(
        `/qualityprocesses/${params.qualityprocessGuid}/steps/${params.stepGuid}/decisions/${params.decisionGuid}`,
        requestPayload,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "Submit Quality Step Decision");
    }
  },
});
