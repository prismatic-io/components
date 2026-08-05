import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createLocationExamplePayload } from "../../examplePayloads";
import { createLocationInputs } from "../../inputs";
export const createLocation = action({
  display: {
    label: "Create Location",
    description: "Creates a new location",
  },
  inputs: createLocationInputs,
  perform: async (
    context,
    {
      connection,
      address,
      contacts,
      customFields,
      customerId,
      externalData,
      name,
      tagTypeIds,
    },
  ) => {
    const client = createClient(connection, "crm", context.debug.enabled);
    const { data } = await client.post(`/locations`, {
      address,
      contacts,
      customFields,
      customerId,
      externalData,
      name,
      tagTypeIds,
    });
    return {
      data,
    };
  },
  examplePayload: createLocationExamplePayload,
});
