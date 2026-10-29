import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listIncidentNotesExamplePayload } from "../../examplePayloads";
import { connectionInput, incidentId } from "../../inputs";

export const listIncidentNotes = action({
  display: {
    label: "List Incident Notes",
    description: "List notes for an incident.",
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/incidents/${id}/notes`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: incidentId,
  },
  examplePayload: listIncidentNotesExamplePayload,
});
