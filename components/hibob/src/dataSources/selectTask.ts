import { dataSource, type Element } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { selectTaskInputs } from "../inputs";
import type { TaskListResponse } from "../types/task";

export const selectTask = dataSource({
  display: {
    label: "Select Task",
    description: "Select a task.",
  },
  inputs: selectTaskInputs,
  perform: async (_context, { connection }) => {
    const client = getClient(connection, false);

    const { data } = await client.get<TaskListResponse>("/tasks");

    const result = data.tasks.map<Element>(({ id, title }) => ({
      label: title,
      key: id,
    }));
    return { result };
  },
  dataSourceType: "picklist",
});
