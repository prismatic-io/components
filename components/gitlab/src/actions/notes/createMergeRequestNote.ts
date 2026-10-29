import { action, outputSchema } from "@prismatic-io/spectral";
import { createGitlabClient } from "../../client";
import { createMergeRequestNoteExamplePayload } from "../../examplePayloads";
import { createMergeRequestNoteInputs } from "../../inputs";
import { createMergeRequestNoteOutputSchema } from "../../outputSchemas";

export const createMergeRequestNote = action({
  display: {
    label: "Create Merge Request Note",
    description: "Add a comment to a merge request.",
  },
  inputs: createMergeRequestNoteInputs,
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, project, mergeRequestIid, body, internal },
  ) => {
    const client = createGitlabClient(
      connection,
      context.debug.enabled && context.logger,
    );
    const { data } = await client.post(
      `/projects/${project}/merge_requests/${mergeRequestIid}/notes`,
      { body, internal },
    );
    return { data };
  },
  examplePerform: async (): Promise<{ data: unknown }> =>
    createMergeRequestNoteExamplePayload,
  examplePayload: createMergeRequestNoteExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createMergeRequestNoteOutputSchema,
  }),
});
