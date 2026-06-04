import { action } from "@prismatic-io/spectral";
import { createCrmClient } from "../../client";
import { updateEntityExamplePayload } from "../../examplePayloads";
import { updateEntityInputs } from "../../inputs";

export const updateEntity = action({
  display: {
    label: "Update Entity",
    description: "Updates a Microsoft Dynamics 365 CRM entity record.",
  },
  examplePayload: updateEntityExamplePayload,
  perform: async (context, { entityType, entityId, dynamicValues, fieldValues, connection }) => {
    const client = await createCrmClient(connection, context.debug.enabled);

    const payloadValues = { ...dynamicValues, ...fieldValues };
    
    const result = await client.update({
      key: entityId,
      collection: entityType,
      data: payloadValues,
      returnRepresentation: true,
    });
    return { data: result };
  },
  inputs: updateEntityInputs,
});
