import { action, util, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, pipelineIdInput } from "../../inputs";
import { cleanNumber } from "../../util";

export const getPipelineMovementStatistics = action({
  display: {
    label: "Get Pipeline Movement Statistics",
    description: "Gets deal movements in a pipeline.",
  },
  perform: async (context, { connection, id, startDate, endDate, userId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/pipelines/${id}/movement_statistics`, {
      params: { start_date: startDate, end_date: endDate, user_id: userId },
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: pipelineIdInput,
    startDate: input({
      label: "Start Date",
      type: "string",
      required: true,
      clean: util.types.toString,
      comments: "The start of the period",
    }),
    endDate: input({
      label: "End Date",
      type: "string",
      required: true,
      clean: util.types.toString,
      comments: "The end of the period",
    }),
    userId: input({
      label: "User ID",
      type: "string",
      clean: cleanNumber,
      comments: 'The ID of the user who"s pipeline statistics to fetch',
    }),
  },
});
