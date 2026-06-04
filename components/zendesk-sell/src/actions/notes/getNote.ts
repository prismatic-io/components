import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getZendeskClient } from "../../client";
import { getNoteExamplePayload } from "../../examplePayloads";
import { getNoteInputs } from "../../inputs";

export const getNote = action({
  display: {
    label: "Get Note",
    description:
      "Returns a single note available to the user, according to the unique note ID provided.",
  },
  perform: async (context, { connection, id }) => {
    try {
      const client = getZendeskClient(connection, context.debug.enabled);
      const { data } = await client.get(`/notes/${id}`, {
        headers: { Accept: "application/json" },
      });

      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: getNoteInputs,
  examplePayload: getNoteExamplePayload,
});
export default { getNote };
