import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getIncidentAlertExamplePayload } from "../../examplePayloads";
import { connectionInput, incidentAlertId, incidentId } from "../../inputs";

export const getIncidentAlert = action({
  display: {
    label: "Get Incident Alert",
    description: "Retrieve a single alert from an incident.",
  },
  perform: async (context, { connection, id, alertId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/incidents/${id}/alerts/${alertId}`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: incidentId,
    alertId: incidentAlertId,
  },
  examplePayload: getIncidentAlertExamplePayload,
});
