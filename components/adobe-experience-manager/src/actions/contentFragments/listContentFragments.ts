import { action, outputSchema } from "@prismatic-io/spectral";
import { createAemClient } from "../../client";
import { SITES_API_PATH } from "../../constants";
import { listContentFragmentsExamplePayload } from "../../examplePayloads";
import { listContentFragmentsInputs } from "../../inputs";
import { listContentFragmentsOutputSchema } from "../../outputSchemas";
import type { ContentFragment } from "../../types";
import { fetchCursorPages } from "../../utils";

export const listContentFragments = action({
  display: {
    label: "List Content Fragments",
    description: "List content fragments, optionally under a path.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createAemClient(params.connection, context.debug.enabled);
    const data = await fetchCursorPages<ContentFragment>(
      client,
      `${SITES_API_PATH}/cf/fragments`,
      {
        path: params.path,
        projection: params.projection,
        includeMetadata: params.includeMetadata || undefined,
        references: params.references,
      },
      { fetchAll: params.fetchAll, ...params.pagination },
    );
    return { data };
  },
  inputs: listContentFragmentsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listContentFragmentsOutputSchema,
  }),
  examplePerform: async () => listContentFragmentsExamplePayload,
  examplePayload: listContentFragmentsExamplePayload,
});
