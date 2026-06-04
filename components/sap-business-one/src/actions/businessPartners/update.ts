import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { DEFAULT_UPDATE_RESPONSE } from "../../constants";
import { updateBusinessPartnersInputs } from "../../inputs/businessPartners/update";

export const updateBusinessPartner = action({
  display: {
    label: "Update Business Partner",
    description: "Update an instance of Business Partners",
  },
  inputs: {
    ...updateBusinessPartnersInputs,
    connection,
  },
  perform: async (context, { connection, bodyFields, CardCode, CardName, CardType }) => {
    const client = await createClient(connection, context, context.debug.enabled);

    await client.patch(`/BusinessPartners('${CardCode}')`, {
      CardName,
      CardType,
      ...bodyFields,
    });
    return {
      data: DEFAULT_UPDATE_RESPONSE,
    };
  },
  examplePayload: {
    data: DEFAULT_UPDATE_RESPONSE,
  },
});
