import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getDealFilesInputs } from "../../inputs";
import { getDealFilesExamplePayload } from "../../examplePayloads";
import { getDealFilesOutputSchema } from "../../outputSchemas";
export const getDealFiles = action({
  display: {
    label: "Get Deal Files",
    description: "Lists files attached to a deal.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      id,
      pagination: { start, limit, cursor } = {},
      includeDeletedFiles,
      sort,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/deals/${id}/files`, {
      params: {
        start,
        limit,
        include_deleted_files: includeDeletedFiles,
        sort,
        cursor,
      },
    });
    return { data };
  },
  inputs: getDealFilesInputs,
  examplePayload: getDealFilesExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getDealFilesOutputSchema,
  }),
});
