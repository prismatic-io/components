import { action } from "@prismatic-io/spectral";
import { createCrmClient } from "../../client";
import { createEntityExamplePayload } from "../../examplePayloads";
import { createEntityInputs } from "../../inputs";

export const createEntity = action({
  display: {
    label: "Create Entity",
    description: "Creates a new Microsoft Dynamics 365 CRM entity record.",
  },
  examplePayload: createEntityExamplePayload,
  perform: async (context, { entityType, fieldValues, dynamicValues, connection }) => {
    const client = await createCrmClient(connection, context.debug.enabled);
    const payloadValues = { ...dynamicValues, ...fieldValues };
    
    const result = await client.create({
      data: payloadValues,
      collection: entityType,
      returnRepresentation: true,
    });
    return { data: result };
  },
  inputs: createEntityInputs,
});
