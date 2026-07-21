import { action } from "@prismatic-io/spectral";
import { createGeminiClient } from "../../client";
import { listModelsExamplePayload as examplePayload } from "../../examplePayloads/models";
import { listModelsInputs } from "../../inputs/models";
import { listModelsFN } from "../../util";
export const listModels = action({
  display: {
    label: "List Models",
    description:
      "Retrieves a list of available models from the Google Generative AI API.",
  },
  inputs: listModelsInputs,
  perform: async (
    context,
    { connection, pagination, filter, extraParameters, fetchAll },
  ) => {
    const { pageSize, pageToken } = pagination;
    const client = createGeminiClient(connection);
    const data = await listModelsFN(client, fetchAll, {
      pageSize,
      pageToken,
      filter,
      ...extraParameters,
    });
    return { data };
  },
  examplePayload,
});
