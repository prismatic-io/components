import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { API_VERSION } from "../../../constants";
import { getBusinessPartnerExamplePayload } from "../../../examplePayloads";
import { getBusinessPartnerInputs } from "../../../inputs";

export const getBusinessPartner = action({
  display: {
    label: "Get Business Partner (V2)",
    description: "Retrieve a specific business partner by ID.",
  },
  inputs: getBusinessPartnerInputs,
  examplePayload: getBusinessPartnerExamplePayload,
  perform: async (context, { connection, id, expand }) => {
    const client = createClient(
      connection,
      API_VERSION.V2,
      context.debug.enabled,
    );
    const { data } = await client.get(`/business-partners/${id}`, {
      params: {
        expand,
      },
    });
    return { data };
  },
});
