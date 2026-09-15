import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createLocationExamplePayload } from "../../examplePayloads";
import { createLocationInputs } from "../../inputs";
import { createLocationOutputSchema } from "../../outputSchemas";
export const createLocation = action({
  display: {
    label: "Create Location",
    description: "Creates a new location.",
  },
  inputs: createLocationInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createLocationOutputSchema,
  }),
  performSafety: "notAllowed",
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
  examplePerform: async () => createLocationExamplePayload,
  examplePayload: createLocationExamplePayload,
});
