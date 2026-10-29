import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getPersonFilesInputs } from "../../inputs";
import { getPersonFilesExamplePayload } from "../../examplePayloads";
import { getPersonFilesOutputSchema } from "../../outputSchemas";

export const getPersonFiles = action({
  display: {
    label: "Get Person Files",
    description: "Lists files attached to a person.",
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
    const { data } = await client.get(`/persons/${id}/files`, {
      params: {
        start,
        limit,
        include_deleted_files: includeDeletedFiles,
        sort,
      },
    });
    return { data };
  },
  inputs: getPersonFilesInputs,
  examplePayload: getPersonFilesExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getPersonFilesOutputSchema,
  }),
});
