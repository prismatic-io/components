import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listSupplierItemRequirementsExamplePayload } from "../../examplePayloads";
import { listSupplierItemRequirementsInputs } from "../../inputs";
import { listSupplierItemRequirementsOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listSupplierItemRequirements = action({
  display: {
    label: "List Supplier Item Requirements",
    description:
      "List all compliance requirements for supplier items from Arena PLM system.",
  },
  inputs: listSupplierItemRequirementsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listSupplierItemRequirementsOutputSchema,
  }),
  examplePayload: listSupplierItemRequirementsExamplePayload,
  perform: async (context, { connection }) => {
    try {
      context.logger.info("Getting supplier item requirements");
      const client = await createArenaClient(context, connection);
      const { data } = await client.get("/settings/supplieritems/requirements");
      context.logger.info(
        `Retrieved ${data?.count || 0} supplier item requirements`,
        {
          count: data?.count,
        },
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(
        error,
        context.logger,
        "List Supplier Item Requirements",
      );
    }
  },
});
