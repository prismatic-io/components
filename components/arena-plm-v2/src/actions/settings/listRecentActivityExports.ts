import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listRecentActivityExportsExamplePayload } from "../../examplePayloads";
import { listRecentActivityExportsInputs } from "../../inputs";
import { listRecentActivityExportsOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
import { fetchArenaList } from "../../util/pagination";
export const listRecentActivityExports = action({
  display: {
    label: "List Recent Export Activities",
    description: "View recent export activities from Arena PLM system.",
  },
  inputs: listRecentActivityExportsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listRecentActivityExportsOutputSchema,
  }),
  examplePayload: listRecentActivityExportsExamplePayload,
  perform: async (
    context,
    { connection, dateTimeFrom, dateTimeTo, pagination = {}, fetchAll },
  ) => {
    try {
      context.logger.info("Getting recent export activities");
      const client = await createArenaClient(context, connection);
      const params = {
        dateTimeFrom,
        dateTimeTo,
        limit: pagination.limit,
        offset: pagination.offset,
      };
      const data = await fetchArenaList(
        client,
        "/settings/recentactivities/exports",
        params,
        fetchAll,
      );
      context.logger.info(`Retrieved ${data?.count || 0} export activities`, {
        count: data?.count,
      });
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "List Recent Export Activities");
    }
  },
});
