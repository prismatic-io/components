import { action } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { getSupplierItemFileContentExamplePayload } from "../../examplePayloads";
import { getSupplierItemFileContentInputs } from "../../inputs";
import { handleArenaError } from "../../util";
export const getSupplierItemFileContent = action({
  display: {
    label: "Get Supplier Item File Content",
    description:
      "Download the binary content of a file associated with a supplier item. Returns the file content as binary data with content type information.",
  },
  inputs: getSupplierItemFileContentInputs,
  examplePayload: getSupplierItemFileContentExamplePayload,
  perform: async (
    context,
    { connection, supplierItemGuid, supplierItemFileAssociationGuid },
  ) => {
    try {
      context.logger.info("Downloading supplier item file content", {
        supplierItemGuid,
        supplierItemFileAssociationGuid,
      });
      const client = await createArenaClient(context, connection);
      const { data, headers } = await client.get(
        `/supplieritems/${supplierItemGuid}/files/${supplierItemFileAssociationGuid}/content`,
        {
          responseType: "arraybuffer",
        },
      );
      context.logger.info(
        "Supplier item file content downloaded successfully",
        {
          supplierItemGuid,
          supplierItemFileAssociationGuid,
          contentType: headers["content-type"],
          contentLength: headers["content-length"],
        },
      );
      const buffer = Buffer.from(data);
      return {
        data: buffer,
        contentType: String(
          headers["content-type"] || "application/octet-stream",
        ),
      };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        `Get Supplier Item File Content (${supplierItemGuid}/${supplierItemFileAssociationGuid})`,
      );
    }
  },
});
