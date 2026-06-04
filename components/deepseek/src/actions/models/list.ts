import { action, Connection } from "@prismatic-io/spectral";
import { connection } from "../../inputs/general";
import { LIST_MODELS_EXAMPLE_PAYLOAD } from "../../examplePayloads";
import { createDeepSeekClient } from "../../client";
import { ListModelsResponse } from "../../interfaces";

export const listModels = action({
  display: {
    label: "List Models",
    description:
      "Retrieves the currently available models, and provides basic information about each one such as the owner and availability. ",
  },
  perform: async (context, { connection }) => {
    const client = createDeepSeekClient(
      connection as Connection,
      context.debug.enabled
    );
    const { data } = await client.get<ListModelsResponse>("/models");

    return { data };
  },
  inputs: {
    connection,
  },
  examplePayload: LIST_MODELS_EXAMPLE_PAYLOAD,
});
