import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteJobRequisitionInputs } from "../../inputs/jobRequisitions";

export const deleteJobRequisition = action({
  display: {
    label: "Delete Job Requisition",
    description: "Delete an entity from JobRequisition",
  },
  inputs: deleteJobRequisitionInputs,
  perform: async (context, { connection, jobReqId }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/JobRequisition('${jobReqId}')`);
    return {
      data,
    };
  },
});
