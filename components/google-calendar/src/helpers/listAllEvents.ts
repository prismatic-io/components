import type { calendar_v3 } from "@googleapis/calendar";
import { type Connection, util } from "@prismatic-io/spectral";
import type { GaxiosResponse } from "gaxios";
import { createClient } from "../client";

export const listAllEvents = async (params: {
  googleConnection: Connection;
  calendarId: string;
  fetchAll: boolean;
  pageToken?;
  maxResults?;
  syncToken?;
  maxAttendees?;
  timeZone?;
  q?;
  timeMax?;
  timeMin?;
  orderBy?;
  singleEvents?;
  updatedMin?;
  showDeleted?;
  showHiddenInvitations?;
}) => {
  const client = createClient({
    connection: params.googleConnection,
  });
  const MAX_RESULTS = 250;

  if (params.fetchAll) {
    params.pageToken = undefined;
  }

  const maxResults = params.fetchAll
    ? MAX_RESULTS
    : util.types.toInt(params.maxResults) || undefined;

  const requestParams = {
    calendarId: params.calendarId,
    maxResults,
    pageToken: params.pageToken,
    syncToken: params.syncToken,
    maxAttendees: params.maxAttendees,
    timeZone: params.timeZone,
    q: params.q,
    timeMax: params.timeMax,
    timeMin: params.timeMin,
    orderBy: params.orderBy,
    singleEvents: params.singleEvents,
    updatedMin: params.updatedMin,
    showDeleted: params.showDeleted,
    showHiddenInvitations: params.showHiddenInvitations,
  };

  let eventsList: GaxiosResponse<calendar_v3.Schema$Events> =
    await client.events.list(requestParams);

  let nextPageToken: string | undefined = eventsList.data.nextPageToken;
  if (!params.fetchAll || !nextPageToken) return eventsList;

  const allItems: calendar_v3.Schema$Event[] = [...eventsList.data.items];

  while (nextPageToken) {
    eventsList = await client.events.list({
      ...requestParams,
      pageToken: nextPageToken,
    });

    allItems.push(...eventsList.data.items);
    nextPageToken = eventsList.data.nextPageToken;
  }

  eventsList.data.items = allItems;

  return eventsList;
};
