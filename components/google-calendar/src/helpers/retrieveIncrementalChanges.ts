import type { calendar_v3 } from "@googleapis/calendar";
import type { Connection } from "@prismatic-io/spectral";
import { listAllEvents } from "./listAllEvents";

export const retrieveIncrementalChanges = async (
  connection: Connection,
  calendarId: string,
  syncToken: string
): Promise<{ events: calendar_v3.Schema$Event[]; nextSyncToken?: string }> => {
  const response = await listAllEvents({
    googleConnection: connection,
    calendarId,
    syncToken,
    fetchAll: true,
    singleEvents: true,
    showDeleted: true,
  });

  return {
    events: response.data.items || [],
    nextSyncToken: response.data.nextSyncToken,
  };
};
