import { action } from "@prismatic-io/spectral";
import { createProjectsClient } from "../../client";
import {
  connection,
  guId,
  notes,
  parentId,
  taskFinishDate,
  taskName,
  taskStartDate,
} from "../../inputs";

export const createDraftTask = action({
  display: {
    label: "Create Draft Task",
    description: "Create a new task in a draft project",
  },
  perform: async (context, params) => {
    const client = createProjectsClient(
      {
        connection: params.connection,
      },
      context.debug.enabled,
    );

    const { data } = await client.post(`/Projects('${params.guId}')/Draft/Tasks/add()`, {
      parameters: {
        Name: params.taskName || undefined,
        Notes: params.notes || undefined,
        Start: params.taskStartDate || undefined,
        ParentId: params.parentId || undefined,
        Finish: params.taskFinishDate || undefined,
      },
    });

    return {
      data,
    };
  },
  inputs: {
    connection,
    guId,
    taskName,
    notes,
    taskStartDate,
    parentId,
    taskFinishDate,
  },
});

export default createDraftTask;
