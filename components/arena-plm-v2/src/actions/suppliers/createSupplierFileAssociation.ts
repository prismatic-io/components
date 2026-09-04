import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { createSupplierFileAssociationExamplePayload } from "../../examplePayloads";
import { createSupplierFileAssociationInputs } from "../../inputs";
import { fileAssociationSchema } from "../../outputSchemas";
import type { FileAssociationVo } from "../../types";
import { handleArenaError } from "../../util";
export const createSupplierFileAssociation = action({
  display: {
    label: "Create Supplier File Association",
    description:
      "Associate an existing file with a supplier in Arena PLM system.",
  },
  inputs: createSupplierFileAssociationInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: fileAssociationSchema,
  }),
  examplePayload: createSupplierFileAssociationExamplePayload,
  perform: async (context, { connection, supplierGuid, fileGuid }) => {
    try {
      const client = await createArenaClient(context, connection);
      const payload = { file: { guid: fileGuid } };
      context.logger.info("Creating supplier file association", {
        supplierGuid,
        fileGuid,
      });
      const { data } = await client.post<FileAssociationVo>(
        `/suppliers/${supplierGuid}/files`,
        payload,
      );
      context.logger.info(
        `Successfully associated file ${fileGuid} with supplier ${supplierGuid}`,
      );
      return { data };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        "Create Supplier File Association",
      );
    }
  },
});
