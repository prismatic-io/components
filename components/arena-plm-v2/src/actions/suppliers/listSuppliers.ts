import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listSuppliersExamplePayload } from "../../examplePayloads";
import { listSuppliersInputs } from "../../inputs";
import { listSuppliersOutputSchema } from "../../outputSchemas";
import type { SupplierFullVo } from "../../types";
import { handleArenaError } from "../../util";
import { fetchArenaList } from "../../util/pagination";
export const listSuppliers = action({
  display: {
    label: "List Suppliers",
    description:
      "Search and return a list of suppliers from Arena PLM system matching the specified criteria with pagination support.",
  },
  inputs: listSuppliersInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listSuppliersOutputSchema,
  }),
  examplePayload: listSuppliersExamplePayload,
  perform: async (
    context,
    { connection, name, supplierId, pagination = {}, fetchAll },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const queryParams = {
        name,
        supplierId,
        limit: pagination.limit,
        offset: pagination.offset,
      };
      context.logger.info("Fetching suppliers", {
        queryParamNames: Object.keys(queryParams),
      });
      const data = await fetchArenaList<SupplierFullVo>(
        client,
        "/suppliers",
        queryParams,
        fetchAll,
      );
      context.logger.info(
        `Successfully retrieved ${data.results?.length || 0} suppliers`,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "List Suppliers");
    }
  },
});
