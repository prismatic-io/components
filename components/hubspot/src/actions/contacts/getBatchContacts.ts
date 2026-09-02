import { action, outputSchema } from "@prismatic-io/spectral";
import { batchResponseSchema } from "../../outputSchemas";
import { getHubspotClient } from "../../client";
import { getBatchContactsExamplePayload } from "../../examplePayloads";
import { getBatchContactsInputs } from "../../inputs";
import { getArrayOfObjectsWithKey } from "../../util";
export const getBatchContacts = action({
  display: {
    label: "Get Batch Contacts",
    description:
      "Read a batch of contacts by internal ID, or unique property values.",
  },
  performSafety: "safe",
  perform: async (
    context,
    {
      hubspotConnection,
      propertiesWithHistory,
      properties,
      idProperty,
      contactIds,
      archived,
      timeout,
    },
  ) => {
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
      propertiesWithHistory: propertiesWithHistory || [],
      ...(idProperty && { idProperty }),
      inputs: contactIds ? getArrayOfObjectsWithKey(contactIds, "id") : [],
      properties: properties || [],
    };
    const { data } = await client.post(
      "/crm/v3/objects/contacts/batch/read",
      payload,
      {
        params: { archived },
      },
    );
    return {
      data,
    };
  },
  inputs: getBatchContactsInputs,
  examplePayload: getBatchContactsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: batchResponseSchema,
  }),
});
