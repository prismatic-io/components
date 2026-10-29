import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getZendeskClient } from "../../client";
import { deleteNoteExamplePayload } from "../../examplePayloads";
import { deleteNoteInputs } from "../../inputs";

export const deleteNote = action({
  display: {
    label: "Delete Note",
    description: "Deletes an existing note. This operation cannot be undone.",
  },
  perform: async (context, { connection, id }) => {
    try {
      const client = getZendeskClient(connection, context.debug.enabled);
      const { data } = await client.delete(`/notes/${id}`);

      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: deleteNoteInputs,
  examplePayload: deleteNoteExamplePayload,
});
export default { deleteNote };
