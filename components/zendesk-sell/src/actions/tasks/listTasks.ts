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
    { connection, fetchAll, type, completed, pagination, additionalFields },
  ) => {
    try {
      const client = getZendeskClient(connection, context.debug.enabled);
      const params = {
        ...(pagination.page && { page: pagination.page }),
        ...(pagination.perPage && { per_page: pagination.perPage }),
        ...(additionalFields.sortBy && { sort_by: additionalFields.sortBy }),
        ...(additionalFields.q && { q: additionalFields.q }),
        ...(additionalFields.resourceType && {
          resource_type: additionalFields.resourceType,
        }),
        ...(additionalFields.resourceId && {
          resource_id: additionalFields.resourceId,
        }),
        ...(additionalFields.ids && { ids: additionalFields.ids }),
        ...(additionalFields.creatorId && {
          creator_id: additionalFields.creatorId,
        }),
        ...(additionalFields.ownerId && {
          owner_id: additionalFields.ownerId,
        }),
        ...(additionalFields.overdue && { overdue: additionalFields.overdue }),
        ...(additionalFields.remind && { remind: additionalFields.remind }),
        ...(type && { type: type }),
        ...(completed && { completed: completed }),
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
