import { action, outputSchema } from "@prismatic-io/spectral";
import { createAemClient } from "../../client";
import { SITES_API_PATH } from "../../constants";
import { listContentFragmentModelsExamplePayload } from "../../examplePayloads";
import { listContentFragmentModelsInputs } from "../../inputs";
import { listContentFragmentModelsOutputSchema } from "../../outputSchemas";
import type { ContentFragmentModel } from "../../types";
import { fetchCursorPages } from "../../utils";

export const listContentFragmentModels = action({
  display: {
    label: "List Content Fragment Models",
    description: "List the content fragment models available in the environment.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createAemClient(params.connection, context.debug.enabled);
    const data = await fetchCursorPages<ContentFragmentModel>(
      client,
      `${SITES_API_PATH}/cf/models`,
      { projection: params.projection },
      { fetchAll: params.fetchAll, ...params.pagination },
    );
    return { data };
  },
  inputs: listContentFragmentModelsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listContentFragmentModelsOutputSchema,
  }),
  examplePerform: async () => listContentFragmentModelsExamplePayload,
  examplePayload: listContentFragmentModelsExamplePayload,
});
