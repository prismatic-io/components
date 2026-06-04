import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { modifiedEntryResponse } from "../../examplePayloads";
import { connection, events } from "../../inputs";

export const modifyTimeEntries = action({
  display: {
    label: "Modify Time Entries",
    description: "Modify time entries event instance",
  },
  inputs: {
    events: {
      ...events,
      comments:
        "The new time entries to be added, modified or deleted. Please refer to the API documentation for the structure of the time entries. https://developers.adp.com/build/api-explorer/hcm-offrg-wfn/hcm-offrg-wfn-time-time-cards-v2-time-cards?operation=POST%2Fevents%2Ftime%2Fv2%2Ftime-entries.modify",
    },
    connection,
  },
  perform: async (context, { connection, events }) => {
    const axiosClient = await createClient(
      context,
      connection,
      context.debug.enabled,
    );
    const { data } = await axiosClient.post(
      "/events/time/v2/time-entries.modify",
      {
        events,
      },
    );
    return { data };
  },
  examplePayload: {
    data: modifiedEntryResponse,
  },
});
