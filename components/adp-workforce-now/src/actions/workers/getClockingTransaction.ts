import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getClockingTransactionsResponse } from "../../examplePayloads";
import { connection, eventID } from "../../inputs";

export const getClockingTransaction = action({
  display: {
    label: "Get Clocking Transaction",
    description:
      "Returns the status of a previously submitted clocking transaction such as “Clock-In”, “Clock-Out,” “Scan”, etc.",
  },
  inputs: {
    eventID,
    connection,
  },
  perform: async (context, { connection, eventID }) => {
    const axiosClient = await createClient(
      context,
      connection,
      context.debug.enabled,
    );
    const { data } = await axiosClient.get(
      `/events/time/v1/data-collection-entries.process/${eventID}`,
    );
    return { data };
  },
  examplePayload: {
    data: getClockingTransactionsResponse,
  },
});
