import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getIncidentExamplePayload } from "../../examplePayloads";
import { connectionInput, incidentId, includeGetIncidents } from "../../inputs";

export const getIncident = action({
  display: {
    label: "Get Incident",
    description: "Retrieve an incident by ID.",
  },
  perform: async (context, { connection, id, include }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/incidents/${id}`, {
      params: { "include[]": include },
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: incidentId,
    include: includeGetIncidents,
  },
  examplePayload: getIncidentExamplePayload,
});
