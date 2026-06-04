import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { createBusinessPartnersInputs } from "../../inputs/businessPartners/create";
import { getBusinessPartnerExample as createBusinessPartnerExample } from "../../examplePayloads/businessPartners";

export const createBusinessPartner = action({
  display: {
    label: "Create Business Partner",
    description: "Create an instance of Business Partners ",
  },
  inputs: {
    ...createBusinessPartnersInputs,
    connection,
  },
  perform: async (context, { connection, bodyFields, CardCode, CardName, CardType }) => {
    const client = await createClient(connection, context, context.debug.enabled);

    const { data } = await client.post(`/BusinessPartners`, {
      CardCode,
      CardName,
      CardType,
      ...bodyFields,
    });
    return {
      data,
    };
  },
  examplePayload: createBusinessPartnerExample,
});
