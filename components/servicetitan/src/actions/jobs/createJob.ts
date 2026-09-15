import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createJobExamplePayload } from "../../examplePayloads";
import { createJobInputs } from "../../inputs";
import { createJobOutputSchema } from "../../outputSchemas";
export const createJob = action({
  display: {
    label: "Create Job",
    description: "Create a job.",
  },
  inputs: createJobInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createJobOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      customerId,
      locationId,
      appointments,
      businessUnitId,
      campaignId,
      customFields,
      customerPo,
      externalData,
      invoiceSignatureIsRequired,
      jobGeneratedLeadSource,
      jobTypeId,
      priority,
      projectId,
      summary,
      tagTypeIds,
    },
  ) => {
    const client = createClient(connection, "jpm", context.debug.enabled);
    const { data } = await client.post(`/jobs`, {
      customerId,
      locationId,
      appointments,
      businessUnitId,
      campaignId,
      customFields,
      customerPo,
      externalData,
      invoiceSignatureIsRequired,
      jobGeneratedLeadSource,
      jobTypeId,
      priority,
      projectId,
      summary,
      tagTypeIds,
    });
    return {
      data,
    };
  },
  examplePerform: async () => createJobExamplePayload,
  examplePayload: createJobExamplePayload,
});
