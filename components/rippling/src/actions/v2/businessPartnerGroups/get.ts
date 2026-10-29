import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { API_VERSION } from "../../../constants";
import { getBusinessPartnerGroupExamplePayload } from "../../../examplePayloads";
import { getBusinessPartnerGroupInputs } from "../../../inputs";

export const getBusinessPartnerGroup = action({
  display: {
    label: "Get Business Partner Group (V2)",
    description: "Retrieve a specific business partner group by ID.",
  },
  inputs: getBusinessPartnerGroupInputs,
  examplePayload: getBusinessPartnerGroupExamplePayload,
  perform: async (context, { connection, id, expand }) => {
    const client = createClient(
      connection,
      API_VERSION.V2,
      context.debug.enabled,
    );
    const { data } = await client.get(`/business-partner-groups/${id}`, {
      params: {
        expand,
      },
    });
    return { data };
  },
});
