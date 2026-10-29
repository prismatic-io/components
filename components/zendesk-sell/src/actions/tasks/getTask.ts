import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getZendeskClient } from "../../client";
import { getTaskExamplePayload } from "../../examplePayloads";
import { getTaskInputs } from "../../inputs";

export const getTask = action({
  display: {
    label: "Get Task",
    description:
      "Returns a single task available to the user according to the unique task ID provided.",
  },
  perform: async (context, { connection, id }) => {
    try {
      const client = getZendeskClient(connection, context.debug.enabled);
      const { data } = await client.get(`/tasks/${id}`, {
        headers: { Accept: "application/json" },
      });

      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: getTaskInputs,
  examplePayload: getTaskExamplePayload,
});
export default { getTask };
