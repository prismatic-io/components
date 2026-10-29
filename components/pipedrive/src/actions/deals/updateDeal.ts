import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateDealInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { updateDealExamplePayload } from "../../examplePayloads";
import { updateDealOutputSchema } from "../../outputSchemas";

export const updateDeal = action({
  display: {
    label: "Update Deal",
    description: "Updates a deal.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      id,
      personId,
      orgId,
      pipelineId,
      stageId,
      additionalFields: {
        title,
        value,
        currency,
        status,
        expectedCloseDate,
        probability,
        lostReason,
        visibleTo,
      } = {},
    },
  ) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.patch(`/deals/${id}`, {
      title,
      value,
      currency,
      person_id: personId,
      org_id: orgId,
      pipeline_id: pipelineId,
      stage_id: stageId,
      status,
      expected_close_date: expectedCloseDate,
      probability,
      lost_reason: lostReason,
      visible_to: visibleTo,
    });
    return { data };
  },
  inputs: updateDealInputs,
  examplePayload: updateDealExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateDealOutputSchema,
  }),
});
