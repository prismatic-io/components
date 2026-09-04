import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { getSupplierByGuidExamplePayload } from "../../examplePayloads";
import { getSupplierByGuidInputs } from "../../inputs";
import { supplierFullSchema } from "../../outputSchemas";
import type { SupplierFullVo } from "../../types";
import { handleArenaError } from "../../util";
export const getSupplierByGuid = action({
  display: {
    label: "Get Supplier by GUID",
    description:
      "Retrieve detailed information of a specific supplier from Arena PLM system using its GUID.",
  },
  inputs: getSupplierByGuidInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: supplierFullSchema,
  }),
  examplePayload: getSupplierByGuidExamplePayload,
  perform: async (
    context,
    { connection, supplierGuid, includeEmptyAdditionalAttributes },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const queryParams = {
        ...(includeEmptyAdditionalAttributes && {
          includeEmptyAdditionalAttributes,
        }),
      };
      context.logger.info(`Fetching supplier ${supplierGuid}`, {
        supplierGuid,
        includeEmptyAdditionalAttributes,
      });
      const { data } = await client.get<SupplierFullVo>(
        `/suppliers/${supplierGuid}`,
        { params: queryParams },
      );
      context.logger.info(
        `Successfully retrieved supplier: ${data.name || supplierGuid}`,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "Get Supplier by GUID");
    }
  },
});
