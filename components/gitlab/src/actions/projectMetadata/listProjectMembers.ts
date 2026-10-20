import { action, outputSchema } from "@prismatic-io/spectral";
import { createGitlabClient } from "../../client";
import { listProjectMembersExamplePayload } from "../../examplePayloads";
import { listProjectMembersInputs } from "../../inputs";
import { listProjectMembersOutputSchema } from "../../outputSchemas";
import { listRecords } from "../../utils";
export const listProjectMembers = action({
  display: {
    label: "List Project Members",
    description:
      "List a project's members, including members inherited from its groups.",
  },
  inputs: listProjectMembersInputs,
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, project, fetchAll, pagination, query },
  ) => {
    const client = createGitlabClient(
      connection,
      context.debug.enabled && context.logger,
    );
    const data = await listRecords(
      client,
      `/projects/${project}/members/all`,
      { fetchAll, ...pagination },
      { query },
    );
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => listProjectMembersExamplePayload,
  examplePayload: listProjectMembersExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listProjectMembersOutputSchema,
  }),
});
