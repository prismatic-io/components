import { action, outputSchema } from "@prismatic-io/spectral";
import { batchResponseSchema } from "../../outputSchemas";
import { getHubspotClient } from "../../client";
import { updateBatchContactsExamplePayload } from "../../examplePayloads";
import { updateBatchContactsInputs } from "../../inputs";
export const updateBatchContacts = action({
  display: {
    label: "Update Batch Contacts",
    description: "Update a batch of contacts.",
  },
  performSafety: "notAllowed",
  perform: async (context, { timeout, hubspotConnection, batchInputs }) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const payload = {
      inputs: batchInputs,
    };
    const { data } = await client.post(
      "/crm/v3/objects/contacts/batch/update",
      payload,
    );
    return {
      data,
    };
  },
  inputs: updateBatchContactsInputs,
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: updateBatchContactsExamplePayload.data,
  }),
  examplePayload: updateBatchContactsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: batchResponseSchema,
  }),
});
