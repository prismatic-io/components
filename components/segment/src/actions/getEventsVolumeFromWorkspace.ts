import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import {
  appVersion,
  connectionInput,
  count,
  cursor,
  endTime,
  eventName,
  eventType,
  granularity,
  groupBy,
  region,
  sourceIds,
  startTime,
} from "../inputs";
import { getEventsVolumeFromWorkspaceExamplePayload } from "../examplePayloads";

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
    const { data } = await client.get("/transformations", {
      params: {
        granularity: granularity || undefined,
        startTime: startTime || undefined,
        endTime: endTime || undefined,
        groupBy: groupBy || undefined,
        sourceId: sourceId || undefined,
        eventName: eventName || undefined,
        eventType: eventType || undefined,
        appVersion: appVersion || undefined,
        pagination: {
          count: count || undefined,
          cursor: cursor || undefined,
        },
      },
    });
    return {
      data,
    };
  },
  examplePayload: {
    data: getEventsVolumeFromWorkspaceExamplePayload,
  },
});
