import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listRecentActivityFileAccessesExamplePayload } from "../../examplePayloads";
import { listRecentActivityFileAccessesInputs } from "../../inputs";
import { listRecentActivityFileAccessesOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
import { fetchArenaList } from "../../util/pagination";
export const listRecentActivityFileAccesses = action({
  display: {
    label: "List Recent File Access Activities",
    description: "View recent file access activities from Arena PLM system.",
  },
  inputs: listRecentActivityFileAccessesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listRecentActivityFileAccessesOutputSchema,
  }),
  examplePayload: listRecentActivityFileAccessesExamplePayload,
  perform: async (
    context,
    { connection, dateTimeFrom, dateTimeTo, pagination = {}, fetchAll },
  ) => {
    try {
      context.logger.info("Getting recent file access activities");
      const client = await createArenaClient(context, connection);
      const params = {
        dateTimeFrom,
        dateTimeTo,
        limit: pagination.limit,
        offset: pagination.offset,
      };
      const data = await fetchArenaList(
        client,
        "/settings/recentactivities/fileaccesses",
        params,
        fetchAll,
      );
      context.logger.info(
        `Retrieved ${data?.count || 0} file access activities`,
        {
          count: data?.count,
        },
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(
        error,
        context.logger,
        "List Recent File Access Activities",
      );
    }
  },
});
