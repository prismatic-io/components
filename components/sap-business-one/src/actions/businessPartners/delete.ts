import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { DEFAULT_DELETE_RESPONSE } from "../../constants";
import { cardCode } from "../../inputs/businessPartners/general";

export const deleteBusinessPartner = action({
  display: {
    label: "Delete Business Partner",
    description: "Delete an instance of BusinessPartners with the specified id.",
  },
  inputs: {
    cardCode,
    connection,
  },
  perform: async (context, { connection, cardCode }) => {
    const client = await createClient(connection, context, context.debug.enabled);

    await client.delete(`/BusinessPartners('${cardCode}')`);
    return {
      data: DEFAULT_DELETE_RESPONSE,
    };
  },
  examplePayload: {
    data: DEFAULT_DELETE_RESPONSE,
  },
});
