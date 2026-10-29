import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { API_VERSION } from "../../../constants";
import { deleteBusinessPartnerGroupExamplePayload } from "../../../examplePayloads";
import { deleteBusinessPartnerGroupInputs } from "../../../inputs";

export const deleteBusinessPartnerGroup = action({
  display: {
    label: "Delete Business Partner Group (V2)",
    description: "Delete a business partner group by ID.",
  },
  inputs: deleteBusinessPartnerGroupInputs,
  examplePayload: deleteBusinessPartnerGroupExamplePayload,
  perform: async (context, { connection, id }) => {
    const client = createClient(
      connection,
      API_VERSION.V2,
      context.debug.enabled,
    );
    await client.delete(`/business-partner-groups/${id}`);
    return {
      data: {
        success: true,
        message: `Business partner group ${id} deleted successfully.`,
      },
    };
  },
});
