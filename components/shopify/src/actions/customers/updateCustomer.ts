import { action, util } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { updateCustomerInputs } from "../../inputs";
import { customerExamplePayload } from "../../payloadExamples";

export const updateCustomer = action({
  display: {
    label: "Update Customer (Deprecated)",
    description:
      "Update the information and metadata of an existing customer by Id. This version of the action is being deprecated. Please replace action with Update Customer.",
  },
  perform: async (
    context,
    {
      customerId,
      updateEmail,
      updateFirstName,
      updateLastName,
      phone,
      notes,
      fieldValues,
      shopifyConnection,
      addressList,
      currency,
      metafields,
      tags,
      taxExempt,
      verifiedEmail,
    },
  ) => {
    const client = getShopifyClient(shopifyConnection, undefined, context.debug.enabled);
    return {
      data: (
        await client.put(`/customers/${customerId}`, {
          customer: {
            id: customerId,
            email: updateEmail || undefined,
            note: notes || undefined,
            tags: util.types.toString(tags) || undefined,
            currency: util.types.toString(currency) || undefined,
            tax_exempt: util.types.toBool(taxExempt) || false,
            first_name: updateFirstName || undefined,
            verified_email: util.types.toBool(verifiedEmail),
            last_name: updateLastName || undefined,
            phone: phone || undefined,
            ...((fieldValues as Record<string, unknown>) || {}),
            addresses: util.types.isJSON(util.types.toString(addressList))
              ? JSON.parse(util.types.toString(addressList)) || []
              : metafields || [],
            metafields: util.types.isJSON(util.types.toString(metafields))
              ? JSON.parse(util.types.toString(metafields)) || []
              : metafields || [],
          },
        })
      ).data,
    };
  },
  inputs: updateCustomerInputs,
  examplePayload: { data: customerExamplePayload },
});
