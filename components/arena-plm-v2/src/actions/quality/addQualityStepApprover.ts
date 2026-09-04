import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { addQualityStepApproverExamplePayload } from "../../examplePayloads";
import { addQualityStepApproverInputs } from "../../inputs";
import { addQualityStepApproverOutputSchema } from "../../outputSchemas";
import type { ApproverDecisionRequestVo } from "../../types";
import { handleArenaError } from "../../util";
export const addQualityStepApprover = action({
  display: {
    label: "Add Quality Step Approver",
    description: "Add decision makers to a quality process sign-off step.",
  },
  inputs: addQualityStepApproverInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: addQualityStepApproverOutputSchema,
  }),
  examplePayload: addQualityStepApproverExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      if (!params.userGuid && !params.groupGuid) {
        throw new Error("Either User GUID or Group GUID must be provided");
      }
      if (params.userGuid && params.groupGuid) {
        throw new Error(
          "Cannot specify both User GUID and Group GUID - choose one",
        );
      }
      const requestPayload: ApproverDecisionRequestVo = {
        decisionType: params.decisionType,
        user: params.userGuid ? { guid: params.userGuid } : undefined,
        group: params.groupGuid ? { guid: params.groupGuid } : undefined,
      };
      const { data } = await client.post(
        `/qualityprocesses/${params.qualityprocessGuid}/steps/${params.stepGuid}/decisions`,
        requestPayload,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "Add Quality Step Approver");
    }
  },
});
