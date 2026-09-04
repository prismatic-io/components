import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listSupplierItemFilesExamplePayload } from "../../examplePayloads";
import { listSupplierItemFilesInputs } from "../../inputs";
import { listSupplierItemFilesOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listSupplierItemFiles = action({
  display: {
    label: "List Supplier Item Files",
    description:
      "Retrieve a list of all files associated with a specific supplier item from Arena PLM system.",
  },
  inputs: listSupplierItemFilesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listSupplierItemFilesOutputSchema,
  }),
  examplePayload: listSupplierItemFilesExamplePayload,
  perform: async (context, { connection, supplierItemGuid }) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info("Getting supplier item files", {
        supplierItemGuid,
        endpoint: `/supplieritems/${supplierItemGuid}/files`,
      });
      const { data } = await client.get(
        `/supplieritems/${supplierItemGuid}/files`,
      );
      context.logger.info(
        `Successfully retrieved ${data?.count || 0} supplier item files`,
        {
          supplierItemGuid,
          count: data?.count,
          returnedCount: data?.results?.length || 0,
        },
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "List Supplier Item Files");
    }
  },
});
