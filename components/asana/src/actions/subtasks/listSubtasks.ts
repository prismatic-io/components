import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import {
  limit,
  offset,
  connectionInput,
  taskId,
  listAllNestedSubtasks,
} from "../../inputs";
import { optionalFields } from "../../constants";
import { getSubtasks } from "../../helpers";
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
      limit: params.limit,
      offset: params.offset,
      opt_fields: optionalFields,
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
                  opt_fields: optionalFields,
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
  inputs: {
    asanaConnection: connectionInput,
    taskId,
    limit,
    offset,
    listAllNestedSubtasks,
  },
  examplePayload: {
    data: {
      data: [
        {
          gid: "1234567890123456",
          assignee: null,
          assignee_status: "upcoming",
          completed: false,
          completed_at: null,
          created_at: "2023-11-10T00:29:54.363Z",
          custom_fields: [],
          dependencies: [],
          dependents: [],
          due_at: null,
          due_on: null,
          followers: [
            {
              gid: "7890123456789012",
              resource_type: "user",
            },
          ],
          html_notes: "<body></body>",
          is_rendered_as_separator: false,
          liked: false,
          likes: [],
          memberships: [],
          modified_at: "2023-11-10T00:31:18.774Z",
          name: "Task",
          notes: "",
          num_likes: 0,
          num_subtasks: 2,
          parent: {
            gid: "2345678901234567",
            resource_type: "task",
          },
          projects: [],
          resource_type: "task",
          start_on: null,
          tags: [],
          resource_subtype: "default_task",
          workspace: {
            gid: "8901234567890123",
            resource_type: "workspace",
          },
        },
      ],
    },
  },
});
