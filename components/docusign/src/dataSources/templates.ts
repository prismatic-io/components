import { dataSource } from "@prismatic-io/spectral";
import { connection } from "../inputs";
import { getTemplates } from "../utils";
import { getDocuSignClient } from "../client";

export const templates = dataSource({
  display: {
    label: "Select Template",
    description: "Select a Template.",
  },
  inputs: {
    connection,
  },
  perform: async (context, { connection }) => {
    const client = await getDocuSignClient(connection);
    const data = await getTemplates(client);

    return {
      result: data.envelopeTemplates.map(
        (template: { name: string; templateId: string }) => ({
          key: template.templateId,
          label: template.name,
        }),
      ),
    };
  },
  dataSourceType: "picklist",
});
