import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { listChangeEventsExamplePayload } from "../../examplePayloads";
import {
  connectionInput,
  fetchAll,
  integrationIds,
  limit,
  offset,
  since,
  teamIds,
  total,
  until,
} from "../../inputs";
import { fetchAllWithPagination } from "../../util/fetchAllWithPagination";

export const listChangeEvents = action({
  display: {
    label: "List Change Events",
    description: "List change events with optional filters.",
  },
  perform: async (
    context,
    {
      connection,
      limit,
      offset,
      total,
      teamIds,
      integrationIds,
      since,
      until,
      fetchAll,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const params = {
      limit,
      offset,
      total,
      "team_ids[]": teamIds,
      "integration_ids[]": integrationIds,
      since,
      until,
    };

    if (fetchAll) {
      return {
        data: await fetchAllWithPagination({
          client,
          configVars: params,
          endpoint: ENDPOINTS.CHANGE_EVENTS,
          objectKey: "change_events",
        }),
      };
    }

    const { data } = await client.get(ENDPOINTS.CHANGE_EVENTS, {
      params,
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    fetchAll,
    limit,
    offset,
    total,
    teamIds,
    integrationIds,
    since,
    until,
  },
  examplePayload: listChangeEventsExamplePayload,
});
