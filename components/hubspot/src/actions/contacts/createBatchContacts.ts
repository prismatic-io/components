import { action, outputSchema } from "@prismatic-io/spectral";
import { batchResponseSchema } from "../../outputSchemas";
import { getHubspotClient } from "../../client";
import { createBatchContactsExamplePayload } from "../../examplePayloads";
import { createBatchContactsInputs } from "../../inputs";
import { hubspotPaths } from "../../constants";
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
      hubspotPaths.objects("contacts", "/batch/create"),
      payload,
    );
    return {
      data,
    };
  },
  inputs: createBatchContactsInputs,
  examplePerform: async () => ({
    data: createBatchContactsExamplePayload.data,
  }),
  examplePayload: createBatchContactsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: batchResponseSchema,
  }),
});
