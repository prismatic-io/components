import { action, outputSchema } from "@prismatic-io/spectral";
import { createAemClient } from "../../client";
import { SITES_API_PATH } from "../../constants";
import { listContentFragmentVariationsExamplePayload } from "../../examplePayloads";
import { listContentFragmentVariationsInputs } from "../../inputs";
import { listContentFragmentVariationsOutputSchema } from "../../outputSchemas";
import type { ContentFragmentVariation } from "../../types";
import { fetchCursorPages } from "../../utils";

export const listContentFragmentVariations = action({
  display: {
    label: "List Content Fragment Variations",
    description: "List the variations of a content fragment.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createAemClient(params.connection, context.debug.enabled);
    const data = await fetchCursorPages<ContentFragmentVariation>(
      client,
      `${SITES_API_PATH}/cf/fragments/${encodeURIComponent(params.fragmentId)}/variations`,
      {},
      { fetchAll: params.fetchAll, ...params.pagination },
    );
    return { data };
  },
  inputs: listContentFragmentVariationsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listContentFragmentVariationsOutputSchema,
  }),
  examplePerform: async () => listContentFragmentVariationsExamplePayload,
  examplePayload: listContentFragmentVariationsExamplePayload,
});
