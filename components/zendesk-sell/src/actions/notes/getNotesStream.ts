import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getZendeskClient } from "../../client";
import { getNotesStreamExamplePayload } from "../../examplePayloads";
import { getNotesStreamInputs } from "../../inputs";

export const getNotesStream = action({
  display: {
    label: "Get Notes Stream",
    description: "Reads the stream of note events.",
  },
  perform: async (context, { connection, position, limit }) => {
    try {
      const client = getZendeskClient(connection, context.debug.enabled, true);
      const params = { position, ...(limit && { limit }) };
      const { data } = await client.get(`/notes/stream`, {
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
  inputs: getNotesStreamInputs,
  examplePayload: getNotesStreamExamplePayload,
});
export default { getNotesStream };
