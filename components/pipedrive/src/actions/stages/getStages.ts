import { action, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, cursor, paginationLimitInput, sortBy, sortDirection } from "../../inputs";
import { cleanNumber } from "../../util";
import { WebhookVersion } from "../../constants";

export const getStages = action({
  display: {
    label: "Get Stages",
    description: "Gets all stages.",
  },
  perform: async (context, { connection, pipelineId, sortBy, sortDirection, limit, cursor }) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
    const { data } = await client.get("/stages", {
      params: {
        pipeline_id: pipelineId,
        sort_by: sortBy,
        sort_direction: sortDirection,
        limit,
        cursor,
      },
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    pipelineId: input({
      label: "Pipeline ID",
      type: "string",
      clean: cleanNumber,
      comments: "The ID of the pipeline to fetch stages for",
    }),
    sortBy,
    sortDirection,
    limit: paginationLimitInput,
    cursor,
  },
});
