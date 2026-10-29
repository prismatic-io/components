import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createJobRequisitionExamplePayload } from "../../examplePayloads";
import { createJobRequisitionInputs } from "../../inputs";
import { cleanResultFromResponse } from "../../util";

export const createJobRequisition = action({
  display: {
    label: "Create Job Requisition",
    description: "Create a new job requisition.",
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
  examplePayload: createJobRequisitionExamplePayload,
});
