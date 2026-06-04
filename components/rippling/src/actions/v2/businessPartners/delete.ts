import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { API_VERSION } from "../../../constants";
import { deleteBusinessPartnerExamplePayload } from "../../../examplePayloads";
import { deleteBusinessPartnerInputs } from "../../../inputs";

export const deleteBusinessPartner = action({
  display: {
    label: "Delete Business Partner (V2)",
    description: "Delete a business partner by ID.",
  },
  inputs: deleteBusinessPartnerInputs,
  examplePayload: deleteBusinessPartnerExamplePayload,
  perform: async (context, { connection, id }) => {
    const client = createClient(
      connection,
      API_VERSION.V2,
      context.debug.enabled,
    );
    await client.delete(`/business-partners/${id}`);
    return {
      data: {
        success: true,
        message: `Business partner ${id} deleted successfully.`,
      },
    };
  },
});
