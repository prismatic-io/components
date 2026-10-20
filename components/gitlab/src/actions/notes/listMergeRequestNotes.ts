import { action, outputSchema } from "@prismatic-io/spectral";
import { createGitlabClient } from "../../client";
import { listMergeRequestNotesExamplePayload } from "../../examplePayloads";
import { listMergeRequestNotesInputs } from "../../inputs";
import { listMergeRequestNotesOutputSchema } from "../../outputSchemas";
import { listRecords } from "../../utils";
export const listMergeRequestNotes = action({
  display: {
    label: "List Merge Request Notes",
    description: "List the comments and system notes on a merge request.",
  },
  inputs: listMergeRequestNotesInputs,
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, project, mergeRequestIid, fetchAll, pagination },
  ) => {
    const client = createGitlabClient(
      connection,
      context.debug.enabled && context.logger,
    );
    const data = await listRecords(
      client,
      `/projects/${project}/merge_requests/${mergeRequestIid}/notes`,
      { fetchAll, ...pagination },
    );
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => listMergeRequestNotesExamplePayload,
  examplePayload: listMergeRequestNotesExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listMergeRequestNotesOutputSchema,
  }),
});
