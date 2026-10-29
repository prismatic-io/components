import { action } from "@prismatic-io/spectral";
import updateWorkItemInputs from "../../inputs/workitems/updateWorkItem";
import { createKarbonClient } from "../../client";
import { updateWorkItemExamplePayload } from "../../examplePayloads";
import { SUCCESS_MESSAGE } from "../../constants";

export const updateWorkItem = action({
  display: {
    label: "Update Work Item",
    description: "Partially update a Work Item by Work Item key",
  },
  inputs: {
    ...updateWorkItemInputs,
  },
  perform: async (
    context,
    { connection, workItemkey, description, deadlineDate },
  ) => {
    const client = createKarbonClient(connection, context.debug.enabled);
    await client.patch(`/v3/WorkItems/${workItemkey}`, {
      Description: description,
      DeadlineDate: deadlineDate,
    });

    return { data: SUCCESS_MESSAGE };
  },
  examplePayload: updateWorkItemExamplePayload,
});
