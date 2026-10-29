import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getZendeskClient } from "../../client";
import { deleteLeadExamplePayload } from "../../examplePayloads";
import { deleteLeadInputs } from "../../inputs";

export const deleteLead = action({
  display: {
    label: "Delete Lead",
    description: "Deletes an existing lead.",
  },
  perform: async (context, { connection, id }) => {
    try {
      const client = getZendeskClient(connection, context.debug.enabled);
      const { data } = await client.delete(`/leads/${id}`);

      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: deleteLeadInputs,
  examplePayload: deleteLeadExamplePayload,
});
export default { deleteLead };
