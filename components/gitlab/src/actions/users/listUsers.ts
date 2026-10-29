import { action, outputSchema } from "@prismatic-io/spectral";
import { createGitlabClient } from "../../client";
import { KEYSET_ORDER_BY_ID } from "../../constants";
import { listUsersExamplePayload } from "../../examplePayloads";
import { listUsersInputs } from "../../inputs";
import { listUsersOutputSchema } from "../../outputSchemas";
import { listRecords } from "../../utils";

export const listUsers = action({
  display: {
    label: "List Users",
    description: "List or search users on the GitLab instance.",
  },
  inputs: listUsersInputs,
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, fetchAll, pagination, search, username },
  ) => {
    const client = createGitlabClient(
      connection,
      context.debug.enabled && context.logger,
    );
    const data = await listRecords(
      client,
      "/users",
      { fetchAll, ...pagination },
      { search, username },
      KEYSET_ORDER_BY_ID,
    );
    return { data };
  },
  examplePerform: async (): Promise<{ data: unknown }> =>
    listUsersExamplePayload,
  examplePayload: listUsersExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listUsersOutputSchema,
  }),
});
