import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createServiceExamplePayload } from "../../examplePayloads";
import { connectionInput, serviceObject } from "../../inputs";

export const createService = action({
  display: {
    label: "Create Service",
    description: "Create a new service.",
  },
  perform: async (context, { connection, service }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/services`, { service });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    service: serviceObject,
  },
  examplePayload: createServiceExamplePayload,
});
