import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../../client";
import { editApplicationV3ExamplePayload } from "../../../examplePayloads/v3/applications";
import { editApplicationV3Inputs } from "../../../inputs/v3/applications";
import { generatePayload } from "../../../util";
export const editApplicationV3 = action({
  display: {
    label: "Edit Application",
    description: "Updates an application by ID.",
  },
  perform: async (
    context,
    {
      connection,
      applicationId,
      assignmentIds: {
        sourceId,
        referrerId,
        recruiterId,
        coordinatorId,
        prospectPoolId,
        prospectStageId,
      } = {},
      rejectedAt,
      customFields,
    },
  ) => {
    const client = createV3Client(connection, context.debug.enabled);
    const body = generatePayload({
      source_id: sourceId,
      referrer_id: referrerId,
      recruiter_id: recruiterId,
      coordinator_id: coordinatorId,
      prospect_pool_id: prospectPoolId,
      prospect_stage_id: prospectStageId,
      rejected_at: rejectedAt,
      custom_fields: customFields,
    });
    const { data } = await client.patch(`/applications/${applicationId}`, body);
    return { data };
  },
  inputs: editApplicationV3Inputs,
  examplePayload: editApplicationV3ExamplePayload,
});
