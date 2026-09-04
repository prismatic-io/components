import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listRecentActivityUserAccessesExamplePayload } from "../../examplePayloads";
import { listRecentActivityUserAccessesInputs } from "../../inputs";
import { listRecentActivityUserAccessesOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
import { fetchArenaList } from "../../util/pagination";
export const listRecentActivityUserAccesses = action({
  display: {
    label: "List Recent User Access Activities",
    description: "View recent user access activities from Arena PLM system.",
  },
  inputs: listRecentActivityUserAccessesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listRecentActivityUserAccessesOutputSchema,
  }),
  examplePayload: listRecentActivityUserAccessesExamplePayload,
  perform: async (
    context,
    { connection, dateTimeFrom, dateTimeTo, pagination = {}, fetchAll },
  ) => {
    try {
      context.logger.info("Getting recent user access activities");
      const client = await createArenaClient(context, connection);
      const params = {
        dateTimeFrom,
        dateTimeTo,
        limit: pagination.limit,
        offset: pagination.offset,
      };
      const data = await fetchArenaList(
        client,
        "/settings/recentactivities/useraccesses",
        params,
        fetchAll,
      );
      context.logger.info(
        `Retrieved ${data?.count || 0} user access activities`,
        {
          count: data?.count,
        },
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(
        error,
        context.logger,
        "List Recent User Access Activities",
      );
    }
  },
});
