import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection, $select } from "../../inputs/general";
import { cardCode } from "../../inputs/businessPartners/general";
import { getBusinessPartnerExample } from "../../examplePayloads/businessPartners";

export const getBusinessPartner = action({
  display: {
    label: "Get Business Partner",
    description:
      "Retrieve all or some selected properties from an instance of BusinessPartners with the given id.",
  },
  inputs: {
    cardCode,
    $select,
    connection,
  },
  perform: async (context, { connection, $select, cardCode }) => {
    const client = await createClient(connection, context, context.debug.enabled);

    const { data } = await client.get(`/BusinessPartners('${cardCode}')`, {
      params: {
        $select,
      },
    });
    return {
      data,
    };
  },
  examplePayload: getBusinessPartnerExample,
});
