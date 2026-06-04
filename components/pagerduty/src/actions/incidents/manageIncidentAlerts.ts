import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { manageIncidentAlertsExamplePayload } from "../../examplePayloads";
import {
  alertsToUpdate,
  connectionInput,
  incidentId,
  limit,
  offset,
  total,
} from "../../inputs";

export const updateIncidentAlerts = action({
  display: {
    label: "Manage Incident Alerts",
    description: "Update multiple alerts on an incident in bulk.",
  },
  perform: async (
    context,
    { connection, id, limit, offset, total, alerts },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.put(
      `/incidents/${id}/alerts`,
      { alerts },
      { params: { limit, offset, total } },
    );
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: incidentId,
    limit,
    offset,
    total,
    alerts: alertsToUpdate,
  },
  examplePayload: manageIncidentAlertsExamplePayload,
});
