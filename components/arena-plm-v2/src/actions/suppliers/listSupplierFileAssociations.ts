import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listSupplierFileAssociationsExamplePayload } from "../../examplePayloads";
import { listSupplierFileAssociationsInputs } from "../../inputs";
import { fileAssociationListSchema } from "../../outputSchemas";
import type { FileAssociationVoResultRep } from "../../types";
import { handleArenaError } from "../../util";
export const listSupplierFileAssociations = action({
  display: {
    label: "List Supplier File Associations",
    description:
      "Retrieve all file associations for a supplier from Arena PLM system.",
  },
  inputs: listSupplierFileAssociationsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: fileAssociationListSchema,
  }),
  examplePayload: listSupplierFileAssociationsExamplePayload,
  perform: async (context, { connection, supplierGuid }) => {
    try {
      const client = await createArenaClient(context, connection);
      const url = `/suppliers/${supplierGuid}/files`;
      context.logger.info("Getting supplier file associations", {
        supplierGuid,
        endpoint: url,
      });
      const { data } = await client.get<FileAssociationVoResultRep>(url);
      context.logger.info(
        `Successfully retrieved ${data.count || 0} file associations for supplier: ${supplierGuid}`,
      );
      return { data };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        "List Supplier File Associations",
      );
    }
  },
});
