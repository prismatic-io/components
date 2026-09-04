import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listSupplierQualityProcessAssociationsExamplePayload } from "../../examplePayloads";
import { listSupplierQualityProcessAssociationsInputs } from "../../inputs";
import { changeQualityAssociationListSchema } from "../../outputSchemas";
import type { ChangeQualityAssociationVoResultRep } from "../../types";
import { handleArenaError } from "../../util";
export const listSupplierQualityProcessAssociations = action({
  display: {
    label: "List Supplier Quality Process Associations",
    description:
      "Retrieve all quality process associations for a supplier from Arena PLM system.",
  },
  inputs: listSupplierQualityProcessAssociationsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: changeQualityAssociationListSchema,
  }),
  examplePayload: listSupplierQualityProcessAssociationsExamplePayload,
  perform: async (context, { connection, supplierGuid }) => {
    try {
      const client = await createArenaClient(context, connection);
      const url = `/suppliers/${supplierGuid}/quality`;
      context.logger.info("Getting supplier quality process associations", {
        supplierGuid,
        endpoint: url,
      });
      const { data } =
        await client.get<ChangeQualityAssociationVoResultRep>(url);
      context.logger.info(
        `Successfully retrieved ${data.count || 0} quality process associations for supplier: ${supplierGuid}`,
      );
      return { data };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        "List Supplier Quality Process Associations",
      );
    }
  },
});
