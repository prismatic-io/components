import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput } from "../inputs";

export const selectTemplate = dataSource({
  display: {
    label: "Select Template",
    description: "Retrieve and select a template.",
  },
  dataSourceType: "picklist",
  perform: async (context, { connection }) => {
    const client = createClient(connection);
    const {
      data: { templates },
    } = await client.get(`/templates`);

    return templates.map((template: Record<string, unknown>) => ({
      key: template.id,
      label: template.name,
    }));
  },
  inputs: {
    connection: connectionInput,
  },
});
