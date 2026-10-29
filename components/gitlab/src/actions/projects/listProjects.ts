import { action, outputSchema } from "@prismatic-io/spectral";
import { createGitlabClient } from "../../client";
import { KEYSET_ORDER_BY_ID } from "../../constants";
import { listProjectsExamplePayload } from "../../examplePayloads";
import { listProjectsInputs } from "../../inputs";
import { listProjectsOutputSchema } from "../../outputSchemas";
import { listRecords } from "../../utils";

export const listProjects = action({
  display: {
    label: "List Projects",
    description: "List projects visible to the authenticated user.",
  },
  inputs: listProjectsInputs,
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, fetchAll, pagination, membership, search },
  ) => {
    const client = createGitlabClient(
      connection,
      context.debug.enabled && context.logger,
    );
    const data = await listRecords(
      client,
      "/projects",
      { fetchAll, ...pagination },
      { membership, search },
      KEYSET_ORDER_BY_ID,
    );
    return { data };
  },
  examplePerform: async (): Promise<{ data: unknown }> =>
    listProjectsExamplePayload,
  examplePayload: listProjectsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listProjectsOutputSchema,
  }),
});
