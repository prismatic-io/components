import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getVendorResponse as updateVendorResponse } from "../../examplePayloads/vendors";
import { code, connection, name, reactivate, subsidiaries, vendorId } from "../../inputs";

export const updateVendor = action({
  display: {
    label: "Update Vendor",
    description: "Update an existing vendor",
  },
  inputs: {
    vendorId: {
      ...vendorId,
      comments: "The ID of the vendor to update",
    },
    code,
    name,
    reactivate,
    subsidiaries,
    connection,
  },
  perform: async (context, { connection, vendorId, code, name, reactivate, subsidiaries }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.patch(`/accounting/vendors/${vendorId}`, {
      code,
      name,
      reactivate,
      subsidiaries,
    });
    return {
      data,
    };
  },
  examplePayload: {
    data: updateVendorResponse,
  },
});
