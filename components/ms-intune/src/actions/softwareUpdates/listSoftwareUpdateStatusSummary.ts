import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { getSoftwareUpdateStatusSummaryExamplePayload } from "../../examplePayloads";
import { listSoftwareUpdateStatusSummaryInputs } from "../../inputs";
import { paginateResults } from "../../util";
export const listSoftwareUpdateStatusSummary = action({
  display: {
    label: "List Software Update Status Summary",
    description: "List the status summary of a software update.",
  },
  perform: async (context, { connection, $skipToken, fetchAll, filters }) => {
    const client = createClient(connection, context.debug.enabled);
    const params = {
      $expand: filters.$expand,
      $format: filters.$format,
      $search: filters.$search,
      $select: filters.$select,
      $skipToken,
    };
    const data = await paginateResults(
      client,
      ENDPOINTS.SOFTWARE_UPDATE_STATUS_SUMMARY,
      fetchAll,
      params,
    );
    return {
      data,
    };
  },
  inputs: listSoftwareUpdateStatusSummaryInputs,
  examplePayload: getSoftwareUpdateStatusSummaryExamplePayload,
});
