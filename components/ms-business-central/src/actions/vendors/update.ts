import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { updateVendorExamplePayload } from "../../examplePayloads";
import { updateVendorInputs } from "../../inputs/vendors";
import type { Vendor } from "../../interfaces";
export const updateVendor = action({
  display: {
    label: "Update Vendor",
    description:
      "Update a vendor object in your Business Central organization.",
  },
  inputs: updateVendorInputs,
  perform: async (
    context,
    {
      address,
      contactInfo,
      taxLiable,
      taxRegistrationNumber,
      vendorId,
      companyId,
      connection,
      displayName,
      currencyCode,
      currencyId,
      paymentTermsId,
      paymentMethodId,
      blocked,
      irs1099Code,
    },
  ) => {
    const client = getMsBusinessCentralClient(
      connection,
      context,
      context.debug.enabled,
    );
    const { data } = await client.patch<Vendor>(
      `/companies(${companyId})/vendors(${vendorId})`,
      {
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2,
        city: address.city,
        state: address.state,
        country: address.country,
        postalCode: address.postalCode,
        phoneNumber: contactInfo.phoneNumber,
        email: contactInfo.email,
        website: contactInfo.website,
        taxLiable,
        taxRegistrationNumber,
        displayName,
        currencyCode,
        currencyId,
        paymentTermsId,
        paymentMethodId,
        blocked,
        irs1099Code,
      },
      {
        headers: {
          "If-Match": "*",
        },
      },
    );
    return { data };
  },
  examplePayload: updateVendorExamplePayload,
});
