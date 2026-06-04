import { action, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput } from "../../inputs";
import { cleanNumber, cleanString } from "../../util";
import { WebhookVersion } from "../../constants";

export const getDealsSummary = action({
  display: {
    label: "Get Deals Summary",
    description: "Gets a summary of deals.",
  },
  perform: async (context, { connection, status, filterId, userId, stageId }) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
    const { data } = await client.get("/deals/summary", {
      params: {
        status,
        filter_id: filterId,
        user_id: userId,
        stage_id: stageId,
      },
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    status: input({
      label: "Status",
      type: "string",
      model: [
        { label: "Open", value: "open" },
        { label: "Won", value: "won" },
        { label: "Lost", value: "lost" },
      ],
      clean: cleanString,
      comments: "Only fetch deals with a specific status",
    }),
    filterId: input({
      label: "Filter ID",
      type: "string",
      clean: cleanNumber,
      comments: "user_id will not be considered",
    }),
    userId: input({
      label: "User ID",
      type: "string",
      clean: cleanNumber,
      comments: "Only deals matching the given user will be returned",
    }),
    stageId: input({
      label: "Stage ID",
      type: "string",
      clean: cleanNumber,
      comments: "Only deals within the given stage will be returned",
    }),
  },
});
