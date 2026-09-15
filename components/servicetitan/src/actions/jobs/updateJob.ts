import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateJobExamplePayload } from "../../examplePayloads";
import { updateJobInputs } from "../../inputs";
import { updateJobOutputSchema } from "../../outputSchemas";
export const updateJob = action({
  display: {
    label: "Update Job",
    description: "Update a job.",
  },
  inputs: updateJobInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateJobOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      customerId,
      locationId,
      businessUnitId,
      campaignId,
      customFields,
      customerPo,
      externalData,
      jobGeneratedLeadSource,
      jobTypeId,
      priority,
      summary,
      tagTypeIds,
      jobId,
      shouldUpdateInvoiceItems,
    },
  ) => {
    const client = createClient(connection, "jpm", context.debug.enabled);
    const { data } = await client.patch(`/jobs/${jobId}`, {
      customerId,
      locationId,
      businessUnitId,
      jobGeneratedLeadSource,
      jobTypeId,
      priority,
      campaignId,
      summary,
      shouldUpdateInvoiceItems,
      customFields,
      tagTypeIds,
      externalData,
      customerPo,
    });
    return {
      data,
    };
  },
  examplePerform: async () => updateJobExamplePayload,
  examplePayload: updateJobExamplePayload,
});
