import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getZendeskClient } from "../../client";
import { createTaskExamplePayload } from "../../examplePayloads";
import { createTaskInputs } from "../../inputs";

export const createTask = action({
  display: {
    label: "Create Task",
    description: "Creates a new task.",
  },
  perform: async (
    context,
    {
      connection,
      content,
      dueDate,
      ownerId,
      resourceType,
      resourceId,
      completed,
      remindAt,
    },
  ) => {
    try {
      const client = getZendeskClient(connection, context.debug.enabled);
      const body = {
        ...(content && { content }),
        ...(dueDate && { due_date: dueDate }),
        ...(ownerId && { owner_id: util.types.toNumber(ownerId) }),
        ...(resourceType && { resource_type: resourceType }),
        ...(resourceId && { resource_id: util.types.toNumber(resourceId) }),
        ...(completed && { completed: completed === "true" }),
        ...(remindAt && { remind_at: remindAt }),
      };
      const { data } = await client.post(
        `/tasks`,
        { data: body },
        {
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
        },
      );

      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: createTaskInputs,
  examplePayload: createTaskExamplePayload,
});
export default { createTask };
