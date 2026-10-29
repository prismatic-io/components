import { action, outputSchema } from "@prismatic-io/spectral";
import { createGitlabClient } from "../../client";
import { getMergeRequestExamplePayload } from "../../examplePayloads";
import { getMergeRequestInputs } from "../../inputs";
import { getMergeRequestOutputSchema } from "../../outputSchemas";

export const getMergeRequest = action({
  display: {
    label: "Get Merge Request",
    description: "Retrieve a merge request in a project by its IID.",
  },
  inputs: getMergeRequestInputs,
  performSafety: "safe",
  perform: async (context, { connection, project, mergeRequestIid }) => {
    const client = createGitlabClient(
      connection,
      context.debug.enabled && context.logger,
    );
    const { data } = await client.get(
      `/projects/${project}/merge_requests/${mergeRequestIid}`,
    );
    return { data };
  },
  examplePayload: getMergeRequestExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getMergeRequestOutputSchema,
  }),
});
