import { action } from "@prismatic-io/spectral";
import { getHubspotClient } from "../../client";
import { deleteCustomObjectExamplePayload } from "../../examplePayloads";
import { deleteCustomObjectInputs } from "../../inputs";
export const deleteCustomObject = action({
  display: {
    label: "Delete Custom Object",
    description: "Removes custom object schema.",
  },
  perform: async (
    context,
    { hubspotConnection, timeout, objectType, archived },
  ) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });
    const { data } = await client.delete(`/crm/v3/schemas/${objectType}`, {
      params: {
        archived,
      },
    });
    return {
      data,
    };
  },
  inputs: deleteCustomObjectInputs,
  examplePayload: deleteCustomObjectExamplePayload,
});
