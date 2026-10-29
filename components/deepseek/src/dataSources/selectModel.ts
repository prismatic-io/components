import { Connection, dataSource, Element } from "@prismatic-io/spectral";
import { createDeepSeekClient } from "../client";
import { connection } from "../inputs/general";
import { ListModelsResponse } from "../interfaces";

export const selectModel = dataSource({
  display: {
    label: "Select Model",
    description: "A picklist of available models from the DeepSeek API.",
  },
  inputs: {
    connection,
  },
  dataSourceType: "picklist",
  perform: async (_, { connection }) => {
    const client = createDeepSeekClient(connection as Connection, false);
    const {
      data: { data: deepSeekModels },
    } = await client.get<ListModelsResponse>("/models");
    const result = deepSeekModels.map(({ id }): Element => {
      return {
        label: id,
        key: id,
      };
    });

    return { result };
  },
});
