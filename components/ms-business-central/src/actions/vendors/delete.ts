import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { SUCCESS_PAYLOAD } from "../../examplePayloads";
import { deleteVendorInputs } from "../../inputs/vendors";

export const deleteVendor = action({
  display: {
    label: "Delete Vendor",
    description: "Deletes a vendor object in your Business Central organization.",
  },
  inputs: deleteVendorInputs,
  perform: async (context, { vendorId, connection, companyId }) => {
    const client = getMsBusinessCentralClient(connection, context, context.debug.enabled);

    await client.delete(`/companies(${companyId})/vendors(${vendorId})`);

    return SUCCESS_PAYLOAD;
  },
  examplePayload: SUCCESS_PAYLOAD,
});
