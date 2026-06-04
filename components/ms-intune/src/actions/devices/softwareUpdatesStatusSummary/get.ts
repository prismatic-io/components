import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import {
  connection,
  odataSoftwareUpdatesParams,
  fetchAll,
} from "../../../inputs/general";
import { getSoftwareUpdateStatusSummaryExamplePayload } from "../../../examplePayloads";
import { paginateResults } from "../../../util";

export const listSoftwareUpdateStatusSummary = action({
  display: {
    label: "List Software Update Status Summary",
    description: "List the status summary of a software update.",
  },
  perform: async (
    context,
    { connection, $expand, $format, $search, $select, $skipToken, fetchAll },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const params = {
      $expand,
      $format,
      $search,
      $select,
      $skipToken,
    };
    const data = await paginateResults(
      client,
      "/deviceManagement/softwareUpdateStatusSummary",
      fetchAll,
      params,
    );

    return {
      data,
    };
  },
  inputs: {
    connection,
    fetchAll,
    ...odataSoftwareUpdatesParams,
  },
  examplePayload: getSoftwareUpdateStatusSummaryExamplePayload,
});
