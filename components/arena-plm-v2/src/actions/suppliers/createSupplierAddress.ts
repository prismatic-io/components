import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { createSupplierAddressExamplePayload } from "../../examplePayloads";
import { createSupplierAddressInputs } from "../../inputs";
import { supplierAddressCompactSchema } from "../../outputSchemas";
import type {
  AddressCreateVo,
  SupplierAddressCompactVo,
  SupplierAddressCreateVo,
} from "../../types";
import { handleArenaError } from "../../util";
export const createSupplierAddress = action({
  display: {
    label: "Create Supplier Address",
    description: "Add an address to a supplier in Arena PLM system.",
  },
  inputs: createSupplierAddressInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: supplierAddressCompactSchema,
  }),
  examplePayload: createSupplierAddressExamplePayload,
  perform: async (
    context,
    { connection, supplierGuid, label, address = {}, isPrimary },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const addressData: AddressCreateVo = {};
      if (label) addressData.label = label;
      if (address.address1) addressData.address1 = address.address1;
      if (address.address2) addressData.address2 = address.address2;
      if (address.city) addressData.city = address.city;
      if (address.state) addressData.state = address.state;
      if (address.province) addressData.province = address.province;
      if (address.postalCode) addressData.postalCode = address.postalCode;
      if (address.country) addressData.country = address.country;
      const supplierAddressPayload: SupplierAddressCreateVo = {
        address: addressData,
      };
      if (isPrimary !== undefined && isPrimary !== null) {
        supplierAddressPayload.primary = isPrimary;
      }
      context.logger.info("Adding address to supplier", {
        supplierGuid,
        address1: address.address1,
        city: address.city,
        state: address.state,
        country: address.country,
        isPrimary,
      });
      const { data } = await client.post<SupplierAddressCompactVo>(
        `/suppliers/${supplierGuid}/addresses`,
        supplierAddressPayload,
      );
      context.logger.info(
        `Successfully added address to supplier: ${supplierGuid} - ${data.address?.label || "No Label"} (${data.address?.guid})`,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "Create Supplier Address");
    }
  },
});
