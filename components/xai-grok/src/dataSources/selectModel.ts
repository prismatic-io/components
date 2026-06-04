import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectModelExamplePayload } from "../examplePayloads";
import { selectModelInputs } from "../inputs";

export const selectModel = dataSource({
  display: {
    label: "Select Model",
    description: "Select a model from the list of models",
  },
  inputs: selectModelInputs,
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);

    const models = await client.listModels();

    const result = models.data.map<Element>((model) => ({
      label: model.id,
      key: model.id,
    }));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: selectModelExamplePayload,
});
