import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getZendeskClient } from "../../client";
import { listNotesExamplePayload } from "../../examplePayloads";
import { listNotesInputs } from "../../inputs";
import { fetchAllPages } from "../../util";

export const listNotes = action({
  display: {
    label: "List Notes",
    description:
      "Returns all notes available to the user, according to the parameters provided.",
  },
  perform: async (
    context,
    {
      connection,
      fetchAll,
      ids,
      creatorId,
      resourceId,
      resourceType,
      pagination,
      additionalFields,
    },
  ) => {
    try {
      const client = getZendeskClient(connection, context.debug.enabled);
      const params = {
        ...(pagination.page.length && { page: pagination.page }),
        ...(pagination.perPage.length && { per_page: pagination.perPage }),
        ...(additionalFields.sortBy.length && {
          sort_by: additionalFields.sortBy,
        }),
        ...(additionalFields.includes.length && {
          includes: additionalFields.includes,
        }),
        ...(ids.length && { ids: ids }),
        ...(creatorId.length && {
          creator_id: creatorId,
        }),
        ...(additionalFields.q.length && { q: additionalFields.q }),
        ...(resourceType.length && {
          resource_type: resourceType,
        }),
        ...(resourceId.length && {
          resource_id: resourceId,
        }),
      };

      const data: unknown = await fetchAllPages(
        client,
        "/notes",
        fetchAll,
        params,
      );
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: listNotesInputs,
  examplePayload: listNotesExamplePayload,
});
export default { listNotes };
