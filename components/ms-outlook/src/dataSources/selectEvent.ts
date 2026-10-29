import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { computeEndpointBasedOnConnection, fetchAllData } from "../util";
import type { Event } from "@microsoft/microsoft-graph-types";
import type { ODataAttrs } from "../types";
import { createClient } from "../client";
import { connectionInput } from "../inputs";

export const selectEvent = dataSource({
  display: {
    label: "Select Event",
    description: "Select an event from the list of events.",
  },
  inputs: {
    connection: connectionInput,
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, false);
    const { value } = await fetchAllData<Event & ODataAttrs>(
      client,
      computeEndpointBasedOnConnection(connection, "/me/events"),
      true,
      {},
    );

    const result = value.map<Element>((event) => ({
      label: util.types.toString(event.subject),
      key: util.types.toString(event.id),
    }));
    return { result };
  },
  dataSourceType: "picklist",
});
