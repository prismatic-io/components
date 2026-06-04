import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  cursor,
  dealIdInput,
  paginationLimitInput,
  paginationStartInput,
} from "../../inputs";

export const getDealParticipants = action({
  display: {
    label: "Get Deal Participants",
    description: "Lists participants of a deal.",
  },
  perform: async (context, { connection, id, start, limit, cursor }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/deals/${id}/participants`, {
      params: { start, limit, cursor },
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: dealIdInput,
    start: paginationStartInput,
    limit: paginationLimitInput,
    cursor,
  },
});
