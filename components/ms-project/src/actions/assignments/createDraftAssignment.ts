import { action } from "@prismatic-io/spectral";
import { createProjectsClient } from "../../client";
import {
  assignmentFinishDate,
  assignmentStartDate,
  connection,
  draftTaskId,
  guId,
  notes,
  resourceId,
} from "../../inputs";

export const createDraftAssignment = action({
  display: {
    label: "Create Draft Assignment",
    description: "Create a new assignment in a given draft product",
  },
  perform: async (context, params) => {
    const client = createProjectsClient(
      {
        connection: params.connection,
      },
      context.debug.enabled,
    );

    const { data } = await client.post(`/Projects('${params.guId}')/Draft/Assignments/add()`, {
      parameters: {
        ResourceId: params.guId || undefined,
        TaskId: params.draftTaskId || undefined,
        Start: params.assignmentStartDate || undefined,
        Finish: params.assignmentFinishDate || undefined,
        Notes: params.notes || undefined,
      },
    });

    return {
      data,
    };
  },
  inputs: {
    connection,
    guId,
    draftTaskId,
    resourceId,
    assignmentStartDate,
    assignmentFinishDate,
    notes,
  },
});

export default createDraftAssignment;
