import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput } from "../inputs";

export const selectIncident = dataSource({
  display: {
    label: "Select Incident",
    description: "Retrieve and select an incident.",
  },
  dataSourceType: "picklist",
  perform: async (context, { connection }) => {
    const client = createClient(connection);
    const {
      data: { incidents },
    } = await client.get(`/incidents`);

    return incidents.map((incident: Record<string, unknown>) => ({
      key: incident.id,
      label: incident.title,
    }));
  },
  inputs: {
    connection: connectionInput,
  },
});
