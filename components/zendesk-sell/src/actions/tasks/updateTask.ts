import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getZendeskClient } from "../../client";
import { updateTaskExamplePayload } from "../../examplePayloads";
import { updateTaskInputs } from "../../inputs";

export const updateTask = action({
  display: {
    label: "Update Task",
    description: "Updates task information.",
  },
  perform: async (
    context,
    {
      connection,
      id,
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
      const { data } = await client.put(
        `/tasks/${id}`,
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
  inputs: updateTaskInputs,
  examplePayload: updateTaskExamplePayload,
});
export default { updateTask };
