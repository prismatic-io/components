import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { GENERIC_DELETE_RESPONSE } from "../../constants";
import { connection, vendorId } from "../../inputs";

export const deleteVendor = action({
  display: {
    label: "Delete Vendor",
    description: "Delete a vendor",
  },
  inputs: {
    vendorId: {
      ...vendorId,
      comments: "The ID of the vendor to delete",
    },
    connection,
  },
  perform: async (context, { connection, vendorId }) => {
    const client = createClient(connection, context.debug.enabled);

    await client.delete(`/accounting/vendors/${vendorId}`);
    return {
      data: GENERIC_DELETE_RESPONSE,
    };
  },
  examplePayload: {
    data: GENERIC_DELETE_RESPONSE,
  },
});
