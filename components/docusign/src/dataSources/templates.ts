import { dataSource } from "@prismatic-io/spectral";
import { templatesInputs } from "../inputs";
import { getTemplates } from "../util";
import { getDocuSignClient } from "../client";
import { templatesExamplePayload } from "../examplePayloads";

export const templates = dataSource({
  display: {
    label: "Select Template",
    description: "A picklist of templates in the DocuSign account.",
  },
  inputs: templatesInputs,
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
  examplePayload: templatesExamplePayload,
});
