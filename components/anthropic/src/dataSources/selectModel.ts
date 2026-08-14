import { dataSource, type Element } from "@prismatic-io/spectral";
import { createAnthropicClient } from "../client";
import { selectModelExamplePayload } from "../examplePayloads";
import { selectModelInputs } from "../inputs";
import type { Model } from "../types";
import { getPaginatedResponse } from "../util";
export const selectModel = dataSource({
  display: {
    label: "List Models",
    description: "List all available Claude models.",
  },
  dataSourceType: "picklist",
  inputs: selectModelInputs,
  perform: async (_context, { connection }) => {
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
