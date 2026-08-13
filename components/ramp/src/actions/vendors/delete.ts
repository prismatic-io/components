import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { GENERIC_DELETE_RESPONSE } from "../../constants";
import { connection, vendorId } from "../../inputs";
import { deleteVendorOutputSchema } from "../../outputSchemas";
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
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteVendorOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, vendorId }) => {
    const client = createClient(connection, context.debug.enabled);
    await client.delete(`/accounting/vendors/${vendorId}`);
    return {
      data: GENERIC_DELETE_RESPONSE,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: GENERIC_DELETE_RESPONSE,
  }),
  examplePayload: {
    data: GENERIC_DELETE_RESPONSE,
  },
});
