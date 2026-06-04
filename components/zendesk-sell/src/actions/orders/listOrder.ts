import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getZendeskClient } from "../../client";
import { listOrderExamplePayload } from "../../examplePayloads";
import { listOrderInputs } from "../../inputs";
import { fetchAllPages } from "../../util";

export const listOrder = action({
  display: {
    label: "List Orders",
    description: "Returns all orders available to the user.",
  },
  perform: async (
    context,
    { connection, page, perPage, ids, sortBy, dealId, fetchAll },
  ) => {
    try {
      const client = getZendeskClient(connection, context.debug.enabled);
      const params = {
        ...(page && { page }),
        ...(perPage && { per_page: perPage }),
        ...(ids && { ids }),
        ...(sortBy && { sort_by: sortBy }),
        ...(dealId && { deal_id: dealId }),
      };

      const data: unknown = await fetchAllPages(
        client,
        "/orders",
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
  inputs: listOrderInputs,
  examplePayload: listOrderExamplePayload,
});
export default { listOrder };
