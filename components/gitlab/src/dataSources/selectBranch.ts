import { dataSource, type Element } from "@prismatic-io/spectral";
import { createGitlabClient } from "../client";
import { selectBranchExamplePayload } from "../examplePayloads";
import { selectBranchInputs } from "../inputs";
import type { Branch } from "../types";
import { fetchAllPages } from "../utils";
export const selectBranch = dataSource({
  display: {
    label: "Select Branch",
    description: "Select a branch in a project's repository.",
  },
  inputs: selectBranchInputs,
  perform: async (_context, { connection, project }) => {
    const client = createGitlabClient(connection, false);
    const branches = await fetchAllPages<Branch>(
      client,
      `/projects/${project}/repository/branches`,
    );
    const result: Element[] = branches.map((item) => ({
      label: item.name,
      key: item.name,
    }));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: selectBranchExamplePayload,
});
