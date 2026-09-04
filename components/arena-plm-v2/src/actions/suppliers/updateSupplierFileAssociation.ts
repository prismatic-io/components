import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { updateSupplierFileAssociationExamplePayload } from "../../examplePayloads";
import { updateSupplierFileAssociationInputs } from "../../inputs";
import { updateSupplierFileAssociationOutputSchema } from "../../outputSchemas";
import type { FileAssociationVo, SupplierFileCreateVo } from "../../types";
import { handleArenaError } from "../../util";
export const updateSupplierFileAssociation = action({
  display: {
    label: "Update Supplier File Association",
    description:
      "Update a file association for a supplier in Arena PLM system.",
  },
  inputs: updateSupplierFileAssociationInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateSupplierFileAssociationOutputSchema,
  }),
  examplePayload: updateSupplierFileAssociationExamplePayload,
  perform: async (
    context,
    {
      connection,
      supplierGuid,
      supplierFileAssociationGuid,
      title,
      description,
      edition,
      format,
      isPrivate,
      authorFullName,
      categoryGuid,
      storageMethodName,
      latestEditionAssociation,
      isPrimary,
    },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const filePayload: SupplierFileCreateVo = {};
      if (title !== undefined && title !== null)
        filePayload["file.title"] = title;
      if (description !== undefined && description !== null)
        filePayload["file.description"] = description;
      if (edition !== undefined && edition !== null)
        filePayload["file.edition"] = edition;
      if (format !== undefined && format !== null)
        filePayload["file.format"] = format;
      if (isPrivate !== undefined && isPrivate !== null)
        filePayload["file.private"] = isPrivate;
      if (authorFullName !== undefined && authorFullName !== null)
        filePayload["file.author.fullName"] = authorFullName;
      if (categoryGuid !== undefined && categoryGuid !== null)
        filePayload["file.category.guid"] = categoryGuid;
      if (storageMethodName !== undefined && storageMethodName !== null)
        filePayload["file.storageMethodName"] = storageMethodName;
      if (
        latestEditionAssociation !== undefined &&
        latestEditionAssociation !== null
      ) {
        filePayload.latestEditionAssociation = latestEditionAssociation;
      }
      if (isPrimary !== undefined && isPrimary !== null) {
        filePayload.primary = isPrimary;
      }
      context.logger.info("Updating supplier file association", {
        supplierGuid,
        supplierFileAssociationGuid,
        title,
        description,
        isPrimary,
        latestEditionAssociation,
      });
      const { data } = await client.put<FileAssociationVo>(
        `/suppliers/${supplierGuid}/files/${supplierFileAssociationGuid}`,
        filePayload,
      );
      context.logger.info(
        `Successfully updated file association for supplier: ${supplierGuid} - File ${data.file?.title || "Unknown"} (${data.guid})`,
      );
      return { data };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        "Update Supplier File Association",
      );
    }
  },
});
