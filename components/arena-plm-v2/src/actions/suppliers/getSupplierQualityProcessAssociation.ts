import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { getSupplierQualityProcessAssociationExamplePayload } from "../../examplePayloads";
import { getSupplierQualityProcessAssociationInputs } from "../../inputs";
import { qualityAssociationSchema } from "../../outputSchemas";
import type { QualityAssociationVo } from "../../types";
import { handleArenaError } from "../../util";
export const getSupplierQualityProcessAssociation = action({
  display: {
    label: "Get Supplier Quality Process Association",
    description:
      "Retrieve a specific quality process association for a supplier from Arena PLM system.",
  },
  inputs: getSupplierQualityProcessAssociationInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: qualityAssociationSchema,
  }),
  examplePayload: getSupplierQualityProcessAssociationExamplePayload,
  perform: async (
    context,
    { connection, supplierGuid, supplierQualityAssociationGuid },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info("Getting supplier quality process association", {
        supplierGuid,
        supplierQualityAssociationGuid,
      });
      const { data } = await client.get<QualityAssociationVo>(
        `/suppliers/${supplierGuid}/quality/${supplierQualityAssociationGuid}`,
      );
      context.logger.info(
        `Successfully retrieved quality process association: ${supplierQualityAssociationGuid} for supplier: ${supplierGuid}`,
      );
      return { data };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        "Get Supplier Quality Process Association",
      );
    }
  },
});
