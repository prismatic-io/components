import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { manageIncidentsExamplePayload } from "../../examplePayloads";
import { connectionInput, incidents, limit, offset, total } from "../../inputs";

export const updateIncidents = action({
  display: {
    label: "Manage Incidents",
    description: "Acknowledge, resolve, or update multiple incidents in bulk.",
  },
  perform: async (context, { connection, limit, offset, total, incidents }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.put(
      `/incidents`,
      { incidents },
      { params: { limit, offset, total } },
    );
    return { data };
  },
  inputs: {
    connection: connectionInput,
    limit,
    offset,
    total,
    incidents,
  },
  examplePayload: manageIncidentsExamplePayload,
});
