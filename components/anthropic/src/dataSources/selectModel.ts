import { dataSource, type Element } from "@prismatic-io/spectral";
import { createAnthropicClient } from "../client";
import { selectModelExamplePayload } from "../examplePayloads/selectModel";
import { connectionInput } from "../inputs/general";
import type { Model } from "../interfaces/Model";
import { getPaginatedResponse } from "../utils";

export const selectModel = dataSource({
  display: {
    label: "List Models",
    description: "List all available Claude models",
  },
  dataSourceType: "picklist",
  inputs: {
    connection: connectionInput,
  },
  perform: async (context, { connection }) => {
    const client = createAnthropicClient(connection, false);
    const { data } = await getPaginatedResponse<Model>(
      client,
      "/models",
      false,
      {},
    );
    return {
      result: data.data.map<Element>((model) => ({
        key: model.id,
        label: model.display_name,
      })),
    };
  },
  examplePayload: selectModelExamplePayload,
});
