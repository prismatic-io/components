import type { calendar_v3 } from "@googleapis/calendar";
import { type Connection, util } from "@prismatic-io/spectral";
import type { GaxiosResponse } from "gaxios";
import { createClient } from "../client";

export const listAllCalendars = async (params: {
  connection: Connection;
  fetchAll: boolean;
  pageToken?;
  maxResults?;
}) => {
  const client = createClient({
    connection: params.connection,
  });

  const MAX_RESULTS = 250;

  if (params.fetchAll) {
    params.pageToken = undefined;
  }

  const maxResults = params.fetchAll
    ? MAX_RESULTS
    : util.types.toInt(params.maxResults) || undefined;

  let calendarList: GaxiosResponse<calendar_v3.Schema$CalendarList> =
    await client.calendarList.list({
      pageToken: util.types.toString(params.pageToken) || undefined,
      maxResults,
    });

  let nextPageToken: string | undefined = calendarList.data.nextPageToken;
  if (!params.fetchAll || !nextPageToken) return calendarList;

  const allItems: calendar_v3.Schema$CalendarListEntry[] = [
    ...calendarList.data.items,
  ];

  while (nextPageToken) {
    calendarList = await client.calendarList.list({
      pageToken: nextPageToken,
      maxResults,
    });

    allItems.push(...calendarList.data.items);
    nextPageToken = calendarList.data.nextPageToken;
  }

  calendarList.data.items = allItems;

  return calendarList;
};
