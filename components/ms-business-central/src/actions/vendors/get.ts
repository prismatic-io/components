import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { getVendorExamplePayload } from "../../examplePayloads";
import { getVendorInputs } from "../../inputs/vendors";
import type { Vendor } from "../../interfaces";

export const getVendor = action({
  display: {
    label: "Get Vendor",
    description:
      "Retrieve the properties and relationships of a vendor object in your Business Central organization.",
  },
  inputs: getVendorInputs,
  perform: async (context, { connection, vendorId, companyId }) => {
    const client = getMsBusinessCentralClient(connection, context, context.debug.enabled);
    const { data } = await client.get<Vendor>(`/companies(${companyId})/vendors(${vendorId})`);

    return { data };
  },
  examplePayload: getVendorExamplePayload,
});
