import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteJobRequisitionExamplePayload } from "../../examplePayloads";
import { deleteJobRequisitionInputs } from "../../inputs";

export const deleteJobRequisition = action({
  display: {
    label: "Delete Job Requisition",
    description: "Delete a job requisition by ID.",
  },
  inputs: deleteJobRequisitionInputs,
  perform: async (context, { connection, jobReqId }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/JobRequisition('${jobReqId}')`);
    return {
      data,
    };
  },
  examplePayload: deleteJobRequisitionExamplePayload,
});
