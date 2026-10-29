import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getZendeskClient } from "../../client";
import { deleteTaskExamplePayload } from "../../examplePayloads";
import { deleteTaskInputs } from "../../inputs";

export const deleteTask = action({
  display: {
    label: "Delete Task",
    description: "Deletes an existing task. This operation cannot be undone.",
  },
  perform: async (context, { connection, id }) => {
    try {
      const client = getZendeskClient(connection, context.debug.enabled);
      const { data } = await client.delete(`/tasks/${id}`);

      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: deleteTaskInputs,
  examplePayload: deleteTaskExamplePayload,
});
export default { deleteTask };
