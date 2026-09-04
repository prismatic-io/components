import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listRecentActivityReportRunsExamplePayload } from "../../examplePayloads";
import { listRecentActivityReportRunsInputs } from "../../inputs";
import { listRecentActivityReportRunsOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
import { fetchArenaList } from "../../util/pagination";
export const listRecentActivityReportRuns = action({
  display: {
    label: "List Recent Report Run Activities",
    description: "View recent report run activities from Arena PLM system.",
  },
  inputs: listRecentActivityReportRunsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listRecentActivityReportRunsOutputSchema,
  }),
  examplePayload: listRecentActivityReportRunsExamplePayload,
  perform: async (
    context,
    { connection, dateTimeFrom, dateTimeTo, pagination = {}, fetchAll },
  ) => {
    try {
      context.logger.info("Getting recent report run activities");
      const client = await createArenaClient(context, connection);
      const params = {
        dateTimeFrom,
        dateTimeTo,
        limit: pagination.limit,
        offset: pagination.offset,
      };
      const data = await fetchArenaList(
        client,
        "/settings/recentactivities/reportruns",
        params,
        fetchAll,
      );
      context.logger.info(
        `Retrieved ${data?.count || 0} report run activities`,
        {
          count: data?.count,
        },
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(
        error,
        context.logger,
        "List Recent Report Run Activities",
      );
    }
  },
});
