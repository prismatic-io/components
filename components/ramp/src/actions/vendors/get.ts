import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getVendorResponse } from "../../examplePayloads/vendors";
import { connection, vendorId } from "../../inputs";
import { getVendorOutputSchema } from "../../outputSchemas";
export const getVendor = action({
  display: {
    label: "Get Vendor",
    description: "Retrieve a vendor by ID",
  },
  inputs: {
    vendorId,
    connection,
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getVendorOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, { connection, vendorId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/accounting/vendors/${vendorId}`);
    return {
      data,
    };
  },
  examplePayload: {
    data: getVendorResponse,
  },
});
