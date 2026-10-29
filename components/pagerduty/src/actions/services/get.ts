import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getServiceExamplePayload } from "../../examplePayloads";
import { connectionInput, serviceId, servicesInclude } from "../../inputs";

export const getService = action({
  display: {
    label: "Get Service",
    description: "Retrieve a service by ID.",
  },
  perform: async (context, { connection, id, include }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/services/${id}`, {
      params: { "include[]": include },
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: serviceId,
    include: servicesInclude,
  },
  examplePayload: getServiceExamplePayload,
});
