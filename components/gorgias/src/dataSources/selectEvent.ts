import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectEventInputs as inputs } from "../inputs/events";
import type { ListEventsResponse } from "../interfaces/events";
import { selectEventExamplePayload as examplePayload } from "../examplePayloads/dataSources";
import { fetchAllWithPagination } from "../utils/fetchAllWithPagination";

export const selectEvent = dataSource({
  display: {
    label: "Select Event",
    description: "Select a event from a list of events.",
  },
  dataSourceType: "picklist",
  perform: async (context, { connection, ...configVars }) => {
    const client = createClient({
      connection,
      debug: false,
    });

    const { data } = await fetchAllWithPagination<ListEventsResponse>({
      client,
      configVars,
      endpoint: "/events",
    });

    const result = data.data.map<Element>((event) => ({
      label: event.type,
      key: util.types.toString(event.id),
    }));

    return {
      result,
    };
  },
  inputs,
  examplePayload,
});
