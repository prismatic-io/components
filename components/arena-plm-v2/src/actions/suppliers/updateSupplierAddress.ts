import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { updateSupplierAddressExamplePayload } from "../../examplePayloads";
import { updateSupplierAddressInputs } from "../../inputs";
import { supplierAddressCompactSchema } from "../../outputSchemas";
import type {
  AddressCreateVo,
  SupplierAddressCompactVo,
  SupplierAddressCreateVo,
} from "../../types";
import { handleArenaError } from "../../util";
export const updateSupplierAddress = action({
  display: {
    label: "Update Supplier Address",
    description: "Update an address for a supplier in Arena PLM system.",
  },
  inputs: updateSupplierAddressInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: supplierAddressCompactSchema,
  }),
  examplePayload: updateSupplierAddressExamplePayload,
  perform: async (
    context,
    { connection, supplierGuid, addressGuid, label, address = {}, isPrimary },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const addressData: AddressCreateVo = {};
      if (label !== undefined && label !== null) addressData.label = label;
      if (address.address1 !== undefined && address.address1 !== null)
        addressData.address1 = address.address1;
      if (address.address2 !== undefined && address.address2 !== null)
        addressData.address2 = address.address2;
      if (address.city !== undefined && address.city !== null)
        addressData.city = address.city;
      if (address.state !== undefined && address.state !== null)
        addressData.state = address.state;
      if (address.province !== undefined && address.province !== null)
        addressData.province = address.province;
      if (address.postalCode !== undefined && address.postalCode !== null)
        addressData.postalCode = address.postalCode;
      if (address.country !== undefined && address.country !== null)
        addressData.country = address.country;
      const supplierAddressPayload: SupplierAddressCreateVo = {};
      if (Object.keys(addressData).length > 0) {
        supplierAddressPayload.address = addressData;
      }
      if (isPrimary !== undefined && isPrimary !== null) {
        supplierAddressPayload.primary = isPrimary;
      }
      context.logger.info("Updating supplier address", {
        supplierGuid,
        addressGuid,
        address1: address.address1,
        city: address.city,
        state: address.state,
        country: address.country,
        isPrimary,
      });
      const { data } = await client.put<SupplierAddressCompactVo>(
        `/suppliers/${supplierGuid}/addresses/${addressGuid}`,
        supplierAddressPayload,
      );
      context.logger.info(
        `Successfully updated address for supplier: ${supplierGuid} - ${data.address?.label || "No Label"} (${data.address?.guid})`,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "Update Supplier Address");
    }
  },
});
