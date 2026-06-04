import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getZendeskClient } from "../../client";
import { updateNoteExamplePayload } from "../../examplePayloads";
import { updateNoteInputs } from "../../inputs";

export const updateNote = action({
  display: {
    label: "Update Note",
    description: "Updates note information.",
  },
  perform: async (
    context,
    { connection, resourceType, resourceId, content, isImportant, tags, type },
  ) => {
    try {
      const client = getZendeskClient(connection, context.debug.enabled);
      const body = {
        ...(resourceType && { resource_type: resourceType }),
        ...(content && { content }),
        ...(isImportant && { is_important: isImportant === "true" }),
        ...(tags.length && { tags }),
        ...(type && { type }),
      };
      const { data } = await client.put(
        `/notes/${resourceId}`,
        { data: body },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
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
  inputs: updateNoteInputs,
  examplePayload: updateNoteExamplePayload,
});
export default { updateNote };
