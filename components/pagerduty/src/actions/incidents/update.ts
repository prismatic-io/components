import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateIncidentExamplePayload } from "../../examplePayloads";
import {
  connectionInput,
  incidentId,
  updateIncidentObject,
} from "../../inputs";

export const updateIncident = action({
  display: {
    label: "Update Incident",
    description: "Update an existing incident.",
  },
  perform: async (context, { connection, id, incident }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.put(`/incidents/${id}`, { incident });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: incidentId,
    incident: updateIncidentObject,
  },
  examplePayload: updateIncidentExamplePayload,
});
