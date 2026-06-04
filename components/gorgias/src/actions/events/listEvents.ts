import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listEventsInputs as inputs } from "../../inputs/events";
import type { ListEventsResponse } from "../../interfaces/events";
import { listEventsExamplePayload as examplePayload } from "../../examplePayloads/events";
import { fetchAllWithPagination } from "../../utils/fetchAllWithPagination";

export const listEvents = action({
  display: {
    label: "List Events",
    description:
      "List events, paginated, and ordered by their creation date, with the most recently created first.",
  },
  perform: async (context, { connection, fetchAll, ...configVars }) => {
    const client = createClient({
      connection,
      debug: context.debug.enabled,
    });

    const { data } = fetchAll
      ? await fetchAllWithPagination<ListEventsResponse>({
          client,
          configVars,
          endpoint: "/events",
        })
      : await client.get<ListEventsResponse>("/events", {
          params: configVars,
          paramsSerializer: { indexes: null },
        });

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
