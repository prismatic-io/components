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
      page,
      perPage,
      sortBy,
      includes,
      ids,
      creatorId,
      q,
      resourceType,
      resourceId,
      fetchAll,
    },
  ) => {
    try {
      const client = getZendeskClient(connection, context.debug.enabled);
      const params = {
        ...(page.length && { page }),
        ...(perPage.length && { per_page: perPage }),
        ...(sortBy.length && { sort_by: sortBy }),
        ...(includes.length && { includes }),
        ...(ids.length && { ids }),
        ...(creatorId.length && { creator_id: creatorId }),
        ...(q.length && { q }),
        ...(resourceType.length && { resource_type: resourceType }),
        ...(resourceId.length && { resource_id: resourceId }),
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
