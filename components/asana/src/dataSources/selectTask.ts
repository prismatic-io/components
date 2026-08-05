import { dataSource } from "@prismatic-io/spectral";
import { createAsanaClient } from "../client";
import { selectTaskInputs } from "../inputs";
import type { DataSource } from "../types/Project";
import { fetchMoreData, mapToLabelKey } from "../util";
const selectTask = dataSource({
  display: {
    label: "Select Task",
    description: "Select a task from a dropdown menu.",
  },
  inputs: selectTaskInputs,
  perform: async (_context, { connection, workspace, project, assignee }) => {
    const client = await createAsanaClient(connection, false);
    if (!workspace && !assignee && !project) {
      throw new Error(
        "Project ID or Workspace ID and Assignee ID must be provided",
      );
    }
    if ((assignee && !workspace) || (!assignee && workspace)) {
      throw new Error("Assignee ID and Workspace ID must be provided together");
    }
    if (assignee && project) {
      throw new Error("Assignee ID cannot be provided with a Project ID");
    }
    if (project && workspace) {
      throw new Error("Project ID cannot be provided with a Workspace ID");
    }
    const data = await fetchMoreData<DataSource>(client, "/tasks", [], true, {
      workspace,
      project,
      assignee,
    });
    const result = mapToLabelKey(data);
    return { result };
  },
  dataSourceType: "picklist",
});
export default {
  selectTask,
};
