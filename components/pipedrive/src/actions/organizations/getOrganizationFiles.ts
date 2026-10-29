import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getOrganizationFilesInputs } from "../../inputs";
import { getOrganizationFilesExamplePayload } from "../../examplePayloads";
import { getOrganizationFilesOutputSchema } from "../../outputSchemas";

export const getOrganizationFiles = action({
  display: {
    label: "Get Organization Files",
    description: "Lists files attached to an organization.",
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
    const { data } = await client.get(`/organizations/${id}/files`, {
      params: {
        start,
        limit,
        include_deleted_files: includeDeletedFiles,
        sort,
      },
    });
    return { data };
  },
  inputs: getOrganizationFilesInputs,
  examplePayload: getOrganizationFilesExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getOrganizationFilesOutputSchema,
  }),
});
