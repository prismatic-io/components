import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { createVendorExamplePayload } from "../../examplePayloads";
import { createVendorInputs } from "../../inputs/vendors";
import type { Vendor } from "../../interfaces";
export const createVendor = action({
  display: {
    label: "Create Vendor",
    description: "Creates a vendor object in Microsoft Business Central.",
  },
  inputs: createVendorInputs,
  perform: async (
    context,
    {
      address,
      contactInfo,
      taxLiable,
      taxRegistrationNumber,
      blocked,
      currencyId,
      currencyCode,
      irs1099Code,
      paymentTermsId,
      paymentMethodId,
      displayName,
      connection,
      companyId,
    },
  ) => {
    const client = getMsBusinessCentralClient(
      connection,
      context,
      context.debug.enabled,
    );
    const payload = {
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
      blocked,
      currencyId,
      currencyCode,
      irs1099Code,
      paymentTermsId,
      paymentMethodId,
      displayName,
    };
    const { data } = await client.post<Vendor>(
      `/companies(${companyId})/vendors`,
      payload,
    );
    return {
      data,
    };
  },
  examplePayload: createVendorExamplePayload,
});
