import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getZendeskClient } from "../../client";
import { listPipelinesExamplePayload } from "../../examplePayloads";
import { listPipelinesInputs } from "../../inputs";
import { fetchAllPages } from "../../util";

export const listPipelines = action({
  display: {
    label: "List Pipelines",
    description:
      "Returns all pipelines available to the user, according to the parameters provided.",
  },
  perform: async (
    context,
    { connection, fetchAll, ids, name, disabled, sortBy, pagination },
  ) => {
    try {
      const client = getZendeskClient(connection, context.debug.enabled);
      const params = {
        ...(pagination.page && { page: pagination.page }),
        ...(pagination.perPage && { per_page: pagination.perPage }),
        ...(ids && { ids: ids }),
        ...(sortBy && { sort_by: sortBy }),
        ...(name && { name: name }),
        ...(disabled && { disabled: disabled }),
      };

      const data: unknown = await fetchAllPages(
        client,
        "/pipelines",
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
  inputs: listPipelinesInputs,
  examplePayload: listPipelinesExamplePayload,
});
export default { listPipelines };
