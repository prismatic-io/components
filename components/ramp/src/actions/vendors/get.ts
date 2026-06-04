import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getVendorResponse } from "../../examplePayloads/vendors";
import { connection, vendorId } from "../../inputs";

export const getVendor = action({
  display: {
    label: "Get Vendor",
    description: "Retrieve a vendor by ID",
  },
  inputs: {
    vendorId,
    connection,
  },
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
