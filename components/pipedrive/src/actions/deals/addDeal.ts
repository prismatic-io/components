import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { addDealInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { addDealExamplePayload } from "../../examplePayloads";
import { addDealOutputSchema } from "../../outputSchemas";

export const addDeal = action({
  display: {
    label: "Add Deal",
    description: "Adds a deal.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      title,
      personId,
      orgId,
      pipelineId,
      stageId,
      additionalFields: {
        value,
        currency,
        status,
        expectedCloseDate,
        probability,
        lostReason,
        visibleTo,
        addTime,
      } = {},
    },
  ) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.post("/deals", {
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
      add_time: addTime,
    });
    return { data };
  },
  inputs: addDealInputs,
  examplePayload: addDealExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: addDealOutputSchema,
  }),
});
