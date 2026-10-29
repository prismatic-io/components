import { action, outputSchema } from "@prismatic-io/spectral";
import { createGitlabClient } from "../../client";
import { createFileExamplePayload } from "../../examplePayloads";
import { createFileInputs } from "../../inputs";
import { createFileOutputSchema } from "../../outputSchemas";

export const createFile = action({
  display: {
    label: "Create File",
    description: "Create a file in a repository by committing it to a branch.",
  },
  inputs: createFileInputs,
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, project, filePath, branch, content, commitMessage, encoding },
  ) => {
    const client = createGitlabClient(
      connection,
      context.debug.enabled && context.logger,
    );
    const { data } = await client.post(
      `/projects/${project}/repository/files/${filePath}`,
      {
        branch,
        content,
        commit_message: commitMessage,
        encoding,
      },
    );
    return { data };
  },
  examplePerform: async (): Promise<{ data: unknown }> =>
    createFileExamplePayload,
  examplePayload: createFileExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createFileOutputSchema,
  }),
});
