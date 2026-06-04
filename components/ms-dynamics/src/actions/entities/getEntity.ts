import { action } from "@prismatic-io/spectral";
import type { RetrieveRequest } from "dynamics-web-api";
import { createCrmClient } from "../../client";
import { getEntityExamplePayload } from "../../examplePayloads";
import { getEntityInputs } from "../../inputs";

export const getEntity = action({
  display: {
    label: "Get Entity",
    description: "Retrieves a single Microsoft Dynamics 365 CRM entity record.",
  },
  examplePayload: getEntityExamplePayload,
  perform: async (
    context,
    { entityId, entityType, fieldNames, expandPropertyNames, connection }
  ) => {
    const client = await createCrmClient(connection, context.debug.enabled);

    const request: RetrieveRequest = {
      key: entityId,
      collection: entityType,
      select: fieldNames,
    };

    if (Array.isArray(expandPropertyNames) && expandPropertyNames.length) {
      request.expand = expandPropertyNames;
    }

    const result = await client.retrieve(request);

    return { data: result };
  },
  inputs: getEntityInputs,
});
