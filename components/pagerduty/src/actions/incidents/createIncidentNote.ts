import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createIncidentNoteExamplePayload } from "../../examplePayloads";
import { connectionInput, incidentId, note } from "../../inputs";

export const createIncidentNote = action({
  display: {
    label: "Create Incident Note",
    description: "Create a note on an incident.",
  },
  perform: async (context, { connection, id, note }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/incidents/${id}/notes`, { note });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: incidentId,
    note,
  },
  examplePayload: createIncidentNoteExamplePayload,
});
