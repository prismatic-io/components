import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createJobRequisitionInputs } from "../../inputs/jobRequisitions";
import { cleanResultFromResponse } from "../../util";

export const createJobRequisition = action({
  display: {
    label: "Create Job Requisition",
    description: "Add a new entity to JobRequisition",
  },
  inputs: createJobRequisitionInputs,
  perform: async (context, { connection, additionalInputs, templateId }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/JobRequisition`, {
      ...additionalInputs,
      templateId,
    });
    return {
      data: cleanResultFromResponse(data),
    };
  },
});
