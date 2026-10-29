import { action, outputSchema } from "@prismatic-io/spectral";
import { createGitlabClient } from "../../client";
import { listLabelsExamplePayload } from "../../examplePayloads";
import { listLabelsInputs } from "../../inputs";
import { listLabelsOutputSchema } from "../../outputSchemas";
import { listRecords } from "../../utils";

export const listLabels = action({
  display: {
    label: "List Labels",
    description:
      "List the labels available in a project, including inherited group labels.",
  },
  inputs: listLabelsInputs,
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, project, fetchAll, pagination, search },
  ) => {
    const client = createGitlabClient(
      connection,
      context.debug.enabled && context.logger,
    );
    const data = await listRecords(
      client,
      `/projects/${project}/labels`,
      { fetchAll, ...pagination },
      { search, include_ancestor_groups: true },
    );
    return { data };
  },
  examplePerform: async (): Promise<{ data: unknown }> =>
    listLabelsExamplePayload,
  examplePayload: listLabelsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listLabelsOutputSchema,
  }),
});
