import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getZendeskClient } from "../../client";
import { createNoteExamplePayload } from "../../examplePayloads";
import { createNoteInputs } from "../../inputs";

export const createNote = action({
  display: {
    label: "Create Note",
    description: "Creates a new note and associates it with one resource.",
  },
  perform: async (
    context,
    { connection, resourceType, resourceId, content, isImportant, tags, type },
  ) => {
    try {
      const client = getZendeskClient(connection, context.debug.enabled);
      const body = {
        ...(resourceType && { resource_type: resourceType }),
        ...(resourceId && { resource_id: util.types.toNumber(resourceId) }),
        ...(content && { content }),
        ...(isImportant && { is_important: isImportant === "true" }),
        ...(tags.length && { tags }),
        ...(type && { type }),
      };
      const { data } = await client.post(
        `/notes`,
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
  inputs: createNoteInputs,
  examplePayload: createNoteExamplePayload,
});
export default { createNote };
