import { action } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { getEventsProviderExamplePayload } from "../examplePayloads";
import { requestErrorHandler } from "../helpers";
import { connection, eventmetadata, id } from "../inputs";

export const getEventsProvider = action({
  display: {
    label: "Get Events Provider",
    description: "View Adobe I/O Events Provider by ID",
  },
  examplePayload: getEventsProviderExamplePayload,
  perform: async (context, { connection, id, eventmetadata }) => {
    const client = getClient(connection, context.debug.enabled);
    try {
      const { data } = await client.get(`/providers/${id}`, {
        params: { eventmetadata },
      });
      return { data };
    } catch (error) {
      requestErrorHandler(error);
    }
  },
  inputs: {
    connection,
    id,
    eventmetadata,
  },
});
