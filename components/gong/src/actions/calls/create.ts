import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  actualStart,
  callProviderCode,
  clientUniqueId,
  connection,
  context,
  customData,
  direction,
  disposition,
  downloadMediaUrl,
  duration,
  languageCode,
  meetingUrl,
  parties,
  primaryUser,
  purpose,
  scheduledEnd,
  scheduledStart,
  speakersTimeline,
  title,
  workspaceId,
} from "../../inputs";

export const createNewCall = action({
  display: {
    label: "Create New Call",
    description:
      "When using this endpoint, either provide a downloadMediaUrl or use the returned callId in a follow-up request to /v2/calls/[id]/media to upload the media file.",
  },
  perform: async (context, { connection, ...params }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.post(`/v2/calls/`, params);
    return { data };
  },
  inputs: {
    connection,
    clientUniqueId,
    primaryUser,
    parties,
    direction,
    actualStart,
    scheduledStart,
    scheduledEnd,
    title,
    purpose,
    duration,
    disposition,
    contextParam: context,
    customData,
    speakersTimeline,
    meetingUrl,
    callProviderCode,
    downloadMediaUrl,
    workspaceId,
    languageCode,
  },
  examplePayload: {
    data: {
      requestId: "4al018gzaztcr8nbukw",
      callId: "7782342274025937895",
      url: "https://app.gong.io/call?id=7782342274025937895",
    },
  },
});
