import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getZendeskClient } from "../../client";
import { listTasksExamplePayload } from "../../examplePayloads";
import { listTasksInputs } from "../../inputs";
import { fetchAllPages } from "../../util";

export const listTasks = action({
  display: {
    label: "List Tasks",
    description: "Returns all tasks available to the user.",
  },
  perform: async (
    context,
    {
      connection,
      page,
      perPage,
      sortBy,
      ids,
      creatorId,
      ownerId,
      q,
      type,
      resourceType,
      resourceId,
      completed,
      overdue,
      remind,
      fetchAll,
    },
  ) => {
    try {
      const client = getZendeskClient(connection, context.debug.enabled);
      const params = {
        ...(page && { page }),
        ...(perPage && { per_page: perPage }),
        ...(sortBy && { sort_by: sortBy }),
        ...(ids && { ids }),
        ...(creatorId && { creator_id: creatorId }),
        ...(ownerId && { owner_id: ownerId }),
        ...(q && { q }),
        ...(type && { type }),
        ...(resourceType && { resource_type: resourceType }),
        ...(resourceId && { resource_id: resourceId }),
        ...(completed && { completed }),
        ...(overdue && { overdue }),
        ...(remind && { remind }),
      };

      const data: unknown = await fetchAllPages(
        client,
        "/tasks",
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
  inputs: listTasksInputs,
  examplePayload: listTasksExamplePayload,
});
export default { listTasks };
