import { action } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { listEventsProvidersExamplePayload } from "../examplePayloads";
import { requestErrorHandler } from "../helpers";
import { connection, consumerOrgId } from "../inputs";

export const listEventsProviders = action({
  display: {
    label: "List Events Providers",
    description:
      "List all Adobe I/O Events Providers entitled to the provided Organization ID",
  },
  examplePayload: listEventsProvidersExamplePayload,
  perform: async (context, { connection, consumerOrgId }) => {
    const client = getClient(connection, context.debug.enabled);
    try {
      const { data } = await client.get(`${consumerOrgId}/providers`);
      return { data };
    } catch (error) {
      requestErrorHandler(error);
    }
  },
  inputs: {
    connection,
    consumerOrgId,
  },
});
