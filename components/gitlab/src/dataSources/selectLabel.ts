import { dataSource, type Element } from "@prismatic-io/spectral";
import { createGitlabClient } from "../client";
import { selectLabelExamplePayload } from "../examplePayloads";
import { selectLabelInputs } from "../inputs";
import type { Label } from "../types";
import { fetchAllPages } from "../utils";
export const selectLabel = dataSource({
  display: {
    label: "Select Label",
    description: "Select a label available in a project.",
  },
  inputs: selectLabelInputs,
  perform: async (_context, { connection, project }) => {
    const client = createGitlabClient(connection, false);
    const labels = await fetchAllPages<Label>(
      client,
      `/projects/${project}/labels`,
      {
        include_ancestor_groups: true,
      },
    );
    const result: Element[] = labels.map((item) => ({
      label: item.name,
      key: item.name,
    }));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: selectLabelExamplePayload,
});
