import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { NO_RESPONSE_SUCCESSFULL_PAYLOAD } from "../../examplePayloads";
import { connectionInput, serviceId } from "../../inputs";

export const deleteService = action({
  display: {
    label: "Delete Service",
    description: "Delete a service by ID.",
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/services/${id}`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: serviceId,
  },
  examplePayload: NO_RESPONSE_SUCCESSFULL_PAYLOAD,
});
