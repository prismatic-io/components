import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput } from "../inputs";

export const selectModel = dataSource({
  dataSourceType: "picklist",
  display: {
    label: "Select Model",
    description: "Select a model from your OpenAI or Azure OpenAI deployment",
  },
  inputs: { connection: connectionInput },
  perform: async (_context, { connection }) => {
    const client = createClient(connection);
    const models = await client.models.list();

    return {
      result: models.data
        .sort((a, b) => a.id.localeCompare(b.id))
        .map(
          (model): Element => ({
            label: model.id,
            key: model.id,
          }),
        ),
    };
  },
});
