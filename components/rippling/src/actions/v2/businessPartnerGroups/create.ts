import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { API_VERSION } from "../../../constants";
import { createBusinessPartnerGroupExamplePayload } from "../../../examplePayloads";
import { createBusinessPartnerGroupInputs } from "../../../inputs";

export const createBusinessPartnerGroup = action({
  display: {
    label: "Create Business Partner Group (V2)",
    description: "Create a new business partner group.",
  },
  inputs: createBusinessPartnerGroupInputs,
  examplePayload: createBusinessPartnerGroupExamplePayload,
  perform: async (context, { connection, name, defaultBusinessPartnerId }) => {
    const client = createClient(
      connection,
      API_VERSION.V2,
      context.debug.enabled,
    );
    const { data } = await client.post("/business-partner-groups", {
      name,
      default_business_partner_id: defaultBusinessPartnerId,
    });
    return { data };
  },
});
