import { action, outputSchema } from "@prismatic-io/spectral";
import { createAemClient } from "../../client";
import { SITES_API_PATH } from "../../constants";
import { getContentFragmentExamplePayload } from "../../examplePayloads";
import { getContentFragmentInputs } from "../../inputs";
import { getContentFragmentOutputSchema } from "../../outputSchemas";
import type { ContentFragment } from "../../types";

export const getContentFragment = action({
  display: {
    label: "Get Content Fragment",
    description: "Retrieve a content fragment by ID.",
  },
  performSafety: "safe",
  perform: async (context, { connection, fragmentId, includeMetadata, references }) => {
    const client = createAemClient(connection, context.debug.enabled);
    const { data } = await client.get<ContentFragment>(
      `${SITES_API_PATH}/cf/fragments/${encodeURIComponent(fragmentId)}`,
      { params: { includeMetadata: includeMetadata || undefined, references } },
    );
    return { data };
  },
  inputs: getContentFragmentInputs,
  outputSchema: outputSchema({ type: "actionOutput", schema: getContentFragmentOutputSchema }),
  examplePayload: getContentFragmentExamplePayload,
});
