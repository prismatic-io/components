import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listSupplierItemsExamplePayload } from "../../examplePayloads";
import { listSupplierItemsInputs } from "../../inputs";
import { listSupplierItemsOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
import { fetchArenaList } from "../../util/pagination";
export const listSupplierItems = action({
  display: {
    label: "List Supplier Items",
    description:
      "Search and return a list of supplier items from Arena PLM system matching the specified criteria with pagination support.",
  },
  inputs: listSupplierItemsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listSupplierItemsOutputSchema,
  }),
  examplePayload: listSupplierItemsExamplePayload,
  perform: async (
    context,
    {
      connection,
      number,
      name,
      supplierName,
      supplierGuid,
      pagination = {},
      fetchAll,
    },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const queryParams = {
        number,
        name,
        "supplier.name": supplierName,
        "supplier.guid": supplierGuid,
        limit: pagination.limit,
        offset: pagination.offset,
      };
      context.logger.info("Searching for supplier items", {
        queryParamNames: Object.keys(queryParams),
        endpoint: "/supplieritems",
      });
      const data = await fetchArenaList(
        client,
        "/supplieritems",
        queryParams,
        fetchAll,
      );
      context.logger.info(
        `Successfully retrieved ${data?.count || 0} supplier items`,
        {
          count: data?.count,
          returnedCount: data?.results?.length || 0,
        },
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "List Supplier Items");
    }
  },
});
