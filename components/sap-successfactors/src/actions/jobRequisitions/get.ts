import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getJobRequisitionInputs } from "../../inputs/jobRequisitions";
import { cleanResultFromResponse } from "../../util";

export const getJobRequisition = action({
  display: {
    label: "Get Job Requisition",
    description: "Get entity from JobRequisition by key",
  },
  inputs: getJobRequisitionInputs,
  perform: async (context, { connection, jobReqId, $select }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/JobRequisition('${jobReqId}')`, {
      params: {
        $select,
      },
    });
    return {
      data: cleanResultFromResponse(data),
    };
  },
});
