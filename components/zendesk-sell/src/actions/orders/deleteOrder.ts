import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getZendeskClient } from "../../client";
import { deleteOrderExamplePayload } from "../../examplePayloads";
import { deleteOrderInputs } from "../../inputs";

export const deleteOrder = action({
  display: {
    label: "Delete Order",
    description:
      "Deletes an existing order and removes all associated line items in a single call. This operation cannot be undone.",
  },
  perform: async (context, { connection, id }) => {
    try {
      const client = getZendeskClient(connection, context.debug.enabled);
      const { data } = await client.delete(`/orders/${id}`);

      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: deleteOrderInputs,
  examplePayload: deleteOrderExamplePayload,
});
export default { deleteOrder };
