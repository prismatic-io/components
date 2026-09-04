import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { updateSupplierExamplePayload } from "../../examplePayloads";
import { updateSupplierInputs } from "../../inputs";
import { supplierFullSchema } from "../../outputSchemas";
import type {
  PhoneNumberVo,
  SupplierAddressCompactVo,
  SupplierFullVo,
  SupplierUpdateRequestVo,
} from "../../types";
import { handleArenaError, resolveAdditionalAttributes } from "../../util";
export const updateSupplier = action({
  display: {
    label: "Update Supplier",
    description:
      "Update an existing supplier in Arena PLM system with the specified information.",
  },
  inputs: updateSupplierInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: supplierFullSchema,
  }),
  examplePayload: updateSupplierExamplePayload,
  perform: async (
    context,
    {
      connection,
      supplierGuid,
      name,
      supplierId,
      accountNumber,
      description,
      website,
      approvalStatusGuid,
      addresses,
      phoneNumbers,
      additionalAttributes,
      attributeDefinitions,
    },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const supplierPayload: SupplierUpdateRequestVo = {};
      if (name) {
        supplierPayload.name = name;
      }
      if (supplierId) {
        supplierPayload.supplierId = supplierId;
      }
      if (accountNumber) {
        supplierPayload.accountNumber = accountNumber;
      }
      if (description) {
        supplierPayload.description = description;
      }
      if (website) {
        supplierPayload.website = website;
      }
      if (approvalStatusGuid) {
        supplierPayload.approvalStatusSetting = { guid: approvalStatusGuid };
      }
      if (addresses && Array.isArray(addresses) && addresses.length > 0) {
        supplierPayload.addresses = addresses as SupplierAddressCompactVo[];
      }
      if (
        phoneNumbers &&
        Array.isArray(phoneNumbers) &&
        phoneNumbers.length > 0
      ) {
        supplierPayload.phoneNumbers = phoneNumbers as PhoneNumberVo[];
      }
      supplierPayload.additionalAttributes = resolveAdditionalAttributes(
        { additionalAttributes, attributeDefinitions },
        context,
      );
      context.logger.info("Updating supplier", {
        supplierGuid,
        name,
        supplierId,
        attributeCount: supplierPayload.additionalAttributes?.length || 0,
        hasAttributeDefinitions: !!(
          attributeDefinitions &&
          Array.isArray(attributeDefinitions) &&
          attributeDefinitions.length > 0
        ),
      });
      const { data } = await client.put<SupplierFullVo>(
        `/suppliers/${supplierGuid}`,
        supplierPayload,
      );
      context.logger.info(
        `Successfully updated supplier: ${data.name} (${data.guid})`,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "Update Supplier");
    }
  },
});
