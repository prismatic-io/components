import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput } from "../inputs";

export const selectService = dataSource({
  display: {
    label: "Select Service",
    description: "Retrieve and select a service.",
  },
  dataSourceType: "picklist",
  perform: async (context, { connection }) => {
    const client = createClient(connection);
    const {
      data: { services },
    } = await client.get(`/services`);

    return services.map((services: Record<string, unknown>) => ({
      key: services.id,
      label: services.summary,
    }));
  },
  inputs: {
    connection: connectionInput,
  },
});
