import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createJobRequisitionExamplePayload as getJobRequisitionExamplePayload } from "../../examplePayloads";
import { getJobRequisitionInputs } from "../../inputs";
import { cleanResultFromResponse } from "../../util";

export const getJobRequisition = action({
  display: {
    label: "Get Job Requisition",
    description: "Retrieve a job requisition by ID.",
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
  examplePayload: getJobRequisitionExamplePayload,
});
