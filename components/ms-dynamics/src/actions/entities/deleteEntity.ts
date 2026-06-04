import { action } from "@prismatic-io/spectral";
import { createCrmClient } from "../../client";
import { deleteEntityExamplePayload } from "../../examplePayloads";
import { deleteEntityInputs } from "../../inputs";

export const deleteEntity = action({
  display: {
    label: "Delete Entity",
    description: "Deletes the specified Microsoft Dynamics 365 CRM entity record.",
  },
  examplePayload: deleteEntityExamplePayload,
  perform: async (context, { entityType, entityId, connection }) => {
    const client = await createCrmClient(connection, context.debug.enabled);

    const result = await client.deleteRecord({ key: entityId, collection: entityType });
    return { data: result };
  },
  inputs: deleteEntityInputs,
});
