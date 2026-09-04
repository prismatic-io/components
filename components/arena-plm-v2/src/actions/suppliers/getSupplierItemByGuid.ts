import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { getSupplierItemByGuidExamplePayload } from "../../examplePayloads";
import { getSupplierItemByGuidInputs } from "../../inputs";
import { supplierItemFullSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const getSupplierItemByGuid = action({
  display: {
    label: "Get Supplier Item by GUID",
    description:
      "Retrieve detailed information for a specific supplier item from Arena PLM system using its GUID.",
  },
  inputs: getSupplierItemByGuidInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: supplierItemFullSchema,
  }),
  examplePayload: getSupplierItemByGuidExamplePayload,
  perform: async (
    context,
    { connection, supplierItemGuid, includeEmptyAdditionalAttributes },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const queryParams = { includeEmptyAdditionalAttributes };
      context.logger.info("Getting supplier item details", {
        supplierItemGuid,
        queryParamNames: Object.keys(queryParams),
        endpoint: `/supplieritems/${supplierItemGuid}`,
      });
      const { data } = await client.get(`/supplieritems/${supplierItemGuid}`, {
        params: queryParams,
      });
      context.logger.info("Successfully retrieved supplier item details", {
        supplierItemGuid: data?.guid,
        supplierItemNumber: data?.number,
        supplierItemName: data?.name,
        supplierName: data?.supplier?.name,
      });
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Get Supplier Item by GUID");
    }
  },
});
