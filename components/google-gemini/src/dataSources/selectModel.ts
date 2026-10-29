import type { Element } from "@prismatic-io/spectral";
import { dataSource, util } from "@prismatic-io/spectral";
import { createGeminiClient } from "../client";
import { selectModelExamplePayload as examplePayload } from "../examplePayloads/dataSources";
import { selectModelInputs } from "../inputs/dataSources";
import { listModelsFN } from "../util";

export const selectModel = dataSource({
  display: {
    label: "Select Model",
    description: "Select a model from the list of available models.",
  },
  inputs: selectModelInputs,
  perform: async (context, { connection }) => {
    const client = createGeminiClient(connection);
    const data = await listModelsFN(client, true, {});

    const result = data.map<Element>((model) => ({
      label: model.name,
      key: util.types.toString(model.name),
    }));

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload,
});
