import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import {
  getModelByIdExamplePayload,
  listModelsExamplePayload,
} from "../examplePayloads";
import { connectionInput, modelInput, timeout } from "../inputs";

const listModels = action({
  display: {
    label: "List Models",
    description: "List all available models",
  },
  inputs: { connection: connectionInput, timeout },
  perform: async (context, params) => {
    const client = createClient(
      params.connection,
      context.debug.enabled,
      params.timeout,
    );
    const { data } = await client.get("/v1/models");
    return { data };
  },
  examplePayload: listModelsExamplePayload,
});

const getModelById = action({
  display: {
    label: "Get Model by ID",
    description: "Get model by ID",
  },
  inputs: { connection: connectionInput, model: modelInput, timeout },
  perform: async (context, params) => {
    const client = createClient(
      params.connection,
      context.debug.enabled,
      params.timeout,
    );
    const { data } = await client.get(`/v1/models/${params.model}`);
    return { data };
  },
  examplePayload: getModelByIdExamplePayload,
});

export default { listModels, getModelById };
