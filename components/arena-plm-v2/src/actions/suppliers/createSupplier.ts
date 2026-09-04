import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { createSupplierExamplePayload } from "../../examplePayloads";
import { createSupplierInputs } from "../../inputs";
import { supplierFullSchema } from "../../outputSchemas";
import type {
  PhoneNumberVo,
  SupplierAddressCompactVo,
  SupplierCreateRequestVo,
  SupplierFullVo,
} from "../../types";
import { handleArenaError, resolveAdditionalAttributes } from "../../util";
export const createSupplier = action({
  display: {
    label: "Create Supplier",
    description:
      "Create a new supplier in Arena PLM system with the specified information.",
  },
  inputs: createSupplierInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: supplierFullSchema,
  }),
  examplePayload: createSupplierExamplePayload,
  perform: async (
    context,
    {
      connection,
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
      const supplierPayload: SupplierCreateRequestVo = {
        name,
      };
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
      context.logger.info("Creating supplier", {
        name,
        supplierId,
        hasDescription: !!description,
        hasWebsite: !!website,
        hasApprovalStatus: !!approvalStatusGuid,
        addressCount: Array.isArray(addresses) ? addresses.length : 0,
        phoneCount: Array.isArray(phoneNumbers) ? phoneNumbers.length : 0,
        attributeCount: supplierPayload.additionalAttributes?.length || 0,
        hasAttributeDefinitions: !!(
          attributeDefinitions &&
          Array.isArray(attributeDefinitions) &&
          attributeDefinitions.length > 0
        ),
      });
      const { data } = await client.post<SupplierFullVo>(
        "/suppliers",
        supplierPayload,
      );
      context.logger.info(
        `Successfully created supplier: ${data.name} (${data.guid})`,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "Create Supplier");
    }
  },
});
