import { action, outputSchema } from "@prismatic-io/spectral";
import { createGitlabClient } from "../../client";
import { listMilestonesExamplePayload } from "../../examplePayloads";
import { listMilestonesInputs } from "../../inputs";
import { listMilestonesOutputSchema } from "../../outputSchemas";
import { listRecords } from "../../utils";
export const listMilestones = action({
  display: {
    label: "List Milestones",
    description: "List the milestones in a project.",
  },
  inputs: listMilestonesInputs,
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, project, fetchAll, pagination, milestoneState },
  ) => {
    const client = createGitlabClient(
      connection,
      context.debug.enabled && context.logger,
    );
    const data = await listRecords(
      client,
      `/projects/${project}/milestones`,
      { fetchAll, ...pagination },
      { state: milestoneState },
    );
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => listMilestonesExamplePayload,
  examplePayload: listMilestonesExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listMilestonesOutputSchema,
  }),
});
