import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateIncidentAlertExamplePayload } from "../../examplePayloads";
import {
  alertsToUpdate,
  connectionInput,
  incidentAlertId,
  incidentId,
} from "../../inputs";

export const updateIncidentAlert = action({
  display: {
    label: "Update Incident Alert",
    description: "Update a single alert on an incident.",
  },
  perform: async (context, { connection, id, alertId, alert }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.put(`/incidents/${id}/alerts/${alertId}`, {
      alert,
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: incidentId,
    alertId: incidentAlertId,
    alert: alertsToUpdate,
  },
  examplePayload: updateIncidentAlertExamplePayload,
});
