import { action, outputSchema } from "@prismatic-io/spectral";
import FormData from "form-data";
import { createArenaClient } from "../../client";
import { createSupplierItemFileExamplePayload } from "../../examplePayloads";
import { createSupplierItemFileInputs } from "../../inputs";
import { supplierItemFileSchema } from "../../outputSchemas";
import { getFilenameFromContentType, handleArenaError } from "../../util";
export const createSupplierItemFile = action({
  display: {
    label: "Create Supplier Item File",
    description:
      "Upload a file and associate it with a supplier item. Supports files up to 2GB with multipart form data upload.",
  },
  inputs: createSupplierItemFileInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: supplierItemFileSchema,
  }),
  examplePayload: createSupplierItemFileExamplePayload,
  perform: async (
    context,
    {
      connection,
      supplierItemGuid,
      file,
      title,
      description,
      format,
      storageMethodName,
      categoryGuid,
      authorFullName,
      edition,
      private: isPrivate,
      latestEditionAssociation,
      primary,
    },
  ) => {
    try {
      context.logger.info("Creating supplier item file association", {
        supplierItemGuid,
        title,
        format,
      });
      const client = await createArenaClient(context, connection);
      const formData = new FormData();
      if (file.data) {
        const filename =
          getFilenameFromContentType(file.contentType, format) || "upload";
        formData.append("file", file.data, {
          filename: filename,
          contentType: file.contentType,
        });
      }
      if (title) formData.append("file.title", title);
      if (description) formData.append("file.description", description);
      if (format) formData.append("file.format", format);
      if (storageMethodName)
        formData.append("file.storageMethodName", storageMethodName);
      if (categoryGuid) formData.append("file.category.guid", categoryGuid);
      if (authorFullName)
        formData.append("file.author.fullName", authorFullName);
      if (edition) formData.append("file.edition", edition);
      if (isPrivate !== undefined)
        formData.append("file.private", isPrivate.toString());
      if (latestEditionAssociation !== undefined)
        formData.append(
          "latestEditionAssociation",
          latestEditionAssociation.toString(),
        );
      if (primary !== undefined) formData.append("primary", primary.toString());
      const { data } = await client.post(
        `/supplieritems/${supplierItemGuid}/files`,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
          },
        },
      );
      context.logger.info("Successfully created supplier item file", {
        supplierItemGuid,
        fileGuid: data.guid,
      });
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "Create Supplier Item File");
    }
  },
});
