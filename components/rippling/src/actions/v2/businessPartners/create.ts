import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { API_VERSION } from "../../../constants";
import { createBusinessPartnerExamplePayload } from "../../../examplePayloads";
import { createBusinessPartnerInputs } from "../../../inputs";

export const createBusinessPartner = action({
  display: {
    label: "Create Business Partner (V2)",
    description: "Create a new business partner.",
  },
  inputs: createBusinessPartnerInputs,
  examplePayload: createBusinessPartnerExamplePayload,
  perform: async (
    context,
    { connection, workerId, businessPartnerGroupId },
  ) => {
    const client = createClient(
      connection,
      API_VERSION.V2,
      context.debug.enabled,
    );
    const { data } = await client.post("/business-partners", {
      worker_id: workerId,
      business_partner_group_id: businessPartnerGroupId,
    });
    return { data };
  },
});
