import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getZendeskClient } from "../../client";
import { getTasksStreamExamplePayload } from "../../examplePayloads";
import { getTasksStreamInputs } from "../../inputs";

export const getTasksStream = action({
  display: {
    label: "Get Tasks Stream",
    description: "Reads the stream of task events.",
  },
  perform: async (context, { connection, position, limit }) => {
    try {
      const client = getZendeskClient(connection, context.debug.enabled, true);
      const params = { position, ...(limit && { limit }) };
      const { data } = await client.get(`/tasks/stream`, {
        params,
        headers: { Accept: "application/json" },
      });

      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: getTasksStreamInputs,
  examplePayload: getTasksStreamExamplePayload,
});
export default { getTasksStream };
