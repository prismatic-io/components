import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createIncidentExamplePayload } from "../../examplePayloads";
import { connectionInput, incident } from "../../inputs";

export const createIncident = action({
  display: {
    label: "Create Incident",
    description: "Create a new incident.",
  },
  perform: async (context, { connection, incident }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/incidents`, { incident });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    incident,
  },
  examplePayload: createIncidentExamplePayload,
});
