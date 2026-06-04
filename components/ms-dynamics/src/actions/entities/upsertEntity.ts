import { action } from "@prismatic-io/spectral";
import { createCrmClient } from "../../client";
import { upsertEntityExamplePayload } from "../../examplePayloads";
import { upsertEntityInputs } from "../../inputs";

export const upsertEntity = action({
  display: {
    label: "Upsert Entity",
    description: "Upserts a Microsoft Dynamics 365 CRM entity record.",
  },
  examplePayload: upsertEntityExamplePayload,
  perform: async (context, { entityType, entityId, dynamicValues, fieldValues, connection }) => {
    const client = await createCrmClient(connection, context.debug.enabled);

    const payloadValues = { ...dynamicValues, ...fieldValues };
    
    const result = await client.upsert({
      key: entityId,
      collection: entityType,
      data: payloadValues,
      returnRepresentation: true,
    });

    return { data: result };
  },
  inputs: upsertEntityInputs,
});
