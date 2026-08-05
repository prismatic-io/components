import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { listSubtasksExamplePayload } from "../../examplePayloads";
import { getSubtasks } from "../../helpers";
import { listSubtasksInputs } from "../../inputs";
import type { Task } from "../../types/Task";
export const listSubtasks = action({
  display: {
    label: "List Subtasks",
    description: "List all subtasks within a given task.",
  },
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    let subtasks = await getSubtasks(client, params.taskId, {
      limit: params.pagination.limit,
      offset: params.pagination.offset,
      opt_fields: params.optFields,
    });
    if (params.listAllNestedSubtasks) {
      const allSubtasks = [...subtasks];
      let shouldGetMoreSubtasks = subtasks.length;
      while (shouldGetMoreSubtasks) {
        const toGetSubtasks = subtasks.reduce(
          (getSubtasksAccumulator: Promise<Task[]>[], subtask) => {
            if (subtask.num_subtasks > 0) {
              getSubtasksAccumulator.push(
                getSubtasks(client, subtask.gid, {
                  opt_fields: params.optFields,
                }),
              );
            }
            return getSubtasksAccumulator;
          },
          [],
        );
        const results: Task[][] = await Promise.all(toGetSubtasks);
        subtasks = [];
        results.forEach((result) => {
          result.forEach((subtask: Task) => {
            subtasks.push(subtask);
            allSubtasks.push(subtask);
          });
        });
        shouldGetMoreSubtasks = subtasks.length;
      }
      return { data: { data: allSubtasks } };
    } else return { data: { data: subtasks } };
  },
  inputs: listSubtasksInputs,
  examplePayload: listSubtasksExamplePayload,
});
