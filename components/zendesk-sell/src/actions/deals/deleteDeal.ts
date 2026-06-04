import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getZendeskClient } from "../../client";
import { deleteDealExamplePayload } from "../../examplePayloads";
import { deleteDealInputs } from "../../inputs";

export const deleteDeal = action({
  display: {
    label: "Delete Deal",
    description:
      "Deletes an existing deal and removes all associated contacts from the deal in a single call.",
  },
  perform: async (context, { connection, id }) => {
    try {
      const client = getZendeskClient(connection, context.debug.enabled);
      const { data } = await client.delete(`/deals/${id}`);

      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: deleteDealInputs,
  examplePayload: deleteDealExamplePayload,
});
export default { deleteDeal };
