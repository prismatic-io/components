import { action } from "@prismatic-io/spectral";
import { listGroupEventsInputs } from "../../inputs";
import { getAdobeSignClient } from "../../client";
import type { ListGroupEvents } from "../../types";
import { listGroupEventsExamplePayload } from "../../examplePayloads";
import { fetchAdobeSignResults } from "../../util";

export const listGroupEvents = action({
  display: {
    label: "List Group Events",
    description: "Retrieves all events for a group.",
  },
  inputs: listGroupEventsInputs,
  perform: async (context, { connection, fetchAll, pagination, groupId }) => {
    const client = getAdobeSignClient(connection, context.debug.enabled);

    const data = await fetchAdobeSignResults<
      ListGroupEvents,
      "groupEvents",
      typeof fetchAll
    >(
      client,
      `/groups/${groupId}/events`,
      fetchAll,
      {
        pageSize: pagination.pageSize || undefined,
        cursor: pagination.cursor || undefined,
      },
      "groupEvents",
    );

    return { data };
  },
  examplePayload: listGroupEventsExamplePayload,
});
