import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listSupplierItemComplianceExamplePayload } from "../../examplePayloads";
import { listSupplierItemComplianceInputs } from "../../inputs";
import { listSupplierItemComplianceOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listSupplierItemCompliance = action({
  display: {
    label: "List Supplier Item Compliance",
    description:
      "Retrieve all compliance requirements for a specific supplier item from Arena PLM system.",
  },
  inputs: listSupplierItemComplianceInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listSupplierItemComplianceOutputSchema,
  }),
  examplePayload: listSupplierItemComplianceExamplePayload,
  perform: async (context, { connection, supplierItemGuid }) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info("Getting supplier item compliance requirements", {
        supplierItemGuid,
        endpoint: `/supplieritems/${supplierItemGuid}/compliance`,
      });
      const { data } = await client.get(
        `/supplieritems/${supplierItemGuid}/compliance`,
      );
      context.logger.info(
        `Successfully retrieved ${data?.count || 0} compliance requirements`,
        {
          supplierItemGuid,
          count: data?.count,
          returnedCount: data?.results?.length || 0,
        },
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "List Supplier Item Compliance");
    }
  },
});
