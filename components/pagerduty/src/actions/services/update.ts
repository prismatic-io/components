import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateServiceExamplePayload } from "../../examplePayloads";
import { connectionInput, serviceId, updateServiceObject } from "../../inputs";

export const updateService = action({
  display: {
    label: "Update Service",
    description: "Update an existing service.",
  },
  perform: async (context, { connection, id, service }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.put(`/services/${id}`, { service });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: serviceId,
    service: updateServiceObject,
  },
  examplePayload: updateServiceExamplePayload,
});
