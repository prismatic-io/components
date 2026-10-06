import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClickUpClient as createClient } from "../client";
import { tasksExamplePayload } from "../examplePayloads";
import { tasksInputs } from "../inputs";
import type { GetTasksResponse, Task } from "../types";
export const tasks = dataSource({
  display: {
    label: "Select Task",
    description: "Select a task from a list.",
  },
  perform: async (_context, { listId, connection }) => {
    const client = createClient(connection);
    const { data } = await client.get<GetTasksResponse>(
      `/list/${listId}/task`,
      {
        params: {
          archived: false,
          include_closed: false,
          subtasks: false,
        },
      },
    );
    const options = data.tasks.map<Element>((task) => {
      return { label: task.name, key: task.id };
    });
    return { result: options };
  },
  inputs: tasksInputs,
  examplePayload: tasksExamplePayload,
  dataSourceType: "picklist",
});
