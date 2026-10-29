import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { getEventsVolumeFromWorkspaceExamplePayload } from "../examplePayloads";
import { paginateResults } from "../helpers/pagination";
import {
  appVersion,
  connectionInput,
  count,
  cursor,
  endTime,
  eventName,
  eventType,
  fetchAll,
  granularity,
  groupBy,
  region,
  sourceIds,
  startTime,
} from "../inputs";

export const getEventsVolumeFromWorkspace = action({
  display: {
    label: "Get Events Volume From Workspace",
    description:
      "Enumerates the Workspace event volumes over time in minute increments.",
  },
  inputs: {
    connectionInput,
    region,
    granularity,
    startTime,
    endTime,
    groupBy,
    sourceId: sourceIds,
    eventName,
    eventType,
    appVersion,
    fetchAll,
    count,
    cursor,
  },
  perform: async (
    context,
    {
      connectionInput,
      region,
      count,
      cursor,
      fetchAll,
      appVersion,
      endTime,
      eventName,
      eventType,
      granularity,
      groupBy,
      sourceId,
      startTime,
    },
  ) => {
    const client = createClient(connectionInput, region, context.debug.enabled);
    return await paginateResults({
      client,
      endpoint: "/transformations",
      params: {
        granularity: granularity || undefined,
        startTime: startTime || undefined,
        endTime: endTime || undefined,
        groupBy: groupBy || undefined,
        sourceId: sourceId || undefined,
        eventName: eventName || undefined,
        eventType: eventType || undefined,
        appVersion: appVersion || undefined,
      },
      fetchAll,
      count,
      cursor,
    });
  },
  examplePayload: {
    data: getEventsVolumeFromWorkspaceExamplePayload,
  },
});
