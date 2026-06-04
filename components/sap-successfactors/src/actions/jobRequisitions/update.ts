import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { NO_CONTENT_RESPONSE, NO_CONTENT_RESPONSE_TEXT } from "../../constants";
import { updateJobRequisitionInputs } from "../../inputs/jobRequisitions";

export const updateJobRequisition = action({
  display: {
    label: "Update Job Requisition",
    description: "Update an entity in JobRequisition",
  },
  inputs: updateJobRequisitionInputs,
  perform: async (context, { connection, additionalInputs, jobReqId }) => {
    const client = await createClient(connection, context.debug.enabled);
    await client.put(`/JobRequisition('${jobReqId}')`, {
      ...additionalInputs,
    });
    return {
      data: NO_CONTENT_RESPONSE_TEXT,
    };
  },
  examplePayload: NO_CONTENT_RESPONSE,
});
