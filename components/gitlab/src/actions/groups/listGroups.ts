import { action, outputSchema } from "@prismatic-io/spectral";
import { createGitlabClient } from "../../client";
import { listGroupsExamplePayload } from "../../examplePayloads";
import { listGroupsInputs } from "../../inputs";
import { listGroupsOutputSchema } from "../../outputSchemas";
import { listRecords } from "../../utils";

export const listGroups = action({
  display: {
    label: "List Groups",
    description: "List groups visible to the authenticated user.",
  },
  inputs: listGroupsInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection, fetchAll, pagination, search }) => {
    const client = createGitlabClient(
      connection,
      context.debug.enabled && context.logger,
    );
    const data = await listRecords(
      client,
      "/groups",
      { fetchAll, ...pagination },
      { search },
    );
    return { data };
  },
  examplePerform: async (): Promise<{ data: unknown }> =>
    listGroupsExamplePayload,
  examplePayload: listGroupsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listGroupsOutputSchema,
  }),
});
