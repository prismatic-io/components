import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listSupplierApprovalStatusesExamplePayload } from "../../examplePayloads";
import { listSupplierApprovalStatusesInputs } from "../../inputs";
import { listSupplierApprovalStatusesOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
import { fetchArenaList } from "../../util/pagination";
export const listSupplierApprovalStatuses = action({
  display: {
    label: "List Supplier Approval Statuses",
    description:
      "Search and return a list of supplier approval statuses from Arena PLM system with pagination support.",
  },
  inputs: listSupplierApprovalStatusesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listSupplierApprovalStatusesOutputSchema,
  }),
  examplePayload: listSupplierApprovalStatusesExamplePayload,
  perform: async (
    context,
    { connection, name, type, pagination = {}, fetchAll },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const queryParams = {
        name,
        type,
        limit: pagination.limit,
        offset: pagination.offset,
      };
      context.logger.info("Fetching supplier approval statuses", {
        queryParamNames: Object.keys(queryParams),
      });
      const data = await fetchArenaList(
        client,
        "/settings/suppliers/approvalstatuses",
        queryParams,
        fetchAll,
      );
      context.logger.info(
        `Successfully retrieved ${data.results?.length || 0} supplier approval statuses`,
      );
      return { data };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        "List Supplier Approval Statuses",
      );
    }
  },
});
