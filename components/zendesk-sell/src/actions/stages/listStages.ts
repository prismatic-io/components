import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getZendeskClient } from "../../client";
import { listStagesExamplePayload } from "../../examplePayloads";
import { listStagesInputs } from "../../inputs";
import { fetchAllPages } from "../../util";

export const listStages = action({
  display: {
    label: "List Stages",
    description: "Returns all stages available to the user.",
  },
  perform: async (
    context,
    {
      connection,
      pipelineId,
      page,
      perPage,
      sortBy,
      ids,
      name,
      active,
      fetchAll,
    },
  ) => {
    try {
      const client = getZendeskClient(connection, context.debug.enabled);
      const params = {
        ...(pipelineId && { pipeline_id: pipelineId }),
        ...(page && { page }),
        ...(perPage && { per_page: perPage }),
        ...(sortBy && { sort_by: sortBy }),
        ...(ids && { ids }),
        ...(name && { name }),
        ...(active && { active }),
      };

      const data: unknown = await fetchAllPages(
        client,
        "/stages",
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
  inputs: listStagesInputs,
  examplePayload: listStagesExamplePayload,
});
export default { listStages };
