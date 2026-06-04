import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getBusinessEntitiesResponse } from "../../examplePayloads/businessEntities";
import { businessEntityId, connection } from "../../inputs";
import type { BusinessEntity } from "../../interfaces/businessEntities";

export const getBusinessEntity = action({
  display: {
    label: "Get Business Entity",
    description: "Retrieve a business entity by ID",
  },
  inputs: {
    businessEntityId,
    connection,
  },
  perform: async (context, { connection, businessEntityId }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.get<BusinessEntity>(`/entities/${businessEntityId}`);
    return {
      data,
    };
  },
  examplePayload: {
    data: getBusinessEntitiesResponse,
  },
});
