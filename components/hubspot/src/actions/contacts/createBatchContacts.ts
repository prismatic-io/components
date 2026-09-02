import { action, outputSchema } from "@prismatic-io/spectral";
import { batchResponseSchema } from "../../outputSchemas";
import { getHubspotClient } from "../../client";
import { createBatchContactsExamplePayload } from "../../examplePayloads";
import { createBatchContactsInputs } from "../../inputs";
export const createBatchContacts = action({
  display: {
    label: "Create Batch Contacts",
    description: "Create a batch of contacts.",
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
      "/crm/v3/objects/contacts/batch/create",
      payload,
    );
    return {
      data,
    };
  },
  inputs: createBatchContactsInputs,
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: createBatchContactsExamplePayload.data,
  }),
  examplePayload: createBatchContactsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: batchResponseSchema,
  }),
});
