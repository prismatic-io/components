import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createGitlabClient } from "../client";
import { selectMilestoneExamplePayload } from "../examplePayloads";
import { selectMilestoneInputs } from "../inputs";
import type { Milestone } from "../types";
import { fetchAllPages } from "../utils";
export const selectMilestone = dataSource({
  display: {
    label: "Select Milestone",
    description: "Select an active milestone in a project.",
  },
  inputs: selectMilestoneInputs,
  perform: async (_context, { connection, project }) => {
    const client = createGitlabClient(connection, false);
    const milestones = await fetchAllPages<Milestone>(
      client,
      `/projects/${project}/milestones`,
      { state: "active" },
    );
    const result: Element[] = milestones.map((item) => ({
      label: item.title,
      key: util.types.toString(item.id),
    }));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: selectMilestoneExamplePayload,
});
