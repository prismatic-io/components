import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getProductFilesInputs } from "../../inputs";
import { getProductFilesExamplePayload } from "../../examplePayloads";
import { getProductFilesOutputSchema } from "../../outputSchemas";
export const getProductFiles = action({
  display: {
    label: "Get Product Files",
    description: "Lists files attached to a product.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      id,
      pagination: { start, limit } = {},
      includeDeletedFiles,
      sort,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/products/${id}/files`, {
      params: {
        start,
        limit,
        include_deleted_files: includeDeletedFiles,
        sort,
      },
    });
    return { data };
  },
  inputs: getProductFilesInputs,
  examplePayload: getProductFilesExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getProductFilesOutputSchema,
  }),
});
