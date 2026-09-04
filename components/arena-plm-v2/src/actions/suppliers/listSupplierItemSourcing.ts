import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listSupplierItemSourcingExamplePayload } from "../../examplePayloads";
import { listSupplierItemSourcingInputs } from "../../inputs";
import { itemSourcingListSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listSupplierItemSourcing = action({
  display: {
    label: "List Supplier Item Sourcing",
    description:
      "Retrieve all sourcing relationships for a specific supplier item from Arena PLM system.",
  },
  inputs: listSupplierItemSourcingInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: itemSourcingListSchema,
  }),
  examplePayload: listSupplierItemSourcingExamplePayload,
  perform: async (context, { connection, supplierItemGuid }) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info("Getting supplier item sourcing relationships", {
        supplierItemGuid,
        endpoint: `/supplieritems/${supplierItemGuid}/sourcing`,
      });
      const { data } = await client.get(
        `/supplieritems/${supplierItemGuid}/sourcing`,
      );
      context.logger.info(
        `Successfully retrieved ${data?.count || 0} sourcing relationships`,
        {
          supplierItemGuid,
          count: data?.count,
          returnedCount: data?.results?.length || 0,
        },
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "List Supplier Item Sourcing");
    }
  },
});
